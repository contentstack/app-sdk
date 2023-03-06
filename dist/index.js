(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["ContentstackAppSDK"] = factory();
	else
		root["ContentstackAppSDK"] = factory();
})(this, () => {
return /******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/post-robot/dist/post-robot.js":
/*!****************************************************!*\
  !*** ./node_modules/post-robot/dist/post-robot.js ***!
  \****************************************************/
/***/ (function(module) {

!function(root, factory) {
     true ? module.exports = factory() : 0;
}("undefined" != typeof self ? self : this, function() {
    return function(modules) {
        var installedModules = {};
        function __nested_webpack_require_417__(moduleId) {
            if (installedModules[moduleId]) return installedModules[moduleId].exports;
            var module = installedModules[moduleId] = {
                i: moduleId,
                l: !1,
                exports: {}
            };
            modules[moduleId].call(module.exports, module, module.exports, __nested_webpack_require_417__);
            module.l = !0;
            return module.exports;
        }
        __nested_webpack_require_417__.m = modules;
        __nested_webpack_require_417__.c = installedModules;
        __nested_webpack_require_417__.d = function(exports, name, getter) {
            __nested_webpack_require_417__.o(exports, name) || Object.defineProperty(exports, name, {
                configurable: !1,
                enumerable: !0,
                get: getter
            });
        };
        __nested_webpack_require_417__.n = function(module) {
            var getter = module && module.__esModule ? function() {
                return module.default;
            } : function() {
                return module;
            };
            __nested_webpack_require_417__.d(getter, "a", getter);
            return getter;
        };
        __nested_webpack_require_417__.o = function(object, property) {
            return Object.prototype.hasOwnProperty.call(object, property);
        };
        __nested_webpack_require_417__.p = "";
        return __nested_webpack_require_417__(__nested_webpack_require_417__.s = "./src/index.js");
    }({
        "./src/index.js": function(module, __webpack_exports__, __nested_webpack_require_1894__) {
            "use strict";
            Object.defineProperty(__webpack_exports__, "__esModule", {
                value: !0
            });
            var interface_namespaceObject = {};
            __nested_webpack_require_1894__.d(interface_namespaceObject, "cleanUpWindow", function() {
                return cleanUpWindow;
            });
            __nested_webpack_require_1894__.d(interface_namespaceObject, "Promise", function() {
                return promise_ZalgoPromise;
            });
            __nested_webpack_require_1894__.d(interface_namespaceObject, "bridge", function() {
                return bridge;
            });
            __nested_webpack_require_1894__.d(interface_namespaceObject, "init", function() {
                return init;
            });
            __nested_webpack_require_1894__.d(interface_namespaceObject, "parent", function() {
                return public_parent;
            });
            __nested_webpack_require_1894__.d(interface_namespaceObject, "send", function() {
                return _send;
            });
            __nested_webpack_require_1894__.d(interface_namespaceObject, "request", function() {
                return request;
            });
            __nested_webpack_require_1894__.d(interface_namespaceObject, "sendToParent", function() {
                return sendToParent;
            });
            __nested_webpack_require_1894__.d(interface_namespaceObject, "client", function() {
                return client;
            });
            __nested_webpack_require_1894__.d(interface_namespaceObject, "on", function() {
                return _on;
            });
            __nested_webpack_require_1894__.d(interface_namespaceObject, "listen", function() {
                return listen;
            });
            __nested_webpack_require_1894__.d(interface_namespaceObject, "once", function() {
                return server_once;
            });
            __nested_webpack_require_1894__.d(interface_namespaceObject, "listener", function() {
                return server_listener;
            });
            __nested_webpack_require_1894__.d(interface_namespaceObject, "CONFIG", function() {
                return CONFIG;
            });
            __nested_webpack_require_1894__.d(interface_namespaceObject, "CONSTANTS", function() {
                return constants_CONSTANTS;
            });
            __nested_webpack_require_1894__.d(interface_namespaceObject, "disable", function() {
                return disable;
            });
            function isRegex(item) {
                return "[object RegExp]" === Object.prototype.toString.call(item);
            }
            var PROTOCOL = {
                MOCK: "mock:",
                FILE: "file:",
                ABOUT: "about:"
            }, WILDCARD = "*", IE_WIN_ACCESS_ERROR = "Call was rejected by callee.\r\n";
            function isAboutProtocol() {
                return (arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : window).location.protocol === PROTOCOL.ABOUT;
            }
            function getParent() {
                var win = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : window;
                if (win) try {
                    if (win.parent && win.parent !== win) return win.parent;
                } catch (err) {}
            }
            function getOpener() {
                var win = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : window;
                if (win && !getParent(win)) try {
                    return win.opener;
                } catch (err) {}
            }
            function canReadFromWindow(win) {
                try {
                    win && win.location && win.location.href;
                    return !0;
                } catch (err) {}
                return !1;
            }
            function getActualDomain() {
                var win = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : window, location = win.location;
                if (!location) throw new Error("Can not read window location");
                var protocol = location.protocol;
                if (!protocol) throw new Error("Can not read window protocol");
                if (protocol === PROTOCOL.FILE) return PROTOCOL.FILE + "//";
                if (protocol === PROTOCOL.ABOUT) {
                    var parent = getParent(win);
                    return parent && canReadFromWindow(parent) ? getActualDomain(parent) : PROTOCOL.ABOUT + "//";
                }
                var host = location.host;
                if (!host) throw new Error("Can not read window host");
                return protocol + "//" + host;
            }
            function utils_getDomain() {
                var win = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : window, domain = getActualDomain(win);
                return domain && win.mockDomain && 0 === win.mockDomain.indexOf(PROTOCOL.MOCK) ? win.mockDomain : domain;
            }
            function isActuallySameDomain(win) {
                try {
                    if (win === window) return !0;
                } catch (err) {}
                try {
                    var desc = Object.getOwnPropertyDescriptor(win, "location");
                    if (desc && !1 === desc.enumerable) return !1;
                } catch (err) {}
                try {
                    if (isAboutProtocol(win) && canReadFromWindow(win)) return !0;
                } catch (err) {}
                try {
                    if (getActualDomain(win) === getActualDomain(window)) return !0;
                } catch (err) {}
                return !1;
            }
            function isAncestorParent(parent, child) {
                if (!parent || !child) return !1;
                var childParent = getParent(child);
                return childParent ? childParent === parent : -1 !== function(win) {
                    var result = [];
                    try {
                        for (;win.parent !== win; ) {
                            result.push(win.parent);
                            win = win.parent;
                        }
                    } catch (err) {}
                    return result;
                }(child).indexOf(parent);
            }
            function getFrames(win) {
                var result = [], frames = void 0;
                try {
                    frames = win.frames;
                } catch (err) {
                    frames = win;
                }
                var len = void 0;
                try {
                    len = frames.length;
                } catch (err) {}
                if (0 === len) return result;
                if (len) {
                    for (var i = 0; i < len; i++) {
                        var frame = void 0;
                        try {
                            frame = frames[i];
                        } catch (err) {
                            continue;
                        }
                        result.push(frame);
                    }
                    return result;
                }
                for (var _i = 0; _i < 100; _i++) {
                    var _frame = void 0;
                    try {
                        _frame = frames[_i];
                    } catch (err) {
                        return result;
                    }
                    if (!_frame) return result;
                    result.push(_frame);
                }
                return result;
            }
            var iframeWindows = [], iframeFrames = [];
            function isWindowClosed(win) {
                var allowMock = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1];
                try {
                    if (win === window) return !1;
                } catch (err) {
                    return !0;
                }
                try {
                    if (!win) return !0;
                } catch (err) {
                    return !0;
                }
                try {
                    if (win.closed) return !0;
                } catch (err) {
                    return !err || err.message !== IE_WIN_ACCESS_ERROR;
                }
                if (allowMock && function(win) {
                    if (!isActuallySameDomain(win)) return !1;
                    try {
                        if (win === window) return !0;
                        if (isAboutProtocol(win) && canReadFromWindow(win)) return !0;
                        if (utils_getDomain(window) === utils_getDomain(win)) return !0;
                    } catch (err) {}
                    return !1;
                }(win)) try {
                    if (win.mockclosed) return !0;
                } catch (err) {}
                try {
                    if (!win.parent || !win.top) return !0;
                } catch (err) {}
                var iframeIndex = function(collection, item) {
                    for (var i = 0; i < collection.length; i++) try {
                        if (collection[i] === item) return i;
                    } catch (err) {}
                    return -1;
                }(iframeWindows, win);
                if (-1 !== iframeIndex) {
                    var frame = iframeFrames[iframeIndex];
                    if (frame && function(frame) {
                        if (!frame.contentWindow) return !0;
                        if (!frame.parentNode) return !0;
                        var doc = frame.ownerDocument;
                        return !(!doc || !doc.documentElement || doc.documentElement.contains(frame));
                    }(frame)) return !0;
                }
                return !1;
            }
            function getAncestor() {
                var win = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : window;
                return getOpener(win = win || window) || getParent(win) || void 0;
            }
            function matchDomain(pattern, origin) {
                if ("string" == typeof pattern) {
                    if ("string" == typeof origin) return pattern === WILDCARD || origin === pattern;
                    if (isRegex(origin)) return !1;
                    if (Array.isArray(origin)) return !1;
                }
                return isRegex(pattern) ? isRegex(origin) ? pattern.toString() === origin.toString() : !Array.isArray(origin) && Boolean(origin.match(pattern)) : !!Array.isArray(pattern) && (Array.isArray(origin) ? JSON.stringify(pattern) === JSON.stringify(origin) : !isRegex(origin) && pattern.some(function(subpattern) {
                    return matchDomain(subpattern, origin);
                }));
            }
            function isWindow(obj) {
                try {
                    if (obj === window) return !0;
                } catch (err) {
                    if (err && err.message === IE_WIN_ACCESS_ERROR) return !0;
                }
                try {
                    if ("[object Window]" === Object.prototype.toString.call(obj)) return !0;
                } catch (err) {
                    if (err && err.message === IE_WIN_ACCESS_ERROR) return !0;
                }
                try {
                    if (window.Window && obj instanceof window.Window) return !0;
                } catch (err) {
                    if (err && err.message === IE_WIN_ACCESS_ERROR) return !0;
                }
                try {
                    if (obj && obj.self === obj) return !0;
                } catch (err) {
                    if (err && err.message === IE_WIN_ACCESS_ERROR) return !0;
                }
                try {
                    if (obj && obj.parent === obj) return !0;
                } catch (err) {
                    if (err && err.message === IE_WIN_ACCESS_ERROR) return !0;
                }
                try {
                    if (obj && obj.top === obj) return !0;
                } catch (err) {
                    if (err && err.message === IE_WIN_ACCESS_ERROR) return !0;
                }
                try {
                    if (obj && "__unlikely_value__" === obj.__cross_domain_utils_window_check__) return !1;
                } catch (err) {
                    return !0;
                }
                return !1;
            }
            function util_safeIndexOf(collection, item) {
                for (var i = 0; i < collection.length; i++) try {
                    if (collection[i] === item) return i;
                } catch (err) {}
                return -1;
            }
            var _ALLOWED_POST_MESSAGE, weakmap_CrossDomainSafeWeakMap = function() {
                function CrossDomainSafeWeakMap() {
                    !function(instance, Constructor) {
                        if (!(instance instanceof CrossDomainSafeWeakMap)) throw new TypeError("Cannot call a class as a function");
                    }(this);
                    this.name = "__weakmap_" + (1e9 * Math.random() >>> 0) + "__";
                    if (function() {
                        if ("undefined" == typeof WeakMap) return !1;
                        if (void 0 === Object.freeze) return !1;
                        try {
                            var testWeakMap = new WeakMap(), testKey = {};
                            Object.freeze(testKey);
                            testWeakMap.set(testKey, "__testvalue__");
                            return "__testvalue__" === testWeakMap.get(testKey);
                        } catch (err) {
                            return !1;
                        }
                    }()) try {
                        this.weakmap = new WeakMap();
                    } catch (err) {}
                    this.keys = [];
                    this.values = [];
                }
                CrossDomainSafeWeakMap.prototype._cleanupClosedWindows = function() {
                    for (var weakmap = this.weakmap, keys = this.keys, i = 0; i < keys.length; i++) {
                        var value = keys[i];
                        if (isWindow(value) && isWindowClosed(value)) {
                            if (weakmap) try {
                                weakmap.delete(value);
                            } catch (err) {}
                            keys.splice(i, 1);
                            this.values.splice(i, 1);
                            i -= 1;
                        }
                    }
                };
                CrossDomainSafeWeakMap.prototype.isSafeToReadWrite = function(key) {
                    if (isWindow(key)) return !1;
                    try {
                        key && key.self;
                        key && key[this.name];
                    } catch (err) {
                        return !1;
                    }
                    return !0;
                };
                CrossDomainSafeWeakMap.prototype.set = function(key, value) {
                    if (!key) throw new Error("WeakMap expected key");
                    var weakmap = this.weakmap;
                    if (weakmap) try {
                        weakmap.set(key, value);
                    } catch (err) {
                        delete this.weakmap;
                    }
                    if (this.isSafeToReadWrite(key)) try {
                        var name = this.name, entry = key[name];
                        entry && entry[0] === key ? entry[1] = value : Object.defineProperty(key, name, {
                            value: [ key, value ],
                            writable: !0
                        });
                        return;
                    } catch (err) {}
                    this._cleanupClosedWindows();
                    var keys = this.keys, values = this.values, index = util_safeIndexOf(keys, key);
                    if (-1 === index) {
                        keys.push(key);
                        values.push(value);
                    } else values[index] = value;
                };
                CrossDomainSafeWeakMap.prototype.get = function(key) {
                    if (!key) throw new Error("WeakMap expected key");
                    var weakmap = this.weakmap;
                    if (weakmap) try {
                        if (weakmap.has(key)) return weakmap.get(key);
                    } catch (err) {
                        delete this.weakmap;
                    }
                    if (this.isSafeToReadWrite(key)) try {
                        var entry = key[this.name];
                        return entry && entry[0] === key ? entry[1] : void 0;
                    } catch (err) {}
                    this._cleanupClosedWindows();
                    var index = util_safeIndexOf(this.keys, key);
                    if (-1 !== index) return this.values[index];
                };
                CrossDomainSafeWeakMap.prototype.delete = function(key) {
                    if (!key) throw new Error("WeakMap expected key");
                    var weakmap = this.weakmap;
                    if (weakmap) try {
                        weakmap.delete(key);
                    } catch (err) {
                        delete this.weakmap;
                    }
                    if (this.isSafeToReadWrite(key)) try {
                        var entry = key[this.name];
                        entry && entry[0] === key && (entry[0] = entry[1] = void 0);
                    } catch (err) {}
                    this._cleanupClosedWindows();
                    var keys = this.keys, index = util_safeIndexOf(keys, key);
                    if (-1 !== index) {
                        keys.splice(index, 1);
                        this.values.splice(index, 1);
                    }
                };
                CrossDomainSafeWeakMap.prototype.has = function(key) {
                    if (!key) throw new Error("WeakMap expected key");
                    var weakmap = this.weakmap;
                    if (weakmap) try {
                        if (weakmap.has(key)) return !0;
                    } catch (err) {
                        delete this.weakmap;
                    }
                    if (this.isSafeToReadWrite(key)) try {
                        var entry = key[this.name];
                        return !(!entry || entry[0] !== key);
                    } catch (err) {}
                    this._cleanupClosedWindows();
                    return -1 !== util_safeIndexOf(this.keys, key);
                };
                CrossDomainSafeWeakMap.prototype.getOrSet = function(key, getter) {
                    if (this.has(key)) return this.get(key);
                    var value = getter();
                    this.set(key, value);
                    return value;
                };
                return CrossDomainSafeWeakMap;
            }(), constants_CONSTANTS = {
                POST_MESSAGE_TYPE: {
                    REQUEST: "postrobot_message_request",
                    RESPONSE: "postrobot_message_response",
                    ACK: "postrobot_message_ack"
                },
                POST_MESSAGE_ACK: {
                    SUCCESS: "success",
                    ERROR: "error"
                },
                POST_MESSAGE_NAMES: {
                    METHOD: "postrobot_method",
                    HELLO: "postrobot_ready",
                    OPEN_TUNNEL: "postrobot_open_tunnel"
                },
                WINDOW_TYPES: {
                    FULLPAGE: "fullpage",
                    POPUP: "popup",
                    IFRAME: "iframe"
                },
                WINDOW_PROPS: {
                    POSTROBOT: "__postRobot__"
                },
                SERIALIZATION_TYPES: {
                    METHOD: "postrobot_method",
                    ERROR: "postrobot_error",
                    PROMISE: "postrobot_promise",
                    ZALGO_PROMISE: "postrobot_zalgo_promise",
                    REGEX: "regex"
                },
                SEND_STRATEGIES: {
                    POST_MESSAGE: "postrobot_post_message",
                    BRIDGE: "postrobot_bridge",
                    GLOBAL: "postrobot_global"
                },
                MOCK_PROTOCOL: "mock:",
                FILE_PROTOCOL: "file:",
                BRIDGE_NAME_PREFIX: "__postrobot_bridge__",
                POSTROBOT_PROXY: "__postrobot_proxy__",
                WILDCARD: "*"
            }, POST_MESSAGE_NAMES = {
                METHOD: "postrobot_method",
                HELLO: "postrobot_hello",
                OPEN_TUNNEL: "postrobot_open_tunnel"
            }, CONFIG = (Object.keys(POST_MESSAGE_NAMES).map(function(key) {
                return POST_MESSAGE_NAMES[key];
            }), {
                ALLOW_POSTMESSAGE_POPUP: !("__ALLOW_POSTMESSAGE_POPUP__" in window) || window.__ALLOW_POSTMESSAGE_POPUP__,
                BRIDGE_TIMEOUT: 5e3,
                CHILD_WINDOW_TIMEOUT: 5e3,
                ACK_TIMEOUT: -1 !== window.navigator.userAgent.match(/MSIE/i) ? 1e4 : 2e3,
                RES_TIMEOUT: -1,
                ALLOWED_POST_MESSAGE_METHODS: (_ALLOWED_POST_MESSAGE = {}, _ALLOWED_POST_MESSAGE[constants_CONSTANTS.SEND_STRATEGIES.POST_MESSAGE] = !0, 
                _ALLOWED_POST_MESSAGE[constants_CONSTANTS.SEND_STRATEGIES.BRIDGE] = !0, _ALLOWED_POST_MESSAGE[constants_CONSTANTS.SEND_STRATEGIES.GLOBAL] = !0, 
                _ALLOWED_POST_MESSAGE),
                ALLOW_SAME_ORIGIN: !1
            });
            0 === window.location.href.indexOf(constants_CONSTANTS.FILE_PROTOCOL) && (CONFIG.ALLOW_POSTMESSAGE_POPUP = !0);
            var _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj) {
                return typeof obj;
            } : function(obj) {
                return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
            };
            function stringifyError(err) {
                var level = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 1;
                if (level >= 3) return "stringifyError stack overflow";
                try {
                    if (!err) return "<unknown error: " + Object.prototype.toString.call(err) + ">";
                    if ("string" == typeof err) return err;
                    if (err instanceof Error) {
                        var stack = err && err.stack, message = err && err.message;
                        if (stack && message) return -1 !== stack.indexOf(message) ? stack : message + "\n" + stack;
                        if (stack) return stack;
                        if (message) return message;
                    }
                    return "function" == typeof err.toString ? err.toString() : Object.prototype.toString.call(err);
                } catch (newErr) {
                    return "Error while stringifying error: " + stringifyError(newErr, level + 1);
                }
            }
            var once = function(method) {
                if (!method) return method;
                var called = !1;
                return function() {
                    if (!called) {
                        called = !0;
                        return method.apply(this, arguments);
                    }
                };
            };
            function lib_util_noop() {}
            function uniqueID() {
                var chars = "0123456789abcdef";
                return "xxxxxxxxxx".replace(/./g, function() {
                    return chars.charAt(Math.floor(Math.random() * chars.length));
                });
            }
            function replaceObject(item, callback) {
                var depth = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 1;
                if (depth >= 100) throw new Error("Self-referential object passed, or object contained too many layers");
                var newobj = void 0;
                if ("object" !== (void 0 === item ? "undefined" : _typeof(item)) || null === item || Array.isArray(item)) {
                    if (!Array.isArray(item)) throw new TypeError("Invalid type: " + (void 0 === item ? "undefined" : _typeof(item)));
                    newobj = [];
                } else newobj = {};
                !function(item, callback) {
                    Array.isArray(item) ? function(item, callback) {
                        for (var i = 0; i < item.length; i++) callback(item[i], i);
                    }(item, callback) : "object" === (void 0 === item ? "undefined" : _typeof(item)) && null !== item && function(item, callback) {
                        for (var _key in item) item.hasOwnProperty(_key) && callback(item[_key], _key);
                    }(item, callback);
                }(item, function(childItem, key) {
                    var result = callback(childItem, key);
                    void 0 !== result ? newobj[key] = result : "object" === (void 0 === childItem ? "undefined" : _typeof(childItem)) && null !== childItem ? newobj[key] = replaceObject(childItem, callback, depth + 1) : newobj[key] = childItem;
                });
                return newobj;
            }
            function util_isRegex(item) {
                return "[object RegExp]" === Object.prototype.toString.call(item);
            }
            function utils_isPromise(item) {
                try {
                    if (!item) return !1;
                    if ("undefined" != typeof Promise && item instanceof Promise) return !0;
                    if ("undefined" != typeof window && "function" == typeof window.Window && item instanceof window.Window) return !1;
                    if ("undefined" != typeof window && "function" == typeof window.constructor && item instanceof window.constructor) return !1;
                    var _toString = {}.toString;
                    if (_toString) {
                        var name = _toString.call(item);
                        if ("[object Window]" === name || "[object global]" === name || "[object DOMWindow]" === name) return !1;
                    }
                    if ("function" == typeof item.then) return !0;
                } catch (err) {
                    return !1;
                }
                return !1;
            }
            var dispatchedErrors = [], possiblyUnhandledPromiseHandlers = [], activeCount = 0, flushPromise = void 0;
            function flushActive() {
                if (!activeCount && flushPromise) {
                    var promise = flushPromise;
                    flushPromise = null;
                    promise.resolve();
                }
            }
            function startActive() {
                activeCount += 1;
            }
            function endActive() {
                activeCount -= 1;
                flushActive();
            }
            var promise_ZalgoPromise = function() {
                function ZalgoPromise(handler) {
                    var _this = this;
                    !function(instance, Constructor) {
                        if (!(instance instanceof ZalgoPromise)) throw new TypeError("Cannot call a class as a function");
                    }(this);
                    this.resolved = !1;
                    this.rejected = !1;
                    this.errorHandled = !1;
                    this.handlers = [];
                    if (handler) {
                        var _result = void 0, _error = void 0, resolved = !1, rejected = !1, isAsync = !1;
                        startActive();
                        try {
                            handler(function(res) {
                                if (isAsync) _this.resolve(res); else {
                                    resolved = !0;
                                    _result = res;
                                }
                            }, function(err) {
                                if (isAsync) _this.reject(err); else {
                                    rejected = !0;
                                    _error = err;
                                }
                            });
                        } catch (err) {
                            endActive();
                            this.reject(err);
                            return;
                        }
                        endActive();
                        isAsync = !0;
                        resolved ? this.resolve(_result) : rejected && this.reject(_error);
                    }
                }
                ZalgoPromise.prototype.resolve = function(result) {
                    if (this.resolved || this.rejected) return this;
                    if (utils_isPromise(result)) throw new Error("Can not resolve promise with another promise");
                    this.resolved = !0;
                    this.value = result;
                    this.dispatch();
                    return this;
                };
                ZalgoPromise.prototype.reject = function(error) {
                    var _this2 = this;
                    if (this.resolved || this.rejected) return this;
                    if (utils_isPromise(error)) throw new Error("Can not reject promise with another promise");
                    if (!error) {
                        var _err = error && "function" == typeof error.toString ? error.toString() : Object.prototype.toString.call(error);
                        error = new Error("Expected reject to be called with Error, got " + _err);
                    }
                    this.rejected = !0;
                    this.error = error;
                    this.errorHandled || setTimeout(function() {
                        _this2.errorHandled || function(err, promise) {
                            if (-1 === dispatchedErrors.indexOf(err)) {
                                dispatchedErrors.push(err);
                                setTimeout(function() {
                                    throw err;
                                }, 1);
                                for (var j = 0; j < possiblyUnhandledPromiseHandlers.length; j++) possiblyUnhandledPromiseHandlers[j](err, promise);
                            }
                        }(error, _this2);
                    }, 1);
                    this.dispatch();
                    return this;
                };
                ZalgoPromise.prototype.asyncReject = function(error) {
                    this.errorHandled = !0;
                    this.reject(error);
                    return this;
                };
                ZalgoPromise.prototype.dispatch = function() {
                    var dispatching = this.dispatching, resolved = this.resolved, rejected = this.rejected, handlers = this.handlers;
                    if (!dispatching && (resolved || rejected)) {
                        this.dispatching = !0;
                        startActive();
                        for (var chain = function(firstPromise, secondPromise) {
                            return firstPromise.then(function(res) {
                                secondPromise.resolve(res);
                            }, function(err) {
                                secondPromise.reject(err);
                            });
                        }, i = 0; i < handlers.length; i++) {
                            var _handlers$i = handlers[i], _onSuccess = _handlers$i.onSuccess, _onError = _handlers$i.onError, _promise = _handlers$i.promise, _result2 = void 0;
                            if (resolved) try {
                                _result2 = _onSuccess ? _onSuccess(this.value) : this.value;
                            } catch (err) {
                                _promise.reject(err);
                                continue;
                            } else if (rejected) {
                                if (!_onError) {
                                    _promise.reject(this.error);
                                    continue;
                                }
                                try {
                                    _result2 = _onError(this.error);
                                } catch (err) {
                                    _promise.reject(err);
                                    continue;
                                }
                            }
                            if (_result2 instanceof ZalgoPromise && (_result2.resolved || _result2.rejected)) {
                                _result2.resolved ? _promise.resolve(_result2.value) : _promise.reject(_result2.error);
                                _result2.errorHandled = !0;
                            } else utils_isPromise(_result2) ? _result2 instanceof ZalgoPromise && (_result2.resolved || _result2.rejected) ? _result2.resolved ? _promise.resolve(_result2.value) : _promise.reject(_result2.error) : chain(_result2, _promise) : _promise.resolve(_result2);
                        }
                        handlers.length = 0;
                        this.dispatching = !1;
                        endActive();
                    }
                };
                ZalgoPromise.prototype.then = function(onSuccess, onError) {
                    if (onSuccess && "function" != typeof onSuccess && !onSuccess.call) throw new Error("Promise.then expected a function for success handler");
                    if (onError && "function" != typeof onError && !onError.call) throw new Error("Promise.then expected a function for error handler");
                    var promise = new ZalgoPromise();
                    this.handlers.push({
                        promise: promise,
                        onSuccess: onSuccess,
                        onError: onError
                    });
                    this.errorHandled = !0;
                    this.dispatch();
                    return promise;
                };
                ZalgoPromise.prototype.catch = function(onError) {
                    return this.then(void 0, onError);
                };
                ZalgoPromise.prototype.finally = function(onFinally) {
                    if (onFinally && "function" != typeof onFinally && !onFinally.call) throw new Error("Promise.finally expected a function");
                    return this.then(function(result) {
                        return ZalgoPromise.try(onFinally).then(function() {
                            return result;
                        });
                    }, function(err) {
                        return ZalgoPromise.try(onFinally).then(function() {
                            throw err;
                        });
                    });
                };
                ZalgoPromise.prototype.timeout = function(time, err) {
                    var _this3 = this;
                    if (this.resolved || this.rejected) return this;
                    var timeout = setTimeout(function() {
                        _this3.resolved || _this3.rejected || _this3.reject(err || new Error("Promise timed out after " + time + "ms"));
                    }, time);
                    return this.then(function(result) {
                        clearTimeout(timeout);
                        return result;
                    });
                };
                ZalgoPromise.prototype.toPromise = function() {
                    if ("undefined" == typeof Promise) throw new TypeError("Could not find Promise");
                    return Promise.resolve(this);
                };
                ZalgoPromise.resolve = function(value) {
                    return value instanceof ZalgoPromise ? value : utils_isPromise(value) ? new ZalgoPromise(function(resolve, reject) {
                        return value.then(resolve, reject);
                    }) : new ZalgoPromise().resolve(value);
                };
                ZalgoPromise.reject = function(error) {
                    return new ZalgoPromise().reject(error);
                };
                ZalgoPromise.asyncReject = function(error) {
                    return new ZalgoPromise().asyncReject(error);
                };
                ZalgoPromise.all = function(promises) {
                    var promise = new ZalgoPromise(), count = promises.length, results = [];
                    if (!count) {
                        promise.resolve(results);
                        return promise;
                    }
                    for (var chain = function(i, firstPromise, secondPromise) {
                        return firstPromise.then(function(res) {
                            results[i] = res;
                            0 == (count -= 1) && promise.resolve(results);
                        }, function(err) {
                            secondPromise.reject(err);
                        });
                    }, i = 0; i < promises.length; i++) {
                        var prom = promises[i];
                        if (prom instanceof ZalgoPromise) {
                            if (prom.resolved) {
                                results[i] = prom.value;
                                count -= 1;
                                continue;
                            }
                        } else if (!utils_isPromise(prom)) {
                            results[i] = prom;
                            count -= 1;
                            continue;
                        }
                        chain(i, ZalgoPromise.resolve(prom), promise);
                    }
                    0 === count && promise.resolve(results);
                    return promise;
                };
                ZalgoPromise.hash = function(promises) {
                    var result = {};
                    return ZalgoPromise.all(Object.keys(promises).map(function(key) {
                        return ZalgoPromise.resolve(promises[key]).then(function(value) {
                            result[key] = value;
                        });
                    })).then(function() {
                        return result;
                    });
                };
                ZalgoPromise.map = function(items, method) {
                    return ZalgoPromise.all(items.map(method));
                };
                ZalgoPromise.onPossiblyUnhandledException = function(handler) {
                    return function(handler) {
                        possiblyUnhandledPromiseHandlers.push(handler);
                        return {
                            cancel: function() {
                                possiblyUnhandledPromiseHandlers.splice(possiblyUnhandledPromiseHandlers.indexOf(handler), 1);
                            }
                        };
                    }(handler);
                };
                ZalgoPromise.try = function(method, context, args) {
                    if (method && "function" != typeof method && !method.call) throw new Error("Promise.try expected a function");
                    var result = void 0;
                    startActive();
                    try {
                        result = method.apply(context, args || []);
                    } catch (err) {
                        endActive();
                        return ZalgoPromise.reject(err);
                    }
                    endActive();
                    return ZalgoPromise.resolve(result);
                };
                ZalgoPromise.delay = function(_delay) {
                    return new ZalgoPromise(function(resolve) {
                        setTimeout(resolve, _delay);
                    });
                };
                ZalgoPromise.isPromise = function(value) {
                    return !!(value && value instanceof ZalgoPromise) || utils_isPromise(value);
                };
                ZalgoPromise.flush = function() {
                    return function(Zalgo) {
                        var promise = flushPromise = flushPromise || new ZalgoPromise();
                        flushActive();
                        return promise;
                    }();
                };
                return ZalgoPromise;
            }(), global = window[constants_CONSTANTS.WINDOW_PROPS.POSTROBOT] = window[constants_CONSTANTS.WINDOW_PROPS.POSTROBOT] || {};
            global.registerSelf = function() {};
            var serialize__typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj) {
                return typeof obj;
            } : function(obj) {
                return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
            };
            global.methods = global.methods || new weakmap_CrossDomainSafeWeakMap();
            var listenForMethods = once(function() {
                global.on(constants_CONSTANTS.POST_MESSAGE_NAMES.METHOD, {
                    origin: constants_CONSTANTS.WILDCARD
                }, function(_ref) {
                    var source = _ref.source, origin = _ref.origin, data = _ref.data, methods = global.methods.get(source);
                    if (!methods) throw new Error("Could not find any methods this window has privileges to call");
                    var meth = methods[data.id];
                    if (!meth) throw new Error("Could not find method with id: " + data.id);
                    if (!matchDomain(meth.domain, origin)) throw new Error("Method domain " + meth.domain + " does not match origin " + origin);
                    return promise_ZalgoPromise.try(function() {
                        return meth.method.apply({
                            source: source,
                            origin: origin,
                            data: data
                        }, data.args);
                    }).then(function(result) {
                        return {
                            result: result,
                            id: data.id,
                            name: data.name
                        };
                    });
                });
            });
            function isSerialized(item, type) {
                return "object" === (void 0 === item ? "undefined" : serialize__typeof(item)) && null !== item && item.__type__ === type;
            }
            function serializeMethod(destination, domain, method, name) {
                var id = uniqueID(), methods = global.methods.get(destination);
                if (!methods) {
                    methods = {};
                    global.methods.set(destination, methods);
                }
                methods[id] = {
                    domain: domain,
                    method: method
                };
                return {
                    __type__: constants_CONSTANTS.SERIALIZATION_TYPES.METHOD,
                    __id__: id,
                    __name__: name
                };
            }
            function deserializeMethod(source, origin, obj) {
                function wrapper() {
                    var args = Array.prototype.slice.call(arguments);
                    return global.send(source, constants_CONSTANTS.POST_MESSAGE_NAMES.METHOD, {
                        id: obj.__id__,
                        name: obj.__name__,
                        args: args
                    }, {
                        domain: origin,
                        timeout: -1
                    }).then(function(_ref2) {
                        return _ref2.data.result;
                    }, function(err) {
                        throw err;
                    });
                }
                wrapper.__name__ = obj.__name__;
                wrapper.__xdomain__ = !0;
                wrapper.source = source;
                wrapper.origin = origin;
                return wrapper;
            }
            function deserializeZalgoPromise(source, origin, prom) {
                return new promise_ZalgoPromise(function(resolve, reject) {
                    return deserializeMethod(source, origin, prom.__then__)(resolve, reject);
                });
            }
            global.readyPromises = global.readyPromises || new weakmap_CrossDomainSafeWeakMap();
            function sayHello(win) {
                return global.send(win, constants_CONSTANTS.POST_MESSAGE_NAMES.HELLO, {}, {
                    domain: constants_CONSTANTS.WILDCARD,
                    timeout: -1
                }).then(function(_ref2) {
                    return {
                        origin: _ref2.origin
                    };
                });
            }
            var SEND_MESSAGE_STRATEGIES = {};
            SEND_MESSAGE_STRATEGIES[constants_CONSTANTS.SEND_STRATEGIES.POST_MESSAGE] = function(win, serializedMessage, domain) {
                (Array.isArray(domain) ? domain : "string" == typeof domain ? [ domain ] : [ constants_CONSTANTS.WILDCARD ]).map(function(dom) {
                    if (0 === dom.indexOf(constants_CONSTANTS.MOCK_PROTOCOL)) {
                        if (window.location.protocol === constants_CONSTANTS.FILE_PROTOCOL) return constants_CONSTANTS.WILDCARD;
                        if (!isActuallySameDomain(win)) throw new Error("Attempting to send messsage to mock domain " + dom + ", but window is actually cross-domain");
                        return getActualDomain(win);
                    }
                    return 0 === dom.indexOf(constants_CONSTANTS.FILE_PROTOCOL) ? constants_CONSTANTS.WILDCARD : dom;
                }).forEach(function(dom) {
                    return win.postMessage(serializedMessage, dom);
                });
            };
            var _extends = Object.assign || function(target) {
                for (var i = 1; i < arguments.length; i++) {
                    var source = arguments[i];
                    for (var key in source) Object.prototype.hasOwnProperty.call(source, key) && (target[key] = source[key]);
                }
                return target;
            };
            function sendMessage(win, message, domain) {
                return promise_ZalgoPromise.try(function() {
                    var _jsonStringify;
                    message = function(win, message) {
                        var options = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {}, id = uniqueID(), type = function() {
                            var win = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : window;
                            return Boolean(getOpener(win));
                        }() ? constants_CONSTANTS.WINDOW_TYPES.POPUP : function() {
                            var win = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : window;
                            return Boolean(getParent(win));
                        }() ? constants_CONSTANTS.WINDOW_TYPES.IFRAME : constants_CONSTANTS.WINDOW_TYPES.FULLPAGE, sourceDomain = utils_getDomain(window);
                        return _extends({}, message, options, {
                            sourceDomain: sourceDomain,
                            id: message.id || id,
                            windowType: type
                        });
                    }(win, message, {
                        data: function(destination, domain, obj) {
                            return replaceObject({
                                obj: message.data
                            }, function(item, key) {
                                return "function" == typeof item ? serializeMethod(destination, domain, item, key.toString()) : item instanceof Error ? (err = item, 
                                {
                                    __type__: constants_CONSTANTS.SERIALIZATION_TYPES.ERROR,
                                    __message__: stringifyError(err),
                                    __code__: err.code
                                }) : window.Promise && item instanceof window.Promise ? function(destination, domain, promise, name) {
                                    return {
                                        __type__: constants_CONSTANTS.SERIALIZATION_TYPES.PROMISE,
                                        __then__: serializeMethod(destination, domain, function(resolve, reject) {
                                            return promise.then(resolve, reject);
                                        }, name + ".then")
                                    };
                                }(destination, domain, item, key.toString()) : promise_ZalgoPromise.isPromise(item) ? function(destination, domain, promise, name) {
                                    return {
                                        __type__: constants_CONSTANTS.SERIALIZATION_TYPES.ZALGO_PROMISE,
                                        __then__: serializeMethod(destination, domain, function(resolve, reject) {
                                            return promise.then(resolve, reject);
                                        }, name + ".then")
                                    };
                                }(destination, domain, item, key.toString()) : util_isRegex(item) ? (regex = item, 
                                {
                                    __type__: constants_CONSTANTS.SERIALIZATION_TYPES.REGEX,
                                    __source__: regex.source
                                }) : void 0;
                                var err, regex;
                            }).obj;
                        }(win, domain),
                        domain: domain
                    });
                    if (win === window && !CONFIG.ALLOW_SAME_ORIGIN) throw new Error("Attemping to send message to self");
                    if (isWindowClosed(win)) throw new Error("Window is closed");
                    var messages = [], serializedMessage = function(obj, replacer, indent) {
                        var objectToJSON = void 0, arrayToJSON = void 0;
                        try {
                            if ("{}" !== JSON.stringify({})) {
                                objectToJSON = Object.prototype.toJSON;
                                delete Object.prototype.toJSON;
                            }
                            if ("{}" !== JSON.stringify({})) throw new Error("Can not correctly serialize JSON objects");
                            if ("[]" !== JSON.stringify([])) {
                                arrayToJSON = Array.prototype.toJSON;
                                delete Array.prototype.toJSON;
                            }
                            if ("[]" !== JSON.stringify([])) throw new Error("Can not correctly serialize JSON objects");
                        } catch (err) {
                            throw new Error("Can not repair JSON.stringify: " + err.message);
                        }
                        var result = JSON.stringify.call(this, obj, null, 2);
                        try {
                            objectToJSON && (Object.prototype.toJSON = objectToJSON);
                            arrayToJSON && (Array.prototype.toJSON = arrayToJSON);
                        } catch (err) {
                            throw new Error("Can not repair JSON.stringify: " + err.message);
                        }
                        return result;
                    }(((_jsonStringify = {})[constants_CONSTANTS.WINDOW_PROPS.POSTROBOT] = message, 
                    _jsonStringify));
                    return promise_ZalgoPromise.map(Object.keys(SEND_MESSAGE_STRATEGIES), function(strategyName) {
                        return promise_ZalgoPromise.try(function() {
                            if (!CONFIG.ALLOWED_POST_MESSAGE_METHODS[strategyName]) throw new Error("Strategy disallowed: " + strategyName);
                            return SEND_MESSAGE_STRATEGIES[strategyName](win, serializedMessage, domain);
                        }).then(function() {
                            messages.push(strategyName + ": success");
                            return !0;
                        }, function(err) {
                            messages.push(strategyName + ": " + stringifyError(err) + "\n");
                            return !1;
                        });
                    }).then(function(results) {
                        var success = results.some(Boolean), status = message.type + " " + message.name + " " + (success ? "success" : "error") + ":\n  - " + messages.join("\n  - ") + "\n";
                        if (!success) throw new Error(status);
                    });
                });
            }
            global.responseListeners = global.responseListeners || {};
            global.requestListeners = global.requestListeners || {};
            global.WINDOW_WILDCARD = global.WINDOW_WILDCARD || new function() {}();
            global.erroredResponseListeners = global.erroredResponseListeners || {};
            var _RECEIVE_MESSAGE_TYPE, __DOMAIN_REGEX__ = "__domain_regex__";
            function getResponseListener(hash) {
                return global.responseListeners[hash];
            }
            function deleteResponseListener(hash) {
                delete global.responseListeners[hash];
            }
            function isResponseListenerErrored(hash) {
                return Boolean(global.erroredResponseListeners[hash]);
            }
            function getRequestListener(_ref) {
                var name = _ref.name, win = _ref.win, domain = _ref.domain;
                win === constants_CONSTANTS.WILDCARD && (win = null);
                domain === constants_CONSTANTS.WILDCARD && (domain = null);
                if (!name) throw new Error("Name required to get request listener");
                var nameListeners = global.requestListeners[name];
                if (nameListeners) for (var _i2 = 0, _ref3 = [ win, global.WINDOW_WILDCARD ], _length2 = null == _ref3 ? 0 : _ref3.length; _i2 < _length2; _i2++) {
                    var winQualifier = _ref3[_i2], winListeners = winQualifier && nameListeners.get(winQualifier);
                    if (winListeners) {
                        if (domain && "string" == typeof domain) {
                            if (winListeners[domain]) return winListeners[domain];
                            if (winListeners[__DOMAIN_REGEX__]) for (var _i4 = 0, _winListeners$__DOMAI2 = winListeners[__DOMAIN_REGEX__], _length4 = null == _winListeners$__DOMAI2 ? 0 : _winListeners$__DOMAI2.length; _i4 < _length4; _i4++) {
                                var _ref5 = _winListeners$__DOMAI2[_i4], regex = _ref5.regex, listener = _ref5.listener;
                                if (matchDomain(regex, domain)) return listener;
                            }
                        }
                        if (winListeners[constants_CONSTANTS.WILDCARD]) return winListeners[constants_CONSTANTS.WILDCARD];
                    }
                }
            }
            var types__extends = Object.assign || function(target) {
                for (var i = 1; i < arguments.length; i++) {
                    var source = arguments[i];
                    for (var key in source) Object.prototype.hasOwnProperty.call(source, key) && (target[key] = source[key]);
                }
                return target;
            }, RECEIVE_MESSAGE_TYPES = ((_RECEIVE_MESSAGE_TYPE = {})[constants_CONSTANTS.POST_MESSAGE_TYPE.ACK] = function(source, origin, message) {
                if (!isResponseListenerErrored(message.hash)) {
                    var options = getResponseListener(message.hash);
                    if (!options) throw new Error("No handler found for post message ack for message: " + message.name + " from " + origin + " in " + window.location.protocol + "//" + window.location.host + window.location.pathname);
                    if (!matchDomain(options.domain, origin)) throw new Error("Ack origin " + origin + " does not match domain " + options.domain.toString());
                    options.ack = !0;
                }
            }, _RECEIVE_MESSAGE_TYPE[constants_CONSTANTS.POST_MESSAGE_TYPE.REQUEST] = function(source, origin, message) {
                var options = getRequestListener({
                    name: message.name,
                    win: source,
                    domain: origin
                });
                function respond(data) {
                    return message.fireAndForget || isWindowClosed(source) ? promise_ZalgoPromise.resolve() : sendMessage(source, types__extends({
                        target: message.originalSource,
                        hash: message.hash,
                        name: message.name
                    }, data), origin);
                }
                return promise_ZalgoPromise.all([ respond({
                    type: constants_CONSTANTS.POST_MESSAGE_TYPE.ACK
                }), promise_ZalgoPromise.try(function() {
                    if (!options) throw new Error("No handler found for post message: " + message.name + " from " + origin + " in " + window.location.protocol + "//" + window.location.host + window.location.pathname);
                    if (!matchDomain(options.domain, origin)) throw new Error("Request origin " + origin + " does not match domain " + options.domain.toString());
                    var data = message.data;
                    return options.handler({
                        source: source,
                        origin: origin,
                        data: data
                    });
                }).then(function(data) {
                    return respond({
                        type: constants_CONSTANTS.POST_MESSAGE_TYPE.RESPONSE,
                        ack: constants_CONSTANTS.POST_MESSAGE_ACK.SUCCESS,
                        data: data
                    });
                }, function(err) {
                    var error = stringifyError(err).replace(/^Error: /, ""), code = err.code;
                    return respond({
                        type: constants_CONSTANTS.POST_MESSAGE_TYPE.RESPONSE,
                        ack: constants_CONSTANTS.POST_MESSAGE_ACK.ERROR,
                        error: error,
                        code: code
                    });
                }) ]).then(lib_util_noop).catch(function(err) {
                    if (options && options.handleError) return options.handleError(err);
                    throw err;
                });
            }, _RECEIVE_MESSAGE_TYPE[constants_CONSTANTS.POST_MESSAGE_TYPE.RESPONSE] = function(source, origin, message) {
                if (!isResponseListenerErrored(message.hash)) {
                    var pattern, options = getResponseListener(message.hash);
                    if (!options) throw new Error("No handler found for post message response for message: " + message.name + " from " + origin + " in " + window.location.protocol + "//" + window.location.host + window.location.pathname);
                    if (!matchDomain(options.domain, origin)) throw new Error("Response origin " + origin + " does not match domain " + (pattern = options.domain, 
                    Array.isArray(pattern) ? "(" + pattern.join(" | ") + ")" : isRegex(pattern) ? "RegExp(" + pattern.toString() : pattern.toString()));
                    deleteResponseListener(message.hash);
                    if (message.ack === constants_CONSTANTS.POST_MESSAGE_ACK.ERROR) {
                        var err = new Error(message.error);
                        message.code && (err.code = message.code);
                        return options.respond(err, null);
                    }
                    if (message.ack === constants_CONSTANTS.POST_MESSAGE_ACK.SUCCESS) {
                        var data = message.data || message.response;
                        return options.respond(null, {
                            source: source,
                            origin: origin,
                            data: data
                        });
                    }
                }
            }, _RECEIVE_MESSAGE_TYPE), receive__typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj) {
                return typeof obj;
            } : function(obj) {
                return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
            };
            global.receivedMessages = global.receivedMessages || [];
            function receiveMessage(event) {
                if (window && !window.closed) {
                    try {
                        if (!event.source) return;
                    } catch (err) {
                        return;
                    }
                    var source = event.source, origin = event.origin, message = function(message) {
                        var item, parsedMessage = void 0;
                        try {
                            parsedMessage = (item = message, JSON.parse(item));
                        } catch (err) {
                            return;
                        }
                        if (parsedMessage && "object" === (void 0 === parsedMessage ? "undefined" : receive__typeof(parsedMessage)) && null !== parsedMessage && (parsedMessage = parsedMessage[constants_CONSTANTS.WINDOW_PROPS.POSTROBOT]) && "object" === (void 0 === parsedMessage ? "undefined" : receive__typeof(parsedMessage)) && null !== parsedMessage && parsedMessage.type && "string" == typeof parsedMessage.type && RECEIVE_MESSAGE_TYPES[parsedMessage.type]) return parsedMessage;
                    }(event.data);
                    if (message) {
                        if (!message.sourceDomain || "string" != typeof message.sourceDomain) throw new Error("Expected message to have sourceDomain");
                        0 !== message.sourceDomain.indexOf(constants_CONSTANTS.MOCK_PROTOCOL) && 0 !== message.sourceDomain.indexOf(constants_CONSTANTS.FILE_PROTOCOL) || (origin = message.sourceDomain);
                        if (-1 === global.receivedMessages.indexOf(message.id)) {
                            global.receivedMessages.push(message.id);
                            if (!isWindowClosed(source) || message.fireAndForget) {
                                message.data && (message.data = function(source, origin, obj) {
                                    return replaceObject({
                                        obj: message.data
                                    }, function(item) {
                                        if ("object" === (void 0 === item ? "undefined" : serialize__typeof(item)) && null !== item) return isSerialized(item, constants_CONSTANTS.SERIALIZATION_TYPES.METHOD) ? deserializeMethod(source, origin, item) : isSerialized(item, constants_CONSTANTS.SERIALIZATION_TYPES.ERROR) ? function(source, origin, obj) {
                                            var err = new Error(obj.__message__);
                                            obj.__code__ && (err.code = obj.__code__);
                                            return err;
                                        }(0, 0, item) : isSerialized(item, constants_CONSTANTS.SERIALIZATION_TYPES.PROMISE) ? function(source, origin, prom) {
                                            return window.Promise ? new window.Promise(function(resolve, reject) {
                                                return deserializeMethod(source, origin, prom.__then__)(resolve, reject);
                                            }) : deserializeZalgoPromise(source, origin, prom);
                                        }(source, origin, item) : isSerialized(item, constants_CONSTANTS.SERIALIZATION_TYPES.ZALGO_PROMISE) ? deserializeZalgoPromise(source, origin, item) : isSerialized(item, constants_CONSTANTS.SERIALIZATION_TYPES.REGEX) ? function(source, origin, item) {
                                            return new RegExp(item.__source__);
                                        }(0, 0, item) : void 0;
                                    }).obj;
                                }(source, origin));
                                RECEIVE_MESSAGE_TYPES[message.type](source, origin, message);
                            }
                        }
                    }
                }
            }
            function messageListener(event) {
                try {
                    event.source;
                } catch (err) {
                    return;
                }
                receiveMessage({
                    source: event.source || event.sourceElement,
                    origin: event.origin || event.originalEvent && event.originalEvent.origin,
                    data: event.data
                });
            }
            global.receiveMessage = receiveMessage;
            global.requestPromises = global.requestPromises || new weakmap_CrossDomainSafeWeakMap();
            function request(options) {
                return promise_ZalgoPromise.try(function() {
                    if (!options.name) throw new Error("Expected options.name");
                    var name = options.name, targetWindow = void 0, domain = void 0;
                    if ("string" == typeof options.window) {
                        var el = document.getElementById(options.window);
                        if (!el) throw new Error("Expected options.window " + Object.prototype.toString.call(options.window) + " to be a valid element id");
                        if ("iframe" !== el.tagName.toLowerCase()) throw new Error("Expected options.window " + Object.prototype.toString.call(options.window) + " to be an iframe");
                        if (!el.contentWindow) throw new Error("Iframe must have contentWindow.  Make sure it has a src attribute and is in the DOM.");
                        targetWindow = el.contentWindow;
                    } else if (options.window instanceof HTMLIFrameElement) {
                        if ("iframe" !== options.window.tagName.toLowerCase()) throw new Error("Expected options.window " + Object.prototype.toString.call(options.window) + " to be an iframe");
                        if (options.window && !options.window.contentWindow) throw new Error("Iframe must have contentWindow.  Make sure it has a src attribute and is in the DOM.");
                        options.window && options.window.contentWindow && (targetWindow = options.window.contentWindow);
                    } else targetWindow = options.window;
                    if (!targetWindow) throw new Error("Expected options.window to be a window object, iframe, or iframe element id.");
                    var win = targetWindow;
                    domain = options.domain || constants_CONSTANTS.WILDCARD;
                    var hash = options.name + "_" + uniqueID();
                    if (isWindowClosed(win)) throw new Error("Target window is closed");
                    var hasResult = !1, requestPromises = global.requestPromises.get(win);
                    if (!requestPromises) {
                        requestPromises = [];
                        global.requestPromises.set(win, requestPromises);
                    }
                    var requestPromise = promise_ZalgoPromise.try(function() {
                        if (function(parent, child) {
                            var actualParent = getAncestor(child);
                            if (actualParent) return actualParent === parent;
                            if (child === parent) return !1;
                            if (function() {
                                var win = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : window;
                                try {
                                    if (win.top) return win.top;
                                } catch (err) {}
                                if (getParent(win) === win) return win;
                                try {
                                    if (isAncestorParent(window, win) && window.top) return window.top;
                                } catch (err) {}
                                try {
                                    if (isAncestorParent(win, window) && window.top) return window.top;
                                } catch (err) {}
                                for (var _i7 = 0, _getAllChildFrames4 = function getAllChildFrames(win) {
                                    for (var result = [], _i3 = 0, _getFrames2 = getFrames(win), _length2 = null == _getFrames2 ? 0 : _getFrames2.length; _i3 < _length2; _i3++) {
                                        var frame = _getFrames2[_i3];
                                        result.push(frame);
                                        for (var _i5 = 0, _getAllChildFrames2 = getAllChildFrames(frame), _length4 = null == _getAllChildFrames2 ? 0 : _getAllChildFrames2.length; _i5 < _length4; _i5++) {
                                            var childFrame = _getAllChildFrames2[_i5];
                                            result.push(childFrame);
                                        }
                                    }
                                    return result;
                                }(win), _length6 = null == _getAllChildFrames4 ? 0 : _getAllChildFrames4.length; _i7 < _length6; _i7++) {
                                    var frame = _getAllChildFrames4[_i7];
                                    try {
                                        if (frame.top) return frame.top;
                                    } catch (err) {}
                                    if (getParent(frame) === frame) return frame;
                                }
                            }(child) === child) return !1;
                            for (var _i15 = 0, _getFrames8 = getFrames(parent), _length14 = null == _getFrames8 ? 0 : _getFrames8.length; _i15 < _length14; _i15++) if (_getFrames8[_i15] === child) return !0;
                            return !1;
                        }(window, win)) return function(win) {
                            var timeout = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 5e3, name = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "Window", promise = global.readyPromises.get(win);
                            if (promise) return promise;
                            promise = new promise_ZalgoPromise();
                            global.readyPromises.set(win, promise);
                            -1 !== timeout && setTimeout(function() {
                                return promise.reject(new Error(name + " did not load after " + timeout + "ms"));
                            }, timeout);
                            return promise;
                        }(win, options.timeout || CONFIG.CHILD_WINDOW_TIMEOUT);
                    }).then(function() {
                        var origin = (arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}).origin;
                        if (util_isRegex(domain) && !origin) return sayHello(win);
                    }).then(function() {
                        var origin = (arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}).origin;
                        if (util_isRegex(domain)) {
                            if (!matchDomain(domain, origin)) throw new Error("Remote window domain " + origin + " does not match regex: " + domain.toString());
                            domain = origin;
                        }
                        if ("string" != typeof domain && !Array.isArray(domain)) throw new TypeError("Expected domain to be a string or array");
                        var actualDomain = domain;
                        return new promise_ZalgoPromise(function(resolve, reject) {
                            var responseListener = void 0;
                            options.fireAndForget || function(hash, listener) {
                                global.responseListeners[hash] = listener;
                            }(hash, responseListener = {
                                name: name,
                                window: win,
                                domain: actualDomain,
                                respond: function(err, result) {
                                    if (!err) {
                                        hasResult = !0;
                                        requestPromises.splice(requestPromises.indexOf(requestPromise, 1));
                                    }
                                    err ? reject(err) : resolve(result);
                                }
                            });
                            sendMessage(win, {
                                type: constants_CONSTANTS.POST_MESSAGE_TYPE.REQUEST,
                                hash: hash,
                                name: name,
                                data: options.data,
                                fireAndForget: options.fireAndForget
                            }, actualDomain).catch(reject);
                            if (options.fireAndForget) return resolve();
                            var ackTimeout = CONFIG.ACK_TIMEOUT, resTimeout = options.timeout || CONFIG.RES_TIMEOUT, cycleTime = 100;
                            setTimeout(function cycle() {
                                if (!hasResult) {
                                    if (isWindowClosed(win)) return responseListener.ack ? reject(new Error("Window closed for " + name + " before response")) : reject(new Error("Window closed for " + name + " before ack"));
                                    ackTimeout = Math.max(ackTimeout - cycleTime, 0);
                                    -1 !== resTimeout && (resTimeout = Math.max(resTimeout - cycleTime, 0));
                                    if (responseListener.ack) {
                                        if (-1 === resTimeout) return;
                                        cycleTime = Math.min(resTimeout, 2e3);
                                    } else {
                                        if (0 === ackTimeout) return reject(new Error("No ack for postMessage " + name + " in " + utils_getDomain() + " in " + CONFIG.ACK_TIMEOUT + "ms"));
                                        if (0 === resTimeout) return reject(new Error("No response for postMessage " + name + " in " + utils_getDomain() + " in " + (options.timeout || CONFIG.RES_TIMEOUT) + "ms"));
                                    }
                                    setTimeout(cycle, cycleTime);
                                }
                            }, cycleTime);
                        });
                    });
                    requestPromise.catch(function() {
                        !function(hash) {
                            global.erroredResponseListeners[hash] = !0;
                        }(hash);
                        deleteResponseListener(hash);
                    });
                    requestPromises.push(requestPromise);
                    return requestPromise;
                });
            }
            function _send(window, name, data, options) {
                (options = options || {}).window = window;
                options.name = name;
                options.data = data;
                return request(options);
            }
            function sendToParent(name, data, options) {
                var win = getAncestor();
                return win ? _send(win, name, data, options) : new promise_ZalgoPromise(function(resolve, reject) {
                    return reject(new Error("Window does not have a parent"));
                });
            }
            function client() {
                var options = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                if (!options.window) throw new Error("Expected options.window");
                var win = options.window;
                return {
                    send: function(name, data) {
                        return _send(win, name, data, options);
                    }
                };
            }
            global.send = _send;
            var server__typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj) {
                return typeof obj;
            } : function(obj) {
                return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
            };
            function listen(options) {
                if (!options.name) throw new Error("Expected options.name");
                if (!options.handler) throw new Error("Expected options.handler");
                var name = options.name, win = options.window, domain = options.domain, listenerOptions = {
                    handler: options.handler,
                    handleError: options.errorHandler || function(err) {
                        throw err;
                    },
                    window: win,
                    domain: domain || constants_CONSTANTS.WILDCARD,
                    name: name
                }, requestListener = function addRequestListener(_ref6, listener) {
                    var name = _ref6.name, win = _ref6.win, domain = _ref6.domain;
                    if (!name || "string" != typeof name) throw new Error("Name required to add request listener");
                    if (Array.isArray(win)) {
                        for (var listenersCollection = [], _i6 = 0, _win2 = win, _length6 = null == _win2 ? 0 : _win2.length; _i6 < _length6; _i6++) {
                            var item = _win2[_i6];
                            listenersCollection.push(addRequestListener({
                                name: name,
                                domain: domain,
                                win: item
                            }, listener));
                        }
                        return {
                            cancel: function() {
                                for (var _i8 = 0, _length8 = null == listenersCollection ? 0 : listenersCollection.length; _i8 < _length8; _i8++) listenersCollection[_i8].cancel();
                            }
                        };
                    }
                    if (Array.isArray(domain)) {
                        for (var _listenersCollection = [], _i10 = 0, _domain2 = domain, _length10 = null == _domain2 ? 0 : _domain2.length; _i10 < _length10; _i10++) {
                            var _item = _domain2[_i10];
                            _listenersCollection.push(addRequestListener({
                                name: name,
                                win: win,
                                domain: _item
                            }, listener));
                        }
                        return {
                            cancel: function() {
                                for (var _i12 = 0, _length12 = null == _listenersCollection ? 0 : _listenersCollection.length; _i12 < _length12; _i12++) _listenersCollection[_i12].cancel();
                            }
                        };
                    }
                    var existingListener = getRequestListener({
                        name: name,
                        win: win,
                        domain: domain
                    });
                    win && win !== constants_CONSTANTS.WILDCARD || (win = global.WINDOW_WILDCARD);
                    domain = domain || constants_CONSTANTS.WILDCARD;
                    if (existingListener) throw win && domain ? new Error("Request listener already exists for " + name + " on domain " + domain.toString() + " for " + (win === global.WINDOW_WILDCARD ? "wildcard" : "specified") + " window") : win ? new Error("Request listener already exists for " + name + " for " + (win === global.WINDOW_WILDCARD ? "wildcard" : "specified") + " window") : domain ? new Error("Request listener already exists for " + name + " on domain " + domain.toString()) : new Error("Request listener already exists for " + name);
                    var requestListeners = global.requestListeners, nameListeners = requestListeners[name];
                    if (!nameListeners) {
                        nameListeners = new weakmap_CrossDomainSafeWeakMap();
                        requestListeners[name] = nameListeners;
                    }
                    var winListeners = nameListeners.get(win);
                    if (!winListeners) {
                        winListeners = {};
                        nameListeners.set(win, winListeners);
                    }
                    var strDomain = domain.toString(), regexListeners = winListeners[__DOMAIN_REGEX__], regexListener = void 0;
                    if (util_isRegex(domain)) {
                        if (!regexListeners) {
                            regexListeners = [];
                            winListeners[__DOMAIN_REGEX__] = regexListeners;
                        }
                        regexListener = {
                            regex: domain,
                            listener: listener
                        };
                        regexListeners.push(regexListener);
                    } else winListeners[strDomain] = listener;
                    return {
                        cancel: function() {
                            if (winListeners) {
                                delete winListeners[strDomain];
                                win && 0 === Object.keys(winListeners).length && nameListeners.delete(win);
                                regexListener && regexListeners.splice(regexListeners.indexOf(regexListener, 1));
                            }
                        }
                    };
                }({
                    name: name,
                    win: win,
                    domain: domain
                }, listenerOptions);
                if (options.once) {
                    var _handler = listenerOptions.handler;
                    listenerOptions.handler = once(function() {
                        requestListener.cancel();
                        return _handler.apply(this, arguments);
                    });
                }
                if (listenerOptions.window && options.errorOnClose) var interval = function(method, time) {
                    var timeout = void 0;
                    timeout = setTimeout(function runInterval() {
                        timeout = setTimeout(runInterval, 50);
                        (function() {
                            if (win && "object" === (void 0 === win ? "undefined" : server__typeof(win)) && isWindowClosed(win)) {
                                interval.cancel();
                                listenerOptions.handleError(new Error("Post message target window is closed"));
                            }
                        }).call();
                    }, 50);
                    return {
                        cancel: function() {
                            clearTimeout(timeout);
                        }
                    };
                }();
                return {
                    cancel: function() {
                        requestListener.cancel();
                    }
                };
            }
            function _on(name, options, handler) {
                if ("function" == typeof options) {
                    handler = options;
                    options = {};
                }
                (options = options || {}).name = name;
                options.handler = handler || options.handler;
                return listen(options);
            }
            function server_once(name) {
                var options = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, handler = arguments[2];
                if ("function" == typeof options) {
                    handler = options;
                    options = {};
                }
                options = options || {};
                handler = handler || options.handler;
                var errorHandler = options.errorHandler, promise = new promise_ZalgoPromise(function(resolve, reject) {
                    (options = options || {}).name = name;
                    options.once = !0;
                    options.handler = function(event) {
                        resolve(event);
                        if (handler) return handler(event);
                    };
                    options.errorHandler = function(err) {
                        reject(err);
                        if (errorHandler) return errorHandler(err);
                    };
                }), onceListener = listen(options);
                promise.cancel = onceListener.cancel;
                return promise;
            }
            function server_listener() {
                var options = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                return {
                    on: function(name, handler) {
                        return _on(name, options, handler);
                    }
                };
            }
            global.on = _on;
            function disable() {
                delete window[constants_CONSTANTS.WINDOW_PROPS.POSTROBOT];
                window.removeEventListener("message", messageListener);
            }
            var public_parent = getAncestor();
            function cleanUpWindow(win) {
                var requestPromises = global.requestPromises.get(win);
                if (requestPromises) for (var _i2 = 0, _length2 = null == requestPromises ? 0 : requestPromises.length; _i2 < _length2; _i2++) requestPromises[_i2].reject(new Error("No response from window - cleaned up"));
                global.popupWindowsByWin && global.popupWindowsByWin.delete(win);
                global.remoteWindows && global.remoteWindows.delete(win);
                global.requestPromises.delete(win);
                global.methods.delete(win);
                global.readyPromises.delete(win);
            }
            var bridge = null;
            function init() {
                if (!global.initialized) {
                    handler = messageListener, (obj = window).addEventListener ? obj.addEventListener("message", handler) : obj.attachEvent("onmessage", handler);
                    !function() {
                        handler = function(_ref3) {
                            var source = _ref3.source, origin = _ref3.origin, promise = global.readyPromises.get(source) || new promise_ZalgoPromise();
                            promise.resolve({
                                origin: origin
                            });
                            global.readyPromises.set(source, promise);
                        }, global.on(constants_CONSTANTS.POST_MESSAGE_NAMES.HELLO, {
                            domain: constants_CONSTANTS.WILDCARD
                        }, function(_ref) {
                            var source = _ref.source, origin = _ref.origin;
                            return handler({
                                source: source,
                                origin: origin
                            });
                        });
                        var handler, parent = getAncestor();
                        parent && sayHello(parent).catch(lib_util_noop);
                    }();
                    listenForMethods({
                        on: _on,
                        send: _send
                    });
                }
                var obj, handler;
                global.initialized = !0;
            }
            init();
            __nested_webpack_require_1894__.d(__webpack_exports__, "cleanUpWindow", function() {
                return cleanUpWindow;
            });
            __nested_webpack_require_1894__.d(__webpack_exports__, "Promise", function() {
                return promise_ZalgoPromise;
            });
            __nested_webpack_require_1894__.d(__webpack_exports__, "bridge", function() {
                return bridge;
            });
            __nested_webpack_require_1894__.d(__webpack_exports__, "init", function() {
                return init;
            });
            __nested_webpack_require_1894__.d(__webpack_exports__, "parent", function() {
                return public_parent;
            });
            __nested_webpack_require_1894__.d(__webpack_exports__, "send", function() {
                return _send;
            });
            __nested_webpack_require_1894__.d(__webpack_exports__, "request", function() {
                return request;
            });
            __nested_webpack_require_1894__.d(__webpack_exports__, "sendToParent", function() {
                return sendToParent;
            });
            __nested_webpack_require_1894__.d(__webpack_exports__, "client", function() {
                return client;
            });
            __nested_webpack_require_1894__.d(__webpack_exports__, "on", function() {
                return _on;
            });
            __nested_webpack_require_1894__.d(__webpack_exports__, "listen", function() {
                return listen;
            });
            __nested_webpack_require_1894__.d(__webpack_exports__, "once", function() {
                return server_once;
            });
            __nested_webpack_require_1894__.d(__webpack_exports__, "listener", function() {
                return server_listener;
            });
            __nested_webpack_require_1894__.d(__webpack_exports__, "CONFIG", function() {
                return CONFIG;
            });
            __nested_webpack_require_1894__.d(__webpack_exports__, "CONSTANTS", function() {
                return constants_CONSTANTS;
            });
            __nested_webpack_require_1894__.d(__webpack_exports__, "disable", function() {
                return disable;
            });
            __webpack_exports__.default = interface_namespaceObject;
        }
    });
});
//# sourceMappingURL=post-robot.js.map

