import EventEmitter from "wolfy87-eventemitter";
import Window from "../src/window";

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
        windowObj.enableResizing().then(() => {
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

    // it("enableAutoResizing", (done) => {
    //     const btn = document.createElement("BUTTON"); // Create a <button> element
    //     const text = document.createTextNode("Sample Button");
    //     btn.appendChild(text);
    //     console.error("hahahaha", document);

    //     const beforeHeight = Math.ceil(
    //         document.documentElement.getBoundingClientRect().height
    //     );
    //     expect(windowObj._autoResizingEnabled).toEqual(false);
    //     windowObj.enableAutoResizing();
    //     window.document.body.appendChild(btn); // append element to mutate height
    //     expect(windowObj._autoResizingEnabled).toEqual(true);
    //     windowObj.enableAutoResizing(); // called twice to check if observer is not called twice
    //     expect(windowObj._autoResizingEnabled).toEqual(true);
    //     setTimeout(() => {
    //         expect(beforeHeight).not.toEqual(
    //             document.documentElement.getBoundingClientRect().height
    //         );
    //         expect(connection.sendToParent).toHaveBeenCalledTimes(1); // must be called just once, only one observer must be set
    //         expect(connection.sendToParent).toHaveBeenCalledWith(
    //             "resize",
    //             Math.ceil(
    //                 document.documentElement.getBoundingClientRect().height
    //             )
    //         );
    //         window.document.body.removeChild(btn);
    //         done();
    //     }, 100);
    // });

    // it("disableAutoResizing", (done) => {
    //     const btn = document.createElement("BUTTON"); // Create a <button> element
    //     const text = document.createTextNode("Sample Button");
    //     btn.appendChild(text);
    //     const beforeHeight = Math.ceil(
    //         document.documentElement.getBoundingClientRect().height
    //     );
    //     windowObj.enableAutoResizing();
    //     expect(windowObj._autoResizingEnabled).toEqual(true);
    //     windowObj.disableAutoResizing();
    //     window.document.body.appendChild(btn);
    //     expect(windowObj._autoResizingEnabled).toEqual(false);
    //     windowObj.disableAutoResizing(); // called twice to check if observer is not disconnected twice
    //     window.document.body.appendChild(window.document.createElement("p")); // append element to mutate height
    //     setTimeout(() => {
    //         expect(beforeHeight).not.toEqual(
    //             document.documentElement.getBoundingClientRect().height
    //         );
    //         expect(connection.sendToParent).toHaveBeenCalledTimes(0); // must be fired 0 times, since observer was disconnected
    //         window.document.body.removeChild(btn);
    //         done();
    //     }, 300);
    // });

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
});
