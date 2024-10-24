import EventEmitter from "wolfy87-eventemitter";
import { IContentTypeSidebarInitData } from "./types";
import postRobot from "post-robot";
import { ContentType } from "./types/stack.types";
import { GenericObjectType } from "./types/common.types";

/** Class representing a Content type Sidebar UI Location from Contentstack UI.  */

class ContentTypeSidebarWidget {
    /**
     * @hideconstructor
     */

    currentContentType: ContentType;
    _emitter: EventEmitter;
    _connection: typeof postRobot;
    _changedData?: GenericObjectType;

    constructor(
        initializationData: IContentTypeSidebarInitData,
        connection: typeof postRobot,
        emitter: EventEmitter
    ) {
        this.currentContentType = initializationData.currentContentType;

        this._emitter = emitter;

        this._connection = connection;

        const thisContentType = this;

        this._emitter.on("contentTypeSave", (event: { data: ContentType }) => {
            thisContentType.currentContentType = event.data;
        });

        this.getData = this.getData.bind(this);
        this.onSave = this.onSave.bind(this);
    }

    /**
     * Get the current content type data.
     * @returns {ContentTypeData} The current content type data.
     */
    getData(): ContentType {
        return this.currentContentType;
    }

    /**
     * Executes the provided callback function every time a content type is saved.
     * @param {function} callback - The function to be called when a content type is saved.
     * @param {ContentType} arg0 - The content type data passed as an argument to the callback function when a content type is saved.
     */
    onSave(callback: (arg0: ContentType) => void) {
        const contentTypeObj = this;
        if (callback && typeof callback === "function") {
            contentTypeObj._emitter.on(
                "contentTypeSave",
                (event: { data: any }) => {
                    callback(event.data);
                }
            );
            this._emitter.emitEvent("_eventRegistration", [
                { name: "contentTypeSave" },
            ]);
        } else {
            throw Error("Callback must be a function");
        }
    }
}

export default ContentTypeSidebarWidget;
