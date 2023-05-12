import { Region } from "../types";

export function onData<Data extends Record<string, any>>(data: { data: Data }) {
    if (typeof data.data === "string") {
        return Promise.reject(data.data);
    }
    return Promise.resolve(data.data);
}

export function onError(error: Error) {
    return Promise.reject(error);
}

export function formatAppRegion(region: string): Region {
    switch (region) {
        case "NA":
            return Region.NA;
        case "EU":
            return Region.EU;
        case "AZURE_NA":
            return Region.AZURE_NA;
        case "AZURE_EU":
            return Region.AZURE_EU;
        default:
            return Region.UNKNOWN;
    }
}
