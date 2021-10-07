"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var field_1 = __importDefault(require("./field"));
/** Class representing an entry from Contentstack UI. Not available for Dashboard Widget extension.  */
var Entry = /** @class */ (function () {
    function Entry(initializationData, connection, emitter) {
        /**
         * Gets the content type of the current entry.
         * @type {Object}
         */
        this.content_type = initializationData.data.content_type;
        this._data = initializationData.data.entry;
        /**
         * Gets the locale of the current entry.
         * @type {string}
         */
        this.locale = initializationData.data.locale;
        this._connection = connection;
        this._emitter = emitter;
        var thisEntry = this;
        this._emitter.on('entrySave', function (event) {
            thisEntry._data = event.data;
        });
        this._emitter.on('entryChange', function (event) {
            thisEntry._changedData = event.data;
        });
    }
    /**
     * Gets data of the current entry.
     * @return {Object} Returns entry data.
    */
    Entry.prototype.getData = function () {
        return this._data;
    };
    /**
     * Gets the field object which allows you to interact with the field.
     * This object will have all the same methods and properties of extension.field.
     * Note: For fields initialized using the getFields function, the setData function currently works only for the following fields: as single_line, multi_line, RTE, markdown, select, number, boolean, date, link, and extension of data type text, number, boolean, and date.
     * @example
     * var field = entry.getField('field_uid');
     * var fieldSchema = field.schema;
     * var fieldUid = field.uid;
     * var fieldData = field.getData();
     * @param {string} uid Unique ID of the field
     * @return {Object} Field object
    */
    Entry.prototype.getField = function (uid) {
        var path = uid.split('.');
        var value = this._data;
        var schema = this.content_type.schema;
        try {
            var skipNext_1 = false;
            var skipNextTwo_1 = false;
            path.forEach(function (key, index) {
                if (skipNext_1) {
                    if (skipNextTwo_1) {
                        skipNextTwo_1 = false;
                    }
                    else {
                        skipNext_1 = false;
                    }
                    return;
                }
                schema = schema.find(function (x) { return x.uid === key; });
                if (!schema) {
                    throw Error('schema not found');
                }
                value = value[key];
                if ((schema.data_type === 'group' || schema.data_type === 'global_field') && schema.multiple === false
                    && path.length !== (index + 1)) {
                    schema = schema.schema;
                }
                else if ((schema.data_type === 'group' || schema.data_type === 'global_field') && schema.multiple === true
                    && path.length !== (index + 1)) {
                    schema = schema.schema;
                    value = value[path[index + 1]];
                    skipNext_1 = true;
                }
                else if (schema.data_type === 'blocks' && path.length !== (index + 1)) {
                    var blockId_1 = Object.keys(value[path[index + 1]])[0];
                    schema = schema.blocks.find(function (block) { return block.uid === blockId_1; });
                    if (path.length === index + 2) { // complete block value with uid
                        value = value[path[index + 1]];
                    }
                    else { // block value without uid
                        value = value[path[index + 1]][blockId_1];
                        schema = schema.schema;
                    }
                    skipNext_1 = true;
                    skipNextTwo_1 = true;
                }
            });
        }
        catch (e) {
            throw Error('Invalid uid, Field not found');
        }
        var fieldIntilaizationDataObject = {
            data: {
                uid: uid,
                value: value,
                schema: schema,
                data_type: schema.data_type
            }
        };
        //@ts-ignore
        var fieldObject = new field_1.default(fieldIntilaizationDataObject, this._connection, this._emitter);
        delete fieldObject.onChange;
        return fieldObject;
    };
    /**
     * This function executes the callback function every time an entry is saved.
     * @param {function} callback The function to be called when an entry is saved.
     */
    Entry.prototype.onSave = function (callback) {
        var entryObj = this;
        if (callback && typeof (callback) === 'function') {
            entryObj._emitter.on('entrySave', function (event) {
                callback(event.data);
            });
        }
        else {
            throw Error('Callback must be a function');
        }
    };
    /**
     * The field.onChange() function is called when another extension programmatically changes the data of the current extension field using the field.setData() function. This function is only available for extension fields that support the following data types: text, number, boolean, or date.
     * @param {function} callback The function to be called when an entry is edited/changed.
     */
    Entry.prototype.onChange = function (callback) {
        var entryObj = this;
        if (callback && typeof (callback) === 'function') {
            entryObj._emitter.on('entryChange', function (event) {
                callback(event.data);
            });
        }
        else {
            throw Error('Callback must be a function');
        }
    };
    /**
     * The onPublish() function executes the callback function every time an entry has been published with the respective payload.
     * @param {function} callback The function to be called when an entry is published.
     */
    Entry.prototype.onPublish = function (callback) {
        var entryObj = this;
        if (callback && typeof (callback) === 'function') {
            entryObj._emitter.on('entryPublish', function (event) {
                callback(event.data);
            });
        }
        else {
            throw Error('Callback must be a function');
        }
    };
    /**
     * The onUnPublish() function executes the callback function every time an entry has been unpublished with the respective payload.
     * @param {function} callback The function to be called when an entry is un published.
     */
    Entry.prototype.onUnPublish = function (callback) {
        var entryObj = this;
        if (callback && typeof (callback) === 'function') {
            entryObj._emitter.on('entryUnPublish', function (event) {
                callback(event.data);
            });
        }
        else {
            throw Error('Callback must be a function');
        }
    };
    return Entry;
}());
exports.default = Entry;
//# sourceMappingURL=entry.js.map