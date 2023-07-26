import EventEmitter from "wolfy87-eventemitter";
import postRobot from "post-robot";
import Field from "./field";
import { IFieldInitData, IFieldModifierLocationInitData, ISidebarInitData } from "./types";
import { Entry as EntryType } from "../src/types/entry.types";
import { IEntryOptions, IGetFieldOptions, IOnEntryChangeCallback } from "./types/entry.types";
import { ContentType, PublishDetails } from "./types/stack.types";
import { GenericObjectType } from "./types/common.types";
/** Class representing an entry from Contentstack UI. Not available for Dashboard UI Location.  */
declare class Entry {
    /**
     * @hideconstructor
     */
    content_type: ContentType;
    _data: EntryType;
    locale: string;
    _connection: typeof postRobot;
    _emitter: EventEmitter;
    _changedData?: GenericObjectType;
    _options: IEntryOptions;
    constructor(initializationData: IFieldInitData | ISidebarInitData | IFieldModifierLocationInitData, connection: typeof postRobot, emitter: EventEmitter, options?: IEntryOptions);
    /**
     * Gets data of the current entry.
     * @return {Object} Returns entry data.
     */
    getData(): EntryType;
    /**
     * Gets the field object for the saved data, which allows you to interact with the field.
     * This object will have all the same methods and properties of appSDK.location.CustomField.field.
     * Note: For fields initialized using the getFields function, the setData function currently works only for the following fields: as single_line, multi_line, RTE, markdown, select, number, boolean, date, link, and Custom Field UI Location of data type text, number, boolean, and date.
     * @example
     * var field = entry.getField('field_uid');
     * var fieldSchema = field.schema;
     * var fieldUid = field.uid;
     * var fieldData = field.getData();
     * @param {string} uid Unique ID of the field
     * @param {boolean} options.useUnsavedSchema If set to true, the field will get the unsaved field
     * @return {Object} Field object
     */
    getField(uid: string, options?: IGetFieldOptions): Field;
    /**
     * This function executes the callback function every time an entry is saved.
     * @param {function} callback The function to be called when an entry is saved.
     */
    onSave(callback: (arg0: EntryType) => void): void;
    /**
     * The onChange() function executes the provided callback function whenever an entry is updated.
     * @param {function} callback - The function to be called when the entry is edited or changed.
     */
    onChange(callback: IOnEntryChangeCallback): void;
    /**
     * The onPublish() function executes the callback function every time an entry has been published with the respective payload.
     * @param {function} callback The function to be called when an entry is published.
     */
    onPublish(callback: (arg0: PublishDetails) => void): void;
    /**
     * The onUnPublish() function executes the callback function every time an entry has been unpublished with the respective payload.
     * @param {function} callback The function to be called when an entry is un published.
     */
    onUnPublish(callback: (arg0: PublishDetails) => void): void;
}
export default Entry;
//# sourceMappingURL=entry.d.ts.map