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
        mockEmitter
    );
    ``;
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

    describe("setValidationState", () => {
        it("should throw error if isValidated is not a boolean", async () => {
            // @ts-ignore
            await expect(appConfig.setValidationState("true")).rejects.toThrow(
                ERROR_MESSAGES.configPage.setValidationState
                    .isValidatedTypeBoolean
            );
        });

        it("should throw error if message is not a string", async () => {
            await expect(
                // @ts-ignore
                appConfig.setValidationState(true, 123)
            ).rejects.toThrow(
                ERROR_MESSAGES.configPage.setValidationState.messageTypeString
            );
        });

        it("should send undefined message if not provided", async () => {
            await appConfig.setValidationState(true);

            expect(mockConnection.sendToParent).toHaveBeenLastCalledWith(
                "setValidationState",
                {
                    isValidated: true,
                }
            );
        });

        it("should send data to parent", async () => {
            await appConfig.setValidationState(true, "message");

            expect(mockConnection.sendToParent).toHaveBeenLastCalledWith(
                "setValidationState",
                {
                    isValidated: true,
                    message: "message",
                }
            );

            await appConfig.setValidationState(false, "message");

            expect(mockConnection.sendToParent).toHaveBeenLastCalledWith(
                "setValidationState",
                {
                    isValidated: false,
                    message: "message",
                }
            );
        });
    });
});
