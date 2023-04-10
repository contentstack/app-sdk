import EventEmitter from "wolfy87-eventemitter";
import { AppConfig } from "../src/appConfig";
import { ERROR_MESSAGES } from "../src/utils/errorMessages";

describe("app config", () => {
    const mockConnection = {
        sendToParent: jest.fn().mockReturnValue(Promise.resolve({})),
    };
    const mockEmitter: EventEmitter = new EventEmitter();
    const mockData = {
        stack: {},
    };
    const appConfig: AppConfig = new AppConfig(
        mockData,
        mockConnection,
        mockEmitter,
        { currentBranch: "master" }
    );

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("stack method should return stack object", () => {
        expect(appConfig.stack()).toBeDefined();
    });

    it("setInstallationData method should send data to parent", () => {
        const data = {
            configuration: {},
            serverConfiguration: {},
        };
        appConfig.setInstallationData(data);

        expect(mockConnection.sendToParent).toHaveBeenLastCalledWith(
            "setInstallationData",
            data
        );
    });
    it("getInstallationData method should send request to parent for data", () => {
        appConfig.getInstallationData();

        expect(mockConnection.sendToParent).toHaveBeenLastCalledWith(
            "getInstallationData"
        );
    });

    describe("setValidity", () => {
        it("should throw error if isValid is not a boolean", async () => {
            await expect(appConfig.setValidity("true" as any)).rejects.toThrow(
                ERROR_MESSAGES.configPage.setValidity.isValidTypeBoolean
            );
        });

        it("should throw error if message is not a string", async () => {
            await expect(
                appConfig.setValidity(true, { message: 123 as any })
            ).rejects.toThrow(
                ERROR_MESSAGES.configPage.setValidity.messageTypeString
            );
        });

        it("should work when options parameter is not provided", async () => {
            await appConfig.setValidity(true);

            expect(mockConnection.sendToParent).toHaveBeenLastCalledWith(
                "setValidity",
                { isValid: true }
            );
        });

        it("should send data to parent", async () => {
            await appConfig.setValidity(true);

            expect(mockConnection.sendToParent).toHaveBeenLastCalledWith(
                "setValidity",
                { isValid: true }
            );

            await appConfig.setValidity(false, { message: "message" });

            expect(mockConnection.sendToParent).toHaveBeenLastCalledWith(
                "setValidity",
                { isValid: false, options: { message: "message" } }
            );
        });
    });
});
