import ContentstackAppSDK from "../src/index";
import Extension from "../src/extension";
import { version } from "../package.json";

jest.mock("../src/extension");

describe("ContentstackAppSDK", () => {
    describe("init", () => {
        const mockInitData = {
            worked: true,
        };
        beforeEach(() => {
            const mockInitialize = jest.fn().mockResolvedValue(mockInitData);
            Extension.initialize = mockInitialize;
        });

        afterEach(() => {
            // Reset the static variable after every test
            (ContentstackAppSDK._extension as any) = undefined;
            jest.resetAllMocks();
        });

        it("should initialize the extension and return an instance of Extension", async () => {
            const extension = await ContentstackAppSDK.init();

            expect(Extension.initialize).toHaveBeenCalledTimes(1);
            expect(Extension.initialize).toBeCalledWith(version);
            expect(Extension).toHaveBeenCalledWith(mockInitData);
            expect(extension).toBeInstanceOf(Extension);
        });

        it("should return the same instance of Extension if it has already been initialized", async () => {
            (Extension.initialize as jest.Mock).mockResolvedValue(mockInitData);
            const extension = await ContentstackAppSDK.init();
            const extension2 = await ContentstackAppSDK.init();

            expect(Extension.initialize).toHaveBeenCalledTimes(1);
            expect(extension).toBe(extension2);
        });

        it("should reject the promise if initialization fails", async () => {
            const error = new Error("Initialization failed");
            (Extension.initialize as jest.Mock).mockRejectedValue(error);

            await expect(ContentstackAppSDK.init()).rejects.toThrow(error);
        });
    });

    describe("SDK_VERSION", () => {
        it("should return the version of the SDK", () => {
            expect(ContentstackAppSDK.SDK_VERSION).toBe(version);
        });
    });
});
