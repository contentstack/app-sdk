import EventEmitter from "wolfy87-eventemitter";

import ContentTypeSidebarWidget from "../src/ContentTypeSidebarWidget";

// Spec: wiki developer-hub/04-platform-contracts/app-sdk-reference.md
// (ContentTypeSidebarWidget: currentContentType, getData, onSave) and the
// published JSDoc: getData "Get the current content type data"; onSave
// "Executes the provided callback function every time a content type is saved".
describe("ContentTypeSidebarWidget", () => {
    const initial = { uid: "blog", title: "Blog" } as any;
    let emitter: EventEmitter;
    let widget: ContentTypeSidebarWidget;

    beforeEach(() => {
        emitter = new EventEmitter();
        widget = new ContentTypeSidebarWidget(
            { currentContentType: initial } as any,
            {} as any,
            emitter
        );
    });

    it("getData returns the content type the host sent at init", () => {
        expect(widget.getData()).toEqual({ uid: "blog", title: "Blog" });
        expect(widget.currentContentType).toEqual(initial);
    });

    it("getData returns the saved content type after a save", () => {
        const saved = { uid: "blog", title: "Blog v2" };
        emitter.emitEvent("contentTypeSave", [{ data: saved }]);
        expect(widget.getData()).toEqual(saved);
    });

    it("onSave runs the callback on every save with the saved content type", () => {
        const callback = jest.fn();
        widget.onSave(callback);

        emitter.emitEvent("contentTypeSave", [{ data: { uid: "a" } }]);
        emitter.emitEvent("contentTypeSave", [{ data: { uid: "b" } }]);

        expect(callback).toHaveBeenCalledTimes(2);
        expect(callback).toHaveBeenNthCalledWith(1, { uid: "a" });
        expect(callback).toHaveBeenNthCalledWith(2, { uid: "b" });
    });
});