/***/ }),

/***/ "./node_modules/post-robot/index.js":
/*!******************************************!*\
  !*** ./node_modules/post-robot/index.js ***!
  \******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/* @flow */

// eslint-disable-next-line import/no-commonjs
module.exports = __webpack_require__(/*! ./dist/post-robot */ "./node_modules/post-robot/dist/post-robot.js");

// eslint-disable-next-line import/no-commonjs
module.exports["default"] = module.exports;


/***/ }),

/***/ "./src/AssetSidebarWidget.ts":
/*!***********************************!*\
  !*** ./src/AssetSidebarWidget.ts ***!
  \***********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var asset_1 = __importDefault(__webpack_require__(/*! ./stack/api/asset */ "./src/stack/api/asset/index.ts"));
/** Class representing an asset Extension from Contentstack UI.  */
var AssetSidebarWidget = /** @class */ (function () {
    function AssetSidebarWidget(initializationData, connection, emitter) {
        /**
         * Gets the content type of the current asset.
         * @type {Object}
         */
        this.currentAsset = initializationData.data.currentAsset;
        this._emitter = emitter;
        this._connection = connection;
        var thisAsset = this;
        this._emitter.on("assetSave", function (event) {
            thisAsset.currentAsset = event.data;
        });
        this._emitter.on("assetChange", function (event) {
            thisAsset._changedData = event.data;
        });
        this.getData = this.getData.bind(this);
        this.setData = this.setData.bind(this);
        this.syncAsset = this.syncAsset.bind(this);
        this.updateWidth = this.updateWidth.bind(this);
        this.onSave = this.onSave.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onPublish = this.onPublish.bind(this);
        this.onUnPublish = this.onUnPublish.bind(this);
        this.replaceAsset = this.replaceAsset.bind(this);
    }
    AssetSidebarWidget.prototype.getData = function () {
        return this.currentAsset;
    };
    AssetSidebarWidget.prototype.setData = function (asset) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this._connection.sendToParent("setData", asset)];
            });
        });
    };
    AssetSidebarWidget.prototype.syncAsset = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this._connection.sendToParent("syncAsset")];
            });
        });
    };
    AssetSidebarWidget.prototype.updateWidth = function (width) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (typeof width !== "number") {
                    throw new Error("Width must be a number");
                }
                return [2 /*return*/, this._connection.sendToParent("updateAssetSidebarWidth", width)];
            });
        });
    };
    AssetSidebarWidget.prototype.replaceAsset = function (file) {
        return __awaiter(this, void 0, void 0, function () {
            var asset;
            return __generator(this, function (_a) {
                asset = (0, asset_1.default)(this._emitter);
                return [2 /*return*/, asset.handleUpload([file], 'replace')];
            });
        });
    };
    /**
     * This function executes the callback function every time an asset is saved.
     * @param {function} callback The function to be called when an asset is saved.
     */
    AssetSidebarWidget.prototype.onSave = function (callback) {
        var assetObj = this;
        if (callback && typeof callback === "function") {
            assetObj._emitter.on("assetSave", function (event) {
                callback(event.data);
            });
        }
        else {
            throw Error("Callback must be a function");
        }
    };
    /**
     * The field.onChange() function is called when another extension programmatically changes the data of the current extension field using the field.setData() function. This function is only available for extension fields that support the following data types: text, number, boolean, or date.
     * @param {function} callback The function to be called when an asset is edited/changed.
     */
    AssetSidebarWidget.prototype.onChange = function (callback) {
        var assetObj = this;
        if (callback && typeof callback === "function") {
            assetObj._emitter.on("assetChange", function (event) {
                callback(event.data);
            });
        }
        else {
            throw Error("Callback must be a function");
        }
    };
    /**
     * The onPublish() function executes the callback function every time an asset has been published with the respective payload.
     * @param {function} callback The function to be called when an asset is published.
     */
    AssetSidebarWidget.prototype.onPublish = function (callback) {
        var assetObj = this;
        if (callback && typeof callback === "function") {
            assetObj._emitter.on("assetPublish", function (event) {
                callback(event.data);
            });
        }
        else {
            throw Error("Callback must be a function");
        }
    };
    /**
     * The onUnPublish() function executes the callback function every time an asset has been unpublished with the respective payload.
     * @param {function} callback The function to be called when an asset is un published.
     */
    AssetSidebarWidget.prototype.onUnPublish = function (callback) {
        var assetObj = this;
        if (callback && typeof callback === "function") {
            assetObj._emitter.on("assetUnPublish", function (event) {
                callback(event.data);
            });
        }
        else {
            throw Error("Callback must be a function");
        }
    };
    return AssetSidebarWidget;
}());
exports["default"] = AssetSidebarWidget;


