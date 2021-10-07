"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppConfig = void 0;
var utils_1 = require("../utils");
/**
 * Class representing the current stack in Contentstack UI.
 */
var AppConfig = /** @class */ (function () {
    function AppConfig(data, connection, emitter) {
        var _this = this;
        this.setInstallationData = function (installationData) {
            return _this._connection.sendToParent('setInstallationData', installationData).then(utils_1.onData).catch(utils_1.onError);
        };
        this.getInstallationData = function () {
            return _this._connection.sendToParent('getInstallationData').then(utils_1.onData).catch(utils_1.onError);
        };
        this._data = data;
        this._connection = connection;
        this._emitter = emitter;
    }
    return AppConfig;
}());
exports.AppConfig = AppConfig;
//# sourceMappingURL=index.js.map