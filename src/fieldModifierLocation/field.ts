import EventEmitter from "wolfy87-eventemitter";
import postRobot from "post-robot";

import { IFieldInitData, IFieldModifierLocationInitData } from "../types";
import { GenericObjectType } from "../types/common.types";
import { Schema } from "../types/stack.types";

const excludedDataTypesForSetField = [
    "file",
    "reference",
    "blocks",
    "group",
    "global_field",
];

function separateResolvedData(
    field: FieldModifierLocationField,
    value: GenericObjectType
) {
    let resolvedData = value;
    let unResolvedData = value;
    if (field.data_type === "file") {
        if (value) {
            resolvedData = value;
            unResolvedData =
                field.schema.multiple === true
                    ? value.map((file: any) => file.uid)
                    : value.uid;
        } else if (field.schema.multiple === true) {
            resolvedData = [];
            unResolvedData = [];
        }
    }
    return { resolvedData, unResolvedData };
}

/** Class representing a field from Contentstack UI. */
class FieldModifierLocationField {
    /**
     * @hideconstructor
     */

    uid: string;
    data_type: string;
    schema: Schema;
    _emitter: EventEmitter;
    _data: GenericObjectType;
    _resolvedData: GenericObjectType;
    _self: boolean;
    _connection: typeof postRobot;

    constructor(
        fieldDataObject: IFieldInitData | IFieldModifierLocationInitData,
        connection: typeof postRobot,
        emitter: EventEmitter
    ) {
        /**
         * The UID of the current field is defined in the content type of the entry.
         * @type {string}
         */
        this.uid = fieldDataObject.uid;
        /**
         * The data type of the current field is set using this method.
         * @type {string}
         */
        this.data_type = fieldDataObject.schema.data_type;
        /**
         * The schema of the current field (schema of fields such as ‘Single Line Textbox’, ‘Number’,
         *  and so on) is set using this method.
         * @type {Object}
         */
        this.schema = fieldDataObject.schema;
        this._emitter = emitter;

        const separatedData = separateResolvedData(this, fieldDataObject.value);

        this._data = separatedData.unResolvedData;

        this._resolvedData = separatedData.resolvedData;

        this._connection = connection;

        this._self = fieldDataObject.self || false;

        const fieldObj = this;

        emitter.on("updateFields", (event: any) => {
            const path = fieldObj.schema.$uid.split(".");
            let value = event.data;

            path.forEach((key) => {
                if (value) {
                    value = value[key];
                }
            });

            if (fieldObj._data !== value) {
                fieldObj._data = value;
            }
        });
    }

    /**
     * Sets the data for the current field.
     * @param {Object|string|number} data Data to be set on the field
     * @return {external:Promise} A promise object which is resolved when data is set for a field.
     * Note: The data set by this function will only be saved when user saves the entry.
     */
    async setData(data: any): Promise<FieldModifierLocationField> {
        const currentFieldObj = this;
        const dataObj = {
            data,
            uid: currentFieldObj.uid,
            self: currentFieldObj._self,
        };

        if (
            !currentFieldObj._self &&
            (excludedDataTypesForSetField.indexOf(currentFieldObj.data_type) !==
                -1 ||
                !currentFieldObj.data_type)
        ) {
            return Promise.reject(
                new Error("Cannot call set data for current field type")
            );
        }

        return this._connection
            .sendToParent("setData", dataObj)
            .then(() => {
                this._data = data;
                return Promise.resolve(currentFieldObj);
            })
            .catch((e: Error) => {
                return Promise.reject(e);
            });
    }

    /**
     * Gets the data of the current field
     * @param  {Object} options Options object for get Data method.
     * @param  {boolean} options.resolved If the resolved parameter is set to true for the File field, then the method will return a resolved asset object along with all the field metadata, e.g. 'field.getData({resolved:true})'.
     * @return {Object|string|number} Returns the field data.
     */
    getData({ resolved = false } = {}): GenericObjectType {
        return resolved ? this._resolvedData : this._data;
    }
}

export default FieldModifierLocationField;