/***/ }),

/***/ "./src/RTE/index.tsx":
/*!***************************!*\
  !*** ./src/RTE/index.tsx ***!
  \***************************/
/***/ (function(__unused_webpack_module, exports) {

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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
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
                    _this.pluginMetaData.meta.editorCallbacks["keydown"] = callback;
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
        this.get = function (rte) { return __awaiter(_this, void 0, void 0, function () {
            var config, containerMeta;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.configCallback(rte)];
                    case 1:
                        config = _a.sent();
                        Object.entries(config).forEach(
                        //@ts-ignore
                        function (_a) {
                            var key = _a[0], value = _a[1];
                            switch (key) {
                                case "title": {
                                    _this.pluginMetaData.registry.title = value;
                                    break;
                                }
                                case "icon": {
                                    _this.pluginMetaData.registry.iconName = value;
                                    _this.containerMetaData.registry.iconName = value;
                                    break;
                                }
                                case "display": {
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
                                    var isInline = (typeof value === 'string' && value === 'inline' ||
                                        Array.isArray(value) && value.includes('inline'));
                                    if (isInline) {
                                        var dndOptions = _this.pluginMetaData['registry']['dndOptions'];
                                        if (!dndOptions) {
                                            _this.pluginMetaData['registry']['dndOptions'] = {};
                                            dndOptions = _this.pluginMetaData['registry']['dndOptions'];
                                        }
                                        dndOptions['DisableDND'] = true;
                                        dndOptions['DisableSelectionHalo'] = true;
                                    }
                                    _this.pluginMetaData.meta.elementType = value;
                                    break;
                                }
                                case "render": {
                                    _this.pluginMetaData.registry.Component = value;
                                    break;
                                }
                                case "shouldOverride": {
                                    _this.pluginMetaData.registry.shouldOverride = value;
                                }
                            }
                        });
                        containerMeta = this.containerMetaData.meta;
                        this.containerMetaData = {
                            registry: __assign(__assign({}, this.containerMetaData.registry), { id: this.pluginMetaData.meta.id, title: this.pluginMetaData.registry.title, rootCategory: false, toolbar: __assign({}, this.pluginMetaData.registry.toolbar) }),
                            meta: __assign(__assign({}, containerMeta), { id: this.pluginMetaData.meta.id }),
                        };
                        return [2 /*return*/, this.isContainer ? this.containerMetaData : this.pluginMetaData];
                }
            });
        }); };
        this.pluginMetaData.meta.id = id;
    }
    return RTEPlugin;
}());
exports.RTEPlugin = RTEPlugin;
var rtePluginInitializer = function (id, configCallback) {
    if (!(id && configCallback))
        throw Error('Please provide value "id" and "configCallback"');
    return new RTEPlugin(id, configCallback);
};
exports.rtePluginInitializer = rtePluginInitializer;


