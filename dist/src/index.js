"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var extension_1 = __importDefault(require("./extension"));
var post_robot_1 = __importDefault(require("post-robot"));
var package_json_1 = require("../package.json");
//@ts-ignore
post_robot_1.default.CONFIG.LOG_LEVEL = 'error';
/** Class to initialize the plugin on Contentstack UI. */
/**
   * @hideconstructor
   */
var ContentstackAppSDK = /** @class */ (function () {
    function ContentstackAppSDK() {
    }
    ContentstackAppSDK.init = function () {
        var _this = this;
        if (this._extension) {
            return Promise.resolve(this._extension);
        }
        return extension_1.default.initialize(package_json_1.version).then(function (initializationData) {
            _this._extension = new extension_1.default(initializationData);
            return Promise.resolve(_this._extension);
        }).catch(function (e) { return Promise.reject(e); });
    };
    Object.defineProperty(ContentstackAppSDK, "SDK_VERSION", {
        /**
          * Version of Contentstack UI extension.
          * @type {string}
          */
        get: function () {
            return package_json_1.version;
        },
        enumerable: false,
        configurable: true
    });
    return ContentstackAppSDK;
}());
exports.default = ContentstackAppSDK;
module.exports = ContentstackAppSDK;
//# sourceMappingURL=index.js.map