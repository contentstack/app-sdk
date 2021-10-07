"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = __importDefault(require("./api/asset/index"));
var index_2 = __importDefault(require("./api/content-type/index"));
var utils_1 = require("../utils");
/**
 * Class representing the current stack in Contentstack UI.
 */
var Stack = /** @class */ (function () {
    function Stack(data, connection) {
        this._connection = connection;
        this._data = data;
        /**
         * @constructor
         * @hideconstructor
         * @version 2.2.0
         * @desc Content type defines the structure or schema of a page or a section of your web or mobile property
         * @see {@link https://www.contentstack.com/docs/apis/content-management-api/#content-types| ContentType}
         * @param {string} uid - Uid of contenttype.
         * @example extension.stack.ContentType('content_type_uid')
         * */
        this.ContentType = index_2.default(connection);
        /**
         * @constructor
         * @version 2.2.0
         * @hideconstructor
         * @desc An initializer is responsible for creating an Asset object.
         * @see {@link https://www.contentstack.com/docs/apis/content-management-api/#assets| Asset}
         * @param {string} uid - UID of the asset.
         * @example extension.stack.Asset('asset_uid')
         * */
        this.Asset = index_1.default(connection);
    }
    /**
     * This method returns the data of the current stack.
     * @return {Object} Returns stack data.
     */
    Stack.prototype.getData = function () {
        return this._data;
    };
    /**
     * This API allows you to retrieve data of a content type of a stack using the {@link https://www.contentstack.com/docs/apis/content-management-api/#get-a-single-content-type| Content Type API} requests. This method returns a Promise object.
     * @param {string} uid Uid of the desired content type
     * @param {Object} params Optional parameters for the GET call
     * @return {Object} A promise object which will be resolved with content type details.
     */
    Stack.prototype.getContentType = function (uid, params) {
        if (params === void 0) { params = {}; }
        if (!uid) {
            return Promise.reject(new Error('uid is required'));
        }
        var options = { uid: uid, params: params, action: 'getContentType' };
        return this._connection.sendToParent('stackQuery', options).then(utils_1.onData).catch(utils_1.onError);
    };
    /**
     * This API allows you to retrieve data of a content types of a stack using the {@link https://www.contentstack.com/docs/apis/content-management-api/#get-all-content-types| Content Types API} requests. This method returns a Promise object.
     * @param {Object} query Query for the GET call
     * @param {Object} params Optional parameters for the GET call
     * @return {Object} A promise object which will be resolved with details of the content type.
     */
    Stack.prototype.getContentTypes = function (query, params) {
        if (query === void 0) { query = {}; }
        if (params === void 0) { params = {}; }
        var optionParams = params;
        optionParams.query = query;
        var options = { params: optionParams, action: 'getContentTypes' };
        return this._connection.sendToParent('stackQuery', options).then(utils_1.onData).catch(utils_1.onError);
    };
    /**
     * This API allows you to retrieve environment details of a stack using the {@link https://www.contentstack.com/docs/apis/content-management-api/#get-a-single-environment| Environment API} requests. This method returns a Promise object.
     * @param {string} name Name of the desired environment
     * @param {Object} params Optional parameters for the GET call
     * @return {Object} A promise object which will be resolved with environment details.
     */
    Stack.prototype.getEnvironment = function (name, params) {
        if (params === void 0) { params = {}; }
        if (!name) {
            return Promise.reject(new Error('name is required'));
        }
        var options = { name: name, params: params, action: 'getEnvironment' };
        return this._connection.sendToParent('stackQuery', options).then(utils_1.onData).catch(utils_1.onError);
    };
    /**
     * This API allows you to retrieve details of environments of a stack using the {@link https://www.contentstack.com/docs/apis/content-management-api/#get-all-environments| Environments API} requests. This method returns a Promise object.
     * @param {Object} query Query for the GET call
     * @param {Object} params Optional parameters for the GET call
     * @return {Object} A Promise object which will be resolved with details of the environments.
     */
    Stack.prototype.getEnvironments = function (query, params) {
        if (query === void 0) { query = {}; }
        if (params === void 0) { params = {}; }
        var optionParams = params;
        optionParams.query = query;
        var options = { params: optionParams, action: 'getEnvironments' };
        return this._connection.sendToParent('stackQuery', options).then(utils_1.onData).catch(utils_1.onError);
    };
    /**
     * This API allows you to retrive a locale of a stack using the {@link https://www.contentstack.com/docs/apis/content-management-api/#get-a-language| Language API} requests. Method returns a Promise object.
     * @param {string} code Code of the desired locale
     * @param {Object} params Optional parameters for the GET call
     * @return {Object} A promise object which will be resolved with locale details.
     */
    Stack.prototype.getLocale = function (code, params) {
        if (params === void 0) { params = {}; }
        if (!code) {
            return Promise.reject(new Error('code is required'));
        }
        var options = { code: code, params: params, action: 'getLocale' };
        return this._connection.sendToParent('stackQuery', options).then(utils_1.onData).catch(utils_1.onError);
    };
    /**
     * This API allows you to retrive the locales of a stack using the {@link https://www.contentstack.com/docs/apis/content-management-api/#get-all-content-types| Languages API} requests. Method returns a Promise object.
     * @param {Object} query Query for the GET call
     * @param {Object} params Optional parameters for the GET call
     * @return {Object} A Promise object which will be resolved with details of the locales.
     */
    Stack.prototype.getLocales = function (query, params) {
        if (query === void 0) { query = {}; }
        if (params === void 0) { params = {}; }
        var optionParams = params;
        optionParams.query = query;
        var options = { params: optionParams, action: 'getLocales' };
        return this._connection.sendToParent('stackQuery', options).then(utils_1.onData).catch(utils_1.onError);
    };
    return Stack;
}());
exports.default = Stack;
//# sourceMappingURL=index.js.map