/***/ }),

/***/ "./src/appConfig/index.ts":
/*!********************************!*\
  !*** ./src/appConfig/index.ts ***!
  \********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppConfig = void 0;
var stack_1 = __importDefault(__webpack_require__(/*! ../stack */ "./src/stack/index.ts"));
var utils_1 = __webpack_require__(/*! ../utils */ "./src/utils.ts");
/**
 * Class representing the current stack in Contentstack UI.
 */
var AppConfig = /** @class */ (function () {
    function AppConfig(data, connection, emitter, additionalData) {
        var _this = this;
        this.stack = function () {
            return new stack_1.default(_this._data.stack, _this._connection, {
                currentBranch: _this._additionalData.currentBranch,
            });
        };
        this.setInstallationData = function (installationData) {
            return _this._connection
                .sendToParent("setInstallationData", installationData)
                .then(utils_1.onData)
                .catch(utils_1.onError);
        };
        this.getInstallationData = function () {
            return _this._connection
                .sendToParent("getInstallationData")
                .then(utils_1.onData)
                .catch(utils_1.onError);
        };
        this._data = data;
        this._connection = connection;
        this._emitter = emitter;
        this._additionalData = additionalData;
    }
    return AppConfig;
}());
exports.AppConfig = AppConfig;


/***/ }),

/***/ "./src/entry.ts":
/*!**********************!*\
  !*** ./src/entry.ts ***!
  \**********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var field_1 = __importDefault(__webpack_require__(/*! ./field */ "./src/field.ts"));
/** Class representing an entry from Contentstack UI. Not available for Dashboard Widget extension.  */
var Entry = /** @class */ (function () {
    function Entry(initializationData, connection, emitter, options) {
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
        this._options = options || {};
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
     * Gets the field object for the saved data, which allows you to interact with the field.
     * This object will have all the same methods and properties of extension.field.
     * Note: For fields initialized using the getFields function, the setData function currently works only for the following fields: as single_line, multi_line, RTE, markdown, select, number, boolean, date, link, and extension of data type text, number, boolean, and date.
     * @example
     * var field = entry.getField('field_uid');
     * var fieldSchema = field.schema;
     * var fieldUid = field.uid;
     * var fieldData = field.getData();
     * @param {string} uid Unique ID of the field
     * @param {boolean} options.useUnsavedSchema If set to true, the field will get the unsaved field
     * @return {Object} Field object
    */
    Entry.prototype.getField = function (uid, options) {
        var _a = (options || {}).useUnsavedSchema, useUnsavedSchema = _a === void 0 ? false : _a;
        var _b = (this._options._internalFlags || {}).FieldInstance, FieldInstance = _b === void 0 ? field_1.default : _b;
        var path = uid.split('.');
        var value = useUnsavedSchema ? (this._changedData || this._data) : this._data;
        var schema = this.content_type.schema;
        var isDataEmpty = Object.keys(value).length === 0;
        if (isDataEmpty) {
            throw new Error("The data is unsaved. Save the data before requesting the field.");
        }
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
        var fieldObject = new FieldInstance(fieldIntilaizationDataObject, this._connection, this._emitter);
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
exports["default"] = Entry;


/***/ }),

/***/ "./src/extension.ts":
/*!**************************!*\
  !*** ./src/extension.ts ***!
  \**************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

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
Object.defineProperty(exports, "__esModule", ({ value: true }));
var post_robot_1 = __importDefault(__webpack_require__(/*! post-robot */ "./node_modules/post-robot/index.js"));
var field_1 = __importDefault(__webpack_require__(/*! ./field */ "./src/field.ts"));
var window_1 = __importDefault(__webpack_require__(/*! ./window */ "./src/window.ts"));
var stack_1 = __importDefault(__webpack_require__(/*! ./stack */ "./src/stack/index.ts"));
var entry_1 = __importDefault(__webpack_require__(/*! ./entry */ "./src/entry.ts"));
var store_1 = __importDefault(__webpack_require__(/*! ./store */ "./src/store.ts"));
var metadata_1 = __importDefault(__webpack_require__(/*! ./metadata */ "./src/metadata.ts"));
var wolfy87_eventemitter_1 = __importDefault(__webpack_require__(/*! wolfy87-eventemitter */ "./node_modules/wolfy87-eventemitter/EventEmitter.js"));
var utils_1 = __webpack_require__(/*! ./utils */ "./src/utils.ts");
var appConfig_1 = __webpack_require__(/*! ./appConfig */ "./src/appConfig/index.ts");
var AssetSidebarWidget_1 = __importDefault(__webpack_require__(/*! ./AssetSidebarWidget */ "./src/AssetSidebarWidget.ts"));
var field_2 = __importDefault(__webpack_require__(/*! ./fieldLocation/field */ "./src/fieldLocation/field.ts"));
var frame_1 = __importDefault(__webpack_require__(/*! ./fieldLocation/frame */ "./src/fieldLocation/frame.ts"));
var entry_2 = __importDefault(__webpack_require__(/*! ./fieldLocation/entry */ "./src/fieldLocation/entry.ts"));
var emitter = new wolfy87_eventemitter_1.default();
/** Class representing an extension from Contentstack App Framework SDK. */
var Extension = /** @class */ (function () {
    function Extension(initData) {
        var _this = this;
        var _a;
        this.getConfig = function () {
            if (!_this.installationUID) {
                return Promise.resolve(_this.config);
            }
            return _this.postRobot
                .sendToParent("getConfig")
                .then(utils_1.onData)
                .catch(utils_1.onError);
        };
        this.getCurrentLocation = function () {
            return _this.type;
        };
        var initializationData = initData;
        this.postRobot = post_robot_1.default;
        /**
         * This value represents the current App's unique ID. One App may contain multiple locations
         * @type {string}
         */
        this.appUID = initializationData.data.app_id;
        /**
         *  This value represents the current location's unique ID. One App may contain multiple locations
         * @type {string}
         */
        this.locationUID = initializationData.data.extension_uid;
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
         * location of extension, "RTE" | "FIELD" | "DASHBOARD" | "WIDGET" | "APP_CONFIG_WIDGET" | "FULL_SCREEN_WIDGET".
         * @type {string}
         */
        this.type = initializationData.data.type;
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
        this.stack = new stack_1.default(initializationData.data.stack, post_robot_1.default, {
            currentBranch: initializationData.data.currentBranch,
        });
        this.metadata = new metadata_1.default(post_robot_1.default);
        this.config = (_a = initializationData.data.config) !== null && _a !== void 0 ? _a : {};
        this.location = {
            DashboardWidget: null,
            CustomField: null,
            SidebarWidget: null,
            RTEPlugin: null,
            AppConfigWidget: null,
            FullscreenAppWidget: null,
            AssetSidebarWidget: null,
            FieldLocation: null,
        };
        switch (initializationData.data.type) {
            case "DASHBOARD": {
                this.location.DashboardWidget = {
                    frame: new window_1.default(post_robot_1.default, this.type, emitter, initializationData.data.dashboard_width),
                    stack: new stack_1.default(initializationData.data.stack, post_robot_1.default, {
                        currentBranch: initializationData.data.currentBranch,
                    }),
                };
                break;
            }
            case "WIDGET": {
                this.location.SidebarWidget = {
                    entry: new entry_1.default(initializationData, post_robot_1.default, emitter),
                    stack: new stack_1.default(initializationData.data.stack, post_robot_1.default, {
                        currentBranch: initializationData.data.currentBranch,
                    }),
                };
                break;
            }
            case "APP_CONFIG_WIDGET": {
                this.location.AppConfigWidget = {
                    installation: new appConfig_1.AppConfig(initializationData, post_robot_1.default, emitter, {
                        currentBranch: initializationData.data.currentBranch,
                    }),
                    stack: new stack_1.default(initializationData.data.stack, post_robot_1.default, {
                        currentBranch: initializationData.data.currentBranch,
                    }),
                };
                break;
            }
            case "ASSET_SIDEBAR_WIDGET": {
                this.location.AssetSidebarWidget = new AssetSidebarWidget_1.default(initializationData, post_robot_1.default, emitter);
                break;
            }
            case "RTE": {
                Promise.resolve().then(function () { return __importStar(__webpack_require__(/*! ./RTE */ "./src/RTE/index.tsx")); }).then(function (_a) {
                    var rtePluginInitializer = _a.rtePluginInitializer;
                    _this.location.RTEPlugin = rtePluginInitializer;
                });
                break;
            }
            case "FIELD_LOCATION": {
                this.location.FieldLocation = {
                    entry: new entry_2.default(initializationData, post_robot_1.default, emitter),
                    stack: new stack_1.default(initializationData.data.stack, post_robot_1.default, {
                        currentBranch: initializationData.data.currentBranch,
                    }),
                    field: new field_2.default(initializationData, post_robot_1.default, emitter),
                    frame: new frame_1.default(post_robot_1.default, emitter),
                };
                break;
            }
            case "FIELD":
            default: {
                initializationData.data.self = true;
                this.location.CustomField = {
                    field: new field_1.default(initializationData, post_robot_1.default, emitter),
                    fieldConfig: initializationData.data.field_config,
                    entry: new entry_1.default(initializationData, post_robot_1.default, emitter),
                    stack: new stack_1.default(initializationData.data.stack, post_robot_1.default, {
                        currentBranch: initializationData.data.currentBranch,
                    }),
                    frame: new window_1.default(post_robot_1.default, this.type, emitter),
                };
                break;
            }
        }
        try {
            //@ts-ignore
            post_robot_1.default.on("extensionEvent", function (event) {
                if (event.data.name === "entrySave") {
                    emitter.emitEvent("entrySave", [{ data: event.data.data }]);
                    emitter.emitEvent("updateFields", [
                        { data: event.data.data },
                    ]);
                }
                if (event.data.name === "entryChange") {
                    emitter.emitEvent("entryChange", [
                        { data: event.data.data },
                    ]);
                }
                if (event.data.name === "entryPublish") {
                    emitter.emitEvent("entryPublish", [
                        { data: event.data.data },
                    ]);
                }
                if (event.data.name === "entryUnPublish") {
                    emitter.emitEvent("entryUnPublish", [
                        { data: event.data.data },
                    ]);
                }
                if (event.data.name === "assetSave") {
                    emitter.emitEvent("assetSave", [{ data: event.data.data }]);
                    emitter.emitEvent("updateFields", [
                        { data: event.data.data },
                    ]);
                }
                if (event.data.name === "assetChange") {
                    emitter.emitEvent("assetChange", [
                        { data: event.data.data },
                    ]);
                }
                if (event.data.name === "assetPublish") {
                    emitter.emitEvent("assetPublish", [
                        { data: event.data.data },
                    ]);
                }
                if (event.data.name === "assetUnPublish") {
                    emitter.emitEvent("assetUnPublish", [
                        { data: event.data.data },
                    ]);
                }
                if (event.data.name === "dashboardResize") {
                    emitter.emitEvent("dashboardResize", [
                        { state: event.data.state },
                    ]);
                }
                if (event.data.name === "extensionFieldChange") {
                    emitter.emitEvent("extensionFieldChange", [
                        { data: event.data.data },
                    ]);
                }
            });
        }
        catch (err) {
            console.error("extension Event", err);
        }
    }
    Extension.initialize = function (version) {
        var meta = {
            sdkType: "app-sdk",
        };
        //@ts-ignore
        return post_robot_1.default.sendToParent("init", { version: version, meta: meta });
    };
    Extension.prototype.setReady = function () {
        return this.postRobot.sendToParent("ready");
    };
    return Extension;
}());
exports["default"] = Extension;


