import Extension from "../src/extension";
import { IAppConfigInitData } from "../src/types";

jest.mock("post-robot", () => ({
    sendToParent: jest.fn(),
    on: jest.fn(),
}));

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
    },
};

describe("Main extension", () => {
    afterEach(() => {
        window["postRobot"] = undefined;
        window["iframeRef"] = undefined;
    });

    it("should have modal property", () => {
        const extension = new Extension(initData);
        expect(extension.modal).toBeDefined();
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
});
