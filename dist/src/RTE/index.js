"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.rtePluginInitializer = exports.RTEPlugin = void 0;
var RTEPlugin = /** @class */ (function () {
    function RTEPlugin(id, configCallback) {
        var _this = this;
        this.configCallback = configCallback;
        this.pluginMetaData = {
            registry: {
                title: "",
                toolbar: {
                    inMainToolbar: true,
                    inHoveringToolbar: true,
                },
                dndOptions: {},
                isContentstackElement: true,
            },
            meta: {
                id: "",
                elementType: null,
                editorCallbacks: {},
                isDependent: false,
            },
        };
        this.isContainer = false;
        this.containerMetaData = {
            registry: {
                id: this.pluginMetaData.meta.id,
                title: this.pluginMetaData.registry.title,
                rootCategory: false,
                toolbar: __assign({}, this.pluginMetaData.registry.toolbar),
            },
            meta: {
                id: this.pluginMetaData.meta.id,
                dependentPlugins: [],
            },
        };
        this.addPlugins = function () {
            var plugins = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                plugins[_i] = arguments[_i];
            }
            // convert to dropdown if not already
            if (_this.pluginMetaData.meta.isDependent)
                throw Error("cannot have another container inside");
            _this.isContainer = true;
            // clean pluginMetaData
            plugins.forEach(function (plugin) {
                // make sure that this plugin is not another dropdown
                if (plugin.isContainer) {
                    throw Error("cannot have another container inside");
                }
                plugin.pluginMetaData.registry.category =
                    _this.pluginMetaData.meta.id;
                _this.containerMetaData.meta.dependentPlugins.push(plugin);
                plugin.pluginMetaData.meta.isDependent = true;
            });
        };
        this.on = function (type, callback) {
            switch (type) {
                case "beforeChildRender": {
                    _this.pluginMetaData.registry.beforeChildrenRender = callback;
                    break;
                }
                case "beforeRender": {
                    _this.pluginMetaData.registry.beforeElementRender = callback;
                    break;
                }
                case "exec": {
                    _this.pluginMetaData.registry.handleMouseDown = callback;
                    break;
                }
                case "keydown": {
                    _this.pluginMetaData.meta.editorCallbacks["v2.keydown"] =
                        callback;
                    break;
                }
                case "paste":
                case "deleteBackward":
                case "deleteForward":
                case "insertBreak":
                case "normalize":
                default: {
                    _this.pluginMetaData.meta.editorCallbacks[type] = callback;
                    break;
                }
            }
        };
        this.get = function (rte) {
            var config = _this.configCallback(rte);
            Object.entries(config).forEach(
            //@ts-ignore
            function (_a) {
                var key = _a[0], value = _a[1];
                switch (key) {
                    case "title": {
                        _this.pluginMetaData.registry.title = value;
                        break;
                    }
                    case "iconName": {
                        _this.pluginMetaData.registry.iconName = value;
                        break;
                    }
                    case "displayOn": {
                        // make every other options false
                        _this.pluginMetaData.registry.toolbar = {
                            inHoveringToolbar: false,
                            inMainToolbar: false,
                        };
                        if (typeof value === "string") {
                            switch (value) {
                                case "toolbar": {
                                    _this.pluginMetaData.registry.toolbar.inMainToolbar =
                                        true;
                                    break;
                                }
                                case "hoveringToolbar": {
                                    _this.pluginMetaData.registry.toolbar.inHoveringToolbar =
                                        true;
                                    break;
                                }
                            }
                        }
                        else if (Array.isArray(value)) {
                            value.forEach(function (display) {
                                switch (display) {
                                    case "toolbar": {
                                        _this.pluginMetaData.registry.toolbar.inMainToolbar =
                                            true;
                                        break;
                                    }
                                    case "hoveringToolbar": {
                                        _this.pluginMetaData.registry.toolbar.inHoveringToolbar =
                                            true;
                                        break;
                                    }
                                }
                            });
                        }
                        break;
                    }
                    case "elementType": {
                        _this.pluginMetaData.meta.elementType = value;
                        break;
                    }
                    case "dnd": {
                        if (typeof value === "object" &&
                            !Array.isArray(value)) {
                            if (typeof _this.pluginMetaData.registry
                                .dndOptions === "undefined") {
                                _this.pluginMetaData.registry.dndOptions = {
                                    DisableDND: false,
                                };
                            }
                            Object.entries(value).forEach(function (_a) {
                                var option = _a[0], val = _a[1];
                                switch (option) {
                                    case "disable": {
                                        _this.pluginMetaData.registry.dndOptions.DisableDND =
                                            val;
                                        break;
                                    }
                                    case "hideSelectionBackground": {
                                        _this.pluginMetaData.registry.dndOptions.DisableSelectionHalo =
                                            val;
                                        break;
                                    }
                                    case "icon": {
                                        _this.pluginMetaData.registry.dndOptions.CustomDndIcon =
                                            val;
                                        break;
                                    }
                                    case "className": {
                                        _this.pluginMetaData.registry.dndOptions.ContainerClassName =
                                            val;
                                        break;
                                    }
                                    case "droppableContainer": {
                                        _this.pluginMetaData.registry.dndOptions.getDroppableContainer =
                                            val;
                                        break;
                                    }
                                    case "disableColumnLayout": {
                                        _this.pluginMetaData.registry.dndOptions.DisableGridDnd =
                                            val;
                                        break;
                                    }
                                }
                            });
                        }
                        break;
                    }
                    case "Component": {
                        _this.pluginMetaData.registry.Component = value;
                        break;
                    }
                }
            });
            _this.containerMetaData = {
                registry: {
                    id: _this.pluginMetaData.meta.id,
                    title: _this.pluginMetaData.registry.title,
                    rootCategory: false,
                    toolbar: __assign({}, _this.pluginMetaData.registry.toolbar),
                },
                meta: {
                    id: _this.pluginMetaData.meta.id,
                    dependentPlugins: [],
                },
            };
            return _this.isContainer ? _this.containerMetaData : _this.pluginMetaData;
        };
        this.pluginMetaData.meta.id = id;
    }
    return RTEPlugin;
}());
exports.RTEPlugin = RTEPlugin;
var rtePluginInitializer = function (id, configCallback) {
    if (!(id && configCallback))
        throw Error("i am an error");
    return new RTEPlugin(id, configCallback);
};
exports.rtePluginInitializer = rtePluginInitializer;
//# sourceMappingURL=index.js.map