/***/ }),

/***/ "./src/field.ts":
/*!**********************!*\
  !*** ./src/field.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
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
exports["default"] = Field;


/***/ }),

/***/ "./src/fieldLocation/entry.ts":
/*!************************************!*\
  !*** ./src/fieldLocation/entry.ts ***!
  \************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var entry_1 = __importDefault(__webpack_require__(/*! ../entry */ "./src/entry.ts"));
var field_1 = __importDefault(__webpack_require__(/*! ./field */ "./src/fieldLocation/field.ts"));
var FieldLocationEntry = /** @class */ (function (_super) {
    __extends(FieldLocationEntry, _super);
    function FieldLocationEntry(initializationData, connection, emitter) {
        return _super.call(this, initializationData, connection, emitter, {
            _internalFlags: {
                FieldInstance: field_1.default,
            },
        }) || this;
    }
    /**
     * Returns the value of the tags associated with the entry.
     * @returns {string[]} Returns an array of tags associated with the entry.
     */
    FieldLocationEntry.prototype.getTags = function () {
        return this._data.tags;
    };
    /**
     * Sets the tags on the entry.
     * @param tags tags to be set on the entry
     * @returns {string[]} Returns an array of tags associated with the entry.
     */
    FieldLocationEntry.prototype.setTags = function (tags) {
        /**
         * Validate if the tags are array of strings
         * @param {Array<string>} tags
         * @returns {boolean} Returns true if the tags are array of strings
         */
        function areTagsValid(tags) {
            return (Array.isArray(tags) &&
                tags.every(function (tag) { return typeof tag === "string"; }));
        }
        if (!areTagsValid(tags)) {
            throw new Error("Tags should be an array of strings");
        }
        this._connection.sendToParent("setTags", { tags: tags });
        return tags;
    };
    return FieldLocationEntry;
}(entry_1.default));
exports["default"] = FieldLocationEntry;


/***/ }),

/***/ "./src/fieldLocation/field.ts":
/*!************************************!*\
  !*** ./src/fieldLocation/field.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
var excludedDataTypesForSetField = [
    "file",
    "reference",
    "blocks",
    "group",
    "global_field",
];
function separateResolvedData(field, value) {
    var resolvedData = value;
    var unResolvedData = value;
    if (field.data_type === "file") {
        if (value) {
            resolvedData = value;
            unResolvedData =
                field.schema.multiple === true
                    ? value.map(function (file) { return file.uid; })
                    : value.uid;
        }
        else if (field.schema.multiple === true) {
            resolvedData = [];
            unResolvedData = [];
        }
    }
    return { resolvedData: resolvedData, unResolvedData: unResolvedData };
}
/** Class representing a field from Contentstack UI. Only available for Custom Field extension */
var FieldLocationField = /** @class */ (function () {
    function FieldLocationField(fieldDataObject, connection, emitter) {
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
        this._self = fieldDataObject.data.self || false;
        var fieldObj = this;
        emitter.on("updateFields", function (event) {
            var path = fieldObj.uid.split(".");
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
    FieldLocationField.prototype.setData = function (data) {
        var _this = this;
        var currentFieldObj = this;
        var dataObj = {
            data: data,
            uid: currentFieldObj.uid,
            self: currentFieldObj._self,
        };
        if (!currentFieldObj._self &&
            (excludedDataTypesForSetField.indexOf(currentFieldObj.data_type) !==
                -1 ||
                !currentFieldObj.data_type)) {
            return Promise.reject(new Error("Cannot call set data for current field type"));
        }
        return this._connection
            .sendToParent("setData", dataObj)
            .then(function () {
            _this._data = data;
            return Promise.resolve(currentFieldObj);
        })
            .catch(function (e) {
            return Promise.reject(e);
        });
    };
    /**
     * Gets the data of the current field
     * @param  {Object} options Options object for get Data method.
     * @param  {boolean} options.resolved If the resolved parameter is set to true for the File field, then the method will return a resolved asset object along with all the field metadata, e.g. 'field.getData({resolved:true})'.
     * @return {Object|string|number} Returns the field data.
     */
    FieldLocationField.prototype.getData = function (_a) {
        var _b = _a === void 0 ? {} : _a, _c = _b.resolved, resolved = _c === void 0 ? false : _c;
        return resolved ? this._resolvedData : this._data;
    };
    FieldLocationField.prototype.getDelta = function () {
        var _a;
        return (_a = this.schema) === null || _a === void 0 ? void 0 : _a.value;
    };
    return FieldLocationField;
}());
exports["default"] = FieldLocationField;


/***/ }),

/***/ "./src/fieldLocation/frame.ts":
/*!************************************!*\
  !*** ./src/fieldLocation/frame.ts ***!
  \************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var post_robot_1 = __importDefault(__webpack_require__(/*! post-robot */ "./node_modules/post-robot/index.js"));
/**
 * Class representing an iframe window from Contentstack UI. Not available for Custom Widgets.
 */
var FieldLocationFrame = /** @class */ (function () {
    function FieldLocationFrame(connection, emitter) {
        this._autoResizingEnabled = false;
        this._connection = connection || post_robot_1.default;
        this._autoResizingEnabled = false;
        this._emitter = emitter;
        this.updateDimension = this.updateDimension.bind(this);
        this.enableAutoResizing = this.enableAutoResizing.bind(this);
        this.disableAutoResizing = this.disableAutoResizing.bind(this);
        /**
         * The auto resizing should be enabled by default.
         */
        this.enableAutoResizing();
    }
    /**
     * This method updates the extension height and width on Contentstack UI.
     * If the value is not passed, it will update the height and width of the
     * extension with the current height and width of the extension.
     * @param {string|number} height Desired height of the iframe window
     */
    FieldLocationFrame.prototype.updateDimension = function (dimension) {
        var _a = dimension || {}, height = _a.height, width = _a.width;
        if (height === undefined && width === undefined) {
            this._height = Math.ceil(document.documentElement.getBoundingClientRect().height);
            this._width = Math.ceil(document.documentElement.getBoundingClientRect().width);
            this._connection.sendToParent("resize", { height: this._height, width: this._width });
            return;
        }
        var dimensionBody = {};
        if (typeof height === "number" && this._height !== height) {
            this._height = height;
            dimensionBody["height"] = this._height;
        }
        if (typeof width === "number" && this._width !== width) {
            this._width = width;
            dimensionBody["width"] = this._width;
        }
        if (Object.keys(dimensionBody).length !== 0) {
            this._connection.sendToParent("resize", dimensionBody);
        }
    };
    /**
     * This method enables auto resizing of the extension height.
     * @return {FieldLocationFrame}.
     */
    FieldLocationFrame.prototype.enableAutoResizing = function () {
        var _this = this;
        if (this._autoResizingEnabled) {
            return this;
        }
        this._autoResizingEnabled = true;
        this.observer = new MutationObserver(function () { return _this.updateDimension(); });
        var mutationObserverConfig = {
            attributes: true,
            childList: true,
            subtree: true,
        };
        this.observer.observe(window.document.body, mutationObserverConfig);
        return this;
    };
    /**
     * This method disables auto resizing of the extension height.
     * @return {FieldLocationFrame}.
     */
    FieldLocationFrame.prototype.disableAutoResizing = function () {
        var _a;
        if (!this._autoResizingEnabled) {
            return this;
        }
        this._autoResizingEnabled = false;
        (_a = this.observer) === null || _a === void 0 ? void 0 : _a.disconnect();
        return this;
    };
    return FieldLocationFrame;
}());
exports["default"] = FieldLocationFrame;


/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var extension_1 = __importDefault(__webpack_require__(/*! ./extension */ "./src/extension.ts"));
var post_robot_1 = __importDefault(__webpack_require__(/*! post-robot */ "./node_modules/post-robot/index.js"));
var package_json_1 = __webpack_require__(/*! ../package.json */ "./package.json");
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
exports["default"] = ContentstackAppSDK;
module.exports = ContentstackAppSDK;


/***/ }),

/***/ "./src/metadata.ts":
/*!*************************!*\
  !*** ./src/metadata.ts ***!
  \*************************/
/***/ (function(__unused_webpack_module, exports) {

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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var metadataTypes = {
    creteMetadata: "createMetadata",
    retrieveMetadata: "getMetadata",
    retrieveAllMetadata: "getAllMetadata",
    updateMetadata: "updateMetadata",
    deleteMetadata: "deleteMetadata",
};
var Metadata = /** @class */ (function () {
    function Metadata(_connection) {
        this._connection = _connection;
    }
    Metadata.prototype.createMetaData = function (metadataConfig) {
        var entity_uid = metadataConfig.entity_uid, _a = metadataConfig.type, type = _a === void 0 ? "asset" : _a, otherMetaData = __rest(metadataConfig, ["entity_uid", "type"]);
        var data = {
            action: metadataTypes.creteMetadata,
            payload: {
                metadata: __assign({ entity_uid: entity_uid, type: type }, otherMetaData),
            },
        };
        return this._connection.sendToParent("stackQuery", data);
    };
    Metadata.prototype.retrieveMetaData = function (metadataConfig) {
        var uid = metadataConfig.uid;
        var data = {
            uid: uid,
            action: metadataTypes.retrieveMetadata,
            payload: {
                metadata: {
                    uid: uid,
                },
            },
        };
        return this._connection.sendToParent("stackQuery", data);
    };
    Metadata.prototype.retrieveAllMetaData = function (params) {
        if (params === void 0) { params = {}; }
        var data = {
            action: metadataTypes.retrieveAllMetadata,
            params: params,
        };
        return this._connection.sendToParent("stackQuery", data);
    };
    Metadata.prototype.updateMetaData = function (metadataConfig) {
        var uid = metadataConfig.uid, otherMetaData = __rest(metadataConfig, ["uid"]);
        var data = {
            uid: uid,
            action: metadataTypes.updateMetadata,
            payload: {
                metadata: __assign({ uid: uid }, otherMetaData),
            },
        };
        return this._connection.sendToParent("stackQuery", data);
    };
    Metadata.prototype.deleteMetaData = function (metadataConfig) {
        var uid = metadataConfig.uid;
        var data = {
            uid: uid,
            action: metadataTypes.deleteMetadata,
            payload: {
                metadata: {
                    uid: uid,
                },
            },
        };
        return this._connection.sendToParent("stackQuery", data);
    };
    return Metadata;
}());
exports["default"] = Metadata;


/***/ }),

/***/ "./src/stack/api/asset/index.ts":
/*!**************************************!*\
  !*** ./src/stack/api/asset/index.ts ***!
  \**************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var base_1 = __importDefault(__webpack_require__(/*! ../base */ "./src/stack/api/base.ts"));
var utils_1 = __webpack_require__(/*! ../../utils */ "./src/stack/utils.ts");
var post_robot_1 = __importDefault(__webpack_require__(/*! post-robot */ "./node_modules/post-robot/index.js"));
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
    Asset.handleUpload = function (_files, type, options) {
        return __awaiter(this, void 0, void 0, function () {
            var files, uid;
            return __generator(this, function (_a) {
                if (!_files || !_files.length) {
                    return [2 /*return*/, Promise.reject(new Error('Kindly provide valid parameters'))];
                }
                files = [];
                Array.from(_files).forEach(function (_) {
                    // @ts-ignore
                    var file = new File([_], _.name, { type: _.type });
                    files.push(file);
                });
                uid = new Date().getUTCMilliseconds();
                return [2 /*return*/, (function () {
                        return __awaiter(this, void 0, void 0, function () {
                            var uploadReadyListener_1, err_1;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        _a.trys.push([0, 2, , 3]);
                                        uploadReadyListener_1 = post_robot_1.default.on("uploadReady_" + uid, function () {
                                            window.parent.postMessage({
                                                type: "upload_" + uid,
                                                upload_type: type,
                                                files: files,
                                                parentFolderUid: options === null || options === void 0 ? void 0 : options.parentFolderUid,
                                                customUploadHandler: options === null || options === void 0 ? void 0 : options.customUploadHandler
                                            }, "*");
                                            uploadReadyListener_1.cancel();
                                            return Promise.resolve({});
                                        });
                                        //@ts-ignore
                                        return [4 /*yield*/, post_robot_1.default.sendToParent("stackOptionsQuery", {
                                                action: "upload_" + uid,
                                                uid: uid,
                                            })];
                                    case 1:
                                        //@ts-ignore
                                        _a.sent();
                                        //@ts-ignore
                                        return [2 /*return*/, post_robot_1.default.sendToParent("upload_" + uid, {})];
                                    case 2:
                                        err_1 = _a.sent();
                                        return [2 /*return*/, Promise.reject(err_1)];
                                    case 3: return [2 /*return*/];
                                }
                            });
                        });
                    })()];
            });
        });
    };
    Asset.uploadAsset = function (files, options) {
        return Asset.handleUpload(files, 'upload', options);
    };
    return Asset;
}(base_1.default));
exports["default"] = (function (uiConnection) {
    connection = uiConnection;
    return new Proxy(Asset, {
        apply: function (Target, thisArg, argumentsList) {
            //@ts-ignore
            return new (Target.bind.apply(Target, __spreadArray([void 0], argumentsList, false)))();
        }
    });
});


/***/ }),

/***/ "./src/stack/api/base.ts":
/*!*******************************!*\
  !*** ./src/stack/api/base.ts ***!
  \*******************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

//@ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var query_1 = __importDefault(__webpack_require__(/*! ./query */ "./src/stack/api/query.ts"));
var utils_1 = __webpack_require__(/*! ../utils */ "./src/stack/utils.ts");
function onData(data) {
    if (typeof (data.data) === 'string') {
        return Promise.reject(data.data);
    }
    return Promise.resolve(data.data);
}
function onError(error) {
    return Promise.reject(error);
}
/**
 * This is Base class, it holds all the methods required for Modle instance,
 *  eg ContentType('uid').delete() or Asset('uid').update({...})
 *  @ignore
 */
var Base = /** @class */ (function () {
    function Base(uid) {
        if (!uid) {
            throw new Error('uid is required');
        }
        this.uid = uid;
        this._query = {};
        this.only = (0, utils_1.transform)('only');
        this.except = (0, utils_1.transform)('except');
        this.addParam = utils_1.addParam;
    }
    Base.Query = function () {
        //@ts-ignore
        return new query_1.default(this.connection, this.module(true), this.contentTypeUid);
    };
    Base.create = function (payload) {
        var options = { payload: payload, content_type_uid: this.contentTypeUid, action: "create" + this.module() };
        return this.connection.sendToParent('stackQuery', options).then(onData).catch(onError);
    };
    Base.prototype.update = function (payload) {
        if (!payload || (typeof payload !== 'object') || (payload instanceof Array)) {
            return Promise.reject(new Error('Kindly provide valid parameters'));
        }
        return this.fetch("update" + this.constructor.module(), payload);
    };
    Base.prototype.delete = function () {
        return this.fetch("delete" + this.constructor.module());
    };
    Base.prototype.fetch = function (action, payload) {
        var options = {
            payload: payload,
            content_type_uid: this.constructor.contentTypeUid,
            uid: this.uid,
            params: this._query,
            action: action || "get" + this.constructor.module()
        };
        if (!payload) {
            delete options.payload;
        }
        if (!this.constructor.contentTypeUid) {
            delete options.content_type_uid;
        }
        return this.constructor.connection.sendToParent('stackQuery', options)
            .then(onData).catch(onError);
    };
    return Base;
}());
exports["default"] = Base;


/***/ }),

/***/ "./src/stack/api/content-type/entry.ts":
/*!*********************************************!*\
  !*** ./src/stack/api/content-type/entry.ts ***!
  \*********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var base_1 = __importDefault(__webpack_require__(/*! ../base */ "./src/stack/api/base.ts"));
