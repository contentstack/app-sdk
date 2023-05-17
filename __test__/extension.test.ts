import postRobot from "post-robot";

import Extension from "../src/extension";
import { IAppConfigInitData, LocationType, Region } from "../src/types";

jest.mock("post-robot", () => ({
    sendToParent: jest.fn(),
    on: jest.fn(),
}));

const initData: IAppConfigInitData = {
    type: LocationType.APP_CONFIG_WIDGET,
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
    user: {} as any,
    currentBranch: "currentBranch",
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
});
