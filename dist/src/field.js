"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var excludedDataTypesForSetField = ['file', 'reference', 'blocks', 'group', 'global_field'];
function separateResolvedData(field, value) {
    var resolvedData = value;
    var unResolvedData = value;
    if (field.data_type === 'file') {
        if (value) {
            resolvedData = value;
            unResolvedData = field.schema.multiple === true ?
                value.map(function (file) { return file.uid; }) :
                value.uid;
        }
        else if (field.schema.multiple === true) {
            resolvedData = [];
            unResolvedData = [];
        }
    }
    return { resolvedData: resolvedData, unResolvedData: unResolvedData };
}
/** Class representing a field from Contentstack UI. Only available for Custom Field extension */
var Field = /** @class */ (function () {
    function Field(fieldDataObject, connection, emitter) {
        /**
         * The UID of the current field is defined in the content type of the entry.
         * @type {string}
         */
        this.uid = fieldDataObject.data.uid;
        /**
         * The data type of the current field is set using this method.
         * @type {string}
         */
        this.data_type = fieldDataObject.data.schema.data_type;
        /**
         * The schema of the current field (schema of fields such as ‘Single Line Textbox’, ‘Number’,
         *  and so on) is set using this method.
         * @type {Object}
         */
        this.schema = fieldDataObject.data.schema;
        this._emitter = emitter;
        var separatedData = separateResolvedData(this, fieldDataObject.data.value);
        this._data = separatedData.unResolvedData;
        this._resolvedData = separatedData.resolvedData;
        this._connection = connection;
        //@ts-ignore
        this._self = fieldDataObject.data.self || false;
        var fieldObj = this;
        emitter.on('updateFields', function (event) {
            var path = fieldObj.uid.split('.');
            var value = event.data;
            path.forEach(function (key) {
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
     * @return {external:Promise} A promise object which is resolved when data is set for a field. Note: The data set by this function will only be saved when user saves the entry.
     */
    Field.prototype.setData = function (data) {
        var _this = this;
        var currentFieldObj = this;
        var dataObj = { data: data, uid: currentFieldObj.uid, self: currentFieldObj._self };
        if (!currentFieldObj._self &&
            ((excludedDataTypesForSetField.indexOf(currentFieldObj.data_type) !== -1) ||
                !currentFieldObj.data_type)) {
            return Promise.reject(new Error('Cannot call set data for current field type'));
        }
        return this._connection.sendToParent('setData', dataObj).then(function () {
            _this._data = data;
            return Promise.resolve(currentFieldObj);
        }).catch(function (e) { return Promise.reject(e); });
    };
    /**
      * Gets the data of the current field
      * @param  {Object} options Options object for get Data method.
      * @param  {boolean} options.resolved If the resolved parameter is set to true for the File field, then the method will return a resolved asset object along with all the field metadata, e.g. 'field.getData({resolved:true})'.
      * @return {Object|string|number} Returns the field data.
      */
    Field.prototype.getData = function (_a) {
        var _b = _a === void 0 ? {} : _a, _c = _b.resolved, resolved = _c === void 0 ? false : _c;
        return resolved ? this._resolvedData : this._data;
    };
    /**
     * Sets the focus for a field when an extension is being used. This method shows user presence and highlights the extension field that the user is currently accessing in Contentstack UI.
     * @return {Object} A promise object which is resolved when Contentstack UI returns an acknowledgement of the focused state.
     */
    Field.prototype.setFocus = function () {
        return this._connection.sendToParent('focus');
    };
    /**
     * This function is called when another extension programmatically changes data of this field using field.setData() function, only available for extension field, only support extensions of data type text, number, boolean or date.
     * @param {function} callback The function to be called when an entry is published.
     */
    Field.prototype.onChange = function (callback) {
        var _this = this;
        var fieldObj = this;
        if (callback && typeof (callback) === 'function') {
            fieldObj._emitter.on('extensionFieldChange', function (event) {
                _this._data = event.data;
                _this._resolvedData = event.data;
                callback(event.data);
            });
        }
        else {
            throw Error('Callback must be a function');
        }
    };
    return Field;
}());
exports.default = Field;
//# sourceMappingURL=field.js.map