var utils_1 = __webpack_require__(/*! ../../utils */ "./src/stack/utils.ts");
var connection = {};
var contentTypeUid = '';
var Entry = /** @class */ (function (_super) {
    __extends(Entry, _super);
    function Entry(uid) {
        var _this = _super.call(this, uid) || this;
        _this._query = {};
        return _this;
    }
    /**
     * @function
     * @name Stack#ContentType#Entry.Query
     * @description This static method instantiates the query module for entries. To see the list of methods that can be used for querying entries, refer the {@link Query} module.
     * @example
     * let entryQuery = extension.stack.ContentType('content_type_uid').Entry.Query();
     * entryQuery.where("field_uid": "10").limit(10).skip(10).find().then(...).catch(...);
     * @return {Query}
     */
    Entry.Query = function () {
        var entryQuery = _super.Query.call(this);
        Object.assign(entryQuery, {
            language: utils_1.language,
            environment: utils_1.environment,
            includeOwner: utils_1.includeOwner,
            includeContentType: utils_1.includeContentType,
            includeSchema: utils_1.includeSchema,
            includeReference: utils_1.includeReference
        });
        return entryQuery;
    };
    Object.defineProperty(Entry, "connection", {
        get: function () {
            return connection;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Entry, "contentTypeUid", {
        get: function () {
            return contentTypeUid;
        },
        enumerable: false,
        configurable: true
    });
    Entry.module = function (plural) {
        if (plural === void 0) { plural = false; }
        return plural ? 'Entries' : 'Entry';
    };
    /**
    This method creates a new entry.
    @see {@link
    https://www.contentstack.com/docs/apis/content-management-api/#create-a-an-entry|
    Create Entry}
    @name Stack#ContentType#Entry.create
    @function
    @example extension.stack.ContentType('content_type_uid').Entry.create({
      "entry": {
        "title": "example",
        "url": "/example"
      }
    }).then(...).catch(...);
    @param {Object} payload Data to create an entry
    @return {external:Promise}
    Required data if resolved successfully
    */
    /**
    * @name Stack#ContentType#Entry#only
    * @function
    * @description This method is used to show the selected fields of an entry in the result set.
    * @param {String} [key=BASE] - Single field of an entry
    * @param {Array} values - Array of fields to be shown in the result set
    * @example
    * <caption> Only with field UID </caption>
    * extension.stack.ContentType('content_type_uid').Entry('bltsomething123').only('title').fetch();
    * @example
    * <caption> Only with field UID </caption>
    * extension.stack.ContentType('content_type_uid').Entry('bltsomething123').only('BASE','title').fetch();
    * @example
    * <caption> Only with field UIDs(array) </caption>
    * extension.stack.ContentType('content_type_uid').Entry('bltsomething123').only(['title','description']).fetch();
    * @returns {Stack#ContentType#Entry}
    */
    /**
    * @name Stack#ContentType#Entry#except
    * @function
    * @description This method is used to hide the selected fields of an entry in the result set.
    * @param {String} [key=BASE] - Single field of an entry
    * @param {Array} values - Array of fields to be hidden in the result set
    * @example
    * <caption> Except with field uid </caption>
    * extension.stack.ContentType('content_type_uid').Entry('bltsomething123').except('title').fetch();
    * @example
    * <caption> Except with field uid </caption>
    * extension.stack.ContentType('content_type_uid').Entry('bltsomething123').except('BASE','title').fetch();
    * @example
    * <caption> Except with field uids(array) </caption>
    * extension.stack.ContentType('content_type_uid').Entry('bltsomething123').except(['title','description']).fetch();
    * @returns {Stack#ContentType#Entry}
    */
    /**
    * This method includes a query parameter in your query.
    * @name Stack#ContentType#Entry#addParam
    * @function
    * @example extension.stack.ContentType('content_type_uid').Entry('uid').addParam('include_count', 'true').fetch().then().catch();
    * @param {string} key - Key of the parameter
    * @param {string} value - Value of the parameter
    * @return {Stack#ContentType#Entry} Returns
    */
    /**
    This method will fetch all the entries in which the current entry is referenced.
    @see {@link
    https://www.contentstack.com/docs/apis/content-management-api/#get-all-references-of-an-entry|
    Entry References}
    @name Stack#ContentType#Entry#getReferences
    @function
    @example extension.stack.ContentType('content_type_uid').Entry('uid').getReferences().then().catch();
    @return {external:Promise}
    Required data if resolved successfully
    */
    /**
    @example extension.stack.ContentType('content_type_uid').Entry('uid').update({"entry" : {...}}).then().catch();
    @param {Object} payload Data to be update exsisting entry
    @return {external:Promise}
    Required data if resolved successfully
    */
    /**
    This method deletes an existing entry.
    @see {@link
    https://www.contentstack.com/docs/apis/content-management-api/#delete-an-entry|
    Delete Entry}
    @name Stack#ContentType#Entry#delete
    @function
    @example extension.stack.ContentType('content_type_uid').Entry('uid').delete().then().catch();
    @return {external:Promise}
    Required data if resolved successfully
    */
    /**
    This method fetches information of a specific entry.
    @see {@link
    https://www.contentstack.com/docs/apis/content-management-api/#get-a-single-an-entry|
    Get A Single Entry}
    @name Stack#ContentType#Entry#fetch
    @function
    @example extension.stack.ContentType('content_type_uid').Entry('uid').fetch().then().catch();
    @return {external:Promise}
    Required data if resolved successfully
    */
    /**
     * @function
     * @name Stack#ContentType#Entry#includeReference
     * @description This method is used to include referenced entries from other content types.
     * @example
     * <caption> .includeReference with reference_field_uids as array </caption>
     * stack.ContentType('contenttype_uid').Entry('bltsomething123').includeReference(['category', 'author']).fetch()
     * @example
     * <caption> .includeReference with reference_field_uids </caption>
     * stack.ContentType('contenttype_uid').Entry('bltsomething123').includeReference('category', 'author').fetch()
     * @returns {Stack#ContentType#Entry}
     */
    /**
     * @function
     * @name Stack#ContentType#Entry#language
     * @description This method is used to set the language code of which you want to retrieve the data.
     * @param {String} languageCode - Language code, for e.g. 'en-us', 'ja-jp', and so on
     * @example extension.stack.ContentType('contenttype_uid').Entry('bltsomething123').language('en-us').fetch()
     * @returns {Stack#ContentType#Entry}
     */
    /**
     * @function
     * @name Stack#ContentType#Entry#environment
     * @description This method is used to set the environment name of which you want to retrieve the data.
     * @param {String} environment_uid - UID/Name of environment
     * @example extension.stack.ContentType('contenttype_uid').Entry('bltsomething123').environment('development').fetch()
     * @returns {Stack#ContentType#Entry}
     */
    /**
     * @function
     * @name Stack#ContentType#Entry#addQuery
     * @description This method is used to add a query to an entry object.
     * @param {String} key - Key of the query
     * @param {String} value - Value of the query
     * @example extension.stack.ContentType('contenttype_uid').Entry('bltsomething123').addQuery('include_schema',true).fetch()
     * @returns {Stack#ContentType#Entry}
     */
    /**
     * @function
     * @name Stack#ContentType#Entry#includeSchema
     * @description This method is used to include the schema of the current contenttype in result set along with the entry/entries.
     * @example extension.stack.ContentType('contenttype_uid').Entry('bltsomething123').includeSchema().fetch()
     * @returns {Stack#ContentType#Entry}
     */
    /**
     * @function
     * @name Stack#ContentType#Entry#includeContentType
     * @description This method is used to include the current content type in the result set along with the entry(ies).
     * @example extension.stack.ContentType('contenttype_uid').Entry('bltsomething123').includeContentType().fetch()
     * @returns {Stack#ContentType#Entry}
     */
    /**
     * @function
     * @name Stack#ContentType#Entry#includeOwner
     * @description This method is used to include the owner of the entry(ies) in the result set.
     * @example extension.stack.ContentType('contenttype_uid').Entry('bltsomething123').includeOwner().fetch()
     * @returns {Stack#ContentType#Entry}
     */
    /**
    * @function
    * @name Stack#ContentType#Entry#getLanguages
    * @description This method returns the details of all the languages that an entry is localized in.
    * @example extension.stack.ContentType('contenttype_uid').Entry('bltsomething123').getLanguages()
    * @return {external:Promise}
    */
    Entry.prototype.getLanguages = function () {
        return this.fetch('getEntryLanguages');
    };
    /**
    * @function
    * @name Stack#ContentType#Entry#unlocalize
    * @description This method is used to unlocalize an entry
    * @param  {string} locale Locale in which the entry has to be unlocalized
    * @example extension.stack.ContentType('contenttype_uid').Entry('bltsomething123').unlocalize('fr-fr').then(...).catch(...);
    * @return {external:Promise}
    */
    Entry.prototype.unlocalize = function (locale) {
        if (!locale || typeof locale !== 'string') {
            return Promise.reject(new Error('Kindly provide valid parameters'));
        }
        this._query.locale = locale;
        return this.fetch('unlocalizeEntry');
    };
    /**
    * @function
    * @name Stack#ContentType#Entry#publish
    * @description This method lets you publish an entry either immediately or schedule it to be published automatically at a later date/time.
    * @param {object} payload - Payload for the request
    * @example extension.stack.ContentType('contenttype_uid').Entry('bltsomething123').publish({
        "entry": {
            "environments": ["development"],
            "locales": ["en-us"]
        },
        "locale": "en-us",
        "version": 1,
        "scheduled_at": "2019-02-14T18:30:00.000Z"
    }).then(...).catch(...);
    * @return {external:Promise}
    */
    Entry.prototype.publish = function (payload) {
        if (!payload || (typeof payload !== 'object') || (payload instanceof Array)) {
            return Promise.reject(new Error('Kindly provide valid parameters'));
        }
        this._query = {};
        return this.fetch('publishEntry', payload);
    };
    /**
    * @function
    * @name Stack#ContentType#Entry#unpublish
    * @description This method lets you publish an entry either immediately or schedule it to be published automatically at a later date/time.
    * @param {object} payload - Payload for the request
    * @example extension.stack.ContentType('contenttype_uid').Entry('bltsomething123').unpublish({
        "entry": {
            "environments": ["development"],
            "locales": ["en-us"]
        },
        "locale": "en-us",
        "version": 1,
        "scheduled_at": "2019-02-14T18:30:00.000Z"
    }).then(...).catch(...);
    * @return {external:Promise}
    */
    Entry.prototype.unpublish = function (payload) {
        if (!payload || (typeof payload !== 'object') || (payload instanceof Array)) {
            return Promise.reject(new Error('Kindly provide valid parameters'));
        }
        this._query = {};
        return this.fetch('unpublishEntry', payload);
    };
    /**
    * @function
    * @name Stack#ContentType#Entry#setWorkflowStage
    * @description This method allows you to either set a particular workflow stage or update the workflow stage details of an entry.
    * @param {object} payload - Payload for the request
    * @example extension.stack.ContentType('contenttype_uid').Entry('bltsomething123').setWorkflowStage({
       "workflow": {
           "workflow_stage": {
               "comment": "Test Comment",
               "due_date": "Thu Dec 01 2018",
               "notify": false,
               "uid": "blt9f52a2cd5e0014fb",
               "assigned_to": [{
                   "uid": "blt296a22e28cc0c63c",
                   "name": "John Doe",
                   "email": "john.doe@contentstack.com"
               }],
               "assigned_by_roles": [{
                   "uid": "blt5b74c24c7ae25d94",
                   "name": "Content Manager"
               }]
           }
       }
    }).then(...).catch(...);
    * @return {external:Promise}
    */
    Entry.prototype.setWorkflowStage = function (payload) {
        if (!payload || (typeof payload !== 'object') || (payload instanceof Array)) {
            return Promise.reject(new Error('Kindly provide valid parameters'));
        }
        return this.fetch('setWorkflowStageEntry', payload);
    };
    /**
    * @see {@link https://www.contentstack.com/docs/apis/content-management-api/#update-an-entry| Update Entry}
    * @name Stack#ContentType#Entry#update
    * @function
    * @description This call allows you to update entry content.
    * @param {object} payload - Payload for the request
    * @param {string} [locale] - Passing the ‘locale’ parameter will localize the entry in the specified locale
    *  to be localized in the specified locale.
    * @example extension.stack.ContentType('contenttype_uid').Entry('bltsomething123').update(
        {
        "entry": {
            "title": "example",
            "url": "/example"
        }
    }).then(...).catch(...);
    * @return {external:Promise}
    */
    //@ts-ignore
    Entry.prototype.update = function (payload, locale) {
        if (!payload || (typeof payload !== 'object') || (payload instanceof Array)) {
            return Promise.reject(new Error('Kindly provide valid parameters'));
        }
        this._query.locale = locale;
        return this.fetch('updateEntry', payload);
    };
    return Entry;
}(base_1.default));
exports["default"] = (function (uiConnection, contentType) {
    connection = uiConnection;
    contentTypeUid = contentType;
    return new Proxy(Entry, {
        apply: function (Target, thisArg, argumentsList) {
            var entryTarget = new (Target.bind.apply(Target, __spreadArray([void 0], argumentsList, false)))();
            Object.assign(entryTarget, {
                getReferences: utils_1.getReferences,
                addQuery: utils_1.addQuery,
                language: utils_1.language,
                environment: utils_1.environment,
                includeOwner: utils_1.includeOwner,
                includeContentType: utils_1.includeContentType,
                includeSchema: utils_1.includeSchema,
                includeReference: utils_1.includeReference
            });
            return entryTarget;
        }
    });
});


/***/ }),

/***/ "./src/stack/api/content-type/index.ts":
/*!*********************************************!*\
  !*** ./src/stack/api/content-type/index.ts ***!
  \*********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var entry_1 = __importDefault(__webpack_require__(/*! ./entry */ "./src/stack/api/content-type/entry.ts"));
var base_1 = __importDefault(__webpack_require__(/*! ../base */ "./src/stack/api/base.ts"));
var connection = {};
var ContentType = /** @class */ (function (_super) {
    __extends(ContentType, _super);
    function ContentType(uid) {
        var _this = _super.call(this, uid) || this;
        /**
         * @constructor
         * @hideconstructor
         * @name Stack#ContentType#Entry
         * @desc An entry is the actual piece of content created using one of the defined content types
         * @see {@link https://www.contentstack.com/docs/apis/content-management-api/#entries| Entries}
         */
        // @ts-ignore
        _this.Entry = (0, entry_1.default)(_this.constructor.connection, _this.uid);
        return _this;
    }
    Object.defineProperty(ContentType, "connection", {
        // static module(plural = false) {
        //   return plural ? 'ContentTypes' : 'ContentType';
        // }
        get: function () {
            return connection;
        },
        enumerable: false,
        configurable: true
    });
    return ContentType;
}(base_1.default));
exports["default"] = (function (uiConnection) {
    connection = uiConnection;
    return new Proxy(ContentType, {
        // target = Foo
        apply: function (Target, thisArg, argumentsList) {
            return new (Target.bind.apply(Target, __spreadArray([void 0], argumentsList, false)))();
        }
    });
});


/***/ }),

/***/ "./src/stack/api/query.ts":
/*!********************************!*\
  !*** ./src/stack/api/query.ts ***!
  \********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

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
Object.defineProperty(exports, "__esModule", ({ value: true }));
var Utils = __importStar(__webpack_require__(/*! ../utils */ "./src/stack/utils.ts"));
function onData(data) {
    if (typeof (data.data) === 'string') {
        return Promise.reject(data.data);
    }
    return Promise.resolve(data.data);
}
function onError(error) {
    return Promise.reject(error);
}
var _extend = {
    compare: function (type) {
        return function (key, value) {
            if (key && value && typeof key === 'string' && typeof value !== 'undefined') {
                this._query.query[key] = this._query.query.file_size || {};
                this._query.query[key][type] = value;
                return this;
            }
            throw Error('Kindly provide valid parameters.');
        };
    },
    contained: function (bool) {
        var type = (bool) ? '$in' : '$nin';
        return function (key, value) {
            if (key && value && typeof key === 'string' && Array.isArray(value)) {
                this._query.query[key] = this._query.query[key] || {};
                this._query.query[key][type] = this._query.query[key][type] || [];
                this._query.query[key][type] = this._query.query[key][type].concat(value);
                return this;
            }
            throw Error('Kindly provide valid parameters.');
        };
    },
    exists: function (bool) {
        return function (key) {
            if (key && typeof key === 'string') {
                this._query.query[key] = this._query.query[key] || {};
                this._query.query[key].$exists = bool;
                return this;
            }
            throw Error('Kindly provide valid parameters.');
        };
    },
    logical: function (type) {
        return function () {
            var _query = [];
            for (var i = 0, _i = arguments.length; i < _i; i += 1) {
                if (arguments[i] instanceof Query && arguments[i]._query.query) {
                    _query.push(arguments[i]._query.query);
                }
                else if (typeof arguments[i] === 'object') {
                    _query.push(arguments[i]);
                }
            }
            if (this._query.query[type]) {
                this._query.query[type] = this._query.query[type].concat(_query);
            }
            else {
                this._query.query[type] = _query;
            }
            return this;
        };
    },
    sort: function (type) {
        return function (key) {
            if (key && typeof key === 'string') {
                this._query[type] = key;
                return this;
            }
            throw Error('Argument should be a string.');
        };
    },
    pagination: function (type) {
        return function (value) {
            if (typeof value === 'number') {
                this._query[type] = value;
                return this;
            }
            throw Error('Argument should be a number.');
        };
    }
};
/**
 * Creates an instance of the query
 * @hideconstructor
 */
