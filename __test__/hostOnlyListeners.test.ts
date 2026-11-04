import postRobot from "post-robot";

import Asset from "../src/stack/api/asset";
import { IAppConfigInitData, LocationType } from "../src/types";
import UiLocation from "../src/uiLocation";

jest.mock("post-robot");

// MKT-22128: the host (app-extension-component) sends extensionEvent and
// uploadReady_<uid> from the window that holds the app iframe, i.e.
// window.parent. A listener without a window filter also accepts the same
// messages from sibling app frames, so both must be scoped to window.parent.
describe("host-only post-robot listeners (MKT-22128)", () => {
    // jsdom's window.parent is window itself; a distinct parent proves the
    // listener is bound to the parent and not to the app's own window.
    const fakeParent = {} as Window;

    beforeEach(() => {
        jest.spyOn(window, "parent", "get").mockReturnValue(fakeParent);
        (postRobot as any).on.mockReturnValue({ cancel: jest.fn() });
        (postRobot as any).sendToParent.mockResolvedValue({ data: {} });
    });

    afterEach(() => {
        jest.restoreAllMocks();
        jest.clearAllMocks();
        window["postRobot"] = undefined;
    });

    it("listens for extensionEvent from window.parent only", () => {
        new UiLocation({
            type: LocationType.APP_CONFIG_WIDGET,
            app_id: "app_id",
            installation_uid: "installation_uid",
            extension_uid: "extension_uid",
            region: "NA",
            endpoints: { CMA: "", APP: "", DEVELOPER_HUB: "" },
            stack: {} as any,
            user: {} as any,
            currentBranch: "main",
            manifest: {} as any,
        } as IAppConfigInitData);

        const call = (postRobot as any).on.mock.calls.find(
            ([name]) => name === "extensionEvent"
        );
        expect(call).toBeDefined();
        // compare by identity: printing a Window on failure exhausts memory
        expect(call[1]?.window === fakeParent).toBe(true);
        expect(typeof call[2]).toBe("function");
    });

    it("listens for uploadReady from window.parent only", async () => {
        await Asset({}).uploadAsset([new Blob(["x"])]);

        const call = (postRobot as any).on.mock.calls.find(([name]) =>
            String(name).startsWith("uploadReady_")
        );
        expect(call).toBeDefined();
        expect(call[1]?.window === fakeParent).toBe(true);
        expect(typeof call[2]).toBe("function");
    });
});
