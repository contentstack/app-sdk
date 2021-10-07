"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var post_robot_1 = __importDefault(require("post-robot"));
var field_1 = __importDefault(require("./field"));
var window_1 = __importDefault(require("./window"));
var stack_1 = __importDefault(require("./stack"));
var entry_1 = __importDefault(require("./entry"));
var store_1 = __importDefault(require("./store"));
var wolfy87_eventemitter_1 = __importDefault(require("wolfy87-eventemitter"));
var utils_1 = require("./utils");
var appConfig_1 = require("./appConfig");
var emitter = new wolfy87_eventemitter_1.default();
/** Class representing an extension from Contentstack App Framework SDK. */
var Extension = /** @class */ (function () {
    function Extension(initData) {
        var _this = this;
        this.getConfig = function () {
            return _this.postRobot.sendToParent('getConfig').then(utils_1.onData).catch(utils_1.onError);
        };
        var initializationData = initData;
        this.postRobot = post_robot_1.default;
        /**
         * This method gives you the configuration parameters. Check out our {@link https://www.contentstack.com/docs/guide/extensions|UI Extension documentation} .
         * @type {Object}
         */
        this.appUID = initializationData.data.app_id;
        /**
         * This object holds details of the app initialization user.
         * @type {Object}
         */
        this.installationUID = initializationData.data.installation_uid;
        /**
         * This object holds details of the current user.
         * @type {Object}
         */
        this.currentUser = initializationData.data.user;
        /**
         * location of extension, "RTE_EXTENSION_WIDGET" | "CUSTOM_FIELD_WIDGET" | "DASHBOARD_WIDGET" | "SIDEBAR_WIDGET" | "APP_CONFIG_WIDGET" | "FULL_SCREEN_WIDGET".
         * @type {string}
         */
        this.location = initializationData.data.type;
        /**
         * Store to persist data for extension.
         * Note: Data is stored in the browser {@link external:localStorage} and will be lost if the {@link external:localStorage} is cleared in the browser.
         * @type {Store}
         */
        this.store = new store_1.default(post_robot_1.default);
        /**
         * This method returns stack object which allows users to read and manipulate a range of objects in a stack.
         * @type {Stack}
         */
        this.stack = new stack_1.default(initializationData.data.stack, post_robot_1.default);
        this.Extension = {
            DashboardWidget: null,
            CustomField: null,
            SidebarWidget: null,
            RTEPlugin: null,
            AppConfigWidget: null,
            FullscreenAppWidget: null
        };
        switch (initializationData.data.type) {
            case "DASHBOARD_WIDGET": {
                this.Extension.DashboardWidget = {
                    frame: new window_1.default(post_robot_1.default, this.location, emitter, initializationData.data.dashboard_width),
                    stack: new stack_1.default(initializationData.data.stack, post_robot_1.default)
                };
                break;
            }
            case "SIDEBAR_WIDGET": {
                this.Extension.SidebarWidget = {
                    entry: new entry_1.default(initializationData, post_robot_1.default, emitter),
                    stack: new stack_1.default(initializationData.data.stack, post_robot_1.default)
                };
                break;
            }
            case "CUSTOM_FIELD_WIDGET": {
                this.Extension.CustomField = {
                    field: new field_1.default(initializationData, post_robot_1.default, emitter),
                    fieldConfig: initializationData.data.field_config,
                    entry: new entry_1.default(initializationData, post_robot_1.default, emitter),
                    stack: new stack_1.default(initializationData.data.stack, post_robot_1.default),
                    frame: new window_1.default(post_robot_1.default, this.location, emitter)
                };
                break;
            }
            case "APP_CONFIG_WIDGET": {
                this.Extension.AppConfigWidget = new appConfig_1.AppConfig(initializationData, post_robot_1.default, emitter);
                break;
            }
            case "FULL_SCREEN_WIDGET": {
                break;
            }
            case 'RTE_EXTENSION_WIDGET':
            default: {
                Promise.resolve().then(function () { return __importStar(require('./RTE')); }).then(function (_a) {
                    var rtePluginInitializer = _a.rtePluginInitializer;
                    _this.Extension.RTEPlugin = rtePluginInitializer;
                });
                break;
            }
        }
        try {
            //@ts-ignore
            post_robot_1.default.on('extensionEvent', function (event) {
                if (event.data.name === 'entrySave') {
                    emitter.emitEvent('entrySave', [{ data: event.data.data }]);
                    emitter.emitEvent('updateFields', [{ data: event.data.data }]);
                }
                if (event.data.name === 'entryChange') {
                    emitter.emitEvent('entryChange', [{ data: event.data.data }]);
                }
                if (event.data.name === 'entryPublish') {
                    emitter.emitEvent('entryPublish', [{ data: event.data.data }]);
                }
                if (event.data.name === 'entryUnPublish') {
                    emitter.emitEvent('entryUnPublish', [{ data: event.data.data }]);
                }
                if (event.data.name === 'dashboardResize') {
                    emitter.emitEvent('dashboardResize', [{ state: event.data.state }]);
                }
                if (event.data.name === 'extensionFieldChange') {
                    emitter.emitEvent('extensionFieldChange', [{ data: event.data.data }]);
                }
            });
        }
        catch (err) {
            console.log('extension Event', err);
        }
    }
    Extension.initialize = function (version) {
        //@ts-ignore
        return post_robot_1.default.sendToParent('init', { version: version });
    };
    Extension.prototype.setReady = function () {
        return this.postRobot.sendToParent('ready');
    };
    return Extension;
}());
exports.default = Extension;
//# sourceMappingURL=extension.js.map