var Query = /** @class */ (function () {
    function Query(connection, module, contentTypeUid) {
        this.module = module;
        this._connection = connection;
        this._query = {};
        this._query.query = this._query.query || {};
        this.contentTypeUid = contentTypeUid;
        /**
          * @name Query#only
          * @function
          * @description This method is used to show the selected fields of an entry in the result set.
          * @param {String} [key=BASE] - Single field of an entry
          * @param {Array} values - Array of fields to be shown in the result set
          * @example
          * <caption> Only with field UID </caption>
          * extension.stack.ContentType('content_type_uid').Entry.Query().only('title').find();
          * @example
          * <caption> Only with field UID </caption>
          * extension.stack.ContentType('content_type_uid').Entry.Query().only('BASE','title').find();
          * @example
          * <caption> Only with field UIDs(array) </caption>
          * extension.stack.ContentType('content_type_uid').Entry.Query().only(['title','description']).find();
          * @returns {Query}
          */
        this.only = Utils.transform('only');
        /**
          * @name Query#except
          * @function
          * @description This method is used to hide the selected fields of an entry in the result set.
          * @param {String} [key=BASE] - Single field of an entry
          * @param {Array} values - Array of fields to be hidden in the result set
          * @example
          * <caption> Except with field uid </caption>
          * extension.stack.ContentType('content_type_uid').Entry.Query().except('title').find();
          * @example
          * <caption> Except with field uid </caption>
          * extension.stack.ContentType('content_type_uid').Entry.Query().except('BASE','title').find();
          * @example
          * <caption> Except with field uids(array) </caption>
          * extension.stack.ContentType('content_type_uid').Entry.Query().except(['title','description']).find();
          * @returns {Query}
          */
        this.except = Utils.transform('except');
        /**
           This method includes a query parameter in your query.
           @name Query#addQuery
           @function
           @example extension.stack.ContentType('content_type_uid').Entry.Query().addQuery('key', 'value').find().then().catch();
           @param {string} key - Key of the parammeter
           @param {string} value - Value of the parammeter
           @return {Query}
          */
        this.addQuery = Utils.addQuery;
        /**
         * @name Query#lessThan
         * @description This method provides only the entries with values less than the specified value for a field.
         * @param {String} key - UID of the field
         * @param {*} value - The value used to match or compare
         * @example extension.stack.ContentType('blog').lessThan('created_at','2015-06-22')
         * @returns {Query}
         */
        this.lessThan = _extend.compare('$lt');
        /**
         * @name Query#lessThanOrEqualTo
         * @description This method provides only the entries with values less than or equal to the specified value for a field.
         * @param {String} key - UID of the field
         * @param {*} value - The value used to match or compare
         * @example extension.stack.ContentType('blog').lessThanOrEqualTo('created_at','2015-03-12')
         * @returns {Query}
         */
        this.lessThanOrEqualTo = _extend.compare('$lte');
        /**
         * @function
         * @name Query#greaterThan
         * @description This method provides only the entrieswith values
         *  greater than the specified value for a field.
         * @param {String} key - UID of the field
         * @param {*} value - The value used to match or compare
         * @example extension.stack.ContentType('blog').greaterThan('created_at','2015-03-12')
         * @returns {Query}
         */
        this.greaterThan = _extend.compare('$gt');
        /**
         * @function
         * @name Query#greaterThanOrEqualTo
         * @description This method provides only the entries with values greater than or equal to the specified value for a field.
         * @param {String} key - UID of the field
         * @param {*} value - The value used to match or compare
         * @example extension.stack.ContentType('blog').greaterThanOrEqualTo('created_at', '2015-06-22')
         * @returns {Query}
         */
        this.greaterThanOrEqualTo = _extend.compare('$gte');
        /**
         * @function
         * @name Query#notEqualTo
         * @description This method provides only the entries with values not equal to the specified value for a field.
         * @param {String} key - UID of the field
         * @param {*} value - The value used to match or compare
         * @example extension.stack.ContentType('blog').notEqualTo('title','Demo')
         * @returns {Query}
         */
        this.notEqualTo = _extend.compare('$ne');
        /**
         * @function
         * @name Query#containedIn
         * @description This method provides only the entries with values matching the specified values for a field.
         * @param {String} key - UID of the field
         * @param {*} value - An array of values that are to be used to match or compare
         * @example extension.stack.ContentType('blog').containedIn('title', ['Demo', 'Welcome'])
         * @returns {Query}
         */
        this.containedIn = _extend.contained(true);
        /**
         * @function
         * @name Query#notContainedIn
         * @description This method provides only the entries that do not contain values matching the specified values for a field.
         * @param {String} key - UID of the field
         * @param {Array} value - An array of values that are to be used to match or compare
         * @example extension.stack.ContentType('blog').notContainedIn('title', ['Demo', 'Welcome'])
         * @returns {Query}
         */
        this.notContainedIn = _extend.contained(false);
        /**
         * @function
         * @name Query#exists
         * @description This method provides only the entries that contains the field matching the specified field UID.
         * @param {String} key - UID of the field
         * @example extension.stack.ContentType('blog').exists('featured')
         * @returns {Query}
         */
        this.exists = _extend.exists(true);
        /**
         * @function
         * @name Query#notExists
         * @description This method provides only the entries that do not contain the field matching the specified field UID.
         * @param {String} key - UID of the field
         * @example extension.stack.ContentType('blog').notExists('featured')
         * @returns {Query}
         */
        this.notExists = _extend.exists(false);
        /**
         * @function
         * @name Query#ascending
         * @description This parameter sorts the entries in ascending order on the basis of the value of the specified field.
         * @param {String} key - Field UID to be used for sorting.
         * @example extension.stack.ContentType('blog').ascending('created_at')
         * @returns {Query}
         */
        this.ascending = _extend.sort('asc');
        /**
         * @function
         * @name Query#descending
         * @description This method sorts the entries in descending order on the basis of the specified field.
         * @param {String} key - Field UID to be used for sorting
         * @example extension.stack.ContentType('blog').descending('created_at')
         * @returns {Query}
         */
        this.descending = _extend.sort('desc');
        /**
         * @function
         * @name Query#beforeUid
         * @description This method provides only the entries that are placed before the specified entry ID.
         * @param {String} uid - UID of the entry
         * @example extension.stack.ContentType('blog').beforeUid('blt1234567890abcdef')
         * @returns {Query}
         * @ignore
         */
        this.beforeUid = _extend.sort('before_uid');
        /**
         * @function
         * @name Query#afterUid
         * @description This method provides only the entries that are placed after the specified entry ID.
         * @param {String} uid - UID of the entry
         * @example extension.stack.ContentType('blog').afterUid('blt1234567890abcdef')
         * @returns {Query}
         * @ignore
         */
        this.afterUid = _extend.sort('after_uid');
        /**
         * @function
         * @name Query#skip
         * @description This method skips the specified number of entries.
         * @param {Number} skip - Number of entries to be skipped
         * @example extension.stack.ContentType('blog').skip(5)
         * @returns {Query}
         */
        this.skip = _extend.pagination('skip');
        /**
         * @function
         * @name Query#limit
         * @description This method limits the response by providing only the specified number of entries.
         * @param {Number} limit - Maximum number of entries to be returned in the result.
         * @example extension.stack.ContentType('blog').limit(10)
         * @returns {Query}
         */
        this.limit = _extend.pagination('limit');
        /**
         * @function
         * @name Query#or
         * @description This method performs the OR operation on the specified query objects and provides only the matching entries.
         * @param {object} Array of query objects/raw queries
         *  to be taken into consideration
         * @example
         * <caption> OR with query instances</caption>
         * let Query1 = extension.stack.ContentType('blog').Entry.Query().where('title', 'Demo')
         * let Query2 = extension.stack.ContentType('blog').Entry.Query().lessThan('comments', 10)
         * let blogQuery = extension.stack.ContentType('blog').or(Query1, Query2)
         * @example
         * <caption> OR with query instances</caption>
         * let Query1 = extension.stack.ContentType('blog').Entry.Query().where('title', 'Demo').getQuery()
         * let Query2 = extension.stack.ContentType('blog').Entry.Query().lessThan('comments', 10).getQuery()
         * let blogQuery = extension.stack.ContentType('blog').or(Query1, Query2)
         * @returns {Query}
         */
        this.or = _extend.logical('$or');
        /**
         * @function
         * @name Query#and
         * @description This method performs the AND operation on the specified query objects and provides only the matching entries.
         * @param {object} Array of query objects/raw queries to be taken into consideration
         * @example
         * <caption> AND with raw queries</caption>
         * let Query1 = extension.stack.ContentType('blog').Entry.Query().where('title', 'Demo');
         * let Query2 = extension.stack.ContentType('blog').Entry.Query().lessThan('comments', 10);
         * let blogQuery = extension.stack.ContentType('blog').and(Query1, Query2)
         * @example
         * <caption> .and with raw queries</caption>
         * let Query1 = extension.stack.ContentType('blog').Entry.Query().where('title', 'Demo').getQuery();
         * let Query2 = extension.stack.ContentType('blog').Entry.Query().lessThan('comments', 10).getQuery();
         * let blogQuery = extension.stack.ContentType('blog').and(Query1, Query2)
         * @returns {Query}
         */
        this.and = _extend.logical('$and');
        /**
           This method includes a query parameter in your query.
           @name Query#addParam
           @function
           @example extension.stack.ContentType('content_type_uid').Entry.Query().addParam('key', 'value').find().then().catch();
           @param {string} key - Key of the parammeter
           @param {string} value - Value of the parammeter
           @return {Query}
          */
        this.addParam = Utils.addParam;
    }
    // -------------------------------------Entry Queries--------------------------------------------------
    /**
     * @function
     * @name Query#includeReference
     * @description This method is used to include referenced entries from other content types. Note: This method is only valid for querying {@link Stack#ContentType#Entry}.
     * @example
     * <caption> .includeReference with reference_field_uids as array </caption>
     * stack.ContentType('contenttype_uid').Entry.Query().includeReference(['category', 'author']).find()
     * @example
     * <caption> .includeReference with reference_field_uids </caption>
     * stack.ContentType('contenttype_uid').Entry.Query().includeReference('category', 'author').find()
     * @returns {Query}
     */
    /**
     * @function
     * @name Query#includeSchema
     * @description This method is used to include the schema of the current contenttype in result set along with the entry/entries. Note: This method is only valid for querying {@link Stack#ContentType#Entry}.
     * @example extension.stack.ContentType('contenttype_uid').Entry.Query().includeSchema().find()
     * @returns {Query}
     */
    /**
     * @function
     * @name Query#language
     * @description This method is used to set the language code of which you want to retrieve the data. Note: This method is only valid for querying {@link Stack#ContentType#Entry}.
     * @param {String} languageCode - Language code, for e.g. 'en-us', 'ja-jp', and so on
     * @example extension.stack.ContentType('contenttype_uid').Entry.Query().language('en-us').find()
     * @returns {Query}
     */
    /**
     * @function
     * @name Query#includeContentType
     * @description This method is used to include the current content type in the result set along with the entry(ies). Note: This method is only valid for querying {@link Stack#ContentType#Entry}.
     * @example extension.stack.ContentType('contenttype_uid').Entry.Query().includeContentType().find()
     * @returns {Query}
     */
    /**
     * @function
     * @name Query#includeOwner
     * @description This method is used to include the owner of the entry(ies) in the result set. Note: This method is only valid for querying {@link Stack#ContentType#Entry}.
     * @example extension.stack.ContentType('contenttype_uid').Entry.Query().includeOwner().find()
     * @returns {Query}
     */
    // -----------------------------------------Entry Queries End------------------------------------------------------
    /**
     * @function
     * @name Query#environment
     * @description This method is used to set the environment name of which you want to retrieve the data.
     * @param {String} environment_uid - UID/Name of environment
     * @example extension.stack.ContentType('contenttype_uid').Entry.Query().environment('development').find()
     * @returns {Query}
     */
    /**
       * @description This method provides only the entries containing field values matching the specified condition.
       * @param {String} key - UID of the field
       * @param {*} value - The value used to match or compare
       * @example extension.stack.ContentType('blog').where('title','Demo')
       * @returns {Query}
       */
    Query.prototype.equalTo = function (key, value) {
        if (key && typeof key === 'string') {
            this._query.query[key] = value;
            return this;
        }
        throw Error('Kindly provide valid parameters.');
    };
    Query.prototype.where = function (key, value) {
        if (key && typeof key === 'string') {
            this._query.query[key] = value;
            return this;
        }
        throw Error('Kindly provide valid parameters.');
    };
    /**
       * @description This method provides only the number of entries matching the specified filters.
       * @example extension.stack.ContentType('blog').count()
       * @returns {Query}
       */
    Query.prototype.count = function () {
        this._query.count = true;
        var options = { content_type_uid: this.contentTypeUid, params: this._query, action: "get" + this.module };
        return this._connection.sendToParent('stackQuery', options).then(onData).catch(onError);
    };
    /**
       * @description This method is used to set raw queries on the Query instance.
       * @param {object} query -  Raw{json} queries to filter the entries in the result set.
       * @returns {Query}
       */
    Query.prototype.query = function (query) {
        if (typeof query === 'object') {
            this._query.query = Utils.mergeDeep(this._query.query, query);
            return this;
        }
        throw Error('Kindly provide valid parameters');
    };
    /**
       * @description The ’tags’ parameter allows you to specify an array of tags to search for objects.
       * @param {Array} values - Tags
       * @example extension.stack.ContentType('blog').tags(['technology', 'business'])
       * @returns {Query}
       */
    Query.prototype.tags = function (values) {
        if (Array.isArray(values)) {
            this._query.tags = values;
            return this;
        }
        throw Error('Kindly provide valid parameters');
    };
    /**
       * @description This method also includes the total number of entries returned in the response.
       * @example extension.stack.ContentType('blog').includeCount()
       * @returns {Query}
       */
    Query.prototype.includeCount = function () {
        this._query.include_count = true;
        return this;
    };
    /**
       * @summary returns Returns the raw query which can be used for further calls (.and/.or).
       * @description This method provides raw{json} queries based on the filters applied on the Query object.
       * @example extension.stack.ContentType('blog').where('title','Demo').getQuery()
       * @returns {Query}
       */
    Query.prototype.getQuery = function () {
        return this._query.query;
    };
    /**
       * @description This method provides only the entries matching the regular expression for the specified field.
       * @param {String} key - UID of the field
       * @param {*} value - The value used to match or compare
       * @param {String} [options] - Match or compare a value in the entry
       * @example
       * <caption> .regex without options</caption>
       * let blogQuery = extension.stack.ContentType('blog').regex('title','^Demo')
       * @example
       * <caption> .regex with options</caption>
       * let blogQuery = extension.stack.ContentType('blog').regex('title','^Demo', 'i')
       * @returns {Query}
       */
    Query.prototype.regex = function (key, value, options) {
        if (key && value && typeof key === 'string' && typeof value === 'string') {
            this._query.query[key] = {
                $regex: value
            };
            if (options)
                this._query.query[key].$options = options;
            return this;
        }
        throw Error('Kindly provide valid parameters.');
    };
    /**
       * @description This method is used to search data in entries.
       * @param {string} value - Value to search in the entries.
       * @example extension.stack.ContentType('blog').search('Welcome to demo')
       * @returns {Query}
       */
    Query.prototype.search = function (value) {
        if (value && typeof value === 'string') {
            this._query.typeahead = value;
            return this;
        }
        throw Error('Kindly provide valid parameters.');
    };
    /**
       * @description This method provides all the entries which satisfy the specified query.
       * @example
       * let blogQuery = extension.stack.ContentType('blog').find()
       */
    Query.prototype.find = function () {
        var options = { content_type_uid: this.contentTypeUid, params: this._query, action: "get" + this.module };
        return this._connection.sendToParent('stackQuery', options).then(onData).catch(onError);
    };
    /**
       * @description This method provides a single entry from the result set.
       * @example
       * let blogQuery = extension.stack.ContentType('blog').findOne()
       */
    Query.prototype.findOne = function () {
        this.singleEntry = true;
        this._query.limit = 1;
        var options = { content_type_uid: this.contentTypeUid, params: this._query, action: "get" + this.module };
        return this._connection.sendToParent('stackQuery', options).then(onData).catch(onError);
    };
    return Query;
}());
exports["default"] = Query;


/***/ }),

/***/ "./src/stack/index.ts":
/*!****************************!*\
  !*** ./src/stack/index.ts ***!
  \****************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var index_1 = __importDefault(__webpack_require__(/*! ./api/asset/index */ "./src/stack/api/asset/index.ts"));
var index_2 = __importDefault(__webpack_require__(/*! ./api/content-type/index */ "./src/stack/api/content-type/index.ts"));
var utils_1 = __webpack_require__(/*! ../utils */ "./src/utils.ts");
/**
 * Class representing the current stack in Contentstack UI.
 */
var Stack = /** @class */ (function () {
    function Stack(data, connection, additionalData) {
        if (data === void 0) { data = {}; }
        this._currentBranch = null;
        this._connection = connection;
        this._data = data;
        /**
         * @constructor
         * @hideconstructor
         * @desc Content type defines the structure or schema of a page or a section of your web or mobile property
         * @see {@link https://www.contentstack.com/docs/apis/content-management-api/#content-types| ContentType}
         * @param {string} uid - Uid of contenttype.
         * @example extension.stack.ContentType('content_type_uid')
         * */
        this.ContentType = (0, index_2.default)(connection);
        /**
         * @constructor
         * @hideconstructor
         * @desc An initializer is responsible for creating an Asset object.
         * @see {@link https://www.contentstack.com/docs/apis/content-management-api/#assets| Asset}
         * @param {string} uid - UID of the asset.
         * @example extension.stack.Asset('asset_uid')
         * */
        this.Asset = (0, index_1.default)(connection);
        var currentBranch = additionalData.currentBranch || "";
        if (currentBranch) {
            this._currentBranch =
                (data.branches || []).find(function (branch) { return branch.uid === additionalData.currentBranch; }) || null;
        }
    }
    /**
     * This method returns the data of the current stack.
     * @return Returns stack data.
     */
    Stack.prototype.getData = function () {
        return this._data;
    };
    /**
     * This method returns all the stacks in the current organization.
     * @param query asks for organization UID and query params to get all stacks
     * @returns Stacks within current organization
     */
    Stack.prototype.getAllStacks = function (_a) {
        var _b = _a === void 0 ? {} : _a, _c = _b.orgUid, orgUid = _c === void 0 ? "" : _c, _d = _b.params, params = _d === void 0 ? {} : _d;
        return __awaiter(this, void 0, void 0, function () {
            var options;
            return __generator(this, function (_e) {
                // validation
                if (typeof orgUid !== 'string') {
                    throw new TypeError('orgUid must be a string');
                }
                options = {
                    action: "getStacks",
                    headers: { organization_uid: orgUid || this._data.org_uid },
                    skip_api_key: true,
                    params: params
                };
                return [2 /*return*/, this._connection
                        .sendToParent("stackQuery", options)
                        .then(utils_1.onData)
                        .then(function (data) { return data.stacks || []; })
                        .catch(utils_1.onError)];
            });
        });
    };
    /**
     * Gets the results of the search based on user query
     * @param queries Array of key value pair of query parameters
     * @param apiKey API key of the stack
     * @returns Result of the query
     */
    Stack.prototype.search = function (queries, apiKey) {
        if (apiKey === void 0) { apiKey = this._data.api_key; }
        var options = { params: queries, api_key: apiKey, action: "search" };
        return this._connection
            .sendToParent("stackQuery", options)
            .then(utils_1.onData)
            .catch(utils_1.onError);
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
    /**
     * This API allows you to retrive a workflow of a stack using the {@link https://www.contentstack.com/docs/apis/content-management-api/#get-a-workflow| Language API} requests. Method returns a Promise object.
     * @param {string} code Code of the desired locale
     * @param {Object} params Optional parameters for the GET call
     * @return {Object} A promise object which will be resolved with locale details.
     */
    Stack.prototype.getWorkflow = function (uid, params) {
        if (params === void 0) { params = {}; }
        if (!uid) {
            return Promise.reject(new Error('workflow uid is required'));
        }
        var options = { uid: uid, params: params, action: 'getWorkflow' };
        return this._connection.sendToParent('stackQuery', options).then(utils_1.onData).catch(utils_1.onError);
    };
    /**
     * This API allows you to retrive the locales of a stack using the {@link https://www.contentstack.com/docs/apis/content-management-api/#get-all-content-types| Languages API} requests. Method returns a Promise object.
     * @param {Object} query Query for the GET call
     * @param {Object} params Optional parameters for the GET call
     * @return {Object} A Promise object which will be resolved with details of the locales.
     */
    Stack.prototype.getWorkflows = function (query, params) {
        if (query === void 0) { query = {}; }
        if (params === void 0) { params = {}; }
        var optionParams = params;
        optionParams.query = query;
        var options = { params: optionParams, action: 'getWorkflows' };
        return this._connection.sendToParent('stackQuery', options).then(utils_1.onData).catch(utils_1.onError);
    };
    /**
     * This API allows you to retrieve all the branches in the current stack
     * @returns All branches of the current stack
     */
    Stack.prototype.getAllBranches = function () {
        return this._data.branches || [];
    };
    /**
     * Returns the details of the current branch of the stack if available
     * @returns current branch of the current stack if available
     */
    Stack.prototype.getCurrentBranch = function () {
        return this._currentBranch;
    };
    return Stack;
}());
exports["default"] = Stack;


/***/ }),

/***/ "./src/stack/utils.ts":
/*!****************************!*\
  !*** ./src/stack/utils.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getReferences = exports.includeReference = exports.includeSchema = exports.includeContentType = exports.includeOwner = exports.environment = exports.language = exports.addQuery = exports.addParam = exports._type = exports.mergeDeep = exports.merge = exports.transform = void 0;
function transform(type) {
    return function () {
        switch (arguments.length) {
            case 1:
                if (Array.isArray(arguments[0]) ||
                    typeof arguments[0] === "string") {
                    var query = this._query[type + "[BASE]"] || [];
                    query = query.concat(arguments[0]);
                    this._query[type + "[BASE]"] = query;
                    return this;
                }
                throw Error("Kindly provide valid parameters");
            case 2:
                if (typeof arguments[0] === "string" &&
                    (Array.isArray(arguments[1]) ||
                        typeof arguments[1] === "string")) {
                    var query = this._query[type + "[" + arguments[0] + "]"] || [];
                    query = query.concat(arguments[1]);
                    this._query[type + "[" + arguments[0] + "]"] = query;
                    return this;
                }
                throw Error("Kindly provide valid parameters");
            default:
                throw Error("Kindly provide valid parameters");
        }
    };
}
exports.transform = transform;
// merge two objects
function merge(target, source) {
    var newTraget = target;
    if (target && source) {
        Object.keys(source).forEach(function (key) {
            newTraget[key] = source[key];
        });
    }
    return newTraget;
}
exports.merge = merge;
// merge two objects
function mergeDeep(oldTarget, oldSource) {
    var newTarget = oldTarget;
    var self = this;
    var _mergeRecursive = function (anotherTarget, source) {
        var target = anotherTarget;
        Object.keys(source).forEach(function (key) {
            if (self._type(source[key]) === "object" &&
                self._type(target[key]) === self._type(source[key])) {
                _mergeRecursive(target[key], source[key]);
            }
            else if (self._type(source[key]) === "array" &&
                self._type(target[key]) === self._type(source[key])) {
                target[key] = target[key].concat(source[key]);
            }
            else {
                target[key] = source[key];
            }
        });
    };
    _mergeRecursive(newTarget, oldSource);
    return newTarget;
}
exports.mergeDeep = mergeDeep;
function _type(val) {
    var __typeof = typeof val;
    if (__typeof === "object" && Array.isArray(val)) {
        //@ts-ignore
        __typeof = "array";
    }
    return __typeof;
}
exports._type = _type;
function addParam(key, value) {
    if (key && typeof key === "string" && value && typeof value === "string") {
        this._query[key] = value;
        return this;
    }
    throw Error("Kindly provide valid parameters.");
}
exports.addParam = addParam;
function addQuery(key, value) {
    if (key && value && typeof key === "string") {
        this._query[key] = value;
        return this;
    }
    throw Error("First argument should be a String.");
}
exports.addQuery = addQuery;
function language(languageCode) {
    if (languageCode && typeof languageCode === "string") {
        this._query.locale = languageCode;
        return this;
    }
    throw Error("Argument should be a String.");
}
exports.language = language;
function environment(environmentCode) {
    if (environmentCode && typeof environmentCode === "string") {
        this._query.environment = environmentCode;
        return this;
    }
    throw Error("Argument should be a String.");
}
exports.environment = environment;
function includeOwner() {
    this._query.include_owner = true;
    return this;
}
exports.includeOwner = includeOwner;
function includeContentType() {
    this._query.include_content_type = true;
    return this;
}
exports.includeContentType = includeContentType;
function includeSchema() {
    this._query.include_schema = true;
    return this;
}
exports.includeSchema = includeSchema;
function includeReference(val) {
    if (Array.isArray(val)) {
        for (var i = 0; i < val.length; i += 1) {
            this._query["include[]"] = this._query["include[]"] || [];
            this._query["include[]"] = this._query["include[]"].concat(val[i]);
        }
    }
    else if (typeof val === "string") {
        for (var i = 0; i < arguments.length; i += 1) {
            this._query["include[]"] = this._query["include[]"] || [];
            this._query["include[]"] = this._query["include[]"].concat(arguments[i]);
        }
    }
    else {
        throw Error("Argument should be a String or an Array.");
    }
    return this;
}
exports.includeReference = includeReference;
function getReferences() {
    return this.fetch("get" + this.constructor.module() + "References");
}
exports.getReferences = getReferences;


/***/ }),

/***/ "./src/store.ts":
/*!**********************!*\
  !*** ./src/store.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
function onError(error) {
    return Promise.reject(error);
}
/**
 * Class used by an extension to store your data in {@link external:localStorage}.
 */
var Store = /** @class */ (function () {
    function Store(connection) {
        this._connection = connection;
    }
    /**
       * Gets the value of key
       * @param  {string} key Key of the stored data
       * @example extension.store.get('key').then((value) => console.log(value)) // will log value for the given key
       * @return {external:Promise}
       */
    Store.prototype.get = function (key) {
        if (!key || typeof key !== 'string') {
            throw new Error('Kindly provide valid parameters');
        }
        return this._connection.sendToParent('store', { action: 'get', key: key })
            .then(function (event) { return Promise.resolve(event.data); }).catch(onError);
    };
    /**
       * Gets an object with all the stored key-value pairs.
       * @example extension.store.getAll().then((obj) => obj)
       * @return {external:Promise}
       */
    Store.prototype.getAll = function () {
        return this._connection.sendToParent('store', { action: 'getAll' })
            .then(function (_a) {
            var _b = _a.data, data = _b === void 0 ? {} : _b;
            return Promise.resolve(data);
        }).catch(onError);
    };
    /**
       * Sets the value of a key
       * @param  {string} key Key of the stored data.
       * @param {*} value Data to be stored.
       * @example extension.store.set('key', 'value').then((success) => console.log(success)) // will log ‘true’ when value is set
       * @return {external:Promise}
       */
    Store.prototype.set = function (key, value) {
        if (!key || !value || typeof key !== 'string') {
            throw new Error('Kindly provide valid parameters');
        }
        return this._connection.sendToParent('store', { action: 'set', key: key, value: value })
            .then(function () { return Promise.resolve(true); }).catch(onError);
    };
    /**
       * Removes the value of a key
       * @param  {string} key  Key of the data to be removed from the store
       * @example extension.store.remove('key').then((success) => console.log(success)) // will log ‘true’ when value is removed
       * @return {external:Promise}
       */
    Store.prototype.remove = function (key) {
        if (!key || typeof key !== 'string') {
            throw new Error('Kindly provide valid parameters');
        }
        return this._connection.sendToParent('store', { action: 'remove', key: key })
            .then(function () { return Promise.resolve(true); }).catch(onError);
    };
    /**
       * Clears all the stored data of an extension
       * @example extension.store.clear().then((success) => console.log(success)) // will log ‘true’ when values are cleared
       * @return {external:Promise}
       */
    Store.prototype.clear = function () {
        return this._connection.sendToParent('store', { action: 'clear' })
            .then(function () { return Promise.resolve(true); }).catch(onError);
    };
    return Store;
}());
exports["default"] = Store;


