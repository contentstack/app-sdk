import EventEmitter from "wolfy87-eventemitter";
import { jest } from "@jest/globals";

import type { SetDataValidationEvent } from "../src/types/setDataValidation.types";
import {
    SET_DATA_VALIDATION_EMITTER_EVENT,
    SET_DATA_VALIDATION_WIRE_NAME,
} from "../src/types/setDataValidation.types";
import { parseSetDataValidationPayload } from "../src/utils/setDataRequestCorrelation";

/** Mirrors `uiLocation` extensionEvent handling for SET_DATA_VALIDATION. */
function emitSetDataValidationFromExtensionEvent(
    event: { data?: { name?: string; data?: unknown } },
    emitter: EventEmitter
): void {
    if (event.data?.name === SET_DATA_VALIDATION_WIRE_NAME) {
        const parsed = parseSetDataValidationPayload(event.data.data);
        if (parsed) {
            emitter.emitEvent(SET_DATA_VALIDATION_EMITTER_EVENT, [parsed]);
        }
    }
}

describe("setDataValidationExtensionEvent", () => {
    it("dispatches field validation to emitter", () => {
        const emitter = new EventEmitter();
        const cb = jest.fn();
        emitter.on(SET_DATA_VALIDATION_EMITTER_EVENT, cb);

        emitSetDataValidationFromExtensionEvent(
            {
                data: {
                    name: "SET_DATA_VALIDATION",
                    data: {
                        requestId: "req-1",
                        source: "field",
                        fieldUid: "title",
                        status: "success",
                    },
                },
            },
            emitter
        );

        expect(cb).toHaveBeenCalledTimes(1);
        expect(cb.mock.calls[0][0]).toMatchObject({
            requestId: "req-1",
            source: "field",
            status: "success",
        });
    });

    it("dispatches when requestId is omitted (simplified path)", () => {
        const emitter = new EventEmitter();
        const cb = jest.fn();
        emitter.on(SET_DATA_VALIDATION_EMITTER_EVENT, cb);

        emitSetDataValidationFromExtensionEvent(
            {
                data: {
                    name: "SET_DATA_VALIDATION",
                    data: {
                        source: "field",
                        fieldUid: "title",
                        status: "success",
                    },
                },
            },
            emitter
        );

        expect(cb).toHaveBeenCalledTimes(1);
        expect(cb.mock.calls[0][0]).toMatchObject({
            source: "field",
            fieldUid: "title",
            status: "success",
        });
        expect(
            (cb.mock.calls[0][0] as SetDataValidationEvent).requestId
        ).toBeUndefined();
    });

    it("dispatches entry batch validation without stale filtering", () => {
        const emitter = new EventEmitter();
        const cb = jest.fn();
        emitter.on(SET_DATA_VALIDATION_EMITTER_EVENT, cb);

        emitSetDataValidationFromExtensionEvent(
            {
                data: {
                    name: "SET_DATA_VALIDATION",
                    data: {
                        requestId: "older",
                        source: "entry",
                        status: "error",
                        errors: [{ fieldUid: "a", message: "bad" }],
                    },
                },
            },
            emitter
        );

        expect(cb).toHaveBeenCalledTimes(1);
    });

    it("drops malformed payloads", () => {
        const emitter = new EventEmitter();
        const cb = jest.fn();
        emitter.on(SET_DATA_VALIDATION_EMITTER_EVENT, cb);

        emitSetDataValidationFromExtensionEvent(
            {
                data: {
                    name: "SET_DATA_VALIDATION",
                    data: {
                        source: "field",
                        fieldUid: "title",
                        status: "error",
                        errors: [],
                    },
                },
            },
            emitter
        );

        expect(cb).not.toHaveBeenCalled();
    });
});
