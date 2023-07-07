import FieldModifierLocationFrame from "../../src/fieldModifierLocation/frame";
import { ERROR_MESSAGES } from "../../src/utils/errorMessages";
import testData from "../data/testData.json";

describe("FieldModifierLocationFrame", () => {
    let frameInstance: FieldModifierLocationFrame;
    let sendToParent: any;
    let connection: { sendToParent: (...props: any[]) => any };

    let emitter: any;

    beforeEach(() => {
        sendToParent = jest.fn();
        connection = { sendToParent };

        emitter = {
            on: (_event: any, cbf: (...props: any[]) => void) => {
                setTimeout(() => {
                    cbf({ data: { data: testData.entry, name: "entrySave" } });
                    cbf({ data: { data: {}, name: "entryPublish" } });
                    cbf({
                        data: { data: testData.entry, name: "entryChange" },
                    });
                }, 50);
            },
        };

        jest.spyOn(emitter, "on");
        frameInstance = new FieldModifierLocationFrame(connection, emitter);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe("updateDimension", () => {
        it("should calculate the dimension of the frame if not provided", async () => {
            await frameInstance.updateDimension();

            const { width, height } =
                document.documentElement.getBoundingClientRect();

            expect(sendToParent).toHaveBeenLastCalledWith("resize", {
                height,
                width,
            });
        });
        it("should update the height if the height is provided", async () => {
            await frameInstance.updateDimension({ height: 100 });

            expect(sendToParent).toHaveBeenLastCalledWith("resize", {
                height: 100,
            });
        });
        it("should update the width if the width is provided", () => {
            frameInstance.updateDimension({ width: 100 });

            expect(sendToParent).toHaveBeenLastCalledWith("resize", {
                width: 100,
            });
        });
        it("should not update the height if the value is same as previous", async () => {
            await frameInstance.updateDimension({ height: 100 });
            await frameInstance.updateDimension({ height: 100 });

            expect(sendToParent).toHaveBeenCalledTimes(1);
        });
        it("should not update the width if the value is same as previous", async () => {
            await frameInstance.updateDimension({ width: 100 });
            await frameInstance.updateDimension({ width: 100 });

            expect(sendToParent).toHaveBeenCalledTimes(1);
        });
        it("should throw an error if the height if the value is not a number", async () => {
            await expect(
                // @ts-ignore
                frameInstance.updateDimension({ height: "100" })
            ).rejects.toThrowError(
                ERROR_MESSAGES.entryField.frame.dimensionHeightShouldBeNumber
            );
        });

        it("should not update the width if the value is not a number", async () => {
            await expect(
                // @ts-ignore
                frameInstance.updateDimension({ width: "100" })
            ).rejects.toThrowError(
                ERROR_MESSAGES.entryField.frame.dimensionWidthShouldBeNumber
            );
        });
    });

    describe("enableAutoResizing", () => {
        it("should run autoResizing when setup is called", () => {
            const existingMutationObserver = window.MutationObserver;

            const mutationObserverMock = jest.fn(function MutationObserver(
                callback
            ) {
                this.observe = jest.fn();
                this.disconnect = jest.fn();
                // Optionally add a trigger() method to manually trigger a change
                this.trigger = (mockedMutationsList) => {
                    callback(mockedMutationsList, this);
                };
            });

            //@ts-ignore
            global.MutationObserver = mutationObserverMock;

            frameInstance = new FieldModifierLocationFrame(connection, emitter);

            const [observerInstance] = <void[] | [{ trigger: () => {} }]>(
                mutationObserverMock.mock.instances
            );

            observerInstance?.trigger();

            const { width, height } =
                document.documentElement.getBoundingClientRect();

            expect(sendToParent).toHaveBeenLastCalledWith("resize", {
                height,
                width,
            });

            expect(sendToParent).toHaveBeenCalledTimes(1);

            frameInstance.enableAutoResizing();

            window.MutationObserver = existingMutationObserver;
        });
    });

    describe("disableAutoResizing", () => {
        it("should remove the listener", () => {
            const existingMutationObserver = window.MutationObserver;

            const mutationObserverMock = jest.fn(function MutationObserver(
                callback
            ) {
                this.observe = jest.fn();
                this.disconnect = jest.fn();
                // Optionally add a trigger() method to manually trigger a change
                this.trigger = (mockedMutationsList) => {
                    callback(mockedMutationsList, this);
                };
            });

            //@ts-ignore
            global.MutationObserver = mutationObserverMock;

            frameInstance = new FieldModifierLocationFrame(connection, emitter);

            frameInstance.disableAutoResizing();

            sendToParent.mockClear();

            const [observerInstance] = <void[] | [{ trigger: () => {} }]>(
                mutationObserverMock.mock.instances
            );

            observerInstance?.trigger();

            const { width, height } =
                document.documentElement.getBoundingClientRect();

            expect(sendToParent).toHaveBeenLastCalledWith("resize", {
                height,
                width,
            });

            expect(sendToParent).toHaveBeenCalledTimes(1);

            frameInstance.disableAutoResizing();

            window.MutationObserver = existingMutationObserver;
        });
    });

    describe("closeModal", () => {
        it("should close the modal", () => {
            frameInstance.closeModal();

            expect(sendToParent).toHaveBeenLastCalledWith("closeModal");
        });
    });

    describe("preventFrameClose", () => {
        it("should not allow user to close frame by clicking background", async () => {
            await frameInstance.preventFrameClose(true);
            expect(sendToParent).toHaveBeenCalledTimes(1);
            expect(sendToParent).toHaveBeenLastCalledWith("preventFrameClose", {
                state: true,
            });
        });

        it("should allow user to close frame by clicking background", async () => {
            await frameInstance.preventFrameClose(false);
            expect(sendToParent).toHaveBeenCalledTimes(1);
            expect(sendToParent).toHaveBeenLastCalledWith("preventFrameClose", {
                state: false,
            });
        });
    });
});
