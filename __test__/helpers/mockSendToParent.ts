import { getMockManifestData } from "../data/mockmanifestData";

export const mockedSendToParent = jest
    .fn()
    .mockImplementation((type: string, payload?: Record<string, unknown>) => {
        switch (type) {
            case "getStylesFromHeader": {
                return Promise.resolve({ data: {} });
            }
            case "stackQuery": {
                if (!payload?.action) {
                    return Promise.resolve({ data: {} });
                }

                switch (payload.action) {
                    case "getAppManifest": {
                        return Promise.resolve({ data: getMockManifestData() });
                    }

                    default: {
                        return Promise.resolve({ data: {} });
                    }
                }
            }
            default: {
                return Promise.resolve({ data: {} });
            }
        }
    });
