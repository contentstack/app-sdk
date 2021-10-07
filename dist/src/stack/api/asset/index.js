"use strict";
//@ts-nocheck
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var base_1 = __importDefault(require("../base"));
var utils_1 = require("../../utils");
var connection = {};
/**
 * @summary Creates an instance of `Asset`.
 * @description An initializer is responsible for creating an Asset object.
 * @param {String} uid - uid of the asset
 * @example
 * let Asset = extension.stack.Asset('bltsomething123');
 * @returns {Asset}
 * @ignore
 */
function onData(data) {
    if (typeof (data.data) === 'string') {
        return Promise.reject(data.data);
    }
    return Promise.resolve(data.data);
}
function onError(error) {
    return Promise.reject(error);
}
var Asset = /** @class */ (function (_super) {
    __extends(Asset, _super);
    function Asset(uid) {
        var _this = _super.call(this, uid) || this;
        _this.getReferences = utils_1.getReferences;
        _this.environment = utils_1.environment;
        return _this;
    }
    /**
     * @function
     * @name Stack#Asset.Query
     * @description This static method instantiates the query module for assets. To see the list of methods that can be used for querying assets, refer the {@link Query} module.
     * @example
     * let assetQuery = extension.stack.Asset.Query();
     * assetQuery.where("title": "main.js").limit(10).skip(10).find().then(...).catch(...);
     * @return {Query}
     */
    Asset.Query = function () {
        var entryQuery = _super.Query.call(this);
        Object.assign(entryQuery, {
            language: utils_1.language,
            environment: utils_1.environment
        });
        return entryQuery;
    };
    Asset.module = function (plural) {
        if (plural === void 0) { plural = false; }
        return plural ? 'Assets' : 'Asset';
    };
    Object.defineProperty(Asset, "connection", {
        get: function () {
            return connection;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * @function
     * @name Stack#Asset.getRteAssets
     * @description This static method retrieves comprehensive information on all assets uploaded through the Rich Text Editor field.
     * @return {external:Promise}
     */
    Asset.getRteAssets = function () {
        return this.connection.sendToParent('stackQuery', { action: 'getRteAssets' }).then(onData).catch(onError);
    };
    /**
     * @function
     * @name Stack#Asset.getAssetsOfSpecificTypes
     * @description This static method retrieves assets that are either image or video files, based on the request query.
     * @param  {String} assetType Type of asset to be received for e.g., ‘image/png’
     * @return {external:Promise}
     */
    Asset.getAssetsOfSpecificTypes = function (assetType) {
        if (!assetType || typeof assetType !== 'string') {
            return Promise.reject(new Error('Kindly provide valid parameters'));
        }
        return this.connection.sendToParent('stackQuery', { action: 'getAssetsOfSpecificTypes', asset_type: assetType }).then(onData).catch(onError);
    };
    /**
     * @name Stack#Asset#only
     * @function
     * @description This method is used to show the selected fields of the assets in the result set.
     * @param {String} [key=BASE] - Single field of an asset
     * @param {Array} values - Array of fields to be shown in the result set
     * @example
     * <caption> Only with the field UID </caption>
     * extension.stack.Asset('bltsomething123').only('title').fetch();
     * @example
     * <caption> Only with the field UID </caption>
     * extension.stack.Asset('bltsomething123').only('BASE','title').fetch();
     * @example
     * <caption> Only with the field UIDs(array) </caption>
     * extension.stack.Asset('bltsomething123').only(['title','description']).fetch();
     * @returns {Stack#Asset}
     */
    /**
     * @name Stack#Asset#except
     * @function
     * @description This method is used to hide the selected fields of the assets in result set.
     * @param {String} [key=BASE] - Single field of an asset
     * @param {Array} values - Array of fields to be hidden in the result set
     * @example
     * <caption> .Except with the field UID </caption>
     * extension.stack.Asset('bltsomething123').except('title').fetch();
     * @example
     * <caption> .Except with the field UID </caption>
     * extension.stack.Asset('bltsomething123').except('BASE','title').fetch();
     * @example
     * <caption> .Except with the field UIDs(array) </caption>
     * extension.stack.Asset('bltsomething123').except(['title','description']).fetch();
     * @returns {Stack#Asset}
     */
    /**
     * @function
     * @name Stack#Asset#environment
     * @description This method is used to set the environment name of which you want to retrieve the data.
     * @param {String} environment_uid - UID/Name of environment
     * @example extension.stack.Asset('bltsomething123').environment('development').fetch()
     * @returns {Stack#Asset}
     */
    /**
     This method includes a query parameter in your query.
     @name Stack#Asset#addParam
     @function
     @example extension.stack.Asset('uid').addParam('key', 'value').fetch().then().catch();
     @param {string} key - Key of the parammeter
     @param {string} value - Value of the parammeter
     @return {Stack#Asset}
    */
    /**
     This method includes a query parameter in your query.
     @name Stack#Asset#addQuery
     @function
     @example extension.stack.Asset('uid').addQuery('key', 'value').fetch().then().catch();
     @param {string} key - Key of the parammeter
     @param {string} value - Value of the parammeter
     @return {Stack#Asset}
    */
    /**
     This method will fetch the details of the entries and the assets in which the specified asset is referenced.
     @see {@link
     https://www.contentstack.com/docs/apis/content-management-api/#get-all-references-of-asset|
     Asset References}
     @name Stack#Asset#getReferences
     @function
     @example extension.stack.Asset('uid').getReferences().then().catch();
     @return {external:Promise}
    */
    /**
     This method deletes an existing asset.
     @see {@link
     https://www.contentstack.com/docs/apis/content-management-api/#delete-an-asset|
     Delete Asset}
     @name Stack#Asset#delete
     @function
     @example extension.stack.Asset('uid').delete().then().catch();
     @return {external:Promise}
     */
    /**
     * @name Stack#Asset#publish
     * @function
     * @description This method allows you to publish the asset either immediately or schedule the publish for a later date/time.
     * @param {object} payload - Payload for the request.
     * @example extension.stack.Asset('bltsomething123')
     .publish(
       {
          "asset": {
            "locales": [
              "en-us"
            ],
            "environments": [
              "development"
            ]
          },
          "version": 1,
          "scheduled_at": "2019-02-08T18:30:00.000Z"
        });
       * @return {external:Promise}
       */
    Asset.prototype.publish = function (payload) {
        if (!payload || (typeof payload !== 'object') || (payload instanceof Array)) {
            return Promise.reject(new Error('Kindly provide valid parameters'));
        }
        return this.fetch('publishAsset', payload);
    };
    /**
     * @function
     * @name Stack#Asset#unpublish
     * @description This method will instantly unpublish the asset, and also give you the provision to automatically unpublish the asset at a later date/time.
     * @param {object} payload - Payload for the request.
     * @example extension.stack.Asset('bltsomething123')
      .unpublish({
      "asset": {
        "locales": [
          "en-us"
        ],
        "environments": [
          "development"
        ]
      },
      "version": 1,
      "scheduled_at": "2019-02-08T18:30:00.000Z"
    });
     * @return {external:Promise}
     */
    Asset.prototype.unpublish = function (payload) {
        if (!payload || (typeof payload !== 'object') || (payload instanceof Array)) {
            return Promise.reject(new Error('Kindly provide valid parameters'));
        }
        return this.fetch('unpublishAsset', payload);
    };
    return Asset;
}(base_1.default));
exports.default = (function (uiConnection) {
    connection = uiConnection;
    return new Proxy(Asset, {
        apply: function (Target, thisArg, argumentsList) {
            return new (Target.bind.apply(Target, __spreadArray([void 0], argumentsList)))();
        }
    });
});
//# sourceMappingURL=index.js.map