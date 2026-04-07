import {
    getSetDataWarnings,
    getValidationErrorPayload,
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

});
