import EventEmitter from "wolfy87-eventemitter";

import AssetSidebarWidget from "../src/AssetSidebarWidget";
import { IAssetSidebarInitData } from "../src/types";
import Asset from "../src/stack/api/asset";

jest.mock("post-robot", () => ({
    __esModule: true,
    default: {
        sendToParent: jest.fn(),
    },
}));

jest.mock("../src/stack/api/asset");

describe("AssetSidebarWidget", () => {
    let assetSidebarWidget: AssetSidebarWidget;
    let mockInitData: IAssetSidebarInitData = {
        data: {
            type: "ASSET_SIDEBAR_WIDGET",
            currentAsset: {},
            config: {},
            app_id: "mock_app_uid",
            installation_uid: "mock_installation_uid",
            extension_uid: "mock_extension_uid",
            stack: {} as any,
            user: {},
            currentBranch: "mock_branch",
            region: "region",
        },
    };

    let connection: { sendToParent: (...props: any[]) => any };
    let sendToParent;
    let emitter: EventEmitter;

    beforeEach(function () {
        sendToParent = function () {
            return Promise.resolve({ data: {} });
        };

        emitter = {
            on: (_event, cbf) => {
                setTimeout(() => {
                    cbf({ state: "full_width" });
                }, 50);
            },
        } as EventEmitter;

        jest.spyOn(emitter, "on");

        connection = { sendToParent };
        jest.spyOn(connection, "sendToParent");
        assetSidebarWidget = new AssetSidebarWidget(
            mockInitData as IAssetSidebarInitData,
            connection,
            emitter
        );
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    it("should set instance properties in constructor", () => {
        expect(assetSidebarWidget.currentAsset).toBe(
            mockInitData.data.currentAsset
        );
        expect(assetSidebarWidget._emitter).toBe(emitter);
        expect(assetSidebarWidget._connection).toBe(connection);
    });

    describe("getData", () => {
        it("should return the current asset", () => {
            const currentAsset = assetSidebarWidget.getData();
            expect(currentAsset).toBe(mockInitData.data.currentAsset);
        });
    });

    describe("setData", () => {
        it("should set the current asset with the one provided", async () => {
            const asset = {};
            const result = await assetSidebarWidget.setData(asset);
            expect(connection.sendToParent).toHaveBeenCalledWith(
                "setData",
                asset
            );
            expect(result).toEqual({ data: {} });
        });
    });

    describe("syncAsset", () => {
        it("should sync the upstream asset with the current", async () => {
            const result = await assetSidebarWidget.syncAsset();
            expect(connection.sendToParent).toHaveBeenCalledWith("syncAsset");
            expect(result).toEqual({ data: {} });
        });
    });

    describe("updateWidth", () => {
        it("should throw an error if width is invalid", () => {
            const error = new Error("Width must be a number");
            expect(
                assetSidebarWidget.updateWidth("500" as any)
            ).rejects.toThrowError(error);
        });

        it("should update the width with the one provided", async () => {
            const mockWidth = 500;
            const result = await assetSidebarWidget.updateWidth(mockWidth);
            expect(connection.sendToParent).toHaveBeenCalledWith(
                "updateAssetSidebarWidth",
                mockWidth
            );
            expect(result).toEqual({ data: {} });
        });
    });

    describe("replaceAsset", () => {
        it("should sync the upstream asset with the current", async () => {
            const mockHandleUpload = jest.fn();
            (Asset as jest.Mock).mockReturnValue({
                handleUpload: mockHandleUpload,
            });
            const file = {} as any;
            const result = await assetSidebarWidget.replaceAsset(file);
            expect(Asset).toHaveBeenLastCalledWith(emitter);
            expect(mockHandleUpload).toHaveBeenCalledWith([file], "replace");
        });
    });

    describe("onSave", () => {
        it("should only accept functions as a callback", () => {
            const mockCallback: any = {};
            const error = new Error("Callback must be a function");
            expect(() => assetSidebarWidget.onSave(mockCallback)).toThrow(
                error
            );
        });

        it("should setup a listener for assetSave event", () => {
            const mockCallback = jest.fn();
            const result = assetSidebarWidget.onSave(mockCallback);
            expect(emitter.on).toHaveBeenLastCalledWith(
                "assetSave",
                expect.any(Function)
            );
            expect(result).toBeUndefined();
        });

        it("should invoke the callback provided ", () => {
            const mockCallback = jest.fn();
            jest.useFakeTimers();
            assetSidebarWidget.onSave(mockCallback);
            expect(emitter.on).toHaveBeenLastCalledWith(
                "assetSave",
                expect.any(Function)
            );
            jest.runAllTimers();
            expect(mockCallback).toHaveBeenCalled();
        });
    });

    describe("onChange", () => {
        it("should only accept functions as a callback", () => {
            const mockCallback: any = {};
            const error = new Error("Callback must be a function");
            expect(() => assetSidebarWidget.onChange(mockCallback)).toThrow(
                error
            );
        });

        it("should setup a listener for assetSave event", () => {
            const mockCallback = jest.fn();
            const result = assetSidebarWidget.onChange(mockCallback);
            expect(emitter.on).toHaveBeenLastCalledWith(
                "assetChange",
                expect.any(Function)
            );
            expect(result).toBeUndefined();
        });

        it("should invoke the callback provided ", () => {
            const mockCallback = jest.fn();
            jest.useFakeTimers();
            assetSidebarWidget.onChange(mockCallback);
            expect(emitter.on).toHaveBeenLastCalledWith(
                "assetChange",
                expect.any(Function)
            );
            jest.runAllTimers();
            expect(mockCallback).toHaveBeenCalled();
        });
    });

    describe("onPublish", () => {
        it("should only accept functions as a callback", () => {
            const mockCallback: any = {};
            const error = new Error("Callback must be a function");
            expect(() => assetSidebarWidget.onPublish(mockCallback)).toThrow(
                error
            );
        });

        it("should setup a listener for assetSave event", () => {
            const mockCallback = jest.fn();
            const result = assetSidebarWidget.onPublish(mockCallback);
            expect(emitter.on).toHaveBeenLastCalledWith(
                "assetPublish",
                expect.any(Function)
            );
            expect(result).toBeUndefined();
        });

        it("should invoke the callback provided ", () => {
            const mockCallback = jest.fn();
            jest.useFakeTimers();
            assetSidebarWidget.onPublish(mockCallback);
            expect(emitter.on).toHaveBeenLastCalledWith(
                "assetPublish",
                expect.any(Function)
            );
            jest.runAllTimers();
            expect(mockCallback).toHaveBeenCalled();
        });
    });

    describe("onUnPublish", () => {
        it("should only accept functions as a callback", () => {
            const mockCallback: any = {};
            const error = new Error("Callback must be a function");
            expect(() => assetSidebarWidget.onUnPublish(mockCallback)).toThrow(
                error
            );
        });

        it("should setup a listener for assetSave event", () => {
            const mockCallback = jest.fn();
            const result = assetSidebarWidget.onUnPublish(mockCallback);
            expect(emitter.on).toHaveBeenLastCalledWith(
                "assetUnPublish",
                expect.any(Function)
            );
            expect(result).toBeUndefined();
        });

        it("should invoke the callback provided ", () => {
            const mockCallback = jest.fn();
            jest.useFakeTimers();
            assetSidebarWidget.onUnPublish(mockCallback);
            expect(emitter.on).toHaveBeenLastCalledWith(
                "assetUnPublish",
                expect.any(Function)
            );
            jest.runAllTimers();
            expect(mockCallback).toHaveBeenCalled();
        });
    });
});