/***/ }),

/***/ "./src/utils.ts":
/*!**********************!*\
  !*** ./src/utils.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.onError = exports.onData = void 0;
function onData(data) {
    if (typeof (data.data) === 'string') {
        return Promise.reject(data.data);
    }
    return Promise.resolve(data.data);
}
exports.onData = onData;
function onError(error) {
    return Promise.reject(error);
}
exports.onError = onError;


/***/ }),

/***/ "./src/window.ts":
/*!***********************!*\
  !*** ./src/window.ts ***!
  \***********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var post_robot_1 = __importDefault(__webpack_require__(/*! post-robot */ "./node_modules/post-robot/index.js"));
var config = { attributes: true, childList: true, subtree: true };
var observer;
/**
 * Class representing an iframe window from Contentstack UI. Not available for Custom Widgets.
 */
var Window = /** @class */ (function () {
    function Window(connection, type, emitter, state) {
        if (state === void 0) { state = 'half_width'; }
        this._connection = connection || post_robot_1.default;
        this._autoResizingEnabled = false;
        this._resizingEnabled = false;
        this.type = type;
        this.state = state;
        this._emitter = emitter;
    }
    /**
     * This method activates the resize button that gives you the provision to resize the window size of your Dashboard Widget.
     * @return {external:Promise}  A promise object which will resolve when a resize button is visible on the Dashboard Widget.
     */
    Window.prototype.enableResizing = function () {
        if (this.type !== 'DASHBOARD') {
            return Promise.resolve();
        }
        this._resizingEnabled = true;
        return this._connection.sendToParent('window', { action: 'enableResizing' });
    };
    /**
     * This function executes the callback function whenever a Dashboard Widget extension is maximized or minimized. Only applicable on Dashboard Widget extensions.
     * @param {function} callback Function to be called when a Dashboard Widget extension is maximized or minimized
     * @return {boolean} Will return true
     */
    Window.prototype.onDashboardResize = function (callback) {
        var windowObj = this;
        if (this.type !== 'DASHBOARD') {
            return false;
        }
        if (callback && typeof (callback) === 'function') {
            windowObj._emitter.on('dashboardResize', function (event) {
                windowObj.state = event.state;
                callback(event.state);
            });
        }
        else {
            throw Error('Callback must be a function');
        }
        return true;
    };
    /**
     * This method updates the extension height on Contentstack UI.
     * If the ‘height’ argument is not passed, it will calculate the scroll height and set the height of extension window accordingly.
     * @param {string|number} height Desired height of the iframe window
     * @return {external:Promise}  A promise object which will be resolved when Contentstack UI sends an acknowledgement stating that the height has been updated.
     */
    Window.prototype.updateHeight = function (height) {
        if (this.type === 'DASHBOARD' && this.state === 'half_width') {
            return Promise.resolve();
        }
        if (!height || isNaN(height)) {
            this._height = Math.ceil(document.documentElement.getBoundingClientRect().height);
        }
        else if (this._height === height) {
            return Promise.resolve();
        }
        else {
            this._height = height;
        }
        return this._connection.sendToParent('resize', this._height);
    };
    /**
     * This method enables auto resizing of the extension height.
     * @return {Window}.
     */
    Window.prototype.enableAutoResizing = function () {
        if (this._autoResizingEnabled || (this.state === 'half_width' && this.type === 'DASHBOARD')) {
            return this;
        }
        this._autoResizingEnabled = true;
        //@ts-ignore
        observer = new MutationObserver(this.updateHeight.bind(this));
        observer.observe(window.document.body, config);
        return this;
    };
    /**
     * This method disables auto resizing of the extension height.
     * @return {Window}.
     */
    Window.prototype.disableAutoResizing = function () {
        if (!this._autoResizingEnabled) {
            return this;
        }
        this._autoResizingEnabled = false;
        observer.disconnect();
        return this;
    };
    Window.prototype.enablePaddingTop = function () {
        // @ts-ignore
        return post_robot_1.default.sendToParent("window", {
            action: "dashboardEnableTopPadding",
        });
    };
    Window.prototype.disablePaddingTop = function () {
        // @ts-ignore
        return post_robot_1.default.sendToParent('window', {
            action: 'dashboardDisableTopPadding'
        });
    };
    return Window;
}());
exports["default"] = Window;


/***/ }),

/***/ "./node_modules/wolfy87-eventemitter/EventEmitter.js":
/*!***********************************************************!*\
  !*** ./node_modules/wolfy87-eventemitter/EventEmitter.js ***!
  \***********************************************************/
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_RESULT__;/*!
 * EventEmitter v5.2.9 - git.io/ee
 * Unlicense - http://unlicense.org/
 * Oliver Caldwell - https://oli.me.uk/
 * @preserve
 */

;(function (exports) {
    'use strict';

    /**
     * Class for managing events.
     * Can be extended to provide event functionality in other classes.
     *
     * @class EventEmitter Manages event registering and emitting.
     */
    function EventEmitter() {}

    // Shortcuts to improve speed and size
    var proto = EventEmitter.prototype;
    var originalGlobalValue = exports.EventEmitter;

    /**
     * Finds the index of the listener for the event in its storage array.
     *
     * @param {Function[]} listeners Array of listeners to search through.
     * @param {Function} listener Method to look for.
     * @return {Number} Index of the specified listener, -1 if not found
     * @api private
     */
    function indexOfListener(listeners, listener) {
        var i = listeners.length;
        while (i--) {
            if (listeners[i].listener === listener) {
                return i;
            }
        }

        return -1;
    }

    /**
     * Alias a method while keeping the context correct, to allow for overwriting of target method.
     *
     * @param {String} name The name of the target method.
     * @return {Function} The aliased method
     * @api private
     */
    function alias(name) {
        return function aliasClosure() {
            return this[name].apply(this, arguments);
        };
    }

    /**
     * Returns the listener array for the specified event.
     * Will initialise the event object and listener arrays if required.
     * Will return an object if you use a regex search. The object contains keys for each matched event. So /ba[rz]/ might return an object containing bar and baz. But only if you have either defined them with defineEvent or added some listeners to them.
     * Each property in the object response is an array of listener functions.
     *
     * @param {String|RegExp} evt Name of the event to return the listeners from.
     * @return {Function[]|Object} All listener functions for the event.
     */
    proto.getListeners = function getListeners(evt) {
        var events = this._getEvents();
        var response;
        var key;

        // Return a concatenated array of all matching events if
        // the selector is a regular expression.
        if (evt instanceof RegExp) {
            response = {};
            for (key in events) {
                if (events.hasOwnProperty(key) && evt.test(key)) {
                    response[key] = events[key];
                }
            }
        }
        else {
            response = events[evt] || (events[evt] = []);
        }

        return response;
    };

    /**
     * Takes a list of listener objects and flattens it into a list of listener functions.
     *
     * @param {Object[]} listeners Raw listener objects.
     * @return {Function[]} Just the listener functions.
     */
    proto.flattenListeners = function flattenListeners(listeners) {
        var flatListeners = [];
        var i;

        for (i = 0; i < listeners.length; i += 1) {
            flatListeners.push(listeners[i].listener);
        }

        return flatListeners;
    };

    /**
     * Fetches the requested listeners via getListeners but will always return the results inside an object. This is mainly for internal use but others may find it useful.
     *
     * @param {String|RegExp} evt Name of the event to return the listeners from.
     * @return {Object} All listener functions for an event in an object.
     */
    proto.getListenersAsObject = function getListenersAsObject(evt) {
        var listeners = this.getListeners(evt);
        var response;

        if (listeners instanceof Array) {
            response = {};
            response[evt] = listeners;
        }

        return response || listeners;
    };

    function isValidListener (listener) {
        if (typeof listener === 'function' || listener instanceof RegExp) {
            return true
        } else if (listener && typeof listener === 'object') {
            return isValidListener(listener.listener)
        } else {
            return false
        }
    }

    /**
     * Adds a listener function to the specified event.
     * The listener will not be added if it is a duplicate.
     * If the listener returns true then it will be removed after it is called.
     * If you pass a regular expression as the event name then the listener will be added to all events that match it.
     *
     * @param {String|RegExp} evt Name of the event to attach the listener to.
     * @param {Function} listener Method to be called when the event is emitted. If the function returns true then it will be removed after calling.
     * @return {Object} Current instance of EventEmitter for chaining.
     */
    proto.addListener = function addListener(evt, listener) {
        if (!isValidListener(listener)) {
            throw new TypeError('listener must be a function');
        }

        var listeners = this.getListenersAsObject(evt);
        var listenerIsWrapped = typeof listener === 'object';
        var key;

        for (key in listeners) {
            if (listeners.hasOwnProperty(key) && indexOfListener(listeners[key], listener) === -1) {
                listeners[key].push(listenerIsWrapped ? listener : {
                    listener: listener,
                    once: false
                });
            }
        }

        return this;
    };

    /**
     * Alias of addListener
     */
    proto.on = alias('addListener');

    /**
     * Semi-alias of addListener. It will add a listener that will be
     * automatically removed after its first execution.
     *
     * @param {String|RegExp} evt Name of the event to attach the listener to.
     * @param {Function} listener Method to be called when the event is emitted. If the function returns true then it will be removed after calling.
     * @return {Object} Current instance of EventEmitter for chaining.
     */
    proto.addOnceListener = function addOnceListener(evt, listener) {
        return this.addListener(evt, {
            listener: listener,
            once: true
        });
    };

    /**
     * Alias of addOnceListener.
     */
    proto.once = alias('addOnceListener');

    /**
     * Defines an event name. This is required if you want to use a regex to add a listener to multiple events at once. If you don't do this then how do you expect it to know what event to add to? Should it just add to every possible match for a regex? No. That is scary and bad.
     * You need to tell it what event names should be matched by a regex.
     *
     * @param {String} evt Name of the event to create.
     * @return {Object} Current instance of EventEmitter for chaining.
     */
    proto.defineEvent = function defineEvent(evt) {
        this.getListeners(evt);
        return this;
    };

    /**
     * Uses defineEvent to define multiple events.
     *
     * @param {String[]} evts An array of event names to define.
     * @return {Object} Current instance of EventEmitter for chaining.
     */
    proto.defineEvents = function defineEvents(evts) {
        for (var i = 0; i < evts.length; i += 1) {
            this.defineEvent(evts[i]);
        }
        return this;
    };

    /**
     * Removes a listener function from the specified event.
     * When passed a regular expression as the event name, it will remove the listener from all events that match it.
     *
     * @param {String|RegExp} evt Name of the event to remove the listener from.
     * @param {Function} listener Method to remove from the event.
     * @return {Object} Current instance of EventEmitter for chaining.
     */
    proto.removeListener = function removeListener(evt, listener) {
        var listeners = this.getListenersAsObject(evt);
        var index;
        var key;

        for (key in listeners) {
            if (listeners.hasOwnProperty(key)) {
                index = indexOfListener(listeners[key], listener);

                if (index !== -1) {
                    listeners[key].splice(index, 1);
                }
            }
        }

        return this;
    };

    /**
     * Alias of removeListener
     */
    proto.off = alias('removeListener');

    /**
     * Adds listeners in bulk using the manipulateListeners method.
     * If you pass an object as the first argument you can add to multiple events at once. The object should contain key value pairs of events and listeners or listener arrays. You can also pass it an event name and an array of listeners to be added.
     * You can also pass it a regular expression to add the array of listeners to all events that match it.
     * Yeah, this function does quite a bit. That's probably a bad thing.
     *
     * @param {String|Object|RegExp} evt An event name if you will pass an array of listeners next. An object if you wish to add to multiple events at once.
     * @param {Function[]} [listeners] An optional array of listener functions to add.
     * @return {Object} Current instance of EventEmitter for chaining.
     */
    proto.addListeners = function addListeners(evt, listeners) {
        // Pass through to manipulateListeners
        return this.manipulateListeners(false, evt, listeners);
    };

    /**
     * Removes listeners in bulk using the manipulateListeners method.
     * If you pass an object as the first argument you can remove from multiple events at once. The object should contain key value pairs of events and listeners or listener arrays.
     * You can also pass it an event name and an array of listeners to be removed.
     * You can also pass it a regular expression to remove the listeners from all events that match it.
     *
     * @param {String|Object|RegExp} evt An event name if you will pass an array of listeners next. An object if you wish to remove from multiple events at once.
     * @param {Function[]} [listeners] An optional array of listener functions to remove.
     * @return {Object} Current instance of EventEmitter for chaining.
     */
    proto.removeListeners = function removeListeners(evt, listeners) {
        // Pass through to manipulateListeners
        return this.manipulateListeners(true, evt, listeners);
    };

    /**
     * Edits listeners in bulk. The addListeners and removeListeners methods both use this to do their job. You should really use those instead, this is a little lower level.
     * The first argument will determine if the listeners are removed (true) or added (false).
     * If you pass an object as the second argument you can add/remove from multiple events at once. The object should contain key value pairs of events and listeners or listener arrays.
     * You can also pass it an event name and an array of listeners to be added/removed.
     * You can also pass it a regular expression to manipulate the listeners of all events that match it.
     *
     * @param {Boolean} remove True if you want to remove listeners, false if you want to add.
     * @param {String|Object|RegExp} evt An event name if you will pass an array of listeners next. An object if you wish to add/remove from multiple events at once.
     * @param {Function[]} [listeners] An optional array of listener functions to add/remove.
     * @return {Object} Current instance of EventEmitter for chaining.
     */
    proto.manipulateListeners = function manipulateListeners(remove, evt, listeners) {
        var i;
        var value;
        var single = remove ? this.removeListener : this.addListener;
        var multiple = remove ? this.removeListeners : this.addListeners;

        // If evt is an object then pass each of its properties to this method
        if (typeof evt === 'object' && !(evt instanceof RegExp)) {
            for (i in evt) {
                if (evt.hasOwnProperty(i) && (value = evt[i])) {
                    // Pass the single listener straight through to the singular method
                    if (typeof value === 'function') {
                        single.call(this, i, value);
                    }
                    else {
                        // Otherwise pass back to the multiple function
                        multiple.call(this, i, value);
                    }
                }
            }
        }
        else {
            // So evt must be a string
            // And listeners must be an array of listeners
            // Loop over it and pass each one to the multiple method
            i = listeners.length;
            while (i--) {
                single.call(this, evt, listeners[i]);
            }
        }

        return this;
    };

    /**
     * Removes all listeners from a specified event.
     * If you do not specify an event then all listeners will be removed.
     * That means every event will be emptied.
     * You can also pass a regex to remove all events that match it.
     *
     * @param {String|RegExp} [evt] Optional name of the event to remove all listeners for. Will remove from every event if not passed.
     * @return {Object} Current instance of EventEmitter for chaining.
     */
    proto.removeEvent = function removeEvent(evt) {
        var type = typeof evt;
        var events = this._getEvents();
        var key;

        // Remove different things depending on the state of evt
        if (type === 'string') {
            // Remove all listeners for the specified event
            delete events[evt];
        }
        else if (evt instanceof RegExp) {
            // Remove all events matching the regex.
            for (key in events) {
                if (events.hasOwnProperty(key) && evt.test(key)) {
                    delete events[key];
                }
            }
        }
        else {
            // Remove all listeners in all events
            delete this._events;
        }

        return this;
    };

    /**
     * Alias of removeEvent.
     *
     * Added to mirror the node API.
     */
    proto.removeAllListeners = alias('removeEvent');

    /**
     * Emits an event of your choice.
     * When emitted, every listener attached to that event will be executed.
     * If you pass the optional argument array then those arguments will be passed to every listener upon execution.
     * Because it uses `apply`, your array of arguments will be passed as if you wrote them out separately.
     * So they will not arrive within the array on the other side, they will be separate.
     * You can also pass a regular expression to emit to all events that match it.
     *
     * @param {String|RegExp} evt Name of the event to emit and execute listeners for.
     * @param {Array} [args] Optional array of arguments to be passed to each listener.
     * @return {Object} Current instance of EventEmitter for chaining.
     */
    proto.emitEvent = function emitEvent(evt, args) {
        var listenersMap = this.getListenersAsObject(evt);
        var listeners;
        var listener;
        var i;
        var key;
        var response;

        for (key in listenersMap) {
            if (listenersMap.hasOwnProperty(key)) {
                listeners = listenersMap[key].slice(0);

                for (i = 0; i < listeners.length; i++) {
                    // If the listener returns true then it shall be removed from the event
                    // The function is executed either with a basic call or an apply if there is an args array
                    listener = listeners[i];

                    if (listener.once === true) {
                        this.removeListener(evt, listener.listener);
                    }

                    response = listener.listener.apply(this, args || []);

                    if (response === this._getOnceReturnValue()) {
                        this.removeListener(evt, listener.listener);
                    }
                }
            }
        }

        return this;
    };

    /**
     * Alias of emitEvent
     */
    proto.trigger = alias('emitEvent');

    /**
     * Subtly different from emitEvent in that it will pass its arguments on to the listeners, as opposed to taking a single array of arguments to pass on.
     * As with emitEvent, you can pass a regex in place of the event name to emit to all events that match it.
     *
     * @param {String|RegExp} evt Name of the event to emit and execute listeners for.
     * @param {...*} Optional additional arguments to be passed to each listener.
     * @return {Object} Current instance of EventEmitter for chaining.
     */
    proto.emit = function emit(evt) {
        var args = Array.prototype.slice.call(arguments, 1);
        return this.emitEvent(evt, args);
    };

    /**
     * Sets the current value to check against when executing listeners. If a
     * listeners return value matches the one set here then it will be removed
     * after execution. This value defaults to true.
     *
     * @param {*} value The new value to check for when executing listeners.
     * @return {Object} Current instance of EventEmitter for chaining.
     */
    proto.setOnceReturnValue = function setOnceReturnValue(value) {
        this._onceReturnValue = value;
        return this;
    };

    /**
     * Fetches the current value to check against when executing listeners. If
     * the listeners return value matches this one then it should be removed
     * automatically. It will return true by default.
     *
     * @return {*|Boolean} The current value to check for or the default, true.
     * @api private
     */
    proto._getOnceReturnValue = function _getOnceReturnValue() {
        if (this.hasOwnProperty('_onceReturnValue')) {
            return this._onceReturnValue;
        }
        else {
            return true;
        }
    };

    /**
     * Fetches the events object and creates one if required.
     *
     * @return {Object} The events storage object.
     * @api private
     */
    proto._getEvents = function _getEvents() {
        return this._events || (this._events = {});
    };

    /**
     * Reverts the global {@link EventEmitter} to its previous value and returns a reference to this version.
     *
     * @return {Function} Non conflicting EventEmitter class.
     */
    EventEmitter.noConflict = function noConflict() {
        exports.EventEmitter = originalGlobalValue;
        return EventEmitter;
    };

    // Expose the class either via AMD, CommonJS or the global object
    if (true) {
        !(__WEBPACK_AMD_DEFINE_RESULT__ = (function () {
            return EventEmitter;
        }).call(exports, __webpack_require__, exports, module),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    }
    else {}
}(typeof window !== 'undefined' ? window : this || {}));


/***/ }),

/***/ "./package.json":
/*!**********************!*\
  !*** ./package.json ***!
  \**********************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"name":"@contentstack/app-sdk","version":"1.2.1","types":"dist/src/index.d.ts","description":"This SDK helps connect to the development server of the Contentstack and sync the data.","main":"dist/index.js","repository":"https://github.com/contentstack/app-sdk","scripts":{"prepublish":"npm run build","build":"webpack","test":"jest","test:watch":"jest --watchAll","test:coverage":"jest --coverage --coverageDirectory=\\"coverage\\"","dev":"webpack --watch --mode development","lint":"eslint . --ext .ts --max-warnings=0","docs":"typedoc --out doc --entryPointStrategy expand ./src","prepare":"husky install"},"keywords":[],"author":{"name":"Contentstack","url":"https://www.contentstack.com/"},"maintainers":[{"name":"Deepak Kharah","email":"deepak.kharah@contentstack.com"}],"license":"MIT","devDependencies":{"@babel/core":"^7.2.2","@babel/preset-env":"^7.3.1","@testing-library/jest-dom":"^5.14.1","@types/chai":"^4.2.22","@types/jest":"^27.0.2","@types/mocha":"^9.0.0","@types/post-robot":"^10.0.3","@types/react":"^17.0.18","@typescript-eslint/eslint-plugin":"^5.10.1","@typescript-eslint/parser":"^5.10.1","babel-loader":"^9.1.0","chai":"^4.3.4","css-loader":"^5.2.2","eslint":"^8.7.0","eslint-plugin-only-warn":"^1.1.0","husky":"^8.0.0","jest":"^27.3.1","mocha":"^9.2.0","react":"^17.0.2","slate":"^0.72.3","ts-jest":"^27.0.7","ts-loader":"^8.1.0","ts-node":"^10.3.0","typedoc":"^0.22.17","typescript":"^4.4.4","webpack":"^5.65.0","webpack-cli":"^4.9.1","webpack-dev-server":"^4.7.3"},"dependencies":{"loader-utils":"^3.2.1","post-robot":"^8.0.31","wolfy87-eventemitter":"^5.2.9"},"files":["dist"]}');

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.ts");
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=index.js.map