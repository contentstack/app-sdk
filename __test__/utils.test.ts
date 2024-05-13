import { Region } from "../src/types";
import { formatAppRegion } from "../src/utils/utils";

describe("formatAppRegion", () => {
    it('should return NA for "NA"', () => {
        expect(formatAppRegion("NA")).toBe(Region.NA);
    });

    it('should return EU for "EU"', () => {
        expect(formatAppRegion("EU")).toBe(Region.EU);
    });

    it('should return AZURE_NA for "AZURE_NA"', () => {
        expect(formatAppRegion("AZURE_NA")).toBe(Region.AZURE_NA);
    });

    it('should return AZURE_EU for "AZURE_EU"', () => {
        expect(formatAppRegion("AZURE_EU")).toBe(Region.AZURE_EU);
    });

    it('should return GCP_NA for "GCP_NA"', () => {
        expect(formatAppRegion("GCP_NA")).toBe(Region.GCP_NA);
    });

    it("should return unknown for any invalid region", () => {
        expect(formatAppRegion("invalid")).toBe(Region.UNKNOWN);
    });
});
