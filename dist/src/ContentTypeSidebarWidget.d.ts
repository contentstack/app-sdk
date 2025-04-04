import EventEmitter from "wolfy87-eventemitter";
import postRobot from "post-robot";
import { IContentTypeSidebarInitData } from "./types";
import { ContentType } from "./types/stack.types";
import { GenericObjectType } from "./types/common.types";
/** Class representing a Content type Sidebar UI Location from Contentstack UI.  */
declare class ContentTypeSidebarWidget {
    /**
     * @hideconstructor
     */
    currentContentType: ContentType;
    _emitter: EventEmitter;
    _connection: typeof postRobot;
    _changedData?: GenericObjectType;
    constructor(initializationData: IContentTypeSidebarInitData, connection: typeof postRobot, emitter: EventEmitter);
    /**
     * Get the current content type data.
     * @returns {ContentTypeData} The current content type data.
     */
    getData(): ContentType;
    /**
     * Executes the provided callback function every time a content type is saved.
     * @param {function} callback - The function to be called when a content type is saved.
     * @param {ContentType} arg0 - The content type data passed as an argument to the callback function when a content type is saved.
     */
    onSave(callback: (arg0: ContentType) => void): void;
}
export default ContentTypeSidebarWidget;
//# sourceMappingURL=ContentTypeSidebarWidget.d.ts.map