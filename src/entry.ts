import EventEmitter from "wolfy87-eventemitter";
import postRobot from "post-robot";

import Field from "./field";
import {
    IFieldInitData,
    IFieldModifierLocationInitData,
    ISidebarInitData,
} from "./types";
import { Entry as EntryType } from "../src/types/entry.types";
import {
    IEntryOptions,
    IGetFieldOptions,
    IOnEntryChangeCallback,
} from "./types/entry.types";
import { ContentType, PublishDetails, Schema } from "./types/stack.types";
import { GenericObjectType } from "./types/common.types";

/** Class representing an entry from Contentstack UI. Not available for Dashboard UI Location.  */

class Entry {
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

    constructor(
        initializationData:
            | IFieldInitData
            | ISidebarInitData
            | IFieldModifierLocationInitData,
        connection: typeof postRobot,
        emitter: EventEmitter,
        options?: IEntryOptions
    ) {
        /**
         * Gets the content type of the current entry.
         * @type {Object}
         */
        this.content_type = initializationData.content_type;

        this._data = initializationData.entry;

        if (
            (initializationData as IFieldModifierLocationInitData).changedData
        ) {
            this._changedData = (
                initializationData as IFieldModifierLocationInitData
            ).changedData;
        }

        /**
         * Gets the locale of the current entry.
         * @type {string}
         */
        this.locale = initializationData.locale;

        this._connection = connection;

        this._emitter = emitter;

        this._options = options || {};

        const thisEntry = this;

        this._emitter.on("entrySave", (event: { data: EntryType }) => {
            thisEntry._data = event.data;
        });

        this._emitter.on("entryChange", (event: { data: EntryType }) => {
            thisEntry._changedData = event.data;
        });
    }

    /**
     * Gets data of the current entry.
     * @return {Object} Returns entry data.
     */

    getData() {
        return this._data;
    }

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

    getField(uid: string, options?: IGetFieldOptions): Field {
        const { useUnsavedSchema = false } = options || {};
        const { FieldInstance = Field } = this._options._internalFlags || {};

        const path = uid.split(".");
        let value = useUnsavedSchema
            ? this._changedData || this._data
            : this._data;
        let schema: Schema[0] = this.content_type.schema;

        const isDataEmpty = Object.keys(value).length === 0;

        if (isDataEmpty) {
            throw new Error(
                "The data is unsaved. Save the data before requesting the field."
            );
        }

        try {
            let skipNext = false;
            let skipNextTwo = false;
            path.forEach((key: string | number, index: number) => {
                if (skipNext) {
                    if (skipNextTwo) {
                        skipNextTwo = false;
                    } else {
                        skipNext = false;
                    }
                    return;
                }

                schema = schema.find((x: { uid: any }) => x.uid === key);
                if (!schema) {
                    throw Error("schema not found");
                }

                value = value[key];

                if (
                    (schema.data_type === "group" ||
                        schema.data_type === "global_field") &&
                    schema.multiple === false &&
                    path.length !== index + 1
                ) {
                    schema = schema.schema;
                } else if (
                    (schema.data_type === "group" ||
                        schema.data_type === "global_field") &&
                    schema.multiple === true &&
                    path.length !== index + 1
                ) {
                    schema = schema.schema;
                    value = value[path[index + 1]];
                    skipNext = true;
                } else if (
                    schema.data_type === "blocks" &&
                    path.length !== index + 1
                ) {
                    const blockId = Object.keys(value[path[index + 1]])[0];
                    schema = schema.blocks.find(
                        (block: { uid: string }) => block.uid === blockId
                    );
                    if (path.length === index + 2) {
                        // complete block value with uid
                        value = value[path[index + 1]];
                    } else {
                        // block value without uid
                        value = value[path[index + 1]][blockId];
                        schema = schema.schema;
                    }

                    skipNext = true;
                    skipNextTwo = true;
                }
            });
        } catch (e) {
            throw Error("Invalid uid, Field not found");
        }
        const fieldInitializationDataObject = {
            uid,
            value,
            schema,
            data_type: schema.data_type,
        };

        //@ts-ignore
        const fieldObject = new FieldInstance(
            fieldInitializationDataObject,
            this._connection,
            this._emitter
        );
        delete fieldObject.onChange;
        return fieldObject;
    }

    /**
     * This function executes the callback function every time an entry is saved.
     * @param {function} callback The function to be called when an entry is saved.
     */

    onSave(callback: (arg0: EntryType) => void) {
        const entryObj = this;
        if (callback && typeof callback === "function") {
            entryObj._emitter.on("entrySave", (event: { data: EntryType }) => {
                callback(event.data);
            });
        } else {
            throw Error("Callback must be a function");
        }
    }

    /**
     * The onChange() function executes the provided callback function whenever an entry is updated.
     * @param {function} callback - The function to be called when the entry is edited or changed.
     */

    onChange(callback: IOnEntryChangeCallback) {
        const entryObj = this;
        if (callback && typeof callback === "function") {
            entryObj._emitter.on(
                "entryChange",
                (event: {
                    data: EntryType;
                    resolvedData: GenericObjectType;
                }) => {
                    callback(event.data, event.resolvedData);
                }
            );
        } else {
            throw Error("Callback must be a function");
        }
    }

    /**
     * The onPublish() function executes the callback function every time an entry has been published with the respective payload.
     * @param {function} callback The function to be called when an entry is published.
     */

    onPublish(callback: (arg0: PublishDetails) => void) {
        const entryObj = this;
        if (callback && typeof callback === "function") {
            entryObj._emitter.on(
                "entryPublish",
                (event: { data: PublishDetails }) => {
                    callback(event.data);
                }
            );
        } else {
            throw Error("Callback must be a function");
        }
    }

    /**
     * The onUnPublish() function executes the callback function every time an entry has been unpublished with the respective payload.
     * @param {function} callback The function to be called when an entry is un published.
     */

    onUnPublish(callback: (arg0: PublishDetails) => void) {
        const entryObj = this;
        if (callback && typeof callback === "function") {
            entryObj._emitter.on(
                "entryUnPublish",
                (event: { data: PublishDetails }) => {
                    callback(event.data);
                }
            );
        } else {
            throw Error("Callback must be a function");
        }
    }
}
export default Entry;
