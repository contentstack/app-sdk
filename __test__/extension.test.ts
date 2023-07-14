import postRobot from "post-robot";

import Extension from "../src/extension";
import {
    IAppConfigInitData,
    IAssetSidebarInitData,
    IDashboardInitData,
    IEntryFieldLocationInitData,
    IFieldInitData,
    IFieldModifierLocationInitData,
    IFullPageLocationInitData,
    ISidebarInitData,
    Region,
} from "../src/types";

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
    data: {
        type: "APP_CONFIG_WIDGET",
        app_id: "app_id",
        installation_uid: "installation_uid",
        extension_uid: "extension_uid",
        region: "NA",
        stack: mockStackData,
        user: {},
        currentBranch: "currentBranch",
        manifest: mockManifestData,
    },
};

const initDataJsonRte = {
    data: {
        type: "RTE",
        region: "NA",
        stack: mockStackData,
        user: {},
    },
};

describe("Extension", () => {
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
                data: { ...initDataJsonRte.data, config: extensionConfig },
            } as any);
            const config = await extension.getConfig();
            expect(config).toEqual(extensionConfig);
        });

        it("should fetch and return config if installation uid present", async () => {
            const extension = new Extension(initData);
            const config = await extension.getConfig();
            expect(config).toEqual({});
            expect(postRobotSendToParentMock).toHaveBeenLastCalledWith(
                "getConfig"
            );
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
            expect(locationType).toEqual(initData.data.type);
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
            const mockSendToParent = jest
                .fn()
                .mockResolvedValueOnce({ data: { ...mockManifestData } });
            (postRobot as any).sendToParent = mockSendToParent;

            const options = {
                uid: initData.data.installation_uid,
                action: "getAppManifest",
                headers: { organization_uid: mockStackData.org_uid },
                skip_api_key: true,
            };

            const extension = new Extension({
                data: { ...initData.data, manifest: undefined },
            });
            const version = await extension.getAppVersion();
            expect(mockSendToParent).toBeCalledWith("stackQuery", options);
            expect(version).toBe(5);
        });
    });

    describe("getCurrentRegion", () => {
        it("should have getCurrentRegion method", () => {
            const extension = new Extension(initData);
            expect(extension.getCurrentLocation).toBeDefined();
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
            expect(postRobotSendToParentMock).toHaveBeenLastCalledWith("init", {
                version,
                meta,
            });
            expect(initData).toEqual({ data: {} });
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
            expect(postRobotSendToParentMock).toHaveBeenLastCalledWith("ready");
            expect(result).toEqual({ data: {} });
        });
    });

    describe("location", () => {
        it("should accept DASHBOARD as type of location", () => {
            const extension = new Extension({
                data: {
                    ...initData.data,
                    type: "DASHBOARD",
                    dashboard_width: "half_width",
                },
            } as IDashboardInitData);
            expect(extension.location.DashboardWidget).toBeDefined();
            expect(extension.location.DashboardWidget).toHaveProperty("frame");
            expect(extension.location.DashboardWidget).toHaveProperty("stack");
        });

        it("should accept WIDGET as type of location", () => {
            const extension = new Extension({
                data: {
                    ...initData.data,
                    type: "WIDGET",
                },
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
                data: {
                    ...initData.data,
                    type: "ASSET_SIDEBAR_WIDGET",
                },
            } as IAssetSidebarInitData);
            expect(extension.location.AssetSidebarWidget).toBeDefined();
        });

        it("should accept FIELD_MODIFIER_LOCATION as type of location", () => {
            const extension = new Extension({
                data: {
                    ...initData.data,
                    type: "FIELD_MODIFIER_LOCATION",
                },
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

        it("should accept ENTRY_FIELD_LOCATION as type of location", () => {
            const extension = new Extension({
                data: {
                    ...initData.data,
                    type: "ENTRY_FIELD_LOCATION",
                },
            } as IEntryFieldLocationInitData);
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
                data: {
                    ...initData.data,
                    type: "FULL_PAGE_LOCATION",
                },
            } as IFullPageLocationInitData);
            expect(extension.location.FullPage).toBeDefined();
            expect(extension.location.FullPage).toHaveProperty("stack");
        });

        it("should accept FIELD as type of location", () => {
            const extension = new Extension({
                data: {
                    ...initData.data,
                    type: "FIELD",
                },
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
                data: {
                    ...initData.data,
                    type: "",
                },
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
