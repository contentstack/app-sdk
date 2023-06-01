import postRobot from "post-robot";

import Extension from "../src/extension";
import { IAppConfigInitData, Region } from "../src/types";

jest.mock("post-robot", () => ({
    __esModule: true,
    default: {
        on: jest.fn(),
        sendToParent: jest
            .fn()
            .mockReturnValue(Promise.resolve({ data: { version: 90 } })),
    },
}));

const manifest = {
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

const initData: IAppConfigInitData = {
    data: {
        type: "APP_CONFIG_WIDGET",
        app_id: "app_id",
        installation_uid: "installation_uid",
        extension_uid: "extension_uid",
        region: "NA",
        stack: {
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
        },
        user: {},
        currentBranch: "currentBranch",
        manifest: manifest,
    },
};

const initDataWithoutManifest: IAppConfigInitData = {
    data: {
        type: "APP_CONFIG_WIDGET",
        app_id: "app_id",
        installation_uid: "installation_uid",
        extension_uid: "extension_uid",
        region: "NA",
        stack: {
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
        },
        user: {},
        currentBranch: "currentBranch",
    },
};

const initDataJsonRte = {
    data: {
        type: "RTE",
        region: "NA",
        stack: {
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
        },
        user: {},
    },
};

describe("Extension", () => {
    afterEach(() => {
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

    it("pulse should invoke post robot method with type analytics", () => {
        const extensionObj = new Extension(initData);
        const eventName = "Sample Event";
        const metadata = { foo: "bar" };
        extensionObj.pulse(eventName, metadata);
        expect((postRobot as any).sendToParent).toHaveBeenCalledWith(
            "analytics",
            {
                eventName,
                metadata,
            }
        );
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

    describe("getAppVersion", () => {
        it("should have getAppVersion method", () => {
            const extensionObj = new Extension(initData);
            expect(extensionObj.getAppVersion).toBeDefined();
        });

        it("should return a app version", async () => {
            const extensionObj = new Extension(initData);
            const version = await extensionObj.getAppVersion();
            expect(version).toBe(5);
        });

        it("should return null for data without installation uid & manifest, this case is for jsonRte", async () => {
            const extensionObj = new Extension(initDataJsonRte as any);
            const version = await extensionObj.getAppVersion();
            expect(version).toBe(null);
        });

        it("should execute the function without errors which calls postRobo init, this case is for customField where we dont get the manifest", async () => {
            const extensionObj = new Extension(initDataWithoutManifest);
            const version = await extensionObj.getAppVersion();
            expect(version).toBe(90);
        });
    });
});
