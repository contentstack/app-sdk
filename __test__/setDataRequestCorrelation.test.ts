import EventEmitter from "wolfy87-eventemitter";
import { jest } from "@jest/globals";

import type { SetDataValidationEvent } from "../src/types/setDataValidation.types";
import {
    SET_DATA_VALIDATION_ERROR
} from "../src/types/setDataValidation.types";
import { parseSetDataValidationPayload } from "../src/utils/setDataRequestCorrelation";

/** Mirrors `uiLocation` extensionEvent handling for SET_DATA_VALIDATION. */
function emitSetDataValidationFromExtensionEvent(
    event: { data?: { name?: string; data?: unknown } },
    emitter: EventEmitter
): void {
    if (event.data?.name === SET_DATA_VALIDATION_ERROR) {
        const parsed = parseSetDataValidationPayload(event.data.data);
        if (parsed) {
            emitter.emitEvent(SET_DATA_VALIDATION_ERROR, [parsed]);
        }
    }
}

describe("setDataValidationExtensionEvent", () => {
    it("dispatches field validation error to emitter", () => {
        const emitter = new EventEmitter();
        const cb = jest.fn();
        emitter.on(SET_DATA_VALIDATION_ERROR, cb);

        emitSetDataValidationFromExtensionEvent(
            {
                data: {
                    name: "setDataValidationError",
                    data: {
                        requestId: "req-1",
                        source: "field",
                        fieldUid: "title",
                        status: "error",
                        validationError: {
                            code: "VALIDATION_ERROR",
                            message: "Field is invalid",
                            details: [
                                {
                                    field: "title",
                                    fieldType: "text",
                                    reasons: [{ reason: "REQUIRED", message: "Title is required" }]
                                }
                            ]
                        },
                    },
                },
            },
            emitter
        );

        expect(cb).toHaveBeenCalledTimes(1);
        expect(cb.mock.calls[0][0]).toMatchObject({
            requestId: "req-1",
            source: "field",
            fieldUid: "title",
            status: "error",
        });
    });

    it("dispatches error when requestId is omitted (simplified path)", () => {
        const emitter = new EventEmitter();
        const cb = jest.fn();
        emitter.on(SET_DATA_VALIDATION_ERROR, cb);

        emitSetDataValidationFromExtensionEvent(
            {
                data: {
                    name: "setDataValidationError",
                    data: {
                        source: "field",
                        fieldUid: "title",
                        status: "error",
                        validationError: {
                            code: "VALIDATION_ERROR",
                            message: "Field is invalid",
                            details: [
                                {
                                    field: "title",
                                    fieldType: "text",
                                    reasons: [{ reason: "REQUIRED", message: "Title is required" }]
                                }
                            ]
                        },
                    },
                },
            },
            emitter
        );

        expect(cb).toHaveBeenCalledTimes(1);
        expect(cb.mock.calls[0][0]).toMatchObject({
            source: "field",
            fieldUid: "title",
            status: "error",
        });
        expect(
            (cb.mock.calls[0][0] as SetDataValidationEvent).requestId
        ).toBeUndefined();
    });

    it("dispatches entry batch validation without stale filtering", () => {
        const emitter = new EventEmitter();
        const cb = jest.fn();
        emitter.on(SET_DATA_VALIDATION_ERROR, cb);

        emitSetDataValidationFromExtensionEvent(
            {
                data: {
                    name: "setDataValidationError",
                    data: {
                        requestId: "older",
                        source: "entry",
                        status: "error",
                        validationError: {
                            code: "VALIDATION_ERROR",
                            message: "Request validation failed",
                            details: [
                                {
                                    field: "a",
                                    fieldType: "",
                                    reasons: [
                                        {
                                            reason: "CONSTRAINT_VIOLATION",
                                            message: "bad",
                                        },
                                    ],
                                },
                            ],
                        },
                    },
                },
            },
            emitter
        );

        expect(cb).toHaveBeenCalledTimes(1);
        expect(
            (cb.mock.calls[0][0] as SetDataValidationEvent).validationError
        ).toMatchObject({
            code: "VALIDATION_ERROR",
            details: [{ field: "a", reasons: [{ message: "bad" }] }],
        });
    });

    it("normalizes legacy flat errors array to validationError", () => {
        const emitter = new EventEmitter();
        const cb = jest.fn();
        emitter.on(SET_DATA_VALIDATION_ERROR, cb);

        emitSetDataValidationFromExtensionEvent(
            {
                data: {
                    name: "setDataValidationError",
                    data: {
                        source: "entry",
                        status: "error",
                        errors: [{ fieldUid: "a", message: "bad" }],
                    },
                },
            },
            emitter
        );

        expect(cb).toHaveBeenCalledTimes(1);
        expect(
            (cb.mock.calls[0][0] as SetDataValidationEvent).validationError
        ).toEqual({
            code: "VALIDATION_ERROR",
            message: "Request validation failed",
            details: [
                {
                    field: "a",
                    fieldType: "",
                    reasons: [
                        {
                            reason: "CONSTRAINT_VIOLATION",
                            message: "bad",
                        },
                    ],
                },
            ],
        });
    });

    it("drops malformed payloads", () => {
        const emitter = new EventEmitter();
        const cb = jest.fn();
        emitter.on(SET_DATA_VALIDATION_ERROR, cb);

        emitSetDataValidationFromExtensionEvent(
            {
                data: {
                    name: "setDataValidationError",
                    data: {
                        source: "field",
                        fieldUid: "title",
                        status: "error",
                    },
                },
            },
            emitter
        );

        expect(cb).not.toHaveBeenCalled();
    });

    it("ignores success status (error-only event)", () => {
        const emitter = new EventEmitter();
        const cb = jest.fn();
        emitter.on(SET_DATA_VALIDATION_ERROR, cb);

        emitSetDataValidationFromExtensionEvent(
            {
                data: {
                    name: "setDataValidationError",
                    data: {
                        source: "field",
                        fieldUid: "title",
                        status: "success", // Should be ignored
                    },
                },
            },
            emitter
        );

        expect(cb).not.toHaveBeenCalled();
    });
});
