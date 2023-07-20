import EventEmitter from "wolfy87-eventemitter";
import Window from "../src/window";
import postRobot from "post-robot";

jest.mock("post-robot", () => ({
    __esModule: true,
    default: {
        on: jest.fn(),
        sendToParent: jest.fn().mockReturnValue(Promise.resolve()),
    },
}));

describe("Window", () => {
    let windowObj: Window;
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

        connection = { sendToParent: sendToParent };
        jest.spyOn(connection, "sendToParent");
        windowObj = new Window(connection, "FIELD", emitter);
    });

    it("enableResizing", (done) => {
        windowObj.type = "DASHBOARD";
        windowObj?.enableResizing().then(() => {
            expect(connection.sendToParent).toHaveBeenCalledWith("window", {
                action: "enableResizing",
            }); // since previous height was same
            done();
        });
    });

    it("enableResizing called on field extension", (done) => {
        windowObj.type = "FIELD";
        windowObj.enableResizing().then(() => {
            expect(connection.sendToParent).toHaveBeenCalledTimes(0); // since previous height was same
            done();
        });
    });

    it("updateHeight with params", (done) => {
        windowObj.updateHeight(55).then(() => {
            expect(connection.sendToParent).toHaveBeenCalledWith("resize", 55);
            done();
        });
    });

    it("updateHeight for dashboard in half width", (done) => {
        windowObj.type = "DASHBOARD";
        windowObj.state = "half_width";
        windowObj.updateHeight(55).then(() => {
            expect(connection.sendToParent).toHaveBeenCalledTimes(0);
            done();
        });
    });

    it("updateHeight with same previous height", (done) => {
        windowObj._height = 100;
        windowObj.updateHeight(100).then(() => {
            expect(connection.sendToParent).toHaveBeenCalledTimes(0); // since previous height was same
            done();
        });
    });

    it("updateHeight without params", (done) => {
        windowObj.updateHeight().then(() => {
            expect(connection.sendToParent).toHaveBeenCalledWith(
                "resize",
                Math.ceil(
                    document.documentElement.getBoundingClientRect().height
                )
            );
            done();
        });
    });

    it("onDashboardResize Callback must be a function", function () {
        windowObj.type = "DASHBOARD";
        //@ts-ignore
        expect(() => windowObj.onDashboardResize()).toThrow(
            "Callback must be a function"
        );
    });

    it("onDashboardResize for field extension", function () {
        windowObj.type = "FIELD";
        //@ts-ignore
        expect(windowObj.onDashboardResize()).toEqual(false);
    });

    it("onDashboardResize", function (done) {
        windowObj.type = "DASHBOARD";
        expect(windowObj.state).toEqual("half_width");
        windowObj.onDashboardResize(function () {
            expect(emitter.on).toHaveBeenCalledWith(
                "dashboardResize",
                expect.any(Function)
            );
            expect(emitter.on).toHaveBeenCalledTimes(1);
            expect(windowObj.state).toEqual("full_width");
            done();
        });
    });

    it("should send dashboardEnableTopPadding on enablePaddingTop", (done) => {
        windowObj.type = "DASHBOARD";
        windowObj.enablePaddingTop().then(() => {
            expect((postRobot as any).sendToParent).toHaveBeenCalledWith(
                "window",
                {
                    action: "dashboardEnableTopPadding",
                }
            );
            done();
        });
    });

    it("should send dashboardDisableTopPadding on disablePaddingTop", (done) => {
        windowObj.type = "DASHBOARD";
        windowObj.disablePaddingTop().then(() => {
            expect((postRobot as any).sendToParent).toHaveBeenCalledWith(
                "window",
                {
                    action: "dashboardDisableTopPadding",
                }
            );
            done();
        });
    });
});
