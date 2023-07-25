import postRobot from "post-robot";

import Extension from "../src/extension";
import {
    IAppConfigInitData,
    IAssetSidebarInitData,
    IDashboardInitData,
    IFieldInitData,
    IFieldModifierLocationInitData,
    IFullPageLocationInitData,
    ISidebarInitData,
    LocationType,
    Manifest,
    Region,
} from "../src/types";
import { mockedSendToParent } from "./helpers/mockSendToParent";
import { getMockManifestData } from "./data/mockmanifestData";
import { getMockStackData } from "./data/mockStackData";

jest.mock("post-robot");
jest.mock("wolfy87-eventemitter");
jest.mock("../src/fieldModifierLocation/field");
jest.mock("../src/field");

const initData: IAppConfigInitData = {
    type: LocationType.APP_CONFIG_WIDGET,
    app_id: "app_id",
    installation_uid: "installation_uid",
    extension_uid: "extension_uid",
    region: "NA",
    stack: getMockStackData(),
    user: {} as any,
    currentBranch: "currentBranch",
    manifest: getMockManifestData(),
};

const initDataJsonRte = {
    type: "RTE",
    region: "NA",
    stack: getMockStackData(),
    user: {},
};

describe("Extension", () => {
    let postRobotOnMock;

    beforeEach(() => {
        postRobotOnMock = jest.fn();
        (postRobot as any).on.mockImplementation(postRobotOnMock);
        (postRobot as any).sendToParent.mockImplementation(mockedSendToParent);
    });

    afterEach(() => {
        postRobotOnMock.mockClear();
        mockedSendToParent.mockClear();

        jest.clearAllMocks();
        window["postRobot"] = undefined;
        window["iframeRef"] = undefined;
    });

    describe("Properties in the window object", () => {
        it("should have postRobot property", () => {
            expect(window["postRobot"]).toBeUndefined();
            new Extension(initData);
            expect(window["postRobot"]).toBeDefined();

            Object.prototype.hasOwnProperty.call(
                window["postRobot"],
                "sendToParent"
            );
        });
    });

    it("should have modal property", () => {
        const extension = new Extension(initData);
        expect(extension.modal).toBeDefined();
    });

    describe("pulse", () => {
        it("should have pulse method", () => {
            const extension = new Extension(initData);
            expect(extension.getAppVersion).toBeDefined();
        });

        it("should invoke post robot method with type analytics", () => {
            const extension = new Extension(initData);
            const eventName = "Sample Event";
            const metadata = { foo: "bar" };
            extension.pulse(eventName, metadata);
            expect((postRobot as any).sendToParent).toHaveBeenCalledWith(
                "analytics",
                {
                    eventName,
                    metadata,
                }
            );
        });
    });

    describe("getConfig", () => {
        it("should return config if no installation uid present", async () => {
            const extension = new Extension(initDataJsonRte as any);
            const config = await extension.getConfig();
            expect(config).toEqual({});
        });

        it("should return config for extension if present", async () => {
            const extensionConfig = { foo: "bar" };
            const extension = new Extension({
                ...initDataJsonRte,
                config: extensionConfig,
            } as any);
            const config = await extension.getConfig();
            expect(config).toEqual(extensionConfig);
        });

        it("should fetch and return config if installation uid present", async () => {
            const extension = new Extension(initData);
            const config = await extension.getConfig();
            expect(config).toEqual({});
            expect(mockedSendToParent).toHaveBeenLastCalledWith("getConfig");
        });
    });

    describe("getCurrentLocation", () => {
        it("should have getCurrentLocation method", () => {
            const extension = new Extension(initData);
            expect(extension.getCurrentLocation).toBeDefined();
        });

        it("should return type of location", () => {
            const extension = new Extension(initData);
            const locationType = extension.getCurrentLocation();
            expect(locationType).toEqual(initData.type);
        });
    });

    describe("getAppVersion", () => {
        it("should have getAppVersion method", () => {
            const extension = new Extension(initData);
            expect(extension.getAppVersion).toBeDefined();
        });

        it("should return an app version when invoked", async () => {
            const extension = new Extension(initData);
            const version = await extension.getAppVersion();
            expect(version).toBe(5);
        });

        it("should return null when installation uid is not present", async () => {
            const extension = new Extension(initDataJsonRte as any);
            const version = await extension.getAppVersion();
            expect(version).toBe(null);
        });

        it("should fetch and return the app version using post robot when not available", async () => {
            const options = {
                uid: initData.installation_uid,
                action: "getAppManifest",
                headers: { organization_uid: getMockStackData().org_uid },
                skip_api_key: true,
            };

            const extension = new Extension({
                ...initData,
                manifest: undefined,
            });
            const version = await extension.getAppVersion();
            expect(mockedSendToParent).toBeCalledWith("stackQuery", options);
            expect(version).toBe(5);
        });
    });

    describe("getCurrentRegion", () => {
        it("should have getCurrentRegion method", () => {
            const extensionObj = new Extension(initData);
            expect(extensionObj.getCurrentLocation).toBeDefined();
        });

        it("should return a valid region", () => {
            const extensionObj = new Extension(initData);
            const region = extensionObj.getCurrentRegion();
            expect(region).toBe(Region.NA);
        });
    });

    describe("initialize", () => {
        it("should have static initialize method", () => {
            expect(Extension.initialize).toBeDefined();
        });

        it("should invoke post robot with init event", async () => {
            const meta = {
                sdkType: "app-sdk",
            };
            const version = "1";
            const initData = await Extension.initialize(version);
            expect(mockedSendToParent).toHaveBeenLastCalledWith("init", {
                version,
                meta,
            });
            expect(initData).toEqual({});
        });
    });

    describe("setReady", () => {
        it("should have getCurrentLocation method", () => {
            const extension = new Extension(initData);
            expect(extension.setReady).toBeDefined();
        });

        it("should invoke post robot with ready event", async () => {
            const extension = new Extension(initData);
            const result = await extension.setReady();
            expect(mockedSendToParent).toHaveBeenLastCalledWith("ready");
            expect(result).toEqual({ data: {} });
        });
    });

    describe("location", () => {
        it("should accept DASHBOARD as type of location", () => {
            const extension = new Extension({
                ...initData,
                type: "DASHBOARD",
                dashboard_width: "half_width",
            } as IDashboardInitData);
            expect(extension.location.DashboardWidget).toBeDefined();
            expect(extension.location.DashboardWidget).toHaveProperty("frame");
            expect(extension.location.DashboardWidget).toHaveProperty("stack");
        });

        it("should accept WIDGET as type of location", () => {
            const extension = new Extension({
                ...initData,
                type: "WIDGET",
            } as ISidebarInitData);
            expect(extension.location.SidebarWidget).toBeDefined();
            expect(extension.location.SidebarWidget).toHaveProperty("entry");
            expect(extension.location.SidebarWidget).toHaveProperty("stack");
        });

        it("should accept APP_CONFIG_WIDGET as type of location", () => {
            const extension = new Extension(initData);
            expect(extension.location.AppConfigWidget).toBeDefined();
            expect(extension.location.AppConfigWidget).toHaveProperty(
                "installation"
            );
            expect(extension.location.AppConfigWidget).toHaveProperty("stack");
        });

        it("should accept ASSET_SIDEBAR_WIDGET as type of location", () => {
            const extension = new Extension({
                ...initData,
                type: "ASSET_SIDEBAR_WIDGET",
            } as IAssetSidebarInitData);
            expect(extension.location.AssetSidebarWidget).toBeDefined();
        });

        it("should accept FIELD_MODIFIER_LOCATION as type of location", () => {
            const extension = new Extension({
                ...initData,
                type: "FIELD_MODIFIER_LOCATION",
            } as IFieldModifierLocationInitData);
            expect(extension.location.FieldModifierLocation).toBeDefined();
            expect(extension.location.FieldModifierLocation).toHaveProperty(
                "entry"
            );
            expect(extension.location.FieldModifierLocation).toHaveProperty(
                "stack"
            );
            expect(extension.location.FieldModifierLocation).toHaveProperty(
                "field"
            );
            expect(extension.location.FieldModifierLocation).toHaveProperty(
                "frame"
            );
        });

        it("should accept FULL_PAGE_LOCATION as type of location", () => {
            const extension = new Extension({
                ...initData,
                type: "FULL_PAGE_LOCATION",
            } as IFullPageLocationInitData);
            expect(extension.location.FullPage).toBeDefined();
            expect(extension.location.FullPage).toHaveProperty("stack");
        });

        it("should accept FIELD as type of location", () => {
            const extension = new Extension({
                ...initData,
                type: "FIELD",
            } as IFieldInitData);
            expect(extension.location.CustomField).toBeDefined();
            expect(extension.location.CustomField).toHaveProperty("field");
            expect(extension.location.CustomField).toHaveProperty(
                "fieldConfig"
            );
            expect(extension.location.CustomField).toHaveProperty("entry");
            expect(extension.location.CustomField).toHaveProperty("stack");
            expect(extension.location.CustomField).toHaveProperty("frame");
        });

        it("should accept return type as FIELD when not defined", () => {
            const extension = new Extension({
                ...initData,
                type: "",
            } as any);
            expect(extension.location.CustomField).toBeDefined();
            expect(extension.location.CustomField).toHaveProperty("field");
            expect(extension.location.CustomField).toHaveProperty(
                "fieldConfig"
            );
            expect(extension.location.CustomField).toHaveProperty("entry");
            expect(extension.location.CustomField).toHaveProperty("stack");
            expect(extension.location.CustomField).toHaveProperty("frame");
        });
    });
});
