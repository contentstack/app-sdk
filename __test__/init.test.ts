import ContentstackAppSDK from "../src/index";
import UiLocation from "../src/uiLocation";
import { version } from "../package.json";

jest.mock("../src/uiLocation");
jest.mock("axios");

describe("ContentstackAppSDK", () => {
    describe("init", () => {
        const mockInitData = {
            worked: true,
        };
        beforeEach(() => {
            const mockInitialize = jest.fn().mockResolvedValue(mockInitData);
            UiLocation.initialize = mockInitialize;
        });

        afterEach(() => {
            // Reset the static variable after every test
            (ContentstackAppSDK._uiLocation as any) = undefined;
            jest.resetAllMocks();
        });

        it("should initialize the ui location and return an instance of Location", async () => {
            const uiLocation = await ContentstackAppSDK.init();

            expect(UiLocation.initialize).toHaveBeenCalledTimes(1);
            expect(UiLocation.initialize).toBeCalledWith(version);
            expect(UiLocation).toHaveBeenCalledWith(mockInitData);
            expect(uiLocation).toBeInstanceOf(UiLocation);
        });

        it("should return the same instance of Location if it has already been initialized", async () => {
            (UiLocation.initialize as jest.Mock).mockResolvedValue(
                mockInitData
            );
            const uiLocation = await ContentstackAppSDK.init();
            const uiLocation2 = await ContentstackAppSDK.init();

            expect(UiLocation.initialize).toHaveBeenCalledTimes(1);
            expect(uiLocation).toBe(uiLocation2);
        });

        it("should reject the promise if initialization fails", async () => {
            const error = new Error("Initialization failed");
            (UiLocation.initialize as jest.Mock).mockRejectedValue(error);

            await expect(ContentstackAppSDK.init()).rejects.toThrow(error);
        });
    });

    describe("SDK_VERSION", () => {
        it("should return the version of the SDK", () => {
            expect(ContentstackAppSDK.SDK_VERSION).toBe(version);
        });
    });
});
