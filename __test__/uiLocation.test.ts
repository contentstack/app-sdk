import postRobot from "post-robot";

import UiLocation from "../src/uiLocation";
import {
    IAppConfigInitData,
    IAssetSidebarInitData,
    IDashboardInitData,
    IFieldInitData,
    IFieldModifierLocationInitData,
    IFullPageLocationInitData,
    ISidebarInitData,
    LocationType,
    Region,
} from "../src/types";
import { RequestOption } from '../src/types/common.types';
import { RequestConfig } from '../src/types/api.type';
import { AxiosRequestConfig, AxiosResponse } from 'axios';

jest.mock("post-robot");
jest.mock("wolfy87-eventemitter");
jest.mock("../src/fieldModifierLocation/field");
jest.mock("../src/field");

const mockManifestData = {
    created_by: {
        uid: "string",
        first_name: "string",
        last_name: "string",
    },
    icon: "string",
    name: "string",
    target_type: "string",
    uid: "string",
    updated_by: {
        uid: "string",
        first_name: "string",
        last_name: "string",
    },
    version: 5,
    visibility: "string",
};

const mockStackData = {
    created_at: "created_at",
    updated_at: "updated_at",
    uid: "uid",
    org_uid: "org_uid",
    api_key: "api_key",
    master_locale: "master_locale",
    is_asset_download_public: true,
    owner_uid: "owner_uid",
    user_uids: ["user_uids"],
    settings: {},
    name: "name",
};

const initData: IAppConfigInitData = {
    type: LocationType.APP_CONFIG_WIDGET,
    app_id: "app_id",
    installation_uid: "installation_uid",
    extension_uid: "extension_uid",
    region: "NA",
    endpoints: { CMA: "https://api.contentstack.io", APP: "https://app.contentstack.app" },
    stack: mockStackData,
    user: {} as any,
    currentBranch: "currentBranch",
    manifest: mockManifestData,
};

const initDataJsonRte = {
    type: "RTE",
    region: "NA",
    stack: mockStackData,
    user: {},
};

