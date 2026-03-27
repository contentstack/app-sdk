import {
    SETDATA_RESOLUTION_ERROR_CODE,
    getResolutionErrorPayload,
    getSetDataWarnings,
    getValidationErrorPayload,
    isResolutionErrorPayload,
    isValidationErrorPayload,
} from "../src/utils/setDataBridgeResponse";

describe("setDataBridgeResponse", () => {
    it("detects VALIDATION_ERROR flat and nested", () => {
        expect(
            isValidationErrorPayload({
                data: { code: "VALIDATION_ERROR", message: "x", details: [] },
            })
        ).toBe(true);
        expect(
            isValidationErrorPayload({
                data: { data: { code: "VALIDATION_ERROR" } },
            })
        ).toBe(true);
    });

    it("getValidationErrorPayload prefers nested error object", () => {
        const e = getValidationErrorPayload({
            data: { data: { code: "VALIDATION_ERROR", details: [1] } },
        });
        expect(e.code).toBe("VALIDATION_ERROR");
        expect(e.details).toEqual([1]);
    });

    it("getSetDataWarnings reads top-level or nested", () => {
        const w = [{ field: "a" }];
        expect(
            getSetDataWarnings({ data: { warnings: w } })
        ).toEqual(w);
        expect(
            getSetDataWarnings({ data: { data: { warnings: w } } })
        ).toEqual(w);
    });

    it("detects SETDATA_RESOLUTION_ERROR flat and nested", () => {
        expect(
            isResolutionErrorPayload({
                data: {
                    code: SETDATA_RESOLUTION_ERROR_CODE,
                    message: "m",
                    failures: [],
                },
            })
        ).toBe(true);
        expect(
            isResolutionErrorPayload({
                data: { data: { code: SETDATA_RESOLUTION_ERROR_CODE } },
            })
        ).toBe(true);
    });

    it("getResolutionErrorPayload prefers nested error object", () => {
        const e = getResolutionErrorPayload({
            data: {
                data: {
                    code: SETDATA_RESOLUTION_ERROR_CODE,
                    failures: [{ kind: "asset", uid: "bltx", reason: "x" }],
                },
            },
        });
        expect(e.code).toBe(SETDATA_RESOLUTION_ERROR_CODE);
        expect(e.failures).toEqual([
            { kind: "asset", uid: "bltx", reason: "x" },
        ]);
    });
});
