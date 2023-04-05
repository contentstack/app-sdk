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

        it("should add body to iframeRef if the user has not provided one", () => {
            new Extension(initData);
            expect(window["iframeRef"]).toBeDefined();
            expect(window["iframeRef"].tagName).toBe("BODY");
        });

        it("should not add body to iframeRef if the user has provided one", () => {
            const div = document.createElement("div");
            const innerText = "Hello world";
            div.innerText = innerText;
            window["iframeRef"] = div;

            new Extension(initData);
            const iframeRef = window["iframeRef"];

            expect(iframeRef).toBeDefined();
            expect(iframeRef.tagName).toBe("DIV");

            expect(iframeRef.innerText).toBe(innerText);
        });
    });
});