describe("UI Location", () => {
    let postRobotOnMock;
    let postRobotSendToParentMock: jest.Mock;

    beforeEach(() => {
        postRobotOnMock = jest.fn();
        postRobotSendToParentMock = jest.fn().mockResolvedValue({ data: {} });
        (postRobot as any).on.mockImplementation(postRobotOnMock);
        (postRobot as any).sendToParent.mockImplementation(
            postRobotSendToParentMock
        );
    });

    afterEach(() => {
        postRobotOnMock.mockClear();
        postRobotSendToParentMock.mockClear();

        jest.clearAllMocks();
        window["postRobot"] = undefined;
        window["iframeRef"] = undefined;
    });

    describe("Properties in the window object", () => {
        it("should have postRobot property", () => {
            expect(window["postRobot"]).toBeUndefined();
            new UiLocation(initData);
            expect(window["postRobot"]).toBeDefined();

            Object.prototype.hasOwnProperty.call(
                window["postRobot"],
                "sendToParent"
            );
        });
    });

    it("should have modal property", () => {
        const uiLocation = new UiLocation(initData);
        expect(uiLocation.modal).toBeDefined();
    });

    describe("pulse", () => {
        it("should have pulse method", () => {
            const uiLocation = new UiLocation(initData);
            expect(uiLocation.getAppVersion).toBeDefined();
        });

        it("should invoke post robot method with type analytics", () => {
            const uiLocation = new UiLocation(initData);
            const eventName = "Sample Event";
            const metadata = { foo: "bar" };
            uiLocation.pulse(eventName, metadata);
            expect((postRobot as any).sendToParent).toHaveBeenCalledWith(
                "analytics",
                {
                    eventName,
                    metadata,
                }
            );
        });
    });

    describe('dispatchPostRobotRequest', () => {
        let mockPostRobot: typeof postRobot;
        let opts: RequestOption;
        let uiLocationInstance: UiLocation;
        let onError: jest.Mock;

        beforeEach(() => {
            mockPostRobot = postRobot;
            opts = { method: 'GET' };
            uiLocationInstance = new UiLocation(initData);
            onError = jest.fn();
            uiLocationInstance.api = jest.fn().mockResolvedValue({
                method: 'GET',
                url: "https://test.com/test?limit=10&skip=0"
            });
        });

        it('should call sendToParent with the correct arguments and resolve with data', async () => {
            const mockData = { success: true };
            // Call the method that uses uiLocationInstance.api
            const result = await uiLocationInstance.api("https://test.com/test?limit=10&skip=0",{
                method: 'GET'
            });

            // Assertions
            expect(uiLocationInstance.api).toHaveBeenCalledWith('https://test.com/test?limit=10&skip=0',{
                method: 'GET'
            });
            expect(result).toEqual({
                method: 'GET',
                url: 'https://test.com/test?limit=10&skip=0',
            });

        });

        it('should call onError if sendToParent rejects', async () => {
            const mockError = new Error('Test error');

            // Mock the api method to reject with an error
            uiLocationInstance.api = jest.fn().mockRejectedValue(mockError);

            // Mock the onError implementation
            onError.mockImplementation((error) => {
                throw error;
            });

            // Call the method that uses uiLocationInstance.api and expect it to throw an error
            await expect(uiLocationInstance.api("https://test.com/test?limit=10&skip=0",{
                method: 'GET'
            })).rejects.toThrow('Test error');
        });
    });


    describe("createSDKAdapter", () => {
        let mockPostRobot: typeof postRobot;
        let opts: RequestConfig;
        let uiLocationInstance: UiLocation;
        let onError: jest.Mock;
    
        beforeEach(() => {
            mockPostRobot = postRobot;
            opts = { method: 'GET', baseURL: "https://test.com", url: "/test?limit10&skip=0" };
            uiLocationInstance = new UiLocation(initData);
            onError = jest.fn();
            uiLocationInstance.createAdapter = jest.fn().mockImplementation(() => async (config: AxiosRequestConfig) => {
                return {
                    method: 'GET',
                    url: '/test?limit=10&skip=0',
                    baseURL: 'https://test.com',
                    data: {}
                } as unknown as AxiosResponse;
            });
        });
    
        afterEach(() => {
            postRobotOnMock.mockClear();
            postRobotSendToParentMock.mockClear();
    
            jest.clearAllMocks();
            window["postRobot"] = undefined;
            window["iframeRef"] = undefined;
        });
    
        it('should call createAdapter with the correct arguments and resolve with data', async () => {
            const mockData = { success: true };
            // Call the method that uses uiLocationInstance.createAdapter
            const result = await uiLocationInstance.createAdapter()({
                method: 'GET',
                url: '/test?limit=10&skip=0',
                baseURL: 'https://test.com',
                data: {}
            });
    
            expect(result).toEqual({
                method: 'GET',
                url: '/test?limit=10&skip=0',
                baseURL: 'https://test.com',
                data: {}
            });
        });
    
        it('should call onError if createAdapter rejects', async () => {
            const mockError = new Error('Test error');
    
            // Mock the createAdapter method to reject with an error
            uiLocationInstance.createAdapter = jest.fn().mockImplementation(() => async (config: AxiosRequestConfig) => {
                throw mockError;
            });
    
            // Mock the onError implementation
            onError.mockImplementation((error) => {
                throw error;
            });
    
            // Call the method that uses uiLocationInstance.createAdapter and expect it to throw an error
            await expect(uiLocationInstance.createAdapter()({
                method: 'GET',
                url: '/test?limit=10&skip=0',
                baseURL: 'https://test.com',
                data: {}
            })).rejects.toThrow('Test error');
        });
    });
    
    describe("getConfig", () => {
        it("should return config if no installation uid present", async () => {
            const uiLocation = new UiLocation(initDataJsonRte as any);
            const config = await uiLocation.getConfig();
            expect(config).toEqual({});
        });

        it("should return config for extension if present", async () => {
            const extensionConfig = { foo: "bar" };
            const uiLocation = new UiLocation({
                ...initDataJsonRte,
                config: extensionConfig,
            } as any);
            const config = await uiLocation.getConfig();
            expect(config).toEqual(extensionConfig);
        });

        it("should fetch and return config if installation uid present", async () => {
            const uiLocation = new UiLocation(initData);
            const config = await uiLocation.getConfig();
            expect(config).toEqual({});
            expect(postRobotSendToParentMock).toHaveBeenLastCalledWith(
                "getConfig"
            );
        });
    });

    describe("getCurrentLocation", () => {
        it("should have getCurrentLocation method", () => {
            const uiLocation = new UiLocation(initData);
            expect(uiLocation.getCurrentLocation).toBeDefined();
        });

        it("should return type of location", () => {
            const uiLocation = new UiLocation(initData);
            const locationType = uiLocation.getCurrentLocation();
            expect(locationType).toEqual(initData.type);
        });
    });

    describe("getAppVersion", () => {
        it("should have getAppVersion method", () => {
            const uiLocation = new UiLocation(initData);
            expect(uiLocation.getAppVersion).toBeDefined();
        });

        it("should return an app version when invoked", async () => {
            const uiLocation = new UiLocation(initData);
            const version = await uiLocation.getAppVersion();
            expect(version).toBe(5);
        });

        it("should return null when installation uid is not present", async () => {
            const uiLocation = new UiLocation(initDataJsonRte as any);
            const version = await uiLocation.getAppVersion();
            expect(version).toBe(null);
        });

        it("should fetch and return the app version using post robot when not available", async () => {
            const mockSendToParent = jest
                .fn()
                .mockResolvedValueOnce({ data: { ...mockManifestData } });
            (postRobot as any).sendToParent = mockSendToParent;

            const options = {
                uid: initData.installation_uid,
                action: "getAppManifest",
                headers: { organization_uid: mockStackData.org_uid },
                skip_api_key: true,
            };

            const uiLocation = new UiLocation({
                ...initData,
                manifest: undefined,
            });
            const version = await uiLocation.getAppVersion();
            expect(mockSendToParent).toBeCalledWith("stackQuery", options);
            expect(version).toBe(5);
        });
    });

    describe("getCurrentRegion", () => {
        it("should have getCurrentRegion method", () => {
            const uiLocation = new UiLocation(initData);
            expect(uiLocation.getCurrentLocation).toBeDefined();
        });

        it("should return a valid region", () => {
            const uiLocation = new UiLocation(initData);
            const region = uiLocation.getCurrentRegion();
            expect(region).toBe(Region.NA);
        });
    });

    describe("initialize", () => {
        it("should have static initialize method", () => {
            expect(UiLocation.initialize).toBeDefined();
        });

        it("should invoke post robot with init event", async () => {
            const meta = {
                sdkType: "app-sdk",
            };
            const version = "1";
            const initData = await UiLocation.initialize(version);
            expect(postRobotSendToParentMock).toHaveBeenLastCalledWith("init", {
                version,
                meta,
            });
            expect(initData).toEqual({});
        });
    });

    describe("setReady", () => {
        it("should have getCurrentLocation method", () => {
            const uiLocation = new UiLocation(initData);
            expect(uiLocation.setReady).toBeDefined();
        });

        it("should invoke post robot with ready event", async () => {
            const uiLocation = new UiLocation(initData);
            const result = await uiLocation.setReady();
            expect(postRobotSendToParentMock).toHaveBeenLastCalledWith("ready");
            expect(result).toEqual({ data: {} });
        });
    });

    describe("location", () => {
        it("should accept DASHBOARD as type of location", () => {
            const uiLocation = new UiLocation({
                ...initData,
                type: "DASHBOARD",
                dashboard_width: "half_width",
            } as IDashboardInitData);
            expect(uiLocation.location.DashboardWidget).toBeDefined();
            expect(uiLocation.location.DashboardWidget).toHaveProperty("frame");
            expect(uiLocation.location.DashboardWidget).toHaveProperty("stack");
        });

        it("should accept WIDGET as type of location", () => {
            const uiLocation = new UiLocation({
                ...initData,
                type: "WIDGET",
            } as ISidebarInitData);
            expect(uiLocation.location.SidebarWidget).toBeDefined();
            expect(uiLocation.location.SidebarWidget).toHaveProperty("entry");
            expect(uiLocation.location.SidebarWidget).toHaveProperty("stack");
        });

        it("should accept APP_CONFIG_WIDGET as type of location", () => {
            const uiLocation = new UiLocation(initData);
            expect(uiLocation.location.AppConfigWidget).toBeDefined();
            expect(uiLocation.location.AppConfigWidget).toHaveProperty(
                "installation"
            );
            expect(uiLocation.location.AppConfigWidget).toHaveProperty("stack");
        });

        it("should accept ASSET_SIDEBAR_WIDGET as type of location", () => {
            const uiLocation = new UiLocation({
                ...initData,
                type: "ASSET_SIDEBAR_WIDGET",
            } as IAssetSidebarInitData);
            expect(uiLocation.location.AssetSidebarWidget).toBeDefined();
        });

        it("should accept FIELD_MODIFIER_LOCATION as type of location", () => {
            const uiLocation = new UiLocation({
                ...initData,
                type: "FIELD_MODIFIER_LOCATION",
            } as IFieldModifierLocationInitData);
            expect(uiLocation.location.FieldModifierLocation).toBeDefined();
            expect(uiLocation.location.FieldModifierLocation).toHaveProperty(
                "entry"
            );
            expect(uiLocation.location.FieldModifierLocation).toHaveProperty(
                "stack"
            );
            expect(uiLocation.location.FieldModifierLocation).toHaveProperty(
                "field"
            );
            expect(uiLocation.location.FieldModifierLocation).toHaveProperty(
                "frame"
            );
        });

        it("should accept FULL_PAGE_LOCATION as type of location", () => {
            const uiLocation = new UiLocation({
                ...initData,
                type: "FULL_PAGE_LOCATION",
            } as IFullPageLocationInitData);
            expect(uiLocation.location.FullPage).toBeDefined();
            expect(uiLocation.location.FullPage).toHaveProperty("stack");
        });

        it("should accept FIELD as type of location", () => {
            const uiLocation = new UiLocation({
                ...initData,
                type: "FIELD",
            } as IFieldInitData);
            expect(uiLocation.location.CustomField).toBeDefined();
            expect(uiLocation.location.CustomField).toHaveProperty("field");
            expect(uiLocation.location.CustomField).toHaveProperty(
                "fieldConfig"
            );
            expect(uiLocation.location.CustomField).toHaveProperty("entry");
            expect(uiLocation.location.CustomField).toHaveProperty("stack");
            expect(uiLocation.location.CustomField).toHaveProperty("frame");
        });

        it("should accept return type as FIELD when not defined", () => {
            const uiLocation = new UiLocation({
                ...initData,
                type: "",
            } as any);
            expect(uiLocation.location.CustomField).toBeDefined();
            expect(uiLocation.location.CustomField).toHaveProperty("field");
            expect(uiLocation.location.CustomField).toHaveProperty(
                "fieldConfig"
            );
            expect(uiLocation.location.CustomField).toHaveProperty("entry");
            expect(uiLocation.location.CustomField).toHaveProperty("stack");
            expect(uiLocation.location.CustomField).toHaveProperty("frame");
        });
    });
});
