/*! For license information please see index.js.LICENSE.txt */
!(function (t, e) {
    "object" == typeof exports && "object" == typeof module
        ? (module.exports = e())
        : "function" == typeof define && define.amd
        ? define([], e)
        : "object" == typeof exports
        ? (exports.ContentstackAppSDK = e())
        : (t.ContentstackAppSDK = e());
})(this, () => {
    return (
        (t = {
            957: function (t) {
                "undefined" != typeof self && self,
                    (t.exports = (function (t) {
                        var e = {};
                        function n(r) {
                            if (e[r]) return e[r].exports;
                            var o = (e[r] = { i: r, l: !1, exports: {} });
                            return (
                                t[r].call(o.exports, o, o.exports, n),
                                (o.l = !0),
                                o.exports
                            );
                        }
                        return (
                            (n.m = t),
                            (n.c = e),
                            (n.d = function (t, e, r) {
                                n.o(t, e) ||
                                    Object.defineProperty(t, e, {
                                        configurable: !1,
                                        enumerable: !0,
                                        get: r,
                                    });
                            }),
                            (n.n = function (t) {
                                var e =
                                    t && t.__esModule
                                        ? function () {
                                              return t.default;
                                          }
                                        : function () {
                                              return t;
                                          };
                                return n.d(e, "a", e), e;
                            }),
                            (n.o = function (t, e) {
                                return Object.prototype.hasOwnProperty.call(
                                    t,
                                    e
                                );
                            }),
                            (n.p = ""),
                            n((n.s = "./src/index.js"))
                        );
                    })({
                        "./src/index.js": function (t, e, n) {
                            "use strict";
                            Object.defineProperty(e, "__esModule", {
                                value: !0,
                            });
                            var r = {};
                            function o(t) {
                                return (
                                    "[object RegExp]" ===
                                    Object.prototype.toString.call(t)
                                );
                            }
                            n.d(r, "cleanUpWindow", function () {
                                return Pt;
                            }),
                                n.d(r, "Promise", function () {
                                    return z;
                                }),
                                n.d(r, "bridge", function () {
                                    return St;
                                }),
                                n.d(r, "init", function () {
                                    return Tt;
                                }),
                                n.d(r, "parent", function () {
                                    return Ot;
                                }),
                                n.d(r, "send", function () {
                                    return pt;
                                }),
                                n.d(r, "request", function () {
                                    return ht;
                                }),
                                n.d(r, "sendToParent", function () {
                                    return yt;
                                }),
                                n.d(r, "client", function () {
                                    return vt;
                                }),
                                n.d(r, "on", function () {
                                    return mt;
                                }),
                                n.d(r, "listen", function () {
                                    return wt;
                                }),
                                n.d(r, "once", function () {
                                    return gt;
                                }),
                                n.d(r, "listener", function () {
                                    return bt;
                                }),
                                n.d(r, "CONFIG", function () {
                                    return R;
                                }),
                                n.d(r, "CONSTANTS", function () {
                                    return A;
                                }),
                                n.d(r, "disable", function () {
                                    return Et;
                                });
                            var i = "mock:",
                                a = "file:",
                                s = "about:",
                                u = "Call was rejected by callee.\r\n";
                            function c() {
                                return (
                                    (arguments.length > 0 &&
                                    void 0 !== arguments[0]
                                        ? arguments[0]
                                        : window
                                    ).location.protocol === s
                                );
                            }
                            function l() {
                                var t =
                                    arguments.length > 0 &&
                                    void 0 !== arguments[0]
                                        ? arguments[0]
                                        : window;
                                if (t)
                                    try {
                                        if (t.parent && t.parent !== t)
                                            return t.parent;
                                    } catch (t) {}
                            }
                            function f() {
                                var t =
                                    arguments.length > 0 &&
                                    void 0 !== arguments[0]
                                        ? arguments[0]
                                        : window;
                                if (t && !l(t))
                                    try {
                                        return t.opener;
                                    } catch (t) {}
                            }
                            function d(t) {
                                try {
                                    return (
                                        t && t.location && t.location.href, !0
                                    );
                                } catch (t) {}
                                return !1;
                            }
                            function h() {
                                var t =
                                        arguments.length > 0 &&
                                        void 0 !== arguments[0]
                                            ? arguments[0]
                                            : window,
                                    e = t.location;
                                if (!e)
                                    throw new Error(
                                        "Can not read window location"
                                    );
                                var n = e.protocol;
                                if (!n)
                                    throw new Error(
                                        "Can not read window protocol"
                                    );
                                if (n === a) return a + "//";
                                if (n === s) {
                                    var r = l(t);
                                    return r && d(r) ? h(r) : s + "//";
                                }
                                var o = e.host;
                                if (!o)
                                    throw new Error("Can not read window host");
                                return n + "//" + o;
                            }
                            function p() {
                                var t =
                                        arguments.length > 0 &&
                                        void 0 !== arguments[0]
                                            ? arguments[0]
                                            : window,
                                    e = h(t);
                                return e &&
                                    t.mockDomain &&
                                    0 === t.mockDomain.indexOf(i)
                                    ? t.mockDomain
                                    : e;
                            }
                            function y(t) {
                                try {
                                    if (t === window) return !0;
                                } catch (t) {}
                                try {
                                    var e = Object.getOwnPropertyDescriptor(
                                        t,
                                        "location"
                                    );
                                    if (e && !1 === e.enumerable) return !1;
                                } catch (t) {}
                                try {
                                    if (c(t) && d(t)) return !0;
                                } catch (t) {}
                                try {
                                    if (h(t) === h(window)) return !0;
                                } catch (t) {}
                                return !1;
                            }
                            function v(t, e) {
                                if (!t || !e) return !1;
                                var n = l(e);
                                return n
                                    ? n === t
                                    : -1 !==
                                          (function (t) {
                                              var e = [];
                                              try {
                                                  for (; t.parent !== t; )
                                                      e.push(t.parent),
                                                          (t = t.parent);
                                              } catch (t) {}
                                              return e;
                                          })(e).indexOf(t);
                            }
                            function _(t) {
                                var e = [],
                                    n = void 0;
                                try {
                                    n = t.frames;
                                } catch (e) {
                                    n = t;
                                }
                                var r = void 0;
                                try {
                                    r = n.length;
                                } catch (t) {}
                                if (0 === r) return e;
                                if (r) {
                                    for (var o = 0; o < r; o++) {
                                        var i = void 0;
                                        try {
                                            i = n[o];
                                        } catch (t) {
                                            continue;
                                        }
                                        e.push(i);
                                    }
                                    return e;
                                }
                                for (var a = 0; a < 100; a++) {
                                    var s = void 0;
                                    try {
                                        s = n[a];
                                    } catch (t) {
                                        return e;
                                    }
                                    if (!s) return e;
                                    e.push(s);
                                }
                                return e;
                            }
                            var w = [],
                                m = [];
                            function g(t) {
                                var e =
                                    !(
                                        arguments.length > 1 &&
                                        void 0 !== arguments[1]
                                    ) || arguments[1];
                                try {
                                    if (t === window) return !1;
                                } catch (t) {
                                    return !0;
                                }
                                try {
                                    if (!t) return !0;
                                } catch (t) {
                                    return !0;
                                }
                                try {
                                    if (t.closed) return !0;
                                } catch (t) {
                                    return !t || t.message !== u;
                                }
                                if (
                                    e &&
                                    (function (t) {
                                        if (!y(t)) return !1;
                                        try {
                                            if (t === window) return !0;
                                            if (c(t) && d(t)) return !0;
                                            if (p(window) === p(t)) return !0;
                                        } catch (t) {}
                                        return !1;
                                    })(t)
                                )
                                    try {
                                        if (t.mockclosed) return !0;
                                    } catch (t) {}
                                try {
                                    if (!t.parent || !t.top) return !0;
                                } catch (t) {}
                                var n = (function (t, e) {
                                    for (var n = 0; n < t.length; n++)
                                        try {
                                            if (t[n] === e) return n;
                                        } catch (t) {}
                                    return -1;
                                })(w, t);
                                if (-1 !== n) {
                                    var r = m[n];
                                    if (
                                        r &&
                                        (function (t) {
                                            if (!t.contentWindow) return !0;
                                            if (!t.parentNode) return !0;
                                            var e = t.ownerDocument;
                                            return !(
                                                !e ||
                                                !e.documentElement ||
                                                e.documentElement.contains(t)
                                            );
                                        })(r)
                                    )
                                        return !0;
                                }
                                return !1;
                            }
                            function b() {
                                var t =
                                    arguments.length > 0 &&
                                    void 0 !== arguments[0]
                                        ? arguments[0]
                                        : window;
                                return f((t = t || window)) || l(t) || void 0;
                            }
                            function E(t, e) {
                                if ("string" == typeof t) {
                                    if ("string" == typeof e)
                                        return "*" === t || e === t;
                                    if (o(e)) return !1;
                                    if (Array.isArray(e)) return !1;
                                }
                                return o(t)
                                    ? o(e)
                                        ? t.toString() === e.toString()
                                        : !Array.isArray(e) &&
                                          Boolean(e.match(t))
                                    : !!Array.isArray(t) &&
                                          (Array.isArray(e)
                                              ? JSON.stringify(t) ===
                                                JSON.stringify(e)
                                              : !o(e) &&
                                                t.some(function (t) {
                                                    return E(t, e);
                                                }));
                            }
                            function O(t) {
                                try {
                                    if (t === window) return !0;
                                } catch (t) {
                                    if (t && t.message === u) return !0;
                                }
                                try {
                                    if (
                                        "[object Window]" ===
                                        Object.prototype.toString.call(t)
                                    )
                                        return !0;
                                } catch (t) {
                                    if (t && t.message === u) return !0;
                                }
                                try {
                                    if (
                                        window.Window &&
                                        t instanceof window.Window
                                    )
                                        return !0;
                                } catch (t) {
                                    if (t && t.message === u) return !0;
                                }
                                try {
                                    if (t && t.self === t) return !0;
                                } catch (t) {
                                    if (t && t.message === u) return !0;
                                }
                                try {
                                    if (t && t.parent === t) return !0;
                                } catch (t) {
                                    if (t && t.message === u) return !0;
                                }
                                try {
                                    if (t && t.top === t) return !0;
                                } catch (t) {
                                    if (t && t.message === u) return !0;
                                }
                                try {
                                    if (
                                        t &&
                                        "__unlikely_value__" ===
                                            t.__cross_domain_utils_window_check__
                                    )
                                        return !1;
                                } catch (t) {
                                    return !0;
                                }
                                return !1;
                            }
                            function P(t, e) {
                                for (var n = 0; n < t.length; n++)
                                    try {
                                        if (t[n] === e) return n;
                                    } catch (t) {}
                                return -1;
                            }
                            var S,
                                T = (function () {
                                    function t() {
                                        if (
                                            ((function (e, n) {
                                                if (!(e instanceof t))
                                                    throw new TypeError(
                                                        "Cannot call a class as a function"
                                                    );
                                            })(this),
                                            (this.name =
                                                "__weakmap_" +
                                                ((1e9 * Math.random()) >>> 0) +
                                                "__"),
                                            (function () {
                                                if (
                                                    "undefined" ==
                                                    typeof WeakMap
                                                )
                                                    return !1;
                                                if (void 0 === Object.freeze)
                                                    return !1;
                                                try {
                                                    var t = new WeakMap(),
                                                        e = {};
                                                    return (
                                                        Object.freeze(e),
                                                        t.set(
                                                            e,
                                                            "__testvalue__"
                                                        ),
                                                        "__testvalue__" ===
                                                            t.get(e)
                                                    );
                                                } catch (t) {
                                                    return !1;
                                                }
                                            })())
                                        )
                                            try {
                                                this.weakmap = new WeakMap();
                                            } catch (t) {}
                                        (this.keys = []), (this.values = []);
                                    }
                                    return (
                                        (t.prototype._cleanupClosedWindows =
                                            function () {
                                                for (
                                                    var t = this.weakmap,
                                                        e = this.keys,
                                                        n = 0;
                                                    n < e.length;
                                                    n++
                                                ) {
                                                    var r = e[n];
                                                    if (O(r) && g(r)) {
                                                        if (t)
                                                            try {
                                                                t.delete(r);
                                                            } catch (t) {}
                                                        e.splice(n, 1),
                                                            this.values.splice(
                                                                n,
                                                                1
                                                            ),
                                                            (n -= 1);
                                                    }
                                                }
                                            }),
                                        (t.prototype.isSafeToReadWrite =
                                            function (t) {
                                                if (O(t)) return !1;
                                                try {
                                                    t && t.self,
                                                        t && t[this.name];
                                                } catch (t) {
                                                    return !1;
                                                }
                                                return !0;
                                            }),
                                        (t.prototype.set = function (t, e) {
                                            if (!t)
                                                throw new Error(
                                                    "WeakMap expected key"
                                                );
                                            var n = this.weakmap;
                                            if (n)
                                                try {
                                                    n.set(t, e);
                                                } catch (t) {
                                                    delete this.weakmap;
                                                }
                                            if (this.isSafeToReadWrite(t))
                                                try {
                                                    var r = this.name,
                                                        o = t[r];
                                                    return void (o && o[0] === t
                                                        ? (o[1] = e)
                                                        : Object.defineProperty(
                                                              t,
                                                              r,
                                                              {
                                                                  value: [t, e],
                                                                  writable: !0,
                                                              }
                                                          ));
                                                } catch (t) {}
                                            this._cleanupClosedWindows();
                                            var i = this.keys,
                                                a = this.values,
                                                s = P(i, t);
                                            -1 === s
                                                ? (i.push(t), a.push(e))
                                                : (a[s] = e);
                                        }),
                                        (t.prototype.get = function (t) {
                                            if (!t)
                                                throw new Error(
                                                    "WeakMap expected key"
                                                );
                                            var e = this.weakmap;
                                            if (e)
                                                try {
                                                    if (e.has(t))
                                                        return e.get(t);
                                                } catch (t) {
                                                    delete this.weakmap;
                                                }
                                            if (this.isSafeToReadWrite(t))
                                                try {
                                                    var n = t[this.name];
                                                    return n && n[0] === t
                                                        ? n[1]
                                                        : void 0;
                                                } catch (t) {}
                                            this._cleanupClosedWindows();
                                            var r = P(this.keys, t);
                                            if (-1 !== r) return this.values[r];
                                        }),
                                        (t.prototype.delete = function (t) {
                                            if (!t)
                                                throw new Error(
                                                    "WeakMap expected key"
                                                );
                                            var e = this.weakmap;
                                            if (e)
                                                try {
                                                    e.delete(t);
                                                } catch (t) {
                                                    delete this.weakmap;
                                                }
                                            if (this.isSafeToReadWrite(t))
                                                try {
                                                    var n = t[this.name];
                                                    n &&
                                                        n[0] === t &&
                                                        (n[0] = n[1] = void 0);
                                                } catch (t) {}
                                            this._cleanupClosedWindows();
                                            var r = this.keys,
                                                o = P(r, t);
                                            -1 !== o &&
                                                (r.splice(o, 1),
                                                this.values.splice(o, 1));
                                        }),
                                        (t.prototype.has = function (t) {
                                            if (!t)
                                                throw new Error(
                                                    "WeakMap expected key"
                                                );
                                            var e = this.weakmap;
                                            if (e)
                                                try {
                                                    if (e.has(t)) return !0;
                                                } catch (t) {
                                                    delete this.weakmap;
                                                }
                                            if (this.isSafeToReadWrite(t))
                                                try {
                                                    var n = t[this.name];
                                                    return !(!n || n[0] !== t);
                                                } catch (t) {}
                                            return (
                                                this._cleanupClosedWindows(),
                                                -1 !== P(this.keys, t)
                                            );
                                        }),
                                        (t.prototype.getOrSet = function (
                                            t,
                                            e
                                        ) {
                                            if (this.has(t)) return this.get(t);
                                            var n = e();
                                            return this.set(t, n), n;
                                        }),
                                        t
                                    );
                                })(),
                                A = {
                                    POST_MESSAGE_TYPE: {
                                        REQUEST: "postrobot_message_request",
                                        RESPONSE: "postrobot_message_response",
                                        ACK: "postrobot_message_ack",
                                    },
                                    POST_MESSAGE_ACK: {
                                        SUCCESS: "success",
                                        ERROR: "error",
                                    },
                                    POST_MESSAGE_NAMES: {
                                        METHOD: "postrobot_method",
                                        HELLO: "postrobot_ready",
                                        OPEN_TUNNEL: "postrobot_open_tunnel",
                                    },
                                    WINDOW_TYPES: {
                                        FULLPAGE: "fullpage",
                                        POPUP: "popup",
                                        IFRAME: "iframe",
                                    },
                                    WINDOW_PROPS: {
                                        POSTROBOT: "__postRobot__",
                                    },
                                    SERIALIZATION_TYPES: {
                                        METHOD: "postrobot_method",
                                        ERROR: "postrobot_error",
                                        PROMISE: "postrobot_promise",
                                        ZALGO_PROMISE:
                                            "postrobot_zalgo_promise",
                                        REGEX: "regex",
                                    },
                                    SEND_STRATEGIES: {
                                        POST_MESSAGE: "postrobot_post_message",
                                        BRIDGE: "postrobot_bridge",
                                        GLOBAL: "postrobot_global",
                                    },
                                    MOCK_PROTOCOL: "mock:",
                                    FILE_PROTOCOL: "file:",
                                    BRIDGE_NAME_PREFIX: "__postrobot_bridge__",
                                    POSTROBOT_PROXY: "__postrobot_proxy__",
                                    WILDCARD: "*",
                                },
                                D = {
                                    METHOD: "postrobot_method",
                                    HELLO: "postrobot_hello",
                                    OPEN_TUNNEL: "postrobot_open_tunnel",
                                },
                                R =
                                    (Object.keys(D).map(function (t) {
                                        return D[t];
                                    }),
                                    {
                                        ALLOW_POSTMESSAGE_POPUP:
                                            !(
                                                "__ALLOW_POSTMESSAGE_POPUP__" in
                                                window
                                            ) ||
                                            window.__ALLOW_POSTMESSAGE_POPUP__,
                                        BRIDGE_TIMEOUT: 5e3,
                                        CHILD_WINDOW_TIMEOUT: 5e3,
                                        ACK_TIMEOUT:
                                            -1 !==
                                            window.navigator.userAgent.match(
                                                /MSIE/i
                                            )
                                                ? 1e4
                                                : 2e3,
                                        RES_TIMEOUT: -1,
                                        ALLOWED_POST_MESSAGE_METHODS:
                                            ((S = {}),
                                            (S[A.SEND_STRATEGIES.POST_MESSAGE] =
                                                !0),
                                            (S[A.SEND_STRATEGIES.BRIDGE] = !0),
                                            (S[A.SEND_STRATEGIES.GLOBAL] = !0),
                                            S),
                                        ALLOW_SAME_ORIGIN: !1,
                                    });
                            0 ===
                                window.location.href.indexOf(A.FILE_PROTOCOL) &&
                                (R.ALLOW_POSTMESSAGE_POPUP = !0);
                            var k =
                                "function" == typeof Symbol &&
                                "symbol" == typeof Symbol.iterator
                                    ? function (t) {
                                          return typeof t;
                                      }
                                    : function (t) {
                                          return t &&
                                              "function" == typeof Symbol &&
                                              t.constructor === Symbol &&
                                              t !== Symbol.prototype
                                              ? "symbol"
                                              : typeof t;
                                      };
                            function j(t) {
                                var e =
                                    arguments.length > 1 &&
                                    void 0 !== arguments[1]
                                        ? arguments[1]
                                        : 1;
                                if (e >= 3)
                                    return "stringifyError stack overflow";
                                try {
                                    if (!t)
                                        return (
                                            "<unknown error: " +
                                            Object.prototype.toString.call(t) +
                                            ">"
                                        );
                                    if ("string" == typeof t) return t;
                                    if (t instanceof Error) {
                                        var n = t && t.stack,
                                            r = t && t.message;
                                        if (n && r)
                                            return -1 !== n.indexOf(r)
                                                ? n
                                                : r + "\n" + n;
                                        if (n) return n;
                                        if (r) return r;
                                    }
                                    return "function" == typeof t.toString
                                        ? t.toString()
                                        : Object.prototype.toString.call(t);
                                } catch (t) {
                                    return (
                                        "Error while stringifying error: " +
                                        j(t, e + 1)
                                    );
                                }
                            }
                            var M = function (t) {
                                if (!t) return t;
                                var e = !1;
                                return function () {
                                    if (!e)
                                        return (
                                            (e = !0), t.apply(this, arguments)
                                        );
                                };
                            };
                            function x() {}
                            function L() {
                                var t = "0123456789abcdef";
                                return "xxxxxxxxxx".replace(/./g, function () {
                                    return t.charAt(
                                        Math.floor(Math.random() * t.length)
                                    );
                                });
                            }
                            function I(t, e) {
                                var n =
                                    arguments.length > 2 &&
                                    void 0 !== arguments[2]
                                        ? arguments[2]
                                        : 1;
                                if (n >= 100)
                                    throw new Error(
                                        "Self-referential object passed, or object contained too many layers"
                                    );
                                var r = void 0;
                                if (
                                    "object" !==
                                        (void 0 === t ? "undefined" : k(t)) ||
                                    null === t ||
                                    Array.isArray(t)
                                ) {
                                    if (!Array.isArray(t))
                                        throw new TypeError(
                                            "Invalid type: " +
                                                (void 0 === t
                                                    ? "undefined"
                                                    : k(t))
                                        );
                                    r = [];
                                } else r = {};
                                return (
                                    (function (t, e) {
                                        Array.isArray(t)
                                            ? (function (t, e) {
                                                  for (
                                                      var n = 0;
                                                      n < t.length;
                                                      n++
                                                  )
                                                      e(t[n], n);
                                              })(t, e)
                                            : "object" ===
                                                  (void 0 === t
                                                      ? "undefined"
                                                      : k(t)) &&
                                              null !== t &&
                                              (function (t, e) {
                                                  for (var n in t)
                                                      t.hasOwnProperty(n) &&
                                                          e(t[n], n);
                                              })(t, e);
                                    })(t, function (t, o) {
                                        var i = e(t, o);
                                        void 0 !== i
                                            ? (r[o] = i)
                                            : "object" ===
                                                  (void 0 === t
                                                      ? "undefined"
                                                      : k(t)) && null !== t
                                            ? (r[o] = I(t, e, n + 1))
                                            : (r[o] = t);
                                    }),
                                    r
                                );
                            }
                            function C(t) {
                                return (
                                    "[object RegExp]" ===
                                    Object.prototype.toString.call(t)
                                );
                            }
                            function W(t) {
                                try {
                                    if (!t) return !1;
                                    if (
                                        "undefined" != typeof Promise &&
                                        t instanceof Promise
                                    )
                                        return !0;
                                    if (
                                        "undefined" != typeof window &&
                                        "function" == typeof window.Window &&
                                        t instanceof window.Window
                                    )
                                        return !1;
                                    if (
                                        "undefined" != typeof window &&
                                        "function" ==
                                            typeof window.constructor &&
                                        t instanceof window.constructor
                                    )
                                        return !1;
                                    var e = {}.toString;
                                    if (e) {
                                        var n = e.call(t);
                                        if (
                                            "[object Window]" === n ||
                                            "[object global]" === n ||
                                            "[object DOMWindow]" === n
                                        )
                                            return !1;
                                    }
                                    if ("function" == typeof t.then) return !0;
                                } catch (t) {
                                    return !1;
                                }
                                return !1;
                            }
                            var N = [],
                                q = [],
                                U = 0,
                                G = void 0;
                            function B() {
                                if (!U && G) {
                                    var t = G;
                                    (G = null), t.resolve();
                                }
                            }
                            function F() {
                                U += 1;
                            }
                            function H() {
                                (U -= 1), B();
                            }
                            var z = (function () {
                                    function t(e) {
                                        var n = this;
                                        if (
                                            ((function (e, n) {
                                                if (!(e instanceof t))
                                                    throw new TypeError(
                                                        "Cannot call a class as a function"
                                                    );
                                            })(this),
                                            (this.resolved = !1),
                                            (this.rejected = !1),
                                            (this.errorHandled = !1),
                                            (this.handlers = []),
                                            e)
                                        ) {
                                            var r = void 0,
                                                o = void 0,
                                                i = !1,
                                                a = !1,
                                                s = !1;
                                            F();
                                            try {
                                                e(
                                                    function (t) {
                                                        s
                                                            ? n.resolve(t)
                                                            : ((i = !0),
                                                              (r = t));
                                                    },
                                                    function (t) {
                                                        s
                                                            ? n.reject(t)
                                                            : ((a = !0),
                                                              (o = t));
                                                    }
                                                );
                                            } catch (t) {
                                                return H(), void this.reject(t);
                                            }
                                            H(),
                                                (s = !0),
                                                i
                                                    ? this.resolve(r)
                                                    : a && this.reject(o);
                                        }
                                    }
                                    return (
                                        (t.prototype.resolve = function (t) {
                                            if (this.resolved || this.rejected)
                                                return this;
                                            if (W(t))
                                                throw new Error(
                                                    "Can not resolve promise with another promise"
                                                );
                                            return (
                                                (this.resolved = !0),
                                                (this.value = t),
                                                this.dispatch(),
                                                this
                                            );
                                        }),
                                        (t.prototype.reject = function (t) {
                                            var e = this;
                                            if (this.resolved || this.rejected)
                                                return this;
                                            if (W(t))
                                                throw new Error(
                                                    "Can not reject promise with another promise"
                                                );
                                            if (!t) {
                                                var n =
                                                    t &&
                                                    "function" ==
                                                        typeof t.toString
                                                        ? t.toString()
                                                        : Object.prototype.toString.call(
                                                              t
                                                          );
                                                t = new Error(
                                                    "Expected reject to be called with Error, got " +
                                                        n
                                                );
                                            }
                                            return (
                                                (this.rejected = !0),
                                                (this.error = t),
                                                this.errorHandled ||
                                                    setTimeout(function () {
                                                        e.errorHandled ||
                                                            (function (t, e) {
                                                                if (
                                                                    -1 ===
                                                                    N.indexOf(t)
                                                                ) {
                                                                    N.push(t),
                                                                        setTimeout(
                                                                            function () {
                                                                                throw t;
                                                                            },
                                                                            1
                                                                        );
                                                                    for (
                                                                        var n = 0;
                                                                        n <
                                                                        q.length;
                                                                        n++
                                                                    )
                                                                        q[n](
                                                                            t,
                                                                            e
                                                                        );
                                                                }
                                                            })(t, e);
                                                    }, 1),
                                                this.dispatch(),
                                                this
                                            );
                                        }),
                                        (t.prototype.asyncReject = function (
                                            t
                                        ) {
                                            return (
                                                (this.errorHandled = !0),
                                                this.reject(t),
                                                this
                                            );
                                        }),
                                        (t.prototype.dispatch = function () {
                                            var e = this.dispatching,
                                                n = this.resolved,
                                                r = this.rejected,
                                                o = this.handlers;
                                            if (!e && (n || r)) {
                                                (this.dispatching = !0), F();
                                                for (
                                                    var i = function (t, e) {
                                                            return t.then(
                                                                function (t) {
                                                                    e.resolve(
                                                                        t
                                                                    );
                                                                },
                                                                function (t) {
                                                                    e.reject(t);
                                                                }
                                                            );
                                                        },
                                                        a = 0;
                                                    a < o.length;
                                                    a++
                                                ) {
                                                    var s = o[a],
                                                        u = s.onSuccess,
                                                        c = s.onError,
                                                        l = s.promise,
                                                        f = void 0;
                                                    if (n)
                                                        try {
                                                            f = u
                                                                ? u(this.value)
                                                                : this.value;
                                                        } catch (t) {
                                                            l.reject(t);
                                                            continue;
                                                        }
                                                    else if (r) {
                                                        if (!c) {
                                                            l.reject(
                                                                this.error
                                                            );
                                                            continue;
                                                        }
                                                        try {
                                                            f = c(this.error);
                                                        } catch (t) {
                                                            l.reject(t);
                                                            continue;
                                                        }
                                                    }
                                                    f instanceof t &&
                                                    (f.resolved || f.rejected)
                                                        ? (f.resolved
                                                              ? l.resolve(
                                                                    f.value
                                                                )
                                                              : l.reject(
                                                                    f.error
                                                                ),
                                                          (f.errorHandled = !0))
                                                        : W(f)
                                                        ? f instanceof t &&
                                                          (f.resolved ||
                                                              f.rejected)
                                                            ? f.resolved
                                                                ? l.resolve(
                                                                      f.value
                                                                  )
                                                                : l.reject(
                                                                      f.error
                                                                  )
                                                            : i(f, l)
                                                        : l.resolve(f);
                                                }
                                                (o.length = 0),
                                                    (this.dispatching = !1),
                                                    H();
                                            }
                                        }),
                                        (t.prototype.then = function (e, n) {
                                            if (
                                                e &&
                                                "function" != typeof e &&
                                                !e.call
                                            )
                                                throw new Error(
                                                    "Promise.then expected a function for success handler"
                                                );
                                            if (
                                                n &&
                                                "function" != typeof n &&
                                                !n.call
                                            )
                                                throw new Error(
                                                    "Promise.then expected a function for error handler"
                                                );
                                            var r = new t();
                                            return (
                                                this.handlers.push({
                                                    promise: r,
                                                    onSuccess: e,
                                                    onError: n,
                                                }),
                                                (this.errorHandled = !0),
                                                this.dispatch(),
                                                r
                                            );
                                        }),
                                        (t.prototype.catch = function (t) {
                                            return this.then(void 0, t);
                                        }),
                                        (t.prototype.finally = function (e) {
                                            if (
                                                e &&
                                                "function" != typeof e &&
                                                !e.call
                                            )
                                                throw new Error(
                                                    "Promise.finally expected a function"
                                                );
                                            return this.then(
                                                function (n) {
                                                    return t
                                                        .try(e)
                                                        .then(function () {
                                                            return n;
                                                        });
                                                },
                                                function (n) {
                                                    return t
                                                        .try(e)
                                                        .then(function () {
                                                            throw n;
                                                        });
                                                }
                                            );
                                        }),
                                        (t.prototype.timeout = function (t, e) {
                                            var n = this;
                                            if (this.resolved || this.rejected)
                                                return this;
                                            var r = setTimeout(function () {
                                                n.resolved ||
                                                    n.rejected ||
                                                    n.reject(
                                                        e ||
                                                            new Error(
                                                                "Promise timed out after " +
                                                                    t +
                                                                    "ms"
                                                            )
                                                    );
                                            }, t);
                                            return this.then(function (t) {
                                                return clearTimeout(r), t;
                                            });
                                        }),
                                        (t.prototype.toPromise = function () {
                                            if ("undefined" == typeof Promise)
                                                throw new TypeError(
                                                    "Could not find Promise"
                                                );
                                            return Promise.resolve(this);
                                        }),
                                        (t.resolve = function (e) {
                                            return e instanceof t
                                                ? e
                                                : W(e)
                                                ? new t(function (t, n) {
                                                      return e.then(t, n);
                                                  })
                                                : new t().resolve(e);
                                        }),
                                        (t.reject = function (e) {
                                            return new t().reject(e);
                                        }),
                                        (t.asyncReject = function (e) {
                                            return new t().asyncReject(e);
                                        }),
                                        (t.all = function (e) {
                                            var n = new t(),
                                                r = e.length,
                                                o = [];
                                            if (!r) return n.resolve(o), n;
                                            for (
                                                var i = function (t, e, i) {
                                                        return e.then(
                                                            function (e) {
                                                                (o[t] = e),
                                                                    0 ==
                                                                        (r -= 1) &&
                                                                        n.resolve(
                                                                            o
                                                                        );
                                                            },
                                                            function (t) {
                                                                i.reject(t);
                                                            }
                                                        );
                                                    },
                                                    a = 0;
                                                a < e.length;
                                                a++
                                            ) {
                                                var s = e[a];
                                                if (s instanceof t) {
                                                    if (s.resolved) {
                                                        (o[a] = s.value),
                                                            (r -= 1);
                                                        continue;
                                                    }
                                                } else if (!W(s)) {
                                                    (o[a] = s), (r -= 1);
                                                    continue;
                                                }
                                                i(a, t.resolve(s), n);
                                            }
                                            return 0 === r && n.resolve(o), n;
                                        }),
                                        (t.hash = function (e) {
                                            var n = {};
                                            return t
                                                .all(
                                                    Object.keys(e).map(
                                                        function (r) {
                                                            return t
                                                                .resolve(e[r])
                                                                .then(function (
                                                                    t
                                                                ) {
                                                                    n[r] = t;
                                                                });
                                                        }
                                                    )
                                                )
                                                .then(function () {
                                                    return n;
                                                });
                                        }),
                                        (t.map = function (e, n) {
                                            return t.all(e.map(n));
                                        }),
                                        (t.onPossiblyUnhandledException =
                                            function (t) {
                                                return (function (t) {
                                                    return (
                                                        q.push(t),
                                                        {
                                                            cancel: function () {
                                                                q.splice(
                                                                    q.indexOf(
                                                                        t
                                                                    ),
                                                                    1
                                                                );
                                                            },
                                                        }
                                                    );
                                                })(t);
                                            }),
                                        (t.try = function (e, n, r) {
                                            if (
                                                e &&
                                                "function" != typeof e &&
                                                !e.call
                                            )
                                                throw new Error(
                                                    "Promise.try expected a function"
                                                );
                                            var o = void 0;
                                            F();
                                            try {
                                                o = e.apply(n, r || []);
                                            } catch (e) {
                                                return H(), t.reject(e);
                                            }
                                            return H(), t.resolve(o);
                                        }),
                                        (t.delay = function (e) {
                                            return new t(function (t) {
                                                setTimeout(t, e);
                                            });
                                        }),
                                        (t.isPromise = function (e) {
                                            return (
                                                !!(e && e instanceof t) || W(e)
                                            );
                                        }),
                                        (t.flush = function () {
                                            return (
                                                (e = G = G || new t()), B(), e
                                            );
                                            var e;
                                        }),
                                        t
                                    );
                                })(),
                                K = (window[A.WINDOW_PROPS.POSTROBOT] =
                                    window[A.WINDOW_PROPS.POSTROBOT] || {});
                            K.registerSelf = function () {};
                            var Q =
                                "function" == typeof Symbol &&
                                "symbol" == typeof Symbol.iterator
                                    ? function (t) {
                                          return typeof t;
                                      }
                                    : function (t) {
                                          return t &&
                                              "function" == typeof Symbol &&
                                              t.constructor === Symbol &&
                                              t !== Symbol.prototype
                                              ? "symbol"
                                              : typeof t;
                                      };
                            K.methods = K.methods || new T();
                            var Y = M(function () {
                                K.on(
                                    A.POST_MESSAGE_NAMES.METHOD,
                                    { origin: A.WILDCARD },
                                    function (t) {
                                        var e = t.source,
                                            n = t.origin,
                                            r = t.data,
                                            o = K.methods.get(e);
                                        if (!o)
                                            throw new Error(
                                                "Could not find any methods this window has privileges to call"
                                            );
                                        var i = o[r.id];
                                        if (!i)
                                            throw new Error(
                                                "Could not find method with id: " +
                                                    r.id
                                            );
                                        if (!E(i.domain, n))
                                            throw new Error(
                                                "Method domain " +
                                                    i.domain +
                                                    " does not match origin " +
                                                    n
                                            );
                                        return z
                                            .try(function () {
                                                return i.method.apply(
                                                    {
                                                        source: e,
                                                        origin: n,
                                                        data: r,
                                                    },
                                                    r.args
                                                );
                                            })
                                            .then(function (t) {
                                                return {
                                                    result: t,
                                                    id: r.id,
                                                    name: r.name,
                                                };
                                            });
                                    }
                                );
                            });
                            function V(t, e) {
                                return (
                                    "object" ===
                                        (void 0 === t ? "undefined" : Q(t)) &&
                                    null !== t &&
                                    t.__type__ === e
                                );
                            }
                            function Z(t, e, n, r) {
                                var o = L(),
                                    i = K.methods.get(t);
                                return (
                                    i || ((i = {}), K.methods.set(t, i)),
                                    (i[o] = { domain: e, method: n }),
                                    {
                                        __type__: A.SERIALIZATION_TYPES.METHOD,
                                        __id__: o,
                                        __name__: r,
                                    }
                                );
                            }
                            function J(t, e, n) {
                                function r() {
                                    var r =
                                        Array.prototype.slice.call(arguments);
                                    return K.send(
                                        t,
                                        A.POST_MESSAGE_NAMES.METHOD,
                                        {
                                            id: n.__id__,
                                            name: n.__name__,
                                            args: r,
                                        },
                                        { domain: e, timeout: -1 }
                                    ).then(
                                        function (t) {
                                            return t.data.result;
                                        },
                                        function (t) {
                                            throw t;
                                        }
                                    );
                                }
                                return (
                                    (r.__name__ = n.__name__),
                                    (r.__xdomain__ = !0),
                                    (r.source = t),
                                    (r.origin = e),
                                    r
                                );
                            }
                            function $(t, e, n) {
                                return new z(function (r, o) {
                                    return J(t, e, n.__then__)(r, o);
                                });
                            }
                            function X(t) {
                                return K.send(
                                    t,
                                    A.POST_MESSAGE_NAMES.HELLO,
                                    {},
                                    { domain: A.WILDCARD, timeout: -1 }
                                ).then(function (t) {
                                    return { origin: t.origin };
                                });
                            }
                            K.readyPromises = K.readyPromises || new T();
                            var tt = {};
                            tt[A.SEND_STRATEGIES.POST_MESSAGE] = function (
                                t,
                                e,
                                n
                            ) {
                                (Array.isArray(n)
                                    ? n
                                    : "string" == typeof n
                                    ? [n]
                                    : [A.WILDCARD]
                                )
                                    .map(function (e) {
                                        if (0 === e.indexOf(A.MOCK_PROTOCOL)) {
                                            if (
                                                window.location.protocol ===
                                                A.FILE_PROTOCOL
                                            )
                                                return A.WILDCARD;
                                            if (!y(t))
                                                throw new Error(
                                                    "Attempting to send messsage to mock domain " +
                                                        e +
                                                        ", but window is actually cross-domain"
                                                );
                                            return h(t);
                                        }
                                        return 0 === e.indexOf(A.FILE_PROTOCOL)
                                            ? A.WILDCARD
                                            : e;
                                    })
                                    .forEach(function (n) {
                                        return t.postMessage(e, n);
                                    });
                            };
                            var et =
                                Object.assign ||
                                function (t) {
                                    for (var e = 1; e < arguments.length; e++) {
                                        var n = arguments[e];
                                        for (var r in n)
                                            Object.prototype.hasOwnProperty.call(
                                                n,
                                                r
                                            ) && (t[r] = n[r]);
                                    }
                                    return t;
                                };
                            function nt(t, e, n) {
                                return z.try(function () {
                                    var r;
                                    if (
                                        ((e = (function (t, e) {
                                            var n =
                                                    arguments.length > 2 &&
                                                    void 0 !== arguments[2]
                                                        ? arguments[2]
                                                        : {},
                                                r = L(),
                                                o = (function () {
                                                    var t =
                                                        arguments.length > 0 &&
                                                        void 0 !== arguments[0]
                                                            ? arguments[0]
                                                            : window;
                                                    return Boolean(f(t));
                                                })()
                                                    ? A.WINDOW_TYPES.POPUP
                                                    : (function () {
                                                          var t =
                                                              arguments.length >
                                                                  0 &&
                                                              void 0 !==
                                                                  arguments[0]
                                                                  ? arguments[0]
                                                                  : window;
                                                          return Boolean(l(t));
                                                      })()
                                                    ? A.WINDOW_TYPES.IFRAME
                                                    : A.WINDOW_TYPES.FULLPAGE,
                                                i = p(window);
                                            return et({}, e, n, {
                                                sourceDomain: i,
                                                id: e.id || r,
                                                windowType: o,
                                            });
                                        })(t, e, {
                                            data: (function (t, n, r) {
                                                return I(
                                                    { obj: e.data },
                                                    function (e, r) {
                                                        return "function" ==
                                                            typeof e
                                                            ? Z(
                                                                  t,
                                                                  n,
                                                                  e,
                                                                  r.toString()
                                                              )
                                                            : e instanceof Error
                                                            ? ((o = e),
                                                              {
                                                                  __type__:
                                                                      A
                                                                          .SERIALIZATION_TYPES
                                                                          .ERROR,
                                                                  __message__:
                                                                      j(o),
                                                                  __code__:
                                                                      o.code,
                                                              })
                                                            : window.Promise &&
                                                              e instanceof
                                                                  window.Promise
                                                            ? (function (
                                                                  t,
                                                                  e,
                                                                  n,
                                                                  r
                                                              ) {
                                                                  return {
                                                                      __type__:
                                                                          A
                                                                              .SERIALIZATION_TYPES
                                                                              .PROMISE,
                                                                      __then__:
                                                                          Z(
                                                                              t,
                                                                              e,
                                                                              function (
                                                                                  t,
                                                                                  e
                                                                              ) {
                                                                                  return n.then(
                                                                                      t,
                                                                                      e
                                                                                  );
                                                                              },
                                                                              r +
                                                                                  ".then"
                                                                          ),
                                                                  };
                                                              })(
                                                                  t,
                                                                  n,
                                                                  e,
                                                                  r.toString()
                                                              )
                                                            : z.isPromise(e)
                                                            ? (function (
                                                                  t,
                                                                  e,
                                                                  n,
                                                                  r
                                                              ) {
                                                                  return {
                                                                      __type__:
                                                                          A
                                                                              .SERIALIZATION_TYPES
                                                                              .ZALGO_PROMISE,
                                                                      __then__:
                                                                          Z(
                                                                              t,
                                                                              e,
                                                                              function (
                                                                                  t,
                                                                                  e
                                                                              ) {
                                                                                  return n.then(
                                                                                      t,
                                                                                      e
                                                                                  );
                                                                              },
                                                                              r +
                                                                                  ".then"
                                                                          ),
                                                                  };
                                                              })(
                                                                  t,
                                                                  n,
                                                                  e,
                                                                  r.toString()
                                                              )
                                                            : C(e)
                                                            ? ((i = e),
                                                              {
                                                                  __type__:
                                                                      A
                                                                          .SERIALIZATION_TYPES
                                                                          .REGEX,
                                                                  __source__:
                                                                      i.source,
                                                              })
                                                            : void 0;
                                                        var o, i;
                                                    }
                                                ).obj;
                                            })(t, n),
                                            domain: n,
                                        })),
                                        t === window && !R.ALLOW_SAME_ORIGIN)
                                    )
                                        throw new Error(
                                            "Attemping to send message to self"
                                        );
                                    if (g(t))
                                        throw new Error("Window is closed");
                                    var o = [],
                                        i = (function (t, e, n) {
                                            var r = void 0,
                                                o = void 0;
                                            try {
                                                if (
                                                    ("{}" !==
                                                        JSON.stringify({}) &&
                                                        ((r =
                                                            Object.prototype
                                                                .toJSON),
                                                        delete Object.prototype
                                                            .toJSON),
                                                    "{}" !== JSON.stringify({}))
                                                )
                                                    throw new Error(
                                                        "Can not correctly serialize JSON objects"
                                                    );
                                                if (
                                                    ("[]" !==
                                                        JSON.stringify([]) &&
                                                        ((o =
                                                            Array.prototype
                                                                .toJSON),
                                                        delete Array.prototype
                                                            .toJSON),
                                                    "[]" !== JSON.stringify([]))
                                                )
                                                    throw new Error(
                                                        "Can not correctly serialize JSON objects"
                                                    );
                                            } catch (t) {
                                                throw new Error(
                                                    "Can not repair JSON.stringify: " +
                                                        t.message
                                                );
                                            }
                                            var i = JSON.stringify.call(
                                                this,
                                                t,
                                                null,
                                                2
                                            );
                                            try {
                                                r &&
                                                    (Object.prototype.toJSON =
                                                        r),
                                                    o &&
                                                        (Array.prototype.toJSON =
                                                            o);
                                            } catch (t) {
                                                throw new Error(
                                                    "Can not repair JSON.stringify: " +
                                                        t.message
                                                );
                                            }
                                            return i;
                                        })(
                                            (((r = {})[
                                                A.WINDOW_PROPS.POSTROBOT
                                            ] = e),
                                            r)
                                        );
                                    return z
                                        .map(Object.keys(tt), function (e) {
                                            return z
                                                .try(function () {
                                                    if (
                                                        !R
                                                            .ALLOWED_POST_MESSAGE_METHODS[
                                                            e
                                                        ]
                                                    )
                                                        throw new Error(
                                                            "Strategy disallowed: " +
                                                                e
                                                        );
                                                    return tt[e](t, i, n);
                                                })
                                                .then(
                                                    function () {
                                                        return (
                                                            o.push(
                                                                e + ": success"
                                                            ),
                                                            !0
                                                        );
                                                    },
                                                    function (t) {
                                                        return (
                                                            o.push(
                                                                e +
                                                                    ": " +
                                                                    j(t) +
                                                                    "\n"
                                                            ),
                                                            !1
                                                        );
                                                    }
                                                );
                                        })
                                        .then(function (t) {
                                            var n = t.some(Boolean),
                                                r =
                                                    e.type +
                                                    " " +
                                                    e.name +
                                                    " " +
                                                    (n ? "success" : "error") +
                                                    ":\n  - " +
                                                    o.join("\n  - ") +
                                                    "\n";
                                            if (!n) throw new Error(r);
                                        });
                                });
                            }
                            (K.responseListeners = K.responseListeners || {}),
                                (K.requestListeners = K.requestListeners || {}),
                                (K.WINDOW_WILDCARD =
                                    K.WINDOW_WILDCARD ||
                                    new (function () {})()),
                                (K.erroredResponseListeners =
                                    K.erroredResponseListeners || {});
                            var rt;
                            function ot(t) {
                                return K.responseListeners[t];
                            }
                            function it(t) {
                                delete K.responseListeners[t];
                            }
                            function at(t) {
                                return Boolean(K.erroredResponseListeners[t]);
                            }
                            function st(t) {
                                var e = t.name,
                                    n = t.win,
                                    r = t.domain;
                                if (
                                    (n === A.WILDCARD && (n = null),
                                    r === A.WILDCARD && (r = null),
                                    !e)
                                )
                                    throw new Error(
                                        "Name required to get request listener"
                                    );
                                var o = K.requestListeners[e];
                                if (o)
                                    for (
                                        var i = 0,
                                            a = [n, K.WINDOW_WILDCARD],
                                            s = null == a ? 0 : a.length;
                                        i < s;
                                        i++
                                    ) {
                                        var u = a[i],
                                            c = u && o.get(u);
                                        if (c) {
                                            if (r && "string" == typeof r) {
                                                if (c[r]) return c[r];
                                                if (c.__domain_regex__)
                                                    for (
                                                        var l = 0,
                                                            f =
                                                                c.__domain_regex__,
                                                            d =
                                                                null == f
                                                                    ? 0
                                                                    : f.length;
                                                        l < d;
                                                        l++
                                                    ) {
                                                        var h = f[l],
                                                            p = h.regex,
                                                            y = h.listener;
                                                        if (E(p, r)) return y;
                                                    }
                                            }
                                            if (c[A.WILDCARD])
                                                return c[A.WILDCARD];
                                        }
                                    }
                            }
                            var ut =
                                    Object.assign ||
                                    function (t) {
                                        for (
                                            var e = 1;
                                            e < arguments.length;
                                            e++
                                        ) {
                                            var n = arguments[e];
                                            for (var r in n)
                                                Object.prototype.hasOwnProperty.call(
                                                    n,
                                                    r
                                                ) && (t[r] = n[r]);
                                        }
                                        return t;
                                    },
                                ct =
                                    (((rt = {})[A.POST_MESSAGE_TYPE.ACK] =
                                        function (t, e, n) {
                                            if (!at(n.hash)) {
                                                var r = ot(n.hash);
                                                if (!r)
                                                    throw new Error(
                                                        "No handler found for post message ack for message: " +
                                                            n.name +
                                                            " from " +
                                                            e +
                                                            " in " +
                                                            window.location
                                                                .protocol +
                                                            "//" +
                                                            window.location
                                                                .host +
                                                            window.location
                                                                .pathname
                                                    );
                                                if (!E(r.domain, e))
                                                    throw new Error(
                                                        "Ack origin " +
                                                            e +
                                                            " does not match domain " +
                                                            r.domain.toString()
                                                    );
                                                r.ack = !0;
                                            }
                                        }),
                                    (rt[A.POST_MESSAGE_TYPE.REQUEST] =
                                        function (t, e, n) {
                                            var r = st({
                                                name: n.name,
                                                win: t,
                                                domain: e,
                                            });
                                            function o(r) {
                                                return n.fireAndForget || g(t)
                                                    ? z.resolve()
                                                    : nt(
                                                          t,
                                                          ut(
                                                              {
                                                                  target: n.originalSource,
                                                                  hash: n.hash,
                                                                  name: n.name,
                                                              },
                                                              r
                                                          ),
                                                          e
                                                      );
                                            }
                                            return z
                                                .all([
                                                    o({
                                                        type: A
                                                            .POST_MESSAGE_TYPE
                                                            .ACK,
                                                    }),
                                                    z
                                                        .try(function () {
                                                            if (!r)
                                                                throw new Error(
                                                                    "No handler found for post message: " +
                                                                        n.name +
                                                                        " from " +
                                                                        e +
                                                                        " in " +
                                                                        window
                                                                            .location
                                                                            .protocol +
                                                                        "//" +
                                                                        window
                                                                            .location
                                                                            .host +
                                                                        window
                                                                            .location
                                                                            .pathname
                                                                );
                                                            if (!E(r.domain, e))
                                                                throw new Error(
                                                                    "Request origin " +
                                                                        e +
                                                                        " does not match domain " +
                                                                        r.domain.toString()
                                                                );
                                                            var o = n.data;
                                                            return r.handler({
                                                                source: t,
                                                                origin: e,
                                                                data: o,
                                                            });
                                                        })
                                                        .then(
                                                            function (t) {
                                                                return o({
                                                                    type: A
                                                                        .POST_MESSAGE_TYPE
                                                                        .RESPONSE,
                                                                    ack: A
                                                                        .POST_MESSAGE_ACK
                                                                        .SUCCESS,
                                                                    data: t,
                                                                });
                                                            },
                                                            function (t) {
                                                                var e = j(
                                                                        t
                                                                    ).replace(
                                                                        /^Error: /,
                                                                        ""
                                                                    ),
                                                                    n = t.code;
                                                                return o({
                                                                    type: A
                                                                        .POST_MESSAGE_TYPE
                                                                        .RESPONSE,
                                                                    ack: A
                                                                        .POST_MESSAGE_ACK
                                                                        .ERROR,
                                                                    error: e,
                                                                    code: n,
                                                                });
                                                            }
                                                        ),
                                                ])
                                                .then(x)
                                                .catch(function (t) {
                                                    if (r && r.handleError)
                                                        return r.handleError(t);
                                                    throw t;
                                                });
                                        }),
                                    (rt[A.POST_MESSAGE_TYPE.RESPONSE] =
                                        function (t, e, n) {
                                            if (!at(n.hash)) {
                                                var r,
                                                    i = ot(n.hash);
                                                if (!i)
                                                    throw new Error(
                                                        "No handler found for post message response for message: " +
                                                            n.name +
                                                            " from " +
                                                            e +
                                                            " in " +
                                                            window.location
                                                                .protocol +
                                                            "//" +
                                                            window.location
                                                                .host +
                                                            window.location
                                                                .pathname
                                                    );
                                                if (!E(i.domain, e))
                                                    throw new Error(
                                                        "Response origin " +
                                                            e +
                                                            " does not match domain " +
                                                            ((r = i.domain),
                                                            Array.isArray(r)
                                                                ? "(" +
                                                                  r.join(
                                                                      " | "
                                                                  ) +
                                                                  ")"
                                                                : o(r)
                                                                ? "RegExp(" +
                                                                  r.toString()
                                                                : r.toString())
                                                    );
                                                if (
                                                    (it(n.hash),
                                                    n.ack ===
                                                        A.POST_MESSAGE_ACK
                                                            .ERROR)
                                                ) {
                                                    var a = new Error(n.error);
                                                    return (
                                                        n.code &&
                                                            (a.code = n.code),
                                                        i.respond(a, null)
                                                    );
                                                }
                                                if (
                                                    n.ack ===
                                                    A.POST_MESSAGE_ACK.SUCCESS
                                                ) {
                                                    var s =
                                                        n.data || n.response;
                                                    return i.respond(null, {
                                                        source: t,
                                                        origin: e,
                                                        data: s,
                                                    });
                                                }
                                            }
                                        }),
                                    rt),
                                lt =
                                    "function" == typeof Symbol &&
                                    "symbol" == typeof Symbol.iterator
                                        ? function (t) {
                                              return typeof t;
                                          }
                                        : function (t) {
                                              return t &&
                                                  "function" == typeof Symbol &&
                                                  t.constructor === Symbol &&
                                                  t !== Symbol.prototype
                                                  ? "symbol"
                                                  : typeof t;
                                          };
                            function ft(t) {
                                if (window && !window.closed) {
                                    try {
                                        if (!t.source) return;
                                    } catch (t) {
                                        return;
                                    }
                                    var e = t.source,
                                        n = t.origin,
                                        r = (function (t) {
                                            var e,
                                                n = void 0;
                                            try {
                                                (e = t), (n = JSON.parse(e));
                                            } catch (t) {
                                                return;
                                            }
                                            if (
                                                n &&
                                                "object" ===
                                                    (void 0 === n
                                                        ? "undefined"
                                                        : lt(n)) &&
                                                null !== n &&
                                                (n =
                                                    n[
                                                        A.WINDOW_PROPS.POSTROBOT
                                                    ]) &&
                                                "object" ===
                                                    (void 0 === n
                                                        ? "undefined"
                                                        : lt(n)) &&
                                                null !== n &&
                                                n.type &&
                                                "string" == typeof n.type &&
                                                ct[n.type]
                                            )
                                                return n;
                                        })(t.data);
                                    if (r) {
                                        if (
                                            !r.sourceDomain ||
                                            "string" != typeof r.sourceDomain
                                        )
                                            throw new Error(
                                                "Expected message to have sourceDomain"
                                            );
                                        (0 !==
                                            r.sourceDomain.indexOf(
                                                A.MOCK_PROTOCOL
                                            ) &&
                                            0 !==
                                                r.sourceDomain.indexOf(
                                                    A.FILE_PROTOCOL
                                                )) ||
                                            (n = r.sourceDomain),
                                            -1 ===
                                                K.receivedMessages.indexOf(
                                                    r.id
                                                ) &&
                                                (K.receivedMessages.push(r.id),
                                                (g(e) && !r.fireAndForget) ||
                                                    (r.data &&
                                                        (r.data = (function (
                                                            t,
                                                            e,
                                                            n
                                                        ) {
                                                            return I(
                                                                { obj: r.data },
                                                                function (n) {
                                                                    if (
                                                                        "object" ===
                                                                            (void 0 ===
                                                                            n
                                                                                ? "undefined"
                                                                                : Q(
                                                                                      n
                                                                                  )) &&
                                                                        null !==
                                                                            n
                                                                    )
                                                                        return V(
                                                                            n,
                                                                            A
                                                                                .SERIALIZATION_TYPES
                                                                                .METHOD
                                                                        )
                                                                            ? J(
                                                                                  t,
                                                                                  e,
                                                                                  n
                                                                              )
                                                                            : V(
                                                                                  n,
                                                                                  A
                                                                                      .SERIALIZATION_TYPES
                                                                                      .ERROR
                                                                              )
                                                                            ? (function (
                                                                                  t,
                                                                                  e,
                                                                                  n
                                                                              ) {
                                                                                  var r =
                                                                                      new Error(
                                                                                          n.__message__
                                                                                      );
                                                                                  return (
                                                                                      n.__code__ &&
                                                                                          (r.code =
                                                                                              n.__code__),
                                                                                      r
                                                                                  );
                                                                              })(
                                                                                  0,
                                                                                  0,
                                                                                  n
                                                                              )
                                                                            : V(
                                                                                  n,
                                                                                  A
                                                                                      .SERIALIZATION_TYPES
                                                                                      .PROMISE
                                                                              )
                                                                            ? (function (
                                                                                  t,
                                                                                  e,
                                                                                  n
                                                                              ) {
                                                                                  return window.Promise
                                                                                      ? new window.Promise(
                                                                                            function (
                                                                                                r,
                                                                                                o
                                                                                            ) {
                                                                                                return J(
                                                                                                    t,
                                                                                                    e,
                                                                                                    n.__then__
                                                                                                )(
                                                                                                    r,
                                                                                                    o
                                                                                                );
                                                                                            }
                                                                                        )
                                                                                      : $(
                                                                                            t,
                                                                                            e,
                                                                                            n
                                                                                        );
                                                                              })(
                                                                                  t,
                                                                                  e,
                                                                                  n
                                                                              )
                                                                            : V(
                                                                                  n,
                                                                                  A
                                                                                      .SERIALIZATION_TYPES
                                                                                      .ZALGO_PROMISE
                                                                              )
                                                                            ? $(
                                                                                  t,
                                                                                  e,
                                                                                  n
                                                                              )
                                                                            : V(
                                                                                  n,
                                                                                  A
                                                                                      .SERIALIZATION_TYPES
                                                                                      .REGEX
                                                                              )
                                                                            ? (function (
                                                                                  t,
                                                                                  e,
                                                                                  n
                                                                              ) {
                                                                                  return new RegExp(
                                                                                      n.__source__
                                                                                  );
                                                                              })(
                                                                                  0,
                                                                                  0,
                                                                                  n
                                                                              )
                                                                            : void 0;
                                                                }
                                                            ).obj;
                                                        })(e, n)),
                                                    ct[r.type](e, n, r)));
                                    }
                                }
                            }
                            function dt(t) {
                                try {
                                    t.source;
                                } catch (t) {
                                    return;
                                }
                                ft({
                                    source: t.source || t.sourceElement,
                                    origin:
                                        t.origin ||
                                        (t.originalEvent &&
                                            t.originalEvent.origin),
                                    data: t.data,
                                });
                            }
                            function ht(t) {
                                return z.try(function () {
                                    if (!t.name)
                                        throw new Error(
                                            "Expected options.name"
                                        );
                                    var e = t.name,
                                        n = void 0,
                                        r = void 0;
                                    if ("string" == typeof t.window) {
                                        var o = document.getElementById(
                                            t.window
                                        );
                                        if (!o)
                                            throw new Error(
                                                "Expected options.window " +
                                                    Object.prototype.toString.call(
                                                        t.window
                                                    ) +
                                                    " to be a valid element id"
                                            );
                                        if (
                                            "iframe" !== o.tagName.toLowerCase()
                                        )
                                            throw new Error(
                                                "Expected options.window " +
                                                    Object.prototype.toString.call(
                                                        t.window
                                                    ) +
                                                    " to be an iframe"
                                            );
                                        if (!o.contentWindow)
                                            throw new Error(
                                                "Iframe must have contentWindow.  Make sure it has a src attribute and is in the DOM."
                                            );
                                        n = o.contentWindow;
                                    } else if (
                                        t.window instanceof HTMLIFrameElement
                                    ) {
                                        if (
                                            "iframe" !==
                                            t.window.tagName.toLowerCase()
                                        )
                                            throw new Error(
                                                "Expected options.window " +
                                                    Object.prototype.toString.call(
                                                        t.window
                                                    ) +
                                                    " to be an iframe"
                                            );
                                        if (t.window && !t.window.contentWindow)
                                            throw new Error(
                                                "Iframe must have contentWindow.  Make sure it has a src attribute and is in the DOM."
                                            );
                                        t.window &&
                                            t.window.contentWindow &&
                                            (n = t.window.contentWindow);
                                    } else n = t.window;
                                    if (!n)
                                        throw new Error(
                                            "Expected options.window to be a window object, iframe, or iframe element id."
                                        );
                                    var i = n;
                                    r = t.domain || A.WILDCARD;
                                    var a = t.name + "_" + L();
                                    if (g(i))
                                        throw new Error(
                                            "Target window is closed"
                                        );
                                    var s = !1,
                                        u = K.requestPromises.get(i);
                                    u ||
                                        ((u = []), K.requestPromises.set(i, u));
                                    var c = z
                                        .try(function () {
                                            if (
                                                (function (t, e) {
                                                    var n = b(e);
                                                    if (n) return n === t;
                                                    if (e === t) return !1;
                                                    if (
                                                        (function () {
                                                            var t =
                                                                arguments.length >
                                                                    0 &&
                                                                void 0 !==
                                                                    arguments[0]
                                                                    ? arguments[0]
                                                                    : window;
                                                            try {
                                                                if (t.top)
                                                                    return t.top;
                                                            } catch (t) {}
                                                            if (l(t) === t)
                                                                return t;
                                                            try {
                                                                if (
                                                                    v(
                                                                        window,
                                                                        t
                                                                    ) &&
                                                                    window.top
                                                                )
                                                                    return window.top;
                                                            } catch (t) {}
                                                            try {
                                                                if (
                                                                    v(
                                                                        t,
                                                                        window
                                                                    ) &&
                                                                    window.top
                                                                )
                                                                    return window.top;
                                                            } catch (t) {}
                                                            for (
                                                                var e = 0,
                                                                    n =
                                                                        (function t(
                                                                            e
                                                                        ) {
                                                                            for (
                                                                                var n =
                                                                                        [],
                                                                                    r = 0,
                                                                                    o =
                                                                                        _(
                                                                                            e
                                                                                        ),
                                                                                    i =
                                                                                        null ==
                                                                                        o
                                                                                            ? 0
                                                                                            : o.length;
                                                                                r <
                                                                                i;
                                                                                r++
                                                                            ) {
                                                                                var a =
                                                                                    o[
                                                                                        r
                                                                                    ];
                                                                                n.push(
                                                                                    a
                                                                                );
                                                                                for (
                                                                                    var s = 0,
                                                                                        u =
                                                                                            t(
                                                                                                a
                                                                                            ),
                                                                                        c =
                                                                                            null ==
                                                                                            u
                                                                                                ? 0
                                                                                                : u.length;
                                                                                    s <
                                                                                    c;
                                                                                    s++
                                                                                ) {
                                                                                    var l =
                                                                                        u[
                                                                                            s
                                                                                        ];
                                                                                    n.push(
                                                                                        l
                                                                                    );
                                                                                }
                                                                            }
                                                                            return n;
                                                                        })(t),
                                                                    r =
                                                                        null ==
                                                                        n
                                                                            ? 0
                                                                            : n.length;
                                                                e < r;
                                                                e++
                                                            ) {
                                                                var o = n[e];
                                                                try {
                                                                    if (o.top)
                                                                        return o.top;
                                                                } catch (t) {}
                                                                if (l(o) === o)
                                                                    return o;
                                                            }
                                                        })(e) === e
                                                    )
                                                        return !1;
                                                    for (
                                                        var r = 0,
                                                            o = _(t),
                                                            i =
                                                                null == o
                                                                    ? 0
                                                                    : o.length;
                                                        r < i;
                                                        r++
                                                    )
                                                        if (o[r] === e)
                                                            return !0;
                                                    return !1;
                                                })(window, i)
                                            )
                                                return (function (t) {
                                                    var e =
                                                            arguments.length >
                                                                1 &&
                                                            void 0 !==
                                                                arguments[1]
                                                                ? arguments[1]
                                                                : 5e3,
                                                        n =
                                                            arguments.length >
                                                                2 &&
                                                            void 0 !==
                                                                arguments[2]
                                                                ? arguments[2]
                                                                : "Window",
                                                        r =
                                                            K.readyPromises.get(
                                                                t
                                                            );
                                                    return (
                                                        r ||
                                                        ((r = new z()),
                                                        K.readyPromises.set(
                                                            t,
                                                            r
                                                        ),
                                                        -1 !== e &&
                                                            setTimeout(
                                                                function () {
                                                                    return r.reject(
                                                                        new Error(
                                                                            n +
                                                                                " did not load after " +
                                                                                e +
                                                                                "ms"
                                                                        )
                                                                    );
                                                                },
                                                                e
                                                            ),
                                                        r)
                                                    );
                                                })(
                                                    i,
                                                    t.timeout ||
                                                        R.CHILD_WINDOW_TIMEOUT
                                                );
                                        })
                                        .then(function () {
                                            var t = (
                                                arguments.length > 0 &&
                                                void 0 !== arguments[0]
                                                    ? arguments[0]
                                                    : {}
                                            ).origin;
                                            if (C(r) && !t) return X(i);
                                        })
                                        .then(function () {
                                            var n = (
                                                arguments.length > 0 &&
                                                void 0 !== arguments[0]
                                                    ? arguments[0]
                                                    : {}
                                            ).origin;
                                            if (C(r)) {
                                                if (!E(r, n))
                                                    throw new Error(
                                                        "Remote window domain " +
                                                            n +
                                                            " does not match regex: " +
                                                            r.toString()
                                                    );
                                                r = n;
                                            }
                                            if (
                                                "string" != typeof r &&
                                                !Array.isArray(r)
                                            )
                                                throw new TypeError(
                                                    "Expected domain to be a string or array"
                                                );
                                            var o = r;
                                            return new z(function (n, r) {
                                                var l = void 0;
                                                if (
                                                    (t.fireAndForget ||
                                                        (function (t, e) {
                                                            K.responseListeners[
                                                                t
                                                            ] = e;
                                                        })(
                                                            a,
                                                            (l = {
                                                                name: e,
                                                                window: i,
                                                                domain: o,
                                                                respond:
                                                                    function (
                                                                        t,
                                                                        e
                                                                    ) {
                                                                        t ||
                                                                            ((s =
                                                                                !0),
                                                                            u.splice(
                                                                                u.indexOf(
                                                                                    c,
                                                                                    1
                                                                                )
                                                                            )),
                                                                            t
                                                                                ? r(
                                                                                      t
                                                                                  )
                                                                                : n(
                                                                                      e
                                                                                  );
                                                                    },
                                                            })
                                                        ),
                                                    nt(
                                                        i,
                                                        {
                                                            type: A
                                                                .POST_MESSAGE_TYPE
                                                                .REQUEST,
                                                            hash: a,
                                                            name: e,
                                                            data: t.data,
                                                            fireAndForget:
                                                                t.fireAndForget,
                                                        },
                                                        o
                                                    ).catch(r),
                                                    t.fireAndForget)
                                                )
                                                    return n();
                                                var f = R.ACK_TIMEOUT,
                                                    d =
                                                        t.timeout ||
                                                        R.RES_TIMEOUT,
                                                    h = 100;
                                                setTimeout(function n() {
                                                    if (!s) {
                                                        if (g(i))
                                                            return l.ack
                                                                ? r(
                                                                      new Error(
                                                                          "Window closed for " +
                                                                              e +
                                                                              " before response"
                                                                      )
                                                                  )
                                                                : r(
                                                                      new Error(
                                                                          "Window closed for " +
                                                                              e +
                                                                              " before ack"
                                                                      )
                                                                  );
                                                        if (
                                                            ((f = Math.max(
                                                                f - h,
                                                                0
                                                            )),
                                                            -1 !== d &&
                                                                (d = Math.max(
                                                                    d - h,
                                                                    0
                                                                )),
                                                            l.ack)
                                                        ) {
                                                            if (-1 === d)
                                                                return;
                                                            h = Math.min(
                                                                d,
                                                                2e3
                                                            );
                                                        } else {
                                                            if (0 === f)
                                                                return r(
                                                                    new Error(
                                                                        "No ack for postMessage " +
                                                                            e +
                                                                            " in " +
                                                                            p() +
                                                                            " in " +
                                                                            R.ACK_TIMEOUT +
                                                                            "ms"
                                                                    )
                                                                );
                                                            if (0 === d)
                                                                return r(
                                                                    new Error(
                                                                        "No response for postMessage " +
                                                                            e +
                                                                            " in " +
                                                                            p() +
                                                                            " in " +
                                                                            (t.timeout ||
                                                                                R.RES_TIMEOUT) +
                                                                            "ms"
                                                                    )
                                                                );
                                                        }
                                                        setTimeout(n, h);
                                                    }
                                                }, h);
                                            });
                                        });
                                    return (
                                        c.catch(function () {
                                            !(function (t) {
                                                K.erroredResponseListeners[t] =
                                                    !0;
                                            })(a),
                                                it(a);
                                        }),
                                        u.push(c),
                                        c
                                    );
                                });
                            }
                            function pt(t, e, n, r) {
                                return (
                                    ((r = r || {}).window = t),
                                    (r.name = e),
                                    (r.data = n),
                                    ht(r)
                                );
                            }
                            function yt(t, e, n) {
                                var r = b();
                                return r
                                    ? pt(r, t, e, n)
                                    : new z(function (t, e) {
                                          return e(
                                              new Error(
                                                  "Window does not have a parent"
                                              )
                                          );
                                      });
                            }
                            function vt() {
                                var t =
                                    arguments.length > 0 &&
                                    void 0 !== arguments[0]
                                        ? arguments[0]
                                        : {};
                                if (!t.window)
                                    throw new Error("Expected options.window");
                                var e = t.window;
                                return {
                                    send: function (n, r) {
                                        return pt(e, n, r, t);
                                    },
                                };
                            }
                            (K.receivedMessages = K.receivedMessages || []),
                                (K.receiveMessage = ft),
                                (K.requestPromises =
                                    K.requestPromises || new T()),
                                (K.send = pt);
                            var _t =
                                "function" == typeof Symbol &&
                                "symbol" == typeof Symbol.iterator
                                    ? function (t) {
                                          return typeof t;
                                      }
                                    : function (t) {
                                          return t &&
                                              "function" == typeof Symbol &&
                                              t.constructor === Symbol &&
                                              t !== Symbol.prototype
                                              ? "symbol"
                                              : typeof t;
                                      };
                            function wt(t) {
                                if (!t.name)
                                    throw new Error("Expected options.name");
                                if (!t.handler)
                                    throw new Error("Expected options.handler");
                                var e,
                                    n = t.name,
                                    r = t.window,
                                    o = t.domain,
                                    i = {
                                        handler: t.handler,
                                        handleError:
                                            t.errorHandler ||
                                            function (t) {
                                                throw t;
                                            },
                                        window: r,
                                        domain: o || A.WILDCARD,
                                        name: n,
                                    },
                                    a = (function t(e, n) {
                                        var r = e.name,
                                            o = e.win,
                                            i = e.domain;
                                        if (!r || "string" != typeof r)
                                            throw new Error(
                                                "Name required to add request listener"
                                            );
                                        if (Array.isArray(o)) {
                                            for (
                                                var a = [],
                                                    s = 0,
                                                    u = o,
                                                    c =
                                                        null == u
                                                            ? 0
                                                            : u.length;
                                                s < c;
                                                s++
                                            ) {
                                                var l = u[s];
                                                a.push(
                                                    t(
                                                        {
                                                            name: r,
                                                            domain: i,
                                                            win: l,
                                                        },
                                                        n
                                                    )
                                                );
                                            }
                                            return {
                                                cancel: function () {
                                                    for (
                                                        var t = 0,
                                                            e =
                                                                null == a
                                                                    ? 0
                                                                    : a.length;
                                                        t < e;
                                                        t++
                                                    )
                                                        a[t].cancel();
                                                },
                                            };
                                        }
                                        if (Array.isArray(i)) {
                                            for (
                                                var f = [],
                                                    d = 0,
                                                    h = i,
                                                    p =
                                                        null == h
                                                            ? 0
                                                            : h.length;
                                                d < p;
                                                d++
                                            ) {
                                                var y = h[d];
                                                f.push(
                                                    t(
                                                        {
                                                            name: r,
                                                            win: o,
                                                            domain: y,
                                                        },
                                                        n
                                                    )
                                                );
                                            }
                                            return {
                                                cancel: function () {
                                                    for (
                                                        var t = 0,
                                                            e =
                                                                null == f
                                                                    ? 0
                                                                    : f.length;
                                                        t < e;
                                                        t++
                                                    )
                                                        f[t].cancel();
                                                },
                                            };
                                        }
                                        var v = st({
                                            name: r,
                                            win: o,
                                            domain: i,
                                        });
                                        if (
                                            ((o && o !== A.WILDCARD) ||
                                                (o = K.WINDOW_WILDCARD),
                                            (i = i || A.WILDCARD),
                                            v)
                                        )
                                            throw o && i
                                                ? new Error(
                                                      "Request listener already exists for " +
                                                          r +
                                                          " on domain " +
                                                          i.toString() +
                                                          " for " +
                                                          (o ===
                                                          K.WINDOW_WILDCARD
                                                              ? "wildcard"
                                                              : "specified") +
                                                          " window"
                                                  )
                                                : o
                                                ? new Error(
                                                      "Request listener already exists for " +
                                                          r +
                                                          " for " +
                                                          (o ===
                                                          K.WINDOW_WILDCARD
                                                              ? "wildcard"
                                                              : "specified") +
                                                          " window"
                                                  )
                                                : i
                                                ? new Error(
                                                      "Request listener already exists for " +
                                                          r +
                                                          " on domain " +
                                                          i.toString()
                                                  )
                                                : new Error(
                                                      "Request listener already exists for " +
                                                          r
                                                  );
                                        var _ = K.requestListeners,
                                            w = _[r];
                                        w || ((w = new T()), (_[r] = w));
                                        var m = w.get(o);
                                        m || ((m = {}), w.set(o, m));
                                        var g = i.toString(),
                                            b = m.__domain_regex__,
                                            E = void 0;
                                        return (
                                            C(i)
                                                ? (b ||
                                                      ((b = []),
                                                      (m.__domain_regex__ = b)),
                                                  (E = {
                                                      regex: i,
                                                      listener: n,
                                                  }),
                                                  b.push(E))
                                                : (m[g] = n),
                                            {
                                                cancel: function () {
                                                    m &&
                                                        (delete m[g],
                                                        o &&
                                                            0 ===
                                                                Object.keys(m)
                                                                    .length &&
                                                            w.delete(o),
                                                        E &&
                                                            b.splice(
                                                                b.indexOf(E, 1)
                                                            ));
                                                },
                                            }
                                        );
                                    })({ name: n, win: r, domain: o }, i);
                                if (t.once) {
                                    var s = i.handler;
                                    i.handler = M(function () {
                                        return (
                                            a.cancel(), s.apply(this, arguments)
                                        );
                                    });
                                }
                                if (i.window && t.errorOnClose)
                                    var u =
                                        ((e = void 0),
                                        (e = setTimeout(function t() {
                                            (e = setTimeout(t, 50)),
                                                function () {
                                                    r &&
                                                        "object" ===
                                                            (void 0 === r
                                                                ? "undefined"
                                                                : _t(r)) &&
                                                        g(r) &&
                                                        (u.cancel(),
                                                        i.handleError(
                                                            new Error(
                                                                "Post message target window is closed"
                                                            )
                                                        ));
                                                }.call();
                                        }, 50)),
                                        {
                                            cancel: function () {
                                                clearTimeout(e);
                                            },
                                        });
                                return {
                                    cancel: function () {
                                        a.cancel();
                                    },
                                };
                            }
                            function mt(t, e, n) {
                                return (
                                    "function" == typeof e &&
                                        ((n = e), (e = {})),
                                    ((e = e || {}).name = t),
                                    (e.handler = n || e.handler),
                                    wt(e)
                                );
                            }
                            function gt(t) {
                                var e =
                                        arguments.length > 1 &&
                                        void 0 !== arguments[1]
                                            ? arguments[1]
                                            : {},
                                    n = arguments[2];
                                "function" == typeof e && ((n = e), (e = {})),
                                    (e = e || {}),
                                    (n = n || e.handler);
                                var r = e.errorHandler,
                                    o = new z(function (o, i) {
                                        ((e = e || {}).name = t),
                                            (e.once = !0),
                                            (e.handler = function (t) {
                                                if ((o(t), n)) return n(t);
                                            }),
                                            (e.errorHandler = function (t) {
                                                if ((i(t), r)) return r(t);
                                            });
                                    }),
                                    i = wt(e);
                                return (o.cancel = i.cancel), o;
                            }
                            function bt() {
                                var t =
                                    arguments.length > 0 &&
                                    void 0 !== arguments[0]
                                        ? arguments[0]
                                        : {};
                                return {
                                    on: function (e, n) {
                                        return mt(e, t, n);
                                    },
                                };
                            }
                            function Et() {
                                delete window[A.WINDOW_PROPS.POSTROBOT],
                                    window.removeEventListener("message", dt);
                            }
                            K.on = mt;
                            var Ot = b();
                            function Pt(t) {
                                var e = K.requestPromises.get(t);
                                if (e)
                                    for (
                                        var n = 0, r = null == e ? 0 : e.length;
                                        n < r;
                                        n++
                                    )
                                        e[n].reject(
                                            new Error(
                                                "No response from window - cleaned up"
                                            )
                                        );
                                K.popupWindowsByWin &&
                                    K.popupWindowsByWin.delete(t),
                                    K.remoteWindows &&
                                        K.remoteWindows.delete(t),
                                    K.requestPromises.delete(t),
                                    K.methods.delete(t),
                                    K.readyPromises.delete(t);
                            }
                            var St = null;
                            function Tt() {
                                var t, e;
                                K.initialized ||
                                    ((e = dt),
                                    (t = window).addEventListener
                                        ? t.addEventListener("message", e)
                                        : t.attachEvent("onmessage", e),
                                    (function () {
                                        (t = function (t) {
                                            var e = t.source,
                                                n = t.origin,
                                                r =
                                                    K.readyPromises.get(e) ||
                                                    new z();
                                            r.resolve({ origin: n }),
                                                K.readyPromises.set(e, r);
                                        }),
                                            K.on(
                                                A.POST_MESSAGE_NAMES.HELLO,
                                                { domain: A.WILDCARD },
                                                function (e) {
                                                    var n = e.source,
                                                        r = e.origin;
                                                    return t({
                                                        source: n,
                                                        origin: r,
                                                    });
                                                }
                                            );
                                        var t,
                                            e = b();
                                        e && X(e).catch(x);
                                    })(),
                                    Y({ on: mt, send: pt })),
                                    (K.initialized = !0);
                            }
                            Tt(),
                                n.d(e, "cleanUpWindow", function () {
                                    return Pt;
                                }),
                                n.d(e, "Promise", function () {
                                    return z;
                                }),
                                n.d(e, "bridge", function () {
                                    return St;
                                }),
                                n.d(e, "init", function () {
                                    return Tt;
                                }),
                                n.d(e, "parent", function () {
                                    return Ot;
                                }),
                                n.d(e, "send", function () {
                                    return pt;
                                }),
                                n.d(e, "request", function () {
                                    return ht;
                                }),
                                n.d(e, "sendToParent", function () {
                                    return yt;
                                }),
                                n.d(e, "client", function () {
                                    return vt;
                                }),
                                n.d(e, "on", function () {
                                    return mt;
                                }),
                                n.d(e, "listen", function () {
                                    return wt;
                                }),
                                n.d(e, "once", function () {
                                    return gt;
                                }),
                                n.d(e, "listener", function () {
                                    return bt;
                                }),
                                n.d(e, "CONFIG", function () {
                                    return R;
                                }),
                                n.d(e, "CONSTANTS", function () {
                                    return A;
                                }),
                                n.d(e, "disable", function () {
                                    return Et;
                                }),
                                (e.default = r);
                        },
                    }));
            },
            727: (t, e, n) => {
                (t.exports = n(957)), (t.exports.default = t.exports);
            },
            979: function (t, e, n) {
                "use strict";
                var r =
                        (this && this.__awaiter) ||
                        function (t, e, n, r) {
                            return new (n || (n = Promise))(function (o, i) {
                                function a(t) {
                                    try {
                                        u(r.next(t));
                                    } catch (t) {
                                        i(t);
                                    }
                                }
                                function s(t) {
                                    try {
                                        u(r.throw(t));
                                    } catch (t) {
                                        i(t);
                                    }
                                }
                                function u(t) {
                                    var e;
                                    t.done
                                        ? o(t.value)
                                        : ((e = t.value),
                                          e instanceof n
                                              ? e
                                              : new n(function (t) {
                                                    t(e);
                                                })).then(a, s);
                                }
                                u((r = r.apply(t, e || [])).next());
                            });
                        },
                    o =
                        (this && this.__generator) ||
                        function (t, e) {
                            var n,
                                r,
                                o,
                                i,
                                a = {
                                    label: 0,
                                    sent: function () {
                                        if (1 & o[0]) throw o[1];
                                        return o[1];
                                    },
                                    trys: [],
                                    ops: [],
                                };
                            return (
                                (i = { next: s(0), throw: s(1), return: s(2) }),
                                "function" == typeof Symbol &&
                                    (i[Symbol.iterator] = function () {
                                        return this;
                                    }),
                                i
                            );
                            function s(i) {
                                return function (s) {
                                    return (function (i) {
                                        if (n)
                                            throw new TypeError(
                                                "Generator is already executing."
                                            );
                                        for (; a; )
                                            try {
                                                if (
                                                    ((n = 1),
                                                    r &&
                                                        (o =
                                                            2 & i[0]
                                                                ? r.return
                                                                : i[0]
                                                                ? r.throw ||
                                                                  ((o =
                                                                      r.return) &&
                                                                      o.call(r),
                                                                  0)
                                                                : r.next) &&
                                                        !(o = o.call(r, i[1]))
                                                            .done)
                                                )
                                                    return o;
                                                switch (
                                                    ((r = 0),
                                                    o &&
                                                        (i = [
                                                            2 & i[0],
                                                            o.value,
                                                        ]),
                                                    i[0])
                                                ) {
                                                    case 0:
                                                    case 1:
                                                        o = i;
                                                        break;
                                                    case 4:
                                                        return (
                                                            a.label++,
                                                            {
                                                                value: i[1],
                                                                done: !1,
                                                            }
                                                        );
                                                    case 5:
                                                        a.label++,
                                                            (r = i[1]),
                                                            (i = [0]);
                                                        continue;
                                                    case 7:
                                                        (i = a.ops.pop()),
                                                            a.trys.pop();
                                                        continue;
                                                    default:
                                                        if (
                                                            !(
                                                                (o =
                                                                    (o = a.trys)
                                                                        .length >
                                                                        0 &&
                                                                    o[
                                                                        o.length -
                                                                            1
                                                                    ]) ||
                                                                (6 !== i[0] &&
                                                                    2 !== i[0])
                                                            )
                                                        ) {
                                                            a = 0;
                                                            continue;
                                                        }
                                                        if (
                                                            3 === i[0] &&
                                                            (!o ||
                                                                (i[1] > o[0] &&
                                                                    i[1] <
                                                                        o[3]))
                                                        ) {
                                                            a.label = i[1];
                                                            break;
                                                        }
                                                        if (
                                                            6 === i[0] &&
                                                            a.label < o[1]
                                                        ) {
                                                            (a.label = o[1]),
                                                                (o = i);
                                                            break;
                                                        }
                                                        if (
                                                            o &&
                                                            a.label < o[2]
                                                        ) {
                                                            (a.label = o[2]),
                                                                a.ops.push(i);
                                                            break;
                                                        }
                                                        o[2] && a.ops.pop(),
                                                            a.trys.pop();
                                                        continue;
                                                }
                                                i = e.call(t, a);
                                            } catch (t) {
                                                (i = [6, t]), (r = 0);
                                            } finally {
                                                n = o = 0;
                                            }
                                        if (5 & i[0]) throw i[1];
                                        return {
                                            value: i[0] ? i[1] : void 0,
                                            done: !0,
                                        };
                                    })([i, s]);
                                };
                            }
                        },
                    i =
                        (this && this.__importDefault) ||
                        function (t) {
                            return t && t.__esModule ? t : { default: t };
                        };
                Object.defineProperty(e, "__esModule", { value: !0 });
                var a = i(n(160)),
                    s = (function () {
                        function t(t, e, n) {
                            (this.currentAsset = t.currentAsset),
                                (this._emitter = n),
                                (this._connection = e);
                            var r = this;
                            this._emitter.on("assetSave", function (t) {
                                r.currentAsset = t.data;
                            }),
                                this._emitter.on("assetChange", function (t) {
                                    r._changedData = t.data;
                                }),
                                (this.getData = this.getData.bind(this)),
                                (this.setData = this.setData.bind(this)),
                                (this.syncAsset = this.syncAsset.bind(this)),
                                (this.updateWidth =
                                    this.updateWidth.bind(this)),
                                (this.onSave = this.onSave.bind(this)),
                                (this.onChange = this.onChange.bind(this)),
                                (this.onPublish = this.onPublish.bind(this)),
                                (this.onUnPublish =
                                    this.onUnPublish.bind(this)),
                                (this.replaceAsset =
                                    this.replaceAsset.bind(this));
                        }
                        return (
                            (t.prototype.getData = function () {
                                return this.currentAsset;
                            }),
                            (t.prototype.setData = function (t) {
                                return r(this, void 0, void 0, function () {
                                    return o(this, function (e) {
                                        return [
                                            2,
                                            this._connection.sendToParent(
                                                "setData",
                                                t
                                            ),
                                        ];
                                    });
                                });
                            }),
                            (t.prototype.syncAsset = function () {
                                return r(this, void 0, void 0, function () {
                                    return o(this, function (t) {
                                        return [
                                            2,
                                            this._connection.sendToParent(
                                                "syncAsset"
                                            ),
                                        ];
                                    });
                                });
                            }),
                            (t.prototype.updateWidth = function (t) {
                                return r(this, void 0, void 0, function () {
                                    return o(this, function (e) {
                                        if ("number" != typeof t)
                                            throw new Error(
                                                "Width must be a number"
                                            );
                                        return [
                                            2,
                                            this._connection.sendToParent(
                                                "updateAssetSidebarWidth",
                                                t
                                            ),
                                        ];
                                    });
                                });
                            }),
                            (t.prototype.replaceAsset = function (t) {
                                return r(this, void 0, void 0, function () {
                                    return o(this, function (e) {
                                        return [
                                            2,
                                            (0, a.default)(
                                                this._emitter
                                            ).handleUpload([t], "replace"),
                                        ];
                                    });
                                });
                            }),
                            (t.prototype.onSave = function (t) {
                                if (!t || "function" != typeof t)
                                    throw Error("Callback must be a function");
                                this._emitter.on("assetSave", function (e) {
                                    t(e.data);
                                });
                            }),
                            (t.prototype.onChange = function (t) {
                                if (!t || "function" != typeof t)
                                    throw Error("Callback must be a function");
                                this._emitter.on("assetChange", function (e) {
                                    t(e.data);
                                });
                            }),
                            (t.prototype.onPublish = function (t) {
                                if (!t || "function" != typeof t)
                                    throw Error("Callback must be a function");
                                this._emitter.on("assetPublish", function (e) {
                                    t(e.data);
                                });
                            }),
                            (t.prototype.onUnPublish = function (t) {
                                if (!t || "function" != typeof t)
                                    throw Error("Callback must be a function");
                                this._emitter.on(
                                    "assetUnPublish",
                                    function (e) {
                                        t(e.data);
                                    }
                                );
                            }),
                            t
                        );
                    })();
                e.default = s;
            },
            34: function (t, e) {
                "use strict";
                var n =
                        (this && this.__assign) ||
                        function () {
                            return (
                                (n =
                                    Object.assign ||
                                    function (t) {
                                        for (
                                            var e, n = 1, r = arguments.length;
                                            n < r;
                                            n++
                                        )
                                            for (var o in (e = arguments[n]))
                                                Object.prototype.hasOwnProperty.call(
                                                    e,
                                                    o
                                                ) && (t[o] = e[o]);
                                        return t;
                                    }),
                                n.apply(this, arguments)
                            );
                        },
                    r =
                        (this && this.__awaiter) ||
                        function (t, e, n, r) {
                            return new (n || (n = Promise))(function (o, i) {
                                function a(t) {
                                    try {
                                        u(r.next(t));
                                    } catch (t) {
                                        i(t);
                                    }
                                }
                                function s(t) {
                                    try {
                                        u(r.throw(t));
                                    } catch (t) {
                                        i(t);
                                    }
                                }
                                function u(t) {
                                    var e;
                                    t.done
                                        ? o(t.value)
                                        : ((e = t.value),
                                          e instanceof n
                                              ? e
                                              : new n(function (t) {
                                                    t(e);
                                                })).then(a, s);
                                }
                                u((r = r.apply(t, e || [])).next());
                            });
                        },
                    o =
                        (this && this.__generator) ||
                        function (t, e) {
                            var n,
                                r,
                                o,
                                i,
                                a = {
                                    label: 0,
                                    sent: function () {
                                        if (1 & o[0]) throw o[1];
                                        return o[1];
                                    },
                                    trys: [],
                                    ops: [],
                                };
                            return (
                                (i = { next: s(0), throw: s(1), return: s(2) }),
                                "function" == typeof Symbol &&
                                    (i[Symbol.iterator] = function () {
                                        return this;
                                    }),
                                i
                            );
                            function s(i) {
                                return function (s) {
                                    return (function (i) {
                                        if (n)
                                            throw new TypeError(
                                                "Generator is already executing."
                                            );
                                        for (; a; )
                                            try {
                                                if (
                                                    ((n = 1),
                                                    r &&
                                                        (o =
                                                            2 & i[0]
                                                                ? r.return
                                                                : i[0]
                                                                ? r.throw ||
                                                                  ((o =
                                                                      r.return) &&
                                                                      o.call(r),
                                                                  0)
                                                                : r.next) &&
                                                        !(o = o.call(r, i[1]))
                                                            .done)
                                                )
                                                    return o;
                                                switch (
                                                    ((r = 0),
                                                    o &&
                                                        (i = [
                                                            2 & i[0],
                                                            o.value,
                                                        ]),
                                                    i[0])
                                                ) {
                                                    case 0:
                                                    case 1:
                                                        o = i;
                                                        break;
                                                    case 4:
                                                        return (
                                                            a.label++,
                                                            {
                                                                value: i[1],
                                                                done: !1,
                                                            }
                                                        );
                                                    case 5:
                                                        a.label++,
                                                            (r = i[1]),
                                                            (i = [0]);
                                                        continue;
                                                    case 7:
                                                        (i = a.ops.pop()),
                                                            a.trys.pop();
                                                        continue;
                                                    default:
                                                        if (
                                                            !(
                                                                (o =
                                                                    (o = a.trys)
                                                                        .length >
                                                                        0 &&
                                                                    o[
                                                                        o.length -
                                                                            1
                                                                    ]) ||
                                                                (6 !== i[0] &&
                                                                    2 !== i[0])
                                                            )
                                                        ) {
                                                            a = 0;
                                                            continue;
                                                        }
                                                        if (
                                                            3 === i[0] &&
                                                            (!o ||
                                                                (i[1] > o[0] &&
                                                                    i[1] <
                                                                        o[3]))
                                                        ) {
                                                            a.label = i[1];
                                                            break;
                                                        }
                                                        if (
                                                            6 === i[0] &&
                                                            a.label < o[1]
                                                        ) {
                                                            (a.label = o[1]),
                                                                (o = i);
                                                            break;
                                                        }
                                                        if (
                                                            o &&
                                                            a.label < o[2]
                                                        ) {
                                                            (a.label = o[2]),
                                                                a.ops.push(i);
                                                            break;
                                                        }
                                                        o[2] && a.ops.pop(),
                                                            a.trys.pop();
                                                        continue;
                                                }
                                                i = e.call(t, a);
                                            } catch (t) {
                                                (i = [6, t]), (r = 0);
                                            } finally {
                                                n = o = 0;
                                            }
                                        if (5 & i[0]) throw i[1];
                                        return {
                                            value: i[0] ? i[1] : void 0,
                                            done: !0,
                                        };
                                    })([i, s]);
                                };
                            }
                        };
                Object.defineProperty(e, "__esModule", { value: !0 }),
                    (e.rtePluginInitializer = e.RTEPlugin = void 0);
                var i = function (t, e) {
                    var i = this;
                    (this.configCallback = e),
                        (this.pluginMetaData = {
                            registry: {
                                title: "",
                                toolbar: {
                                    inMainToolbar: !0,
                                    inHoveringToolbar: !0,
                                },
                                isContentstackElement: !0,
                            },
                            meta: {
                                id: "",
                                elementType: null,
                                editorCallbacks: {},
                                isDependent: !1,
                            },
                        }),
                        (this.isContainer = !1),
                        (this.containerMetaData = {
                            registry: {
                                id: this.pluginMetaData.meta.id,
                                title: this.pluginMetaData.registry.title,
                                rootCategory: !1,
                                toolbar: n(
                                    {},
                                    this.pluginMetaData.registry.toolbar
                                ),
                            },
                            meta: {
                                id: this.pluginMetaData.meta.id,
                                dependentPlugins: [],
                            },
                        }),
                        (this.addPlugins = function () {
                            for (var t = [], e = 0; e < arguments.length; e++)
                                t[e] = arguments[e];
                            if (i.pluginMetaData.meta.isDependent)
                                throw Error(
                                    "cannot have another container inside"
                                );
                            (i.isContainer = !0),
                                t.forEach(function (t) {
                                    if (t.isContainer)
                                        throw Error(
                                            "cannot have another container inside"
                                        );
                                    (t.pluginMetaData.registry.category =
                                        i.pluginMetaData.meta.id),
                                        i.containerMetaData.meta.dependentPlugins.push(
                                            t
                                        ),
                                        (t.pluginMetaData.meta.isDependent =
                                            !0);
                                });
                        }),
                        (this.on = function (t, e) {
                            switch (t) {
                                case "beforeChildRender":
                                    i.pluginMetaData.registry.beforeChildrenRender =
                                        e;
                                    break;
                                case "beforeRender":
                                    i.pluginMetaData.registry.beforeElementRender =
                                        e;
                                    break;
                                case "exec":
                                    i.pluginMetaData.registry.handleMouseDown =
                                        e;
                                    break;
                                case "keydown":
                                    i.pluginMetaData.meta.editorCallbacks.keydown =
                                        e;
                                    break;
                                default:
                                    i.pluginMetaData.meta.editorCallbacks[t] =
                                        e;
                            }
                        }),
                        (this.get = function (t) {
                            return r(i, void 0, void 0, function () {
                                var e,
                                    r,
                                    i = this;
                                return o(this, function (o) {
                                    switch (o.label) {
                                        case 0:
                                            return [4, this.configCallback(t)];
                                        case 1:
                                            return (
                                                (e = o.sent()),
                                                Object.entries(e).forEach(
                                                    function (t) {
                                                        var e = t[0],
                                                            n = t[1];
                                                        switch (e) {
                                                            case "title":
                                                                i.pluginMetaData.registry.title =
                                                                    n;
                                                                break;
                                                            case "icon":
                                                                (i.pluginMetaData.registry.iconName =
                                                                    n),
                                                                    (i.containerMetaData.registry.iconName =
                                                                        n);
                                                                break;
                                                            case "display":
                                                                if (
                                                                    ((i.pluginMetaData.registry.toolbar =
                                                                        {
                                                                            inHoveringToolbar:
                                                                                !1,
                                                                            inMainToolbar:
                                                                                !1,
                                                                        }),
                                                                    "string" ==
                                                                        typeof n)
                                                                )
                                                                    switch (n) {
                                                                        case "toolbar":
                                                                            i.pluginMetaData.registry.toolbar.inMainToolbar =
                                                                                !0;
                                                                            break;
                                                                        case "hoveringToolbar":
                                                                            i.pluginMetaData.registry.toolbar.inHoveringToolbar =
                                                                                !0;
                                                                    }
                                                                else
                                                                    Array.isArray(
                                                                        n
                                                                    ) &&
                                                                        n.forEach(
                                                                            function (
                                                                                t
                                                                            ) {
                                                                                switch (
                                                                                    t
                                                                                ) {
                                                                                    case "toolbar":
                                                                                        i.pluginMetaData.registry.toolbar.inMainToolbar =
                                                                                            !0;
                                                                                        break;
                                                                                    case "hoveringToolbar":
                                                                                        i.pluginMetaData.registry.toolbar.inHoveringToolbar =
                                                                                            !0;
                                                                                }
                                                                            }
                                                                        );
                                                                break;
                                                            case "elementType":
                                                                if (
                                                                    ("string" ==
                                                                        typeof n &&
                                                                        "inline" ===
                                                                            n) ||
                                                                    (Array.isArray(
                                                                        n
                                                                    ) &&
                                                                        n.includes(
                                                                            "inline"
                                                                        ))
                                                                ) {
                                                                    var r =
                                                                        i
                                                                            .pluginMetaData
                                                                            .registry
                                                                            .dndOptions;
                                                                    r ||
                                                                        ((i.pluginMetaData.registry.dndOptions =
                                                                            {}),
                                                                        (r =
                                                                            i
                                                                                .pluginMetaData
                                                                                .registry
                                                                                .dndOptions)),
                                                                        (r.DisableDND =
                                                                            !0),
                                                                        (r.DisableSelectionHalo =
                                                                            !0);
                                                                }
                                                                i.pluginMetaData.meta.elementType =
                                                                    n;
                                                                break;
                                                            case "render":
                                                                i.pluginMetaData.registry.Component =
                                                                    n;
                                                                break;
                                                            case "shouldOverride":
                                                                i.pluginMetaData.registry.shouldOverride =
                                                                    n;
                                                        }
                                                    }
                                                ),
                                                (r =
                                                    this.containerMetaData
                                                        .meta),
                                                (this.containerMetaData = {
                                                    registry: n(
                                                        n(
                                                            {},
                                                            this
                                                                .containerMetaData
                                                                .registry
                                                        ),
                                                        {
                                                            id: this
                                                                .pluginMetaData
                                                                .meta.id,
                                                            title: this
                                                                .pluginMetaData
                                                                .registry.title,
                                                            rootCategory: !1,
                                                            toolbar: n(
                                                                {},
                                                                this
                                                                    .pluginMetaData
                                                                    .registry
                                                                    .toolbar
                                                            ),
                                                        }
                                                    ),
                                                    meta: n(n({}, r), {
                                                        id: this.pluginMetaData
                                                            .meta.id,
                                                    }),
                                                }),
                                                [
                                                    2,
                                                    this.isContainer
                                                        ? this.containerMetaData
                                                        : this.pluginMetaData,
                                                ]
                                            );
                                    }
                                });
                            });
                        }),
                        (this.pluginMetaData.meta.id = t);
                };
                (e.RTEPlugin = i),
                    (e.rtePluginInitializer = function (t, e) {
                        if (!t || !e)
                            throw Error(
                                'Please provide value "id" and "configCallback"'
                            );
                        return new i(t, e);
                    });
            },
            975: function (t, e, n) {
                "use strict";
                var r =
                        (this && this.__createBinding) ||
                        (Object.create
                            ? function (t, e, n, r) {
                                  void 0 === r && (r = n),
                                      Object.defineProperty(t, r, {
                                          enumerable: !0,
                                          get: function () {
                                              return e[n];
                                          },
                                      });
                              }
                            : function (t, e, n, r) {
                                  void 0 === r && (r = n), (t[r] = e[n]);
                              }),
                    o =
                        (this && this.__setModuleDefault) ||
                        (Object.create
                            ? function (t, e) {
                                  Object.defineProperty(t, "default", {
                                      enumerable: !0,
                                      value: e,
                                  });
                              }
                            : function (t, e) {
                                  t.default = e;
                              }),
                    i =
                        (this && this.__importStar) ||
                        function (t) {
                            if (t && t.__esModule) return t;
                            var e = {};
                            if (null != t)
                                for (var n in t)
                                    "default" !== n &&
                                        Object.prototype.hasOwnProperty.call(
                                            t,
                                            n
                                        ) &&
                                        r(e, t, n);
                            return o(e, t), e;
                        },
                    a =
                        (this && this.__awaiter) ||
                        function (t, e, n, r) {
                            return new (n || (n = Promise))(function (o, i) {
                                function a(t) {
                                    try {
                                        u(r.next(t));
                                    } catch (t) {
                                        i(t);
                                    }
                                }
                                function s(t) {
                                    try {
                                        u(r.throw(t));
                                    } catch (t) {
                                        i(t);
                                    }
                                }
                                function u(t) {
                                    var e;
                                    t.done
                                        ? o(t.value)
                                        : ((e = t.value),
                                          e instanceof n
                                              ? e
                                              : new n(function (t) {
                                                    t(e);
                                                })).then(a, s);
                                }
                                u((r = r.apply(t, e || [])).next());
                            });
                        },
                    s =
                        (this && this.__generator) ||
                        function (t, e) {
                            var n,
                                r,
                                o,
                                i,
                                a = {
                                    label: 0,
                                    sent: function () {
                                        if (1 & o[0]) throw o[1];
                                        return o[1];
                                    },
                                    trys: [],
                                    ops: [],
                                };
                            return (
                                (i = { next: s(0), throw: s(1), return: s(2) }),
                                "function" == typeof Symbol &&
                                    (i[Symbol.iterator] = function () {
                                        return this;
                                    }),
                                i
                            );
                            function s(i) {
                                return function (s) {
                                    return (function (i) {
                                        if (n)
                                            throw new TypeError(
                                                "Generator is already executing."
                                            );
                                        for (; a; )
                                            try {
                                                if (
                                                    ((n = 1),
                                                    r &&
                                                        (o =
                                                            2 & i[0]
                                                                ? r.return
                                                                : i[0]
                                                                ? r.throw ||
                                                                  ((o =
                                                                      r.return) &&
                                                                      o.call(r),
                                                                  0)
                                                                : r.next) &&
                                                        !(o = o.call(r, i[1]))
                                                            .done)
                                                )
                                                    return o;
                                                switch (
                                                    ((r = 0),
                                                    o &&
                                                        (i = [
                                                            2 & i[0],
                                                            o.value,
                                                        ]),
                                                    i[0])
                                                ) {
                                                    case 0:
                                                    case 1:
                                                        o = i;
                                                        break;
                                                    case 4:
                                                        return (
                                                            a.label++,
                                                            {
                                                                value: i[1],
                                                                done: !1,
                                                            }
                                                        );
                                                    case 5:
                                                        a.label++,
                                                            (r = i[1]),
                                                            (i = [0]);
                                                        continue;
                                                    case 7:
                                                        (i = a.ops.pop()),
                                                            a.trys.pop();
                                                        continue;
                                                    default:
                                                        if (
                                                            !(
                                                                (o =
                                                                    (o = a.trys)
                                                                        .length >
                                                                        0 &&
                                                                    o[
                                                                        o.length -
                                                                            1
                                                                    ]) ||
                                                                (6 !== i[0] &&
                                                                    2 !== i[0])
                                                            )
                                                        ) {
                                                            a = 0;
                                                            continue;
                                                        }
                                                        if (
                                                            3 === i[0] &&
                                                            (!o ||
                                                                (i[1] > o[0] &&
                                                                    i[1] <
                                                                        o[3]))
                                                        ) {
                                                            a.label = i[1];
                                                            break;
                                                        }
                                                        if (
                                                            6 === i[0] &&
                                                            a.label < o[1]
                                                        ) {
                                                            (a.label = o[1]),
                                                                (o = i);
                                                            break;
                                                        }
                                                        if (
                                                            o &&
                                                            a.label < o[2]
                                                        ) {
                                                            (a.label = o[2]),
                                                                a.ops.push(i);
                                                            break;
                                                        }
                                                        o[2] && a.ops.pop(),
                                                            a.trys.pop();
                                                        continue;
                                                }
                                                i = e.call(t, a);
                                            } catch (t) {
                                                (i = [6, t]), (r = 0);
                                            } finally {
                                                n = o = 0;
                                            }
                                        if (5 & i[0]) throw i[1];
                                        return {
                                            value: i[0] ? i[1] : void 0,
                                            done: !0,
                                        };
                                    })([i, s]);
                                };
                            }
                        },
                    u =
                        (this && this.__importDefault) ||
                        function (t) {
                            return t && t.__esModule ? t : { default: t };
                        };
                Object.defineProperty(e, "__esModule", { value: !0 }),
                    (e.AppConfig = void 0);
                var c = u(n(931)),
                    l = i(n(194)),
                    f = n(974),
                    d = (function () {
                        function t(t, e, n, r) {
                            var o = this;
                            (this.stack = function () {
                                return new c.default(
                                    o._data.stack,
                                    o._connection,
                                    {
                                        currentBranch:
                                            o._additionalData.currentBranch,
                                    }
                                );
                            }),
                                (this.setInstallationData = function (t) {
                                    return o._connection
                                        .sendToParent("setInstallationData", t)
                                        .then(f.onData)
                                        .catch(f.onError);
                                }),
                                (this.getInstallationData = function () {
                                    return o._connection
                                        .sendToParent("getInstallationData")
                                        .then(f.onData)
                                        .catch(f.onError);
                                }),
                                (this._data = t),
                                (this._connection = e),
                                (this._emitter = n),
                                (this.setValidity =
                                    this.setValidity.bind(this)),
                                (this._additionalData = r);
                        }
                        return (
                            (t.prototype.setValidity = function (t, e) {
                                return a(this, void 0, void 0, function () {
                                    return s(this, function (n) {
                                        switch (n.label) {
                                            case 0:
                                                if ("boolean" != typeof t)
                                                    throw new TypeError(
                                                        (0, l.default)(
                                                            l.ERROR_MESSAGES
                                                                .configPage
                                                                .setValidity
                                                                .isValidTypeBoolean
                                                        )
                                                    );
                                                if (
                                                    (null == e
                                                        ? void 0
                                                        : e.message) &&
                                                    "string" != typeof e.message
                                                )
                                                    throw new TypeError(
                                                        (0, l.default)(
                                                            l.ERROR_MESSAGES
                                                                .configPage
                                                                .setValidity
                                                                .messageTypeString
                                                        )
                                                    );
                                                return [
                                                    4,
                                                    this._connection
                                                        .sendToParent(
                                                            "setValidity",
                                                            {
                                                                isValid: t,
                                                                options: e,
                                                            }
                                                        )
                                                        .then(f.onData)
                                                        .catch(f.onError),
                                                ];
                                            case 1:
                                                return n.sent(), [2];
                                        }
                                    });
                                });
                            }),
                            t
                        );
                    })();
                e.AppConfig = d;
            },
            419: function (t, e, n) {
                "use strict";
                var r =
                    (this && this.__importDefault) ||
                    function (t) {
                        return t && t.__esModule ? t : { default: t };
                    };
                Object.defineProperty(e, "__esModule", { value: !0 });
                var o = r(n(940)),
                    i = (function () {
                        function t(t, e, n, r) {
                            (this.content_type = t.content_type),
                                (this._data = t.entry),
                                t.changedData &&
                                    (this._changedData = t.changedData),
                                (this.locale = t.locale),
                                (this._connection = e),
                                (this._emitter = n),
                                (this._options = r || {});
                            var o = this;
                            this._emitter.on("entrySave", function (t) {
                                o._data = t.data;
                            }),
                                this._emitter.on("entryChange", function (t) {
                                    o._changedData = t.data;
                                });
                        }
                        return (
                            (t.prototype.getData = function () {
                                return this._data;
                            }),
                            (t.prototype.getField = function (t, e) {
                                var n = (e || {}).useUnsavedSchema,
                                    r = void 0 !== n && n,
                                    i = (this._options._internalFlags || {})
                                        .FieldInstance,
                                    a = void 0 === i ? o.default : i,
                                    s = t.split("."),
                                    u = (r && this._changedData) || this._data,
                                    c = this.content_type.schema;
                                if (0 === Object.keys(u).length)
                                    throw new Error(
                                        "The data is unsaved. Save the data before requesting the field."
                                    );
                                try {
                                    var l = !1,
                                        f = !1;
                                    s.forEach(function (t, e) {
                                        if (l) f ? (f = !1) : (l = !1);
                                        else {
                                            if (
                                                !(c = c.find(function (e) {
                                                    return e.uid === t;
                                                }))
                                            )
                                                throw Error("schema not found");
                                            if (
                                                ((u = u[t]),
                                                ("group" !== c.data_type &&
                                                    "global_field" !==
                                                        c.data_type) ||
                                                    !1 !== c.multiple ||
                                                    s.length === e + 1)
                                            )
                                                if (
                                                    ("group" !== c.data_type &&
                                                        "global_field" !==
                                                            c.data_type) ||
                                                    !0 !== c.multiple ||
                                                    s.length === e + 1
                                                ) {
                                                    if (
                                                        "blocks" ===
                                                            c.data_type &&
                                                        s.length !== e + 1
                                                    ) {
                                                        var n = Object.keys(
                                                            u[s[e + 1]]
                                                        )[0];
                                                        (c = c.blocks.find(
                                                            function (t) {
                                                                return (
                                                                    t.uid === n
                                                                );
                                                            }
                                                        )),
                                                            s.length === e + 2
                                                                ? (u =
                                                                      u[
                                                                          s[
                                                                              e +
                                                                                  1
                                                                          ]
                                                                      ])
                                                                : ((u =
                                                                      u[
                                                                          s[
                                                                              e +
                                                                                  1
                                                                          ]
                                                                      ][n]),
                                                                  (c =
                                                                      c.schema)),
                                                            (l = !0),
                                                            (f = !0);
                                                    }
                                                } else
                                                    (c = c.schema),
                                                        (u = u[s[e + 1]]),
                                                        (l = !0);
                                            else c = c.schema;
                                        }
                                    });
                                } catch (t) {
                                    throw Error("Invalid uid, Field not found");
                                }
                                var d = new a(
                                    {
                                        uid: t,
                                        value: u,
                                        schema: c,
                                        data_type: c.data_type,
                                    },
                                    this._connection,
                                    this._emitter
                                );
                                return delete d.onChange, d;
                            }),
                            (t.prototype.onSave = function (t) {
                                if (!t || "function" != typeof t)
                                    throw Error("Callback must be a function");
                                this._emitter.on("entrySave", function (e) {
                                    t(e.data);
                                });
                            }),
                            (t.prototype.onChange = function (t) {
                                if (!t || "function" != typeof t)
                                    throw Error("Callback must be a function");
                                this._emitter.on("entryChange", function (e) {
                                    t(e.data, e.resolvedData);
                                });
                            }),
                            (t.prototype.onPublish = function (t) {
                                if (!t || "function" != typeof t)
                                    throw Error("Callback must be a function");
                                this._emitter.on("entryPublish", function (e) {
                                    t(e.data);
                                });
                            }),
                            (t.prototype.onUnPublish = function (t) {
                                if (!t || "function" != typeof t)
                                    throw Error("Callback must be a function");
                                this._emitter.on(
                                    "entryUnPublish",
                                    function (e) {
                                        t(e.data);
                                    }
                                );
                            }),
                            t
                        );
                    })();
                e.default = i;
            },
            112: function (t, e, n) {
                "use strict";
                var r =
                        (this && this.__createBinding) ||
                        (Object.create
                            ? function (t, e, n, r) {
                                  void 0 === r && (r = n),
                                      Object.defineProperty(t, r, {
                                          enumerable: !0,
                                          get: function () {
                                              return e[n];
                                          },
                                      });
                              }
                            : function (t, e, n, r) {
                                  void 0 === r && (r = n), (t[r] = e[n]);
                              }),
                    o =
                        (this && this.__setModuleDefault) ||
                        (Object.create
                            ? function (t, e) {
                                  Object.defineProperty(t, "default", {
                                      enumerable: !0,
                                      value: e,
                                  });
                              }
                            : function (t, e) {
                                  t.default = e;
                              }),
                    i =
                        (this && this.__importStar) ||
                        function (t) {
                            if (t && t.__esModule) return t;
                            var e = {};
                            if (null != t)
                                for (var n in t)
                                    "default" !== n &&
                                        Object.prototype.hasOwnProperty.call(
                                            t,
                                            n
                                        ) &&
                                        r(e, t, n);
                            return o(e, t), e;
                        },
                    a =
                        (this && this.__awaiter) ||
                        function (t, e, n, r) {
                            return new (n || (n = Promise))(function (o, i) {
                                function a(t) {
                                    try {
                                        u(r.next(t));
                                    } catch (t) {
                                        i(t);
                                    }
                                }
                                function s(t) {
                                    try {
                                        u(r.throw(t));
                                    } catch (t) {
                                        i(t);
                                    }
                                }
                                function u(t) {
                                    var e;
                                    t.done
                                        ? o(t.value)
                                        : ((e = t.value),
                                          e instanceof n
                                              ? e
                                              : new n(function (t) {
                                                    t(e);
                                                })).then(a, s);
                                }
                                u((r = r.apply(t, e || [])).next());
                            });
                        },
                    s =
                        (this && this.__generator) ||
                        function (t, e) {
                            var n,
                                r,
                                o,
                                i,
                                a = {
                                    label: 0,
                                    sent: function () {
                                        if (1 & o[0]) throw o[1];
                                        return o[1];
                                    },
                                    trys: [],
                                    ops: [],
                                };
                            return (
                                (i = { next: s(0), throw: s(1), return: s(2) }),
                                "function" == typeof Symbol &&
                                    (i[Symbol.iterator] = function () {
                                        return this;
                                    }),
                                i
                            );
                            function s(i) {
                                return function (s) {
                                    return (function (i) {
                                        if (n)
                                            throw new TypeError(
                                                "Generator is already executing."
                                            );
                                        for (; a; )
                                            try {
                                                if (
                                                    ((n = 1),
                                                    r &&
                                                        (o =
                                                            2 & i[0]
                                                                ? r.return
                                                                : i[0]
                                                                ? r.throw ||
                                                                  ((o =
                                                                      r.return) &&
                                                                      o.call(r),
                                                                  0)
                                                                : r.next) &&
                                                        !(o = o.call(r, i[1]))
                                                            .done)
                                                )
                                                    return o;
                                                switch (
                                                    ((r = 0),
                                                    o &&
                                                        (i = [
                                                            2 & i[0],
                                                            o.value,
                                                        ]),
                                                    i[0])
                                                ) {
                                                    case 0:
                                                    case 1:
                                                        o = i;
                                                        break;
                                                    case 4:
                                                        return (
                                                            a.label++,
                                                            {
                                                                value: i[1],
                                                                done: !1,
                                                            }
                                                        );
                                                    case 5:
                                                        a.label++,
                                                            (r = i[1]),
                                                            (i = [0]);
                                                        continue;
                                                    case 7:
                                                        (i = a.ops.pop()),
                                                            a.trys.pop();
                                                        continue;
                                                    default:
                                                        if (
                                                            !(
                                                                (o =
                                                                    (o = a.trys)
                                                                        .length >
                                                                        0 &&
                                                                    o[
                                                                        o.length -
                                                                            1
                                                                    ]) ||
                                                                (6 !== i[0] &&
                                                                    2 !== i[0])
                                                            )
                                                        ) {
                                                            a = 0;
                                                            continue;
                                                        }
                                                        if (
                                                            3 === i[0] &&
                                                            (!o ||
                                                                (i[1] > o[0] &&
                                                                    i[1] <
                                                                        o[3]))
                                                        ) {
                                                            a.label = i[1];
                                                            break;
                                                        }
                                                        if (
                                                            6 === i[0] &&
                                                            a.label < o[1]
                                                        ) {
                                                            (a.label = o[1]),
                                                                (o = i);
                                                            break;
                                                        }
                                                        if (
                                                            o &&
                                                            a.label < o[2]
                                                        ) {
                                                            (a.label = o[2]),
                                                                a.ops.push(i);
                                                            break;
                                                        }
                                                        o[2] && a.ops.pop(),
                                                            a.trys.pop();
                                                        continue;
                                                }
                                                i = e.call(t, a);
                                            } catch (t) {
                                                (i = [6, t]), (r = 0);
                                            } finally {
                                                n = o = 0;
                                            }
                                        if (5 & i[0]) throw i[1];
                                        return {
                                            value: i[0] ? i[1] : void 0,
                                            done: !0,
                                        };
                                    })([i, s]);
                                };
                            }
                        },
                    u =
                        (this && this.__importDefault) ||
                        function (t) {
                            return t && t.__esModule ? t : { default: t };
                        };
                Object.defineProperty(e, "__esModule", { value: !0 });
                var c = u(n(727)),
                    l = u(n(795)),
                    f = u(n(979)),
                    d = n(975),
                    h = u(n(419)),
                    p = u(n(940)),
                    y = u(n(632)),
                    v = u(n(915)),
                    _ = u(n(663)),
                    w = u(n(65)),
                    m = u(n(799)),
                    g = u(n(931)),
                    b = u(n(923)),
                    E = n(699),
                    O = n(974),
                    P = u(n(362)),
                    S = new l.default(),
                    T = (function () {
                        function t(t) {
                            var e,
                                r,
                                o = this;
                            (this.pulse = function (t, e) {
                                o.postRobot.sendToParent("analytics", {
                                    eventName: t,
                                    metadata: e,
                                });
                            }),
                                (this.getConfig = function () {
                                    return o.installationUID
                                        ? o.postRobot
                                              .sendToParent("getConfig")
                                              .then(O.onData)
                                              .catch(O.onError)
                                        : Promise.resolve(o.config);
                                }),
                                (this.getCurrentLocation = function () {
                                    return o.type;
                                }),
                                (this.getAppVersion = function () {
                                    return a(o, void 0, void 0, function () {
                                        var t, e, n;
                                        return s(this, function (r) {
                                            switch (r.label) {
                                                case 0:
                                                    return this.version
                                                        ? [
                                                              2,
                                                              Promise.resolve(
                                                                  this.version
                                                              ),
                                                          ]
                                                        : this.installationUID
                                                        ? ((t =
                                                              this.stack._data
                                                                  .org_uid),
                                                          (e = {
                                                              uid: this
                                                                  .installationUID,
                                                              action: "getAppManifest",
                                                              headers: {
                                                                  organization_uid:
                                                                      t,
                                                              },
                                                              skip_api_key: !0,
                                                          }),
                                                          [
                                                              4,
                                                              this.postRobot
                                                                  .sendToParent(
                                                                      "stackQuery",
                                                                      e
                                                                  )
                                                                  .then(
                                                                      O.onData
                                                                  )
                                                                  .catch(
                                                                      O.onError
                                                                  ),
                                                          ])
                                                        : [
                                                              2,
                                                              Promise.resolve(
                                                                  null
                                                              ),
                                                          ];
                                                case 1:
                                                    return (
                                                        (n = r.sent()),
                                                        (this.version =
                                                            n.version),
                                                        [2, this.version]
                                                    );
                                            }
                                        });
                                    });
                                }),
                                (this.getCurrentRegion = function () {
                                    return o.region;
                                });
                            var u = t;
                            (this.postRobot = c.default),
                                (this.appUID = u.app_id),
                                (this.locationUID = u.extension_uid),
                                (this.installationUID = u.installation_uid),
                                (this.currentUser = u.user),
                                (this.type = u.type),
                                (this.store = new b.default(c.default)),
                                (this.stack = new g.default(
                                    u.stack,
                                    c.default,
                                    { currentBranch: u.currentBranch }
                                )),
                                (this.metadata = new w.default(c.default)),
                                (this.config =
                                    null !== (e = u.config) && void 0 !== e
                                        ? e
                                        : {}),
                                (this.location = {
                                    DashboardWidget: null,
                                    CustomField: null,
                                    SidebarWidget: null,
                                    RTEPlugin: null,
                                    AppConfigWidget: null,
                                    AssetSidebarWidget: null,
                                    FullPage: null,
                                    FieldModifierLocation: null,
                                }),
                                (window.postRobot = c.default),
                                (this.modal = new m.default()),
                                (this.region = (0, O.formatAppRegion)(
                                    u.region
                                ));
                            var l = new g.default(u.stack, c.default, {
                                currentBranch: u.currentBranch,
                            });
                            switch (
                                ((this.version =
                                    (null === (r = u.manifest) || void 0 === r
                                        ? void 0
                                        : r.version) || null),
                                u.type)
                            ) {
                                case E.LocationType.DASHBOARD:
                                    this.location.DashboardWidget = {
                                        frame: new P.default(
                                            c.default,
                                            this.type,
                                            S,
                                            u.dashboard_width
                                        ),
                                        stack: new g.default(
                                            u.stack,
                                            c.default,
                                            { currentBranch: u.currentBranch }
                                        ),
                                    };
                                    break;
                                case E.LocationType.WIDGET:
                                    this.location.SidebarWidget = {
                                        entry: new h.default(u, c.default, S),
                                        stack: new g.default(
                                            u.stack,
                                            c.default,
                                            { currentBranch: u.currentBranch }
                                        ),
                                    };
                                    break;
                                case E.LocationType.APP_CONFIG_WIDGET:
                                    this.location.AppConfigWidget = {
                                        installation: new d.AppConfig(
                                            u,
                                            c.default,
                                            S,
                                            { currentBranch: u.currentBranch }
                                        ),
                                        stack: new g.default(
                                            u.stack,
                                            c.default,
                                            { currentBranch: u.currentBranch }
                                        ),
                                    };
                                    break;
                                case E.LocationType.ASSET_SIDEBAR_WIDGET:
                                    this.location.AssetSidebarWidget =
                                        new f.default(u, c.default, S);
                                    break;
                                case E.LocationType.RTE:
                                    Promise.resolve()
                                        .then(function () {
                                            return i(n(34));
                                        })
                                        .then(function (t) {
                                            var e = t.rtePluginInitializer;
                                            o.location.RTEPlugin = e;
                                        });
                                    break;
                                case E.LocationType.FIELD_MODIFIER_LOCATION:
                                    (u.self = !0),
                                        (this.location.FieldModifierLocation = {
                                            entry: new y.default(
                                                u,
                                                c.default,
                                                S
                                            ),
                                            stack: new g.default(
                                                u.stack,
                                                c.default,
                                                {
                                                    currentBranch:
                                                        u.currentBranch,
                                                }
                                            ),
                                            field: new v.default(
                                                u,
                                                c.default,
                                                S
                                            ),
                                            frame: new _.default(c.default, S),
                                        });
                                    break;
                                case E.LocationType.FULL_PAGE_LOCATION:
                                    this.location.FullPage = { stack: l };
                                    break;
                                case E.LocationType.FIELD:
                                default:
                                    (u.self = !0),
                                        (this.location.CustomField = {
                                            field: new p.default(
                                                u,
                                                c.default,
                                                S
                                            ),
                                            fieldConfig: u.field_config,
                                            entry: new h.default(
                                                u,
                                                c.default,
                                                S
                                            ),
                                            stack: new g.default(
                                                u.stack,
                                                c.default,
                                                {
                                                    currentBranch:
                                                        u.currentBranch,
                                                }
                                            ),
                                            frame: new P.default(
                                                c.default,
                                                this.type,
                                                S
                                            ),
                                        });
                            }
                            try {
                                c.default.on("extensionEvent", function (t) {
                                    return a(o, void 0, void 0, function () {
                                        return s(this, function (e) {
                                            return (
                                                "entrySave" === t.data.name &&
                                                    (S.emitEvent("entrySave", [
                                                        { data: t.data.data },
                                                    ]),
                                                    S.emitEvent(
                                                        "updateFields",
                                                        [{ data: t.data.data }]
                                                    )),
                                                "entryChange" === t.data.name &&
                                                    S.emitEvent("entryChange", [
                                                        {
                                                            data: t.data.data,
                                                            resolvedData:
                                                                t.data.otherData
                                                                    .resolvedData,
                                                        },
                                                    ]),
                                                "entryPublish" ===
                                                    t.data.name &&
                                                    S.emitEvent(
                                                        "entryPublish",
                                                        [{ data: t.data.data }]
                                                    ),
                                                "entryUnPublish" ===
                                                    t.data.name &&
                                                    S.emitEvent(
                                                        "entryUnPublish",
                                                        [{ data: t.data.data }]
                                                    ),
                                                "assetSave" === t.data.name &&
                                                    (S.emitEvent("assetSave", [
                                                        { data: t.data.data },
                                                    ]),
                                                    S.emitEvent(
                                                        "updateFields",
                                                        [{ data: t.data.data }]
                                                    )),
                                                "assetChange" === t.data.name &&
                                                    S.emitEvent("assetChange", [
                                                        { data: t.data.data },
                                                    ]),
                                                "assetPublish" ===
                                                    t.data.name &&
                                                    S.emitEvent(
                                                        "assetPublish",
                                                        [{ data: t.data.data }]
                                                    ),
                                                "assetUnPublish" ===
                                                    t.data.name &&
                                                    S.emitEvent(
                                                        "assetUnPublish",
                                                        [{ data: t.data.data }]
                                                    ),
                                                "dashboardResize" ===
                                                    t.data.name &&
                                                    S.emitEvent(
                                                        "dashboardResize",
                                                        [
                                                            {
                                                                state: t.data
                                                                    .state,
                                                            },
                                                        ]
                                                    ),
                                                "extensionFieldChange" ===
                                                    t.data.name &&
                                                    S.emitEvent(
                                                        "extensionFieldChange",
                                                        [{ data: t.data.data }]
                                                    ),
                                                [2]
                                            );
                                        });
                                    });
                                });
                            } catch (t) {
                                console.error("extension Event", t);
                            }
                        }
                        return (
                            (t.initialize = function (t) {
                                return a(this, void 0, void 0, function () {
                                    var e;
                                    return s(this, function (n) {
                                        switch (n.label) {
                                            case 0:
                                                return (
                                                    (e = {
                                                        sdkType: "app-sdk",
                                                    }),
                                                    [
                                                        4,
                                                        c.default.sendToParent(
                                                            "init",
                                                            {
                                                                version: t,
                                                                meta: e,
                                                            }
                                                        ),
                                                    ]
                                                );
                                            case 1:
                                                return [2, n.sent().data];
                                        }
                                    });
                                });
                            }),
                            (t.prototype.setReady = function () {
                                return this.postRobot.sendToParent("ready");
                            }),
                            t
                        );
                    })();
                e.default = T;
            },
            940: function (t, e) {
                "use strict";
                var n =
                        (this && this.__awaiter) ||
                        function (t, e, n, r) {
                            return new (n || (n = Promise))(function (o, i) {
                                function a(t) {
                                    try {
                                        u(r.next(t));
                                    } catch (t) {
                                        i(t);
                                    }
                                }
                                function s(t) {
                                    try {
                                        u(r.throw(t));
                                    } catch (t) {
                                        i(t);
                                    }
                                }
                                function u(t) {
                                    var e;
                                    t.done
                                        ? o(t.value)
                                        : ((e = t.value),
                                          e instanceof n
                                              ? e
                                              : new n(function (t) {
                                                    t(e);
                                                })).then(a, s);
                                }
                                u((r = r.apply(t, e || [])).next());
                            });
                        },
                    r =
                        (this && this.__generator) ||
                        function (t, e) {
                            var n,
                                r,
                                o,
                                i,
                                a = {
                                    label: 0,
                                    sent: function () {
                                        if (1 & o[0]) throw o[1];
                                        return o[1];
                                    },
                                    trys: [],
                                    ops: [],
                                };
                            return (
                                (i = { next: s(0), throw: s(1), return: s(2) }),
                                "function" == typeof Symbol &&
                                    (i[Symbol.iterator] = function () {
                                        return this;
                                    }),
                                i
                            );
                            function s(i) {
                                return function (s) {
                                    return (function (i) {
                                        if (n)
                                            throw new TypeError(
                                                "Generator is already executing."
                                            );
                                        for (; a; )
                                            try {
                                                if (
                                                    ((n = 1),
                                                    r &&
                                                        (o =
                                                            2 & i[0]
                                                                ? r.return
                                                                : i[0]
                                                                ? r.throw ||
                                                                  ((o =
                                                                      r.return) &&
                                                                      o.call(r),
                                                                  0)
                                                                : r.next) &&
                                                        !(o = o.call(r, i[1]))
                                                            .done)
                                                )
                                                    return o;
                                                switch (
                                                    ((r = 0),
                                                    o &&
                                                        (i = [
                                                            2 & i[0],
                                                            o.value,
                                                        ]),
                                                    i[0])
                                                ) {
                                                    case 0:
                                                    case 1:
                                                        o = i;
                                                        break;
                                                    case 4:
                                                        return (
                                                            a.label++,
                                                            {
                                                                value: i[1],
                                                                done: !1,
                                                            }
                                                        );
                                                    case 5:
                                                        a.label++,
                                                            (r = i[1]),
                                                            (i = [0]);
                                                        continue;
                                                    case 7:
                                                        (i = a.ops.pop()),
                                                            a.trys.pop();
                                                        continue;
                                                    default:
                                                        if (
                                                            !(
                                                                (o =
                                                                    (o = a.trys)
                                                                        .length >
                                                                        0 &&
                                                                    o[
                                                                        o.length -
                                                                            1
                                                                    ]) ||
                                                                (6 !== i[0] &&
                                                                    2 !== i[0])
                                                            )
                                                        ) {
                                                            a = 0;
                                                            continue;
                                                        }
                                                        if (
                                                            3 === i[0] &&
                                                            (!o ||
                                                                (i[1] > o[0] &&
                                                                    i[1] <
                                                                        o[3]))
                                                        ) {
                                                            a.label = i[1];
                                                            break;
                                                        }
                                                        if (
                                                            6 === i[0] &&
                                                            a.label < o[1]
                                                        ) {
                                                            (a.label = o[1]),
                                                                (o = i);
                                                            break;
                                                        }
                                                        if (
                                                            o &&
                                                            a.label < o[2]
                                                        ) {
                                                            (a.label = o[2]),
                                                                a.ops.push(i);
                                                            break;
                                                        }
                                                        o[2] && a.ops.pop(),
                                                            a.trys.pop();
                                                        continue;
                                                }
                                                i = e.call(t, a);
                                            } catch (t) {
                                                (i = [6, t]), (r = 0);
                                            } finally {
                                                n = o = 0;
                                            }
                                        if (5 & i[0]) throw i[1];
                                        return {
                                            value: i[0] ? i[1] : void 0,
                                            done: !0,
                                        };
                                    })([i, s]);
                                };
                            }
                        };
                Object.defineProperty(e, "__esModule", { value: !0 });
                var o = [
                        "file",
                        "reference",
                        "blocks",
                        "group",
                        "global_field",
                    ],
                    i = (function () {
                        function t(t, e, n) {
                            (this.uid = t.uid),
                                (this.data_type = t.schema.data_type),
                                (this.schema = t.schema),
                                (this._emitter = n);
                            var r,
                                o,
                                i,
                                a,
                                s =
                                    ((r = this),
                                    (i = o = t.value),
                                    (a = o),
                                    "file" === r.data_type &&
                                        (o
                                            ? ((i = o),
                                              (a =
                                                  !0 === r.schema.multiple
                                                      ? o.map(function (t) {
                                                            return t.uid;
                                                        })
                                                      : o.uid))
                                            : !0 === r.schema.multiple &&
                                              ((i = []), (a = []))),
                                    { resolvedData: i, unResolvedData: a });
                            (this._data = s.unResolvedData),
                                (this._resolvedData = s.resolvedData),
                                (this._connection = e),
                                (this._self = t.self || !1);
                            var u = this;
                            n.on("updateFields", function (t) {
                                var e = u.uid.split("."),
                                    n = t.data;
                                e.forEach(function (t) {
                                    n && (n = n[t]);
                                }),
                                    u._data !== n && (u._data = n);
                            });
                        }
                        return (
                            (t.prototype.setData = function (t) {
                                var e = this,
                                    n = this,
                                    r = { data: t, uid: n.uid, self: n._self };
                                return n._self ||
                                    (-1 === o.indexOf(n.data_type) &&
                                        n.data_type)
                                    ? this._connection
                                          .sendToParent("setData", r)
                                          .then(function () {
                                              return (
                                                  (e._data = t),
                                                  Promise.resolve(n)
                                              );
                                          })
                                          .catch(function (t) {
                                              return Promise.reject(t);
                                          })
                                    : Promise.reject(
                                          new Error(
                                              "Cannot call set data for current field type"
                                          )
                                      );
                            }),
                            (t.prototype.getData = function (t) {
                                var e = (void 0 === t ? {} : t).resolved;
                                return void 0 !== e && e
                                    ? this._resolvedData
                                    : this._data;
                            }),
                            (t.prototype.setFocus = function () {
                                return n(this, void 0, void 0, function () {
                                    return r(this, function (t) {
                                        switch (t.label) {
                                            case 0:
                                                return [
                                                    4,
                                                    this._connection.sendToParent(
                                                        "focus"
                                                    ),
                                                ];
                                            case 1:
                                                return t.sent(), [2];
                                        }
                                    });
                                });
                            }),
                            (t.prototype.onChange = function (t) {
                                var e = this;
                                if (!t || "function" != typeof t)
                                    throw Error("Callback must be a function");
                                this._emitter.on(
                                    "extensionFieldChange",
                                    function (n) {
                                        (e._data = n.data),
                                            (e._resolvedData = n.data),
                                            t(n.data);
                                    }
                                );
                            }),
                            t
                        );
                    })();
                e.default = i;
            },
            632: function (t, e, n) {
                "use strict";
                var r,
                    o =
                        (this && this.__extends) ||
                        ((r = function (t, e) {
                            return (
                                (r =
                                    Object.setPrototypeOf ||
                                    ({ __proto__: [] } instanceof Array &&
                                        function (t, e) {
                                            t.__proto__ = e;
                                        }) ||
                                    function (t, e) {
                                        for (var n in e)
                                            Object.prototype.hasOwnProperty.call(
                                                e,
                                                n
                                            ) && (t[n] = e[n]);
                                    }),
                                r(t, e)
                            );
                        }),
                        function (t, e) {
                            if ("function" != typeof e && null !== e)
                                throw new TypeError(
                                    "Class extends value " +
                                        String(e) +
                                        " is not a constructor or null"
                                );
                            function n() {
                                this.constructor = t;
                            }
                            r(t, e),
                                (t.prototype =
                                    null === e
                                        ? Object.create(e)
                                        : ((n.prototype = e.prototype),
                                          new n()));
                        }),
                    i =
                        (this && this.__createBinding) ||
                        (Object.create
                            ? function (t, e, n, r) {
                                  void 0 === r && (r = n),
                                      Object.defineProperty(t, r, {
                                          enumerable: !0,
                                          get: function () {
                                              return e[n];
                                          },
                                      });
                              }
                            : function (t, e, n, r) {
                                  void 0 === r && (r = n), (t[r] = e[n]);
                              }),
                    a =
                        (this && this.__setModuleDefault) ||
                        (Object.create
                            ? function (t, e) {
                                  Object.defineProperty(t, "default", {
                                      enumerable: !0,
                                      value: e,
                                  });
                              }
                            : function (t, e) {
                                  t.default = e;
                              }),
                    s =
                        (this && this.__importStar) ||
                        function (t) {
                            if (t && t.__esModule) return t;
                            var e = {};
                            if (null != t)
                                for (var n in t)
                                    "default" !== n &&
                                        Object.prototype.hasOwnProperty.call(
                                            t,
                                            n
                                        ) &&
                                        i(e, t, n);
                            return a(e, t), e;
                        },
                    u =
                        (this && this.__awaiter) ||
                        function (t, e, n, r) {
                            return new (n || (n = Promise))(function (o, i) {
                                function a(t) {
                                    try {
                                        u(r.next(t));
                                    } catch (t) {
                                        i(t);
                                    }
                                }
                                function s(t) {
                                    try {
                                        u(r.throw(t));
                                    } catch (t) {
                                        i(t);
                                    }
                                }
                                function u(t) {
                                    var e;
                                    t.done
                                        ? o(t.value)
                                        : ((e = t.value),
                                          e instanceof n
                                              ? e
                                              : new n(function (t) {
                                                    t(e);
                                                })).then(a, s);
                                }
                                u((r = r.apply(t, e || [])).next());
                            });
                        },
                    c =
                        (this && this.__generator) ||
                        function (t, e) {
                            var n,
                                r,
                                o,
                                i,
                                a = {
                                    label: 0,
                                    sent: function () {
                                        if (1 & o[0]) throw o[1];
                                        return o[1];
                                    },
                                    trys: [],
                                    ops: [],
                                };
                            return (
                                (i = { next: s(0), throw: s(1), return: s(2) }),
                                "function" == typeof Symbol &&
                                    (i[Symbol.iterator] = function () {
                                        return this;
                                    }),
                                i
                            );
                            function s(i) {
                                return function (s) {
                                    return (function (i) {
                                        if (n)
                                            throw new TypeError(
                                                "Generator is already executing."
                                            );
                                        for (; a; )
                                            try {
                                                if (
                                                    ((n = 1),
                                                    r &&
                                                        (o =
                                                            2 & i[0]
                                                                ? r.return
                                                                : i[0]
                                                                ? r.throw ||
                                                                  ((o =
                                                                      r.return) &&
                                                                      o.call(r),
                                                                  0)
                                                                : r.next) &&
                                                        !(o = o.call(r, i[1]))
                                                            .done)
                                                )
                                                    return o;
                                                switch (
                                                    ((r = 0),
                                                    o &&
                                                        (i = [
                                                            2 & i[0],
                                                            o.value,
                                                        ]),
                                                    i[0])
                                                ) {
                                                    case 0:
                                                    case 1:
                                                        o = i;
                                                        break;
                                                    case 4:
                                                        return (
                                                            a.label++,
                                                            {
                                                                value: i[1],
                                                                done: !1,
                                                            }
                                                        );
                                                    case 5:
                                                        a.label++,
                                                            (r = i[1]),
                                                            (i = [0]);
                                                        continue;
                                                    case 7:
                                                        (i = a.ops.pop()),
                                                            a.trys.pop();
                                                        continue;
                                                    default:
                                                        if (
                                                            !(
                                                                (o =
                                                                    (o = a.trys)
                                                                        .length >
                                                                        0 &&
                                                                    o[
                                                                        o.length -
                                                                            1
                                                                    ]) ||
                                                                (6 !== i[0] &&
                                                                    2 !== i[0])
                                                            )
                                                        ) {
                                                            a = 0;
                                                            continue;
                                                        }
                                                        if (
                                                            3 === i[0] &&
                                                            (!o ||
                                                                (i[1] > o[0] &&
                                                                    i[1] <
                                                                        o[3]))
                                                        ) {
                                                            a.label = i[1];
                                                            break;
                                                        }
                                                        if (
                                                            6 === i[0] &&
                                                            a.label < o[1]
                                                        ) {
                                                            (a.label = o[1]),
                                                                (o = i);
                                                            break;
                                                        }
                                                        if (
                                                            o &&
                                                            a.label < o[2]
                                                        ) {
                                                            (a.label = o[2]),
                                                                a.ops.push(i);
                                                            break;
                                                        }
                                                        o[2] && a.ops.pop(),
                                                            a.trys.pop();
                                                        continue;
                                                }
                                                i = e.call(t, a);
                                            } catch (t) {
                                                (i = [6, t]), (r = 0);
                                            } finally {
                                                n = o = 0;
                                            }
                                        if (5 & i[0]) throw i[1];
                                        return {
                                            value: i[0] ? i[1] : void 0,
                                            done: !0,
                                        };
                                    })([i, s]);
                                };
                            }
                        },
                    l =
                        (this && this.__importDefault) ||
                        function (t) {
                            return t && t.__esModule ? t : { default: t };
                        };
                Object.defineProperty(e, "__esModule", { value: !0 });
                var f = l(n(419)),
                    d = s(n(194)),
                    h = l(n(915)),
                    p = (function (t) {
                        function e(e, n, r) {
                            return (
                                t.call(this, e, n, r, {
                                    _internalFlags: {
                                        FieldInstance: h.default,
                                    },
                                }) || this
                            );
                        }
                        return (
                            o(e, t),
                            (e.prototype.getTags = function (t) {
                                var e,
                                    n = (t || {}).useUnsavedSchema;
                                return (
                                    (void 0 !== n &&
                                        n &&
                                        (null === (e = this._changedData) ||
                                        void 0 === e
                                            ? void 0
                                            : e.tags)) ||
                                    this._data.tags
                                );
                            }),
                            (e.prototype.setTags = function (t) {
                                return u(this, void 0, void 0, function () {
                                    return c(this, function (e) {
                                        switch (e.label) {
                                            case 0:
                                                if (void 0 === t)
                                                    throw new Error(
                                                        (0, d.default)(
                                                            d.ERROR_MESSAGES
                                                                .entryField
                                                                .entry
                                                                .tagsShouldNotBeBlank
                                                        )
                                                    );
                                                if (
                                                    !(function (t) {
                                                        return (
                                                            Array.isArray(t) &&
                                                            t.every(function (
                                                                t
                                                            ) {
                                                                return (
                                                                    "string" ==
                                                                    typeof t
                                                                );
                                                            })
                                                        );
                                                    })(t)
                                                )
                                                    throw new Error(
                                                        (0, d.default)(
                                                            d.ERROR_MESSAGES
                                                                .entryField
                                                                .entry
                                                                .tagsShouldBeArrayOfStrings
                                                        )
                                                    );
                                                return [
                                                    4,
                                                    this._connection.sendToParent(
                                                        "setTags",
                                                        { tags: t }
                                                    ),
                                                ];
                                            case 1:
                                                return (
                                                    e.sent(),
                                                    this._changedData ||
                                                        (this._changedData =
                                                            {}),
                                                    (this._changedData.tags =
                                                        t),
                                                    [2, t]
                                                );
                                        }
                                    });
                                });
                            }),
                            e
                        );
                    })(f.default);
                e.default = p;
            },
            915: function (t, e) {
                "use strict";
                var n =
                        (this && this.__awaiter) ||
                        function (t, e, n, r) {
                            return new (n || (n = Promise))(function (o, i) {
                                function a(t) {
                                    try {
                                        u(r.next(t));
                                    } catch (t) {
                                        i(t);
                                    }
                                }
                                function s(t) {
                                    try {
                                        u(r.throw(t));
                                    } catch (t) {
                                        i(t);
                                    }
                                }
                                function u(t) {
                                    var e;
                                    t.done
                                        ? o(t.value)
                                        : ((e = t.value),
                                          e instanceof n
                                              ? e
                                              : new n(function (t) {
                                                    t(e);
                                                })).then(a, s);
                                }
                                u((r = r.apply(t, e || [])).next());
                            });
                        },
                    r =
                        (this && this.__generator) ||
                        function (t, e) {
                            var n,
                                r,
                                o,
                                i,
                                a = {
                                    label: 0,
                                    sent: function () {
                                        if (1 & o[0]) throw o[1];
                                        return o[1];
                                    },
                                    trys: [],
                                    ops: [],
                                };
                            return (
                                (i = { next: s(0), throw: s(1), return: s(2) }),
                                "function" == typeof Symbol &&
                                    (i[Symbol.iterator] = function () {
                                        return this;
                                    }),
                                i
                            );
                            function s(i) {
                                return function (s) {
                                    return (function (i) {
                                        if (n)
                                            throw new TypeError(
                                                "Generator is already executing."
                                            );
                                        for (; a; )
                                            try {
                                                if (
                                                    ((n = 1),
                                                    r &&
                                                        (o =
                                                            2 & i[0]
                                                                ? r.return
                                                                : i[0]
                                                                ? r.throw ||
                                                                  ((o =
                                                                      r.return) &&
                                                                      o.call(r),
                                                                  0)
                                                                : r.next) &&
                                                        !(o = o.call(r, i[1]))
                                                            .done)
                                                )
                                                    return o;
                                                switch (
                                                    ((r = 0),
                                                    o &&
                                                        (i = [
                                                            2 & i[0],
                                                            o.value,
                                                        ]),
                                                    i[0])
                                                ) {
                                                    case 0:
                                                    case 1:
                                                        o = i;
                                                        break;
                                                    case 4:
                                                        return (
                                                            a.label++,
                                                            {
                                                                value: i[1],
                                                                done: !1,
                                                            }
                                                        );
                                                    case 5:
                                                        a.label++,
                                                            (r = i[1]),
                                                            (i = [0]);
                                                        continue;
                                                    case 7:
                                                        (i = a.ops.pop()),
                                                            a.trys.pop();
                                                        continue;
                                                    default:
                                                        if (
                                                            !(
                                                                (o =
                                                                    (o = a.trys)
                                                                        .length >
                                                                        0 &&
                                                                    o[
                                                                        o.length -
                                                                            1
                                                                    ]) ||
                                                                (6 !== i[0] &&
                                                                    2 !== i[0])
                                                            )
                                                        ) {
                                                            a = 0;
                                                            continue;
                                                        }
                                                        if (
                                                            3 === i[0] &&
                                                            (!o ||
                                                                (i[1] > o[0] &&
                                                                    i[1] <
                                                                        o[3]))
                                                        ) {
                                                            a.label = i[1];
                                                            break;
                                                        }
                                                        if (
                                                            6 === i[0] &&
                                                            a.label < o[1]
                                                        ) {
                                                            (a.label = o[1]),
                                                                (o = i);
                                                            break;
                                                        }
                                                        if (
                                                            o &&
                                                            a.label < o[2]
                                                        ) {
                                                            (a.label = o[2]),
                                                                a.ops.push(i);
                                                            break;
                                                        }
                                                        o[2] && a.ops.pop(),
                                                            a.trys.pop();
                                                        continue;
                                                }
                                                i = e.call(t, a);
                                            } catch (t) {
                                                (i = [6, t]), (r = 0);
                                            } finally {
                                                n = o = 0;
                                            }
                                        if (5 & i[0]) throw i[1];
                                        return {
                                            value: i[0] ? i[1] : void 0,
                                            done: !0,
                                        };
                                    })([i, s]);
                                };
                            }
                        };
                Object.defineProperty(e, "__esModule", { value: !0 });
                var o = [
                        "file",
                        "reference",
                        "blocks",
                        "group",
                        "global_field",
                    ],
                    i = (function () {
                        function t(t, e, n) {
                            (this.uid = t.uid),
                                (this.data_type = t.schema.data_type),
                                (this.schema = t.schema),
                                (this._emitter = n);
                            var r,
                                o,
                                i,
                                a,
                                s =
                                    ((r = this),
                                    (i = o = t.value),
                                    (a = o),
                                    "file" === r.data_type &&
                                        (o
                                            ? ((i = o),
                                              (a =
                                                  !0 === r.schema.multiple
                                                      ? o.map(function (t) {
                                                            return t.uid;
                                                        })
                                                      : o.uid))
                                            : !0 === r.schema.multiple &&
                                              ((i = []), (a = []))),
                                    { resolvedData: i, unResolvedData: a });
                            (this._data = s.unResolvedData),
                                (this._resolvedData = s.resolvedData),
                                (this._connection = e),
                                (this._self = t.self || !1);
                            var u = this;
                            n.on("updateFields", function (t) {
                                var e = u.uid.split("."),
                                    n = t.data;
                                e.forEach(function (t) {
                                    n && (n = n[t]);
                                }),
                                    u._data !== n && (u._data = n);
                            });
                        }
                        return (
                            (t.prototype.setData = function (t) {
                                return n(this, void 0, void 0, function () {
                                    var e,
                                        n,
                                        i = this;
                                    return r(this, function (r) {
                                        return (
                                            (n = {
                                                data: t,
                                                uid: (e = this).uid,
                                                self: e._self,
                                            }),
                                            e._self ||
                                            (-1 === o.indexOf(e.data_type) &&
                                                e.data_type)
                                                ? [
                                                      2,
                                                      this._connection
                                                          .sendToParent(
                                                              "setData",
                                                              n
                                                          )
                                                          .then(function () {
                                                              return (
                                                                  (i._data = t),
                                                                  Promise.resolve(
                                                                      e
                                                                  )
                                                              );
                                                          })
                                                          .catch(function (t) {
                                                              return Promise.reject(
                                                                  t
                                                              );
                                                          }),
                                                  ]
                                                : [
                                                      2,
                                                      Promise.reject(
                                                          new Error(
                                                              "Cannot call set data for current field type"
                                                          )
                                                      ),
                                                  ]
                                        );
                                    });
                                });
                            }),
                            (t.prototype.getData = function (t) {
                                var e = (void 0 === t ? {} : t).resolved;
                                return void 0 !== e && e
                                    ? this._resolvedData
                                    : this._data;
                            }),
                            t
                        );
                    })();
                e.default = i;
            },
            663: function (t, e, n) {
                "use strict";
                var r =
                        (this && this.__awaiter) ||
                        function (t, e, n, r) {
                            return new (n || (n = Promise))(function (o, i) {
                                function a(t) {
                                    try {
                                        u(r.next(t));
                                    } catch (t) {
                                        i(t);
                                    }
                                }
                                function s(t) {
                                    try {
                                        u(r.throw(t));
                                    } catch (t) {
                                        i(t);
                                    }
                                }
                                function u(t) {
                                    var e;
                                    t.done
                                        ? o(t.value)
                                        : ((e = t.value),
                                          e instanceof n
                                              ? e
                                              : new n(function (t) {
                                                    t(e);
                                                })).then(a, s);
                                }
                                u((r = r.apply(t, e || [])).next());
                            });
                        },
                    o =
                        (this && this.__generator) ||
                        function (t, e) {
                            var n,
                                r,
                                o,
                                i,
                                a = {
                                    label: 0,
                                    sent: function () {
                                        if (1 & o[0]) throw o[1];
                                        return o[1];
                                    },
                                    trys: [],
                                    ops: [],
                                };
                            return (
                                (i = { next: s(0), throw: s(1), return: s(2) }),
                                "function" == typeof Symbol &&
                                    (i[Symbol.iterator] = function () {
                                        return this;
                                    }),
                                i
                            );
                            function s(i) {
                                return function (s) {
                                    return (function (i) {
                                        if (n)
                                            throw new TypeError(
                                                "Generator is already executing."
                                            );
                                        for (; a; )
                                            try {
                                                if (
                                                    ((n = 1),
                                                    r &&
                                                        (o =
                                                            2 & i[0]
                                                                ? r.return
                                                                : i[0]
                                                                ? r.throw ||
                                                                  ((o =
                                                                      r.return) &&
                                                                      o.call(r),
                                                                  0)
                                                                : r.next) &&
                                                        !(o = o.call(r, i[1]))
                                                            .done)
                                                )
                                                    return o;
                                                switch (
                                                    ((r = 0),
                                                    o &&
                                                        (i = [
                                                            2 & i[0],
                                                            o.value,
                                                        ]),
                                                    i[0])
                                                ) {
                                                    case 0:
                                                    case 1:
                                                        o = i;
                                                        break;
                                                    case 4:
                                                        return (
                                                            a.label++,
                                                            {
                                                                value: i[1],
                                                                done: !1,
                                                            }
                                                        );
                                                    case 5:
                                                        a.label++,
                                                            (r = i[1]),
                                                            (i = [0]);
                                                        continue;
                                                    case 7:
                                                        (i = a.ops.pop()),
                                                            a.trys.pop();
                                                        continue;
                                                    default:
                                                        if (
                                                            !(
                                                                (o =
                                                                    (o = a.trys)
                                                                        .length >
                                                                        0 &&
                                                                    o[
                                                                        o.length -
                                                                            1
                                                                    ]) ||
                                                                (6 !== i[0] &&
                                                                    2 !== i[0])
                                                            )
                                                        ) {
                                                            a = 0;
                                                            continue;
                                                        }
                                                        if (
                                                            3 === i[0] &&
                                                            (!o ||
                                                                (i[1] > o[0] &&
                                                                    i[1] <
                                                                        o[3]))
                                                        ) {
                                                            a.label = i[1];
                                                            break;
                                                        }
                                                        if (
                                                            6 === i[0] &&
                                                            a.label < o[1]
                                                        ) {
                                                            (a.label = o[1]),
                                                                (o = i);
                                                            break;
                                                        }
                                                        if (
                                                            o &&
                                                            a.label < o[2]
                                                        ) {
                                                            (a.label = o[2]),
                                                                a.ops.push(i);
                                                            break;
                                                        }
                                                        o[2] && a.ops.pop(),
                                                            a.trys.pop();
                                                        continue;
                                                }
                                                i = e.call(t, a);
                                            } catch (t) {
                                                (i = [6, t]), (r = 0);
                                            } finally {
                                                n = o = 0;
                                            }
                                        if (5 & i[0]) throw i[1];
                                        return {
                                            value: i[0] ? i[1] : void 0,
                                            done: !0,
                                        };
                                    })([i, s]);
                                };
                            }
                        },
                    i =
                        (this && this.__importDefault) ||
                        function (t) {
                            return t && t.__esModule ? t : { default: t };
                        };
                Object.defineProperty(e, "__esModule", { value: !0 });
                var a = i(n(727)),
                    s = n(194),
                    u = (function () {
                        function t(t, e) {
                            (this._autoResizingEnabled = !1),
                                (this._connection = t || a.default),
                                (this._autoResizingEnabled = !1),
                                (this._emitter = e),
                                (this.updateDimension =
                                    this.updateDimension.bind(this)),
                                (this.enableAutoResizing =
                                    this.enableAutoResizing.bind(this)),
                                (this.disableAutoResizing =
                                    this.disableAutoResizing.bind(this)),
                                (this.closeModal = this.closeModal.bind(this)),
                                this.enableAutoResizing();
                        }
                        return (
                            (t.prototype.updateDimension = function (t) {
                                return r(this, void 0, void 0, function () {
                                    var e, n, r, i;
                                    return o(this, function (o) {
                                        switch (o.label) {
                                            case 0:
                                                return (
                                                    (n = (e = t || {}).height),
                                                    (r = e.width),
                                                    void 0 !== n || void 0 !== r
                                                        ? [3, 2]
                                                        : ((this._height =
                                                              Math.ceil(
                                                                  document.documentElement.getBoundingClientRect()
                                                                      .height
                                                              )),
                                                          (this._width =
                                                              Math.ceil(
                                                                  document.documentElement.getBoundingClientRect()
                                                                      .width
                                                              )),
                                                          [
                                                              4,
                                                              this._connection.sendToParent(
                                                                  "resize",
                                                                  {
                                                                      height: this
                                                                          ._height,
                                                                      width: this
                                                                          ._width,
                                                                  }
                                                              ),
                                                          ])
                                                );
                                            case 1:
                                                return o.sent(), [2];
                                            case 2:
                                                if (
                                                    ((i = {}),
                                                    void 0 !== n &&
                                                        "number" != typeof n)
                                                )
                                                    throw new Error(
                                                        s.ERROR_MESSAGES.entryField.frame.dimensionHeightShouldBeNumber
                                                    );
                                                if (
                                                    (this._height !== n &&
                                                        ((this._height = n),
                                                        (i.height =
                                                            this._height)),
                                                    void 0 !== r &&
                                                        "number" != typeof r)
                                                )
                                                    throw new Error(
                                                        s.ERROR_MESSAGES.entryField.frame.dimensionWidthShouldBeNumber
                                                    );
                                                return (
                                                    this._width !== r &&
                                                        ((this._width = r),
                                                        (i.width =
                                                            this._width)),
                                                    0 === Object.keys(i).length
                                                        ? [3, 4]
                                                        : [
                                                              4,
                                                              this._connection.sendToParent(
                                                                  "resize",
                                                                  i
                                                              ),
                                                          ]
                                                );
                                            case 3:
                                                o.sent(), (o.label = 4);
                                            case 4:
                                                return [2];
                                        }
                                    });
                                });
                            }),
                            (t.prototype.preventFrameClose = function (t) {
                                return r(this, void 0, void 0, function () {
                                    return o(this, function (e) {
                                        switch (e.label) {
                                            case 0:
                                                return [
                                                    4,
                                                    this._connection.sendToParent(
                                                        "preventFrameClose",
                                                        { state: t }
                                                    ),
                                                ];
                                            case 1:
                                                return e.sent(), [2];
                                        }
                                    });
                                });
                            }),
                            (t.prototype.enableAutoResizing = function () {
                                var t = this;
                                return (
                                    this._autoResizingEnabled ||
                                        ((this._autoResizingEnabled = !0),
                                        (this.observer = new MutationObserver(
                                            function () {
                                                return r(
                                                    t,
                                                    void 0,
                                                    void 0,
                                                    function () {
                                                        return o(
                                                            this,
                                                            function (t) {
                                                                switch (
                                                                    t.label
                                                                ) {
                                                                    case 0:
                                                                        return [
                                                                            4,
                                                                            this.updateDimension(),
                                                                        ];
                                                                    case 1:
                                                                        return [
                                                                            2,
                                                                            t.sent(),
                                                                        ];
                                                                }
                                                            }
                                                        );
                                                    }
                                                );
                                            }
                                        )),
                                        this.observer.observe(
                                            window.document.body,
                                            {
                                                attributes: !0,
                                                childList: !0,
                                                subtree: !0,
                                            }
                                        )),
                                    this
                                );
                            }),
                            (t.prototype.disableAutoResizing = function () {
                                var t;
                                return this._autoResizingEnabled
                                    ? ((this._autoResizingEnabled = !1),
                                      null === (t = this.observer) ||
                                          void 0 === t ||
                                          t.disconnect(),
                                      this)
                                    : this;
                            }),
                            (t.prototype.closeModal = function () {
                                return r(this, void 0, void 0, function () {
                                    return o(this, function (t) {
                                        switch (t.label) {
                                            case 0:
                                                return [
                                                    4,
                                                    this._connection.sendToParent(
                                                        "closeModal"
                                                    ),
                                                ];
                                            case 1:
                                                return t.sent(), [2];
                                        }
                                    });
                                });
                            }),
                            t
                        );
                    })();
                e.default = u;
            },
            607: function (t, e, n) {
                "use strict";
                var r =
                    (this && this.__importDefault) ||
                    function (t) {
                        return t && t.__esModule ? t : { default: t };
                    };
                Object.defineProperty(e, "__esModule", { value: !0 });
                var o = r(n(727)),
                    i = r(n(112)),
                    a = n(147);
                o.default.CONFIG.LOG_LEVEL = "error";
                var s = (function () {
                    function t() {}
                    return (
                        (t.init = function () {
                            var t = this;
                            return this._extension
                                ? Promise.resolve(this._extension)
                                : i.default
                                      .initialize(a.version)
                                      .then(function (e) {
                                          return (
                                              (t._extension = new i.default(e)),
                                              Promise.resolve(t._extension)
                                          );
                                      })
                                      .catch(function (t) {
                                          return Promise.reject(t);
                                      });
                        }),
                        Object.defineProperty(t, "SDK_VERSION", {
                            get: function () {
                                return a.version;
                            },
                            enumerable: !1,
                            configurable: !0,
                        }),
                        t
                    );
                })();
                (e.default = s), (t.exports = s);
            },
            65: function (t, e, n) {
                "use strict";
                var r =
                        (this && this.__assign) ||
                        function () {
                            return (
                                (r =
                                    Object.assign ||
                                    function (t) {
                                        for (
                                            var e, n = 1, r = arguments.length;
                                            n < r;
                                            n++
                                        )
                                            for (var o in (e = arguments[n]))
                                                Object.prototype.hasOwnProperty.call(
                                                    e,
                                                    o
                                                ) && (t[o] = e[o]);
                                        return t;
                                    }),
                                r.apply(this, arguments)
                            );
                        },
                    o =
                        (this && this.__rest) ||
                        function (t, e) {
                            var n = {};
                            for (var r in t)
                                Object.prototype.hasOwnProperty.call(t, r) &&
                                    e.indexOf(r) < 0 &&
                                    (n[r] = t[r]);
                            if (
                                null != t &&
                                "function" ==
                                    typeof Object.getOwnPropertySymbols
                            ) {
                                var o = 0;
                                for (
                                    r = Object.getOwnPropertySymbols(t);
                                    o < r.length;
                                    o++
                                )
                                    e.indexOf(r[o]) < 0 &&
                                        Object.prototype.propertyIsEnumerable.call(
                                            t,
                                            r[o]
                                        ) &&
                                        (n[r[o]] = t[r[o]]);
                            }
                            return n;
                        };
                Object.defineProperty(e, "__esModule", { value: !0 });
                var i = n(974),
                    a = (function () {
                        function t(t) {
                            this._connection = t;
                        }
                        return (
                            (t.prototype.createMetaData = function (t) {
                                var e = t.entity_uid,
                                    n = t.type,
                                    a = void 0 === n ? "asset" : n,
                                    s = o(t, ["entity_uid", "type"]),
                                    u = {
                                        action: "createMetadata",
                                        payload: {
                                            metadata: r(
                                                { entity_uid: e, type: a },
                                                s
                                            ),
                                        },
                                    };
                                return this._connection
                                    .sendToParent("stackQuery", u)
                                    .then(i.onData)
                                    .catch(i.onError);
                            }),
                            (t.prototype.retrieveMetaData = function (t) {
                                var e = t.uid,
                                    n = {
                                        uid: e,
                                        action: "getMetadata",
                                        payload: { metadata: { uid: e } },
                                    };
                                return this._connection
                                    .sendToParent("stackQuery", n)
                                    .then(i.onData)
                                    .catch(i.onError);
                            }),
                            (t.prototype.retrieveAllMetaData = function (t) {
                                void 0 === t && (t = {});
                                var e = { action: "getAllMetadata", params: t };
                                return this._connection
                                    .sendToParent("stackQuery", e)
                                    .then(i.onData)
                                    .catch(i.onError);
                            }),
                            (t.prototype.updateMetaData = function (t) {
                                var e = t.uid,
                                    n = o(t, ["uid"]),
                                    a = {
                                        uid: e,
                                        action: "updateMetadata",
                                        payload: { metadata: r({ uid: e }, n) },
                                    };
                                return this._connection
                                    .sendToParent("stackQuery", a)
                                    .then(i.onData)
                                    .catch(i.onError);
                            }),
                            (t.prototype.deleteMetaData = function (t) {
                                var e = t.uid,
                                    n = {
                                        uid: e,
                                        action: "deleteMetadata",
                                        payload: { metadata: { uid: e } },
                                    };
                                return this._connection
                                    .sendToParent("stackQuery", n)
                                    .then(i.onData)
                                    .catch(i.onError);
                            }),
                            t
                        );
                    })();
                e.default = a;
            },
            799: (t, e, n) => {
                "use strict";
                Object.defineProperty(e, "__esModule", { value: !0 });
                var r = n(974),
                    o = (function () {
                        function t() {
                            var t;
                            if (
                                !Object.prototype.hasOwnProperty.call(
                                    window,
                                    "iframeRef"
                                )
                            ) {
                                var e = (0, r.getPreferredBodyElement)(
                                    null ===
                                        (t =
                                            null === document ||
                                            void 0 === document
                                                ? void 0
                                                : document.body) || void 0 === t
                                        ? void 0
                                        : t.children
                                );
                                window.iframeRef = e;
                            }
                        }
                        return (
                            (t.prototype.setBackgroundElement = function (t) {
                                window.iframeRef = t;
                            }),
                            t
                        );
                    })();
                e.default = o;
            },
            160: function (t, e, n) {
                "use strict";
                var r,
                    o =
                        (this && this.__extends) ||
                        ((r = function (t, e) {
                            return (
                                (r =
                                    Object.setPrototypeOf ||
                                    ({ __proto__: [] } instanceof Array &&
                                        function (t, e) {
                                            t.__proto__ = e;
                                        }) ||
                                    function (t, e) {
                                        for (var n in e)
                                            Object.prototype.hasOwnProperty.call(
                                                e,
                                                n
                                            ) && (t[n] = e[n]);
                                    }),
                                r(t, e)
                            );
                        }),
                        function (t, e) {
                            if ("function" != typeof e && null !== e)
                                throw new TypeError(
                                    "Class extends value " +
                                        String(e) +
                                        " is not a constructor or null"
                                );
                            function n() {
                                this.constructor = t;
                            }
                            r(t, e),
                                (t.prototype =
                                    null === e
                                        ? Object.create(e)
                                        : ((n.prototype = e.prototype),
                                          new n()));
                        }),
                    i =
                        (this && this.__awaiter) ||
                        function (t, e, n, r) {
                            return new (n || (n = Promise))(function (o, i) {
                                function a(t) {
                                    try {
                                        u(r.next(t));
                                    } catch (t) {
                                        i(t);
                                    }
                                }
                                function s(t) {
                                    try {
                                        u(r.throw(t));
                                    } catch (t) {
                                        i(t);
                                    }
                                }
                                function u(t) {
                                    var e;
                                    t.done
                                        ? o(t.value)
                                        : ((e = t.value),
                                          e instanceof n
                                              ? e
                                              : new n(function (t) {
                                                    t(e);
                                                })).then(a, s);
                                }
                                u((r = r.apply(t, e || [])).next());
                            });
                        },
                    a =
                        (this && this.__generator) ||
                        function (t, e) {
                            var n,
                                r,
                                o,
                                i,
                                a = {
                                    label: 0,
                                    sent: function () {
                                        if (1 & o[0]) throw o[1];
                                        return o[1];
                                    },
                                    trys: [],
                                    ops: [],
                                };
                            return (
                                (i = { next: s(0), throw: s(1), return: s(2) }),
                                "function" == typeof Symbol &&
                                    (i[Symbol.iterator] = function () {
                                        return this;
                                    }),
                                i
                            );
                            function s(i) {
                                return function (s) {
                                    return (function (i) {
                                        if (n)
                                            throw new TypeError(
                                                "Generator is already executing."
                                            );
                                        for (; a; )
                                            try {
                                                if (
                                                    ((n = 1),
                                                    r &&
                                                        (o =
                                                            2 & i[0]
                                                                ? r.return
                                                                : i[0]
                                                                ? r.throw ||
                                                                  ((o =
                                                                      r.return) &&
                                                                      o.call(r),
                                                                  0)
                                                                : r.next) &&
                                                        !(o = o.call(r, i[1]))
                                                            .done)
                                                )
                                                    return o;
                                                switch (
                                                    ((r = 0),
                                                    o &&
                                                        (i = [
                                                            2 & i[0],
                                                            o.value,
                                                        ]),
                                                    i[0])
                                                ) {
                                                    case 0:
                                                    case 1:
                                                        o = i;
                                                        break;
                                                    case 4:
                                                        return (
                                                            a.label++,
                                                            {
                                                                value: i[1],
                                                                done: !1,
                                                            }
                                                        );
                                                    case 5:
                                                        a.label++,
                                                            (r = i[1]),
                                                            (i = [0]);
                                                        continue;
                                                    case 7:
                                                        (i = a.ops.pop()),
                                                            a.trys.pop();
                                                        continue;
                                                    default:
                                                        if (
                                                            !(
                                                                (o =
                                                                    (o = a.trys)
                                                                        .length >
                                                                        0 &&
                                                                    o[
                                                                        o.length -
                                                                            1
                                                                    ]) ||
                                                                (6 !== i[0] &&
                                                                    2 !== i[0])
                                                            )
                                                        ) {
                                                            a = 0;
                                                            continue;
                                                        }
                                                        if (
                                                            3 === i[0] &&
                                                            (!o ||
                                                                (i[1] > o[0] &&
                                                                    i[1] <
                                                                        o[3]))
                                                        ) {
                                                            a.label = i[1];
                                                            break;
                                                        }
                                                        if (
                                                            6 === i[0] &&
                                                            a.label < o[1]
                                                        ) {
                                                            (a.label = o[1]),
                                                                (o = i);
                                                            break;
                                                        }
                                                        if (
                                                            o &&
                                                            a.label < o[2]
                                                        ) {
                                                            (a.label = o[2]),
                                                                a.ops.push(i);
                                                            break;
                                                        }
                                                        o[2] && a.ops.pop(),
                                                            a.trys.pop();
                                                        continue;
                                                }
                                                i = e.call(t, a);
                                            } catch (t) {
                                                (i = [6, t]), (r = 0);
                                            } finally {
                                                n = o = 0;
                                            }
                                        if (5 & i[0]) throw i[1];
                                        return {
                                            value: i[0] ? i[1] : void 0,
                                            done: !0,
                                        };
                                    })([i, s]);
                                };
                            }
                        },
                    s =
                        (this && this.__spreadArray) ||
                        function (t, e, n) {
                            if (n || 2 === arguments.length)
                                for (var r, o = 0, i = e.length; o < i; o++)
                                    (!r && o in e) ||
                                        (r ||
                                            (r = Array.prototype.slice.call(
                                                e,
                                                0,
                                                o
                                            )),
                                        (r[o] = e[o]));
                            return t.concat(r || Array.prototype.slice.call(e));
                        },
                    u =
                        (this && this.__importDefault) ||
                        function (t) {
                            return t && t.__esModule ? t : { default: t };
                        };
                Object.defineProperty(e, "__esModule", { value: !0 });
                var c = u(n(684)),
                    l = n(896),
                    f = u(n(727)),
                    d = {};
                function h(t) {
                    return "string" == typeof t.data
                        ? Promise.reject(t.data)
                        : Promise.resolve(t.data);
                }
                function p(t) {
                    return Promise.reject(t);
                }
                var y = (function (t) {
                    function e(e) {
                        var n = t.call(this, e) || this;
                        return (
                            (n.getReferences = l.getReferences),
                            (n.environment = l.environment),
                            n
                        );
                    }
                    return (
                        o(e, t),
                        (e.Query = function () {
                            var e = t.Query.call(this);
                            return (
                                Object.assign(e, {
                                    language: l.language,
                                    environment: l.environment,
                                }),
                                e
                            );
                        }),
                        (e.module = function (t) {
                            return (
                                void 0 === t && (t = !1), t ? "Assets" : "Asset"
                            );
                        }),
                        Object.defineProperty(e, "connection", {
                            get: function () {
                                return d;
                            },
                            enumerable: !1,
                            configurable: !0,
                        }),
                        (e.getRteAssets = function () {
                            return this.connection
                                .sendToParent("stackQuery", {
                                    action: "getRteAssets",
                                })
                                .then(h)
                                .catch(p);
                        }),
                        (e.getAssetsOfSpecificTypes = function (t) {
                            return t && "string" == typeof t
                                ? this.connection
                                      .sendToParent("stackQuery", {
                                          action: "getAssetsOfSpecificTypes",
                                          asset_type: t,
                                      })
                                      .then(h)
                                      .catch(p)
                                : Promise.reject(
                                      new Error(
                                          "Kindly provide valid parameters"
                                      )
                                  );
                        }),
                        (e.prototype.publish = function (t) {
                            return !t ||
                                "object" != typeof t ||
                                t instanceof Array
                                ? Promise.reject(
                                      new Error(
                                          "Kindly provide valid parameters"
                                      )
                                  )
                                : this.fetch("publishAsset", t);
                        }),
                        (e.prototype.unpublish = function (t) {
                            return !t ||
                                "object" != typeof t ||
                                t instanceof Array
                                ? Promise.reject(
                                      new Error(
                                          "Kindly provide valid parameters"
                                      )
                                  )
                                : this.fetch("unpublishAsset", t);
                        }),
                        (e.handleUpload = function (t, e, n) {
                            return i(this, void 0, void 0, function () {
                                var r, o;
                                return a(this, function (s) {
                                    return t && t.length
                                        ? ((r = []),
                                          Array.from(t).forEach(function (t) {
                                              var e = new File([t], t.name, {
                                                  type: t.type,
                                              });
                                              r.push(e);
                                          }),
                                          (o = new Date().getUTCMilliseconds()),
                                          [
                                              2,
                                              (function () {
                                                  return i(
                                                      this,
                                                      void 0,
                                                      void 0,
                                                      function () {
                                                          var t, i;
                                                          return a(
                                                              this,
                                                              function (a) {
                                                                  switch (
                                                                      a.label
                                                                  ) {
                                                                      case 0:
                                                                          return (
                                                                              a.trys.push(
                                                                                  [
                                                                                      0,
                                                                                      2,
                                                                                      ,
                                                                                      3,
                                                                                  ]
                                                                              ),
                                                                              (t =
                                                                                  f.default.on(
                                                                                      "uploadReady_" +
                                                                                          o,
                                                                                      function () {
                                                                                          return (
                                                                                              window.parent.postMessage(
                                                                                                  {
                                                                                                      type:
                                                                                                          "upload_" +
                                                                                                          o,
                                                                                                      upload_type:
                                                                                                          e,
                                                                                                      files: r,
                                                                                                      parentFolderUid:
                                                                                                          null ==
                                                                                                          n
                                                                                                              ? void 0
                                                                                                              : n.parentFolderUid,
                                                                                                      customUploadHandler:
                                                                                                          null ==
                                                                                                          n
                                                                                                              ? void 0
                                                                                                              : n.customUploadHandler,
                                                                                                  },
                                                                                                  "*"
                                                                                              ),
                                                                                              t.cancel(),
                                                                                              Promise.resolve(
                                                                                                  {}
                                                                                              )
                                                                                          );
                                                                                      }
                                                                                  )),
                                                                              [
                                                                                  4,
                                                                                  f.default.sendToParent(
                                                                                      "stackOptionsQuery",
                                                                                      {
                                                                                          action:
                                                                                              "upload_" +
                                                                                              o,
                                                                                          uid: o,
                                                                                      }
                                                                                  ),
                                                                              ]
                                                                          );
                                                                      case 1:
                                                                          return (
                                                                              a.sent(),
                                                                              [
                                                                                  2,
                                                                                  f.default.sendToParent(
                                                                                      "upload_" +
                                                                                          o,
                                                                                      {}
                                                                                  ),
                                                                              ]
                                                                          );
                                                                      case 2:
                                                                          return (
                                                                              (i =
                                                                                  a.sent()),
                                                                              [
                                                                                  2,
                                                                                  Promise.reject(
                                                                                      i
                                                                                  ),
                                                                              ]
                                                                          );
                                                                      case 3:
                                                                          return [
                                                                              2,
                                                                          ];
                                                                  }
                                                              }
                                                          );
                                                      }
                                                  );
                                              })(),
                                          ])
                                        : [
                                              2,
                                              Promise.reject(
                                                  new Error(
                                                      "Kindly provide valid parameters"
                                                  )
                                              ),
                                          ];
                                });
                            });
                        }),
                        (e.uploadAsset = function (t, n) {
                            return e.handleUpload(t, "upload", n);
                        }),
                        e
                    );
                })(c.default);
                e.default = function (t) {
                    return (
                        (d = t),
                        new Proxy(y, {
                            apply: function (t, e, n) {
                                return new (t.bind.apply(
                                    t,
                                    s([void 0], n, !1)
                                ))();
                            },
                        })
                    );
                };
            },
            684: function (t, e, n) {
                "use strict";
                var r =
                    (this && this.__importDefault) ||
                    function (t) {
                        return t && t.__esModule ? t : { default: t };
                    };
                Object.defineProperty(e, "__esModule", { value: !0 });
                var o = r(n(212)),
                    i = n(896);
                function a(t) {
                    return "string" == typeof t.data
                        ? Promise.reject(t.data)
                        : Promise.resolve(t.data);
                }
                function s(t) {
                    return Promise.reject(t);
                }
                var u = (function () {
                    function t(t) {
                        if (!t) throw new Error("uid is required");
                        (this.uid = t),
                            (this._query = {}),
                            (this.only = (0, i.transform)("only")),
                            (this.except = (0, i.transform)("except")),
                            (this.addParam = i.addParam);
                    }
                    return (
                        (t.Query = function () {
                            return new o.default(
                                this.connection,
                                this.module(!0),
                                this.contentTypeUid
                            );
                        }),
                        (t.create = function (t) {
                            var e = {
                                payload: t,
                                content_type_uid: this.contentTypeUid,
                                action: "create" + this.module(),
                            };
                            return this.connection
                                .sendToParent("stackQuery", e)
                                .then(a)
                                .catch(s);
                        }),
                        (t.prototype.update = function (t) {
                            return !t ||
                                "object" != typeof t ||
                                t instanceof Array
                                ? Promise.reject(
                                      new Error(
                                          "Kindly provide valid parameters"
                                      )
                                  )
                                : this.fetch(
                                      "update" + this.constructor.module(),
                                      t
                                  );
                        }),
                        (t.prototype.delete = function () {
                            return this.fetch(
                                "delete" + this.constructor.module()
                            );
                        }),
                        (t.prototype.fetch = function (t, e) {
                            var n = {
                                payload: e,
                                content_type_uid:
                                    this.constructor.contentTypeUid,
                                uid: this.uid,
                                params: this._query,
                                action: t || "get" + this.constructor.module(),
                            };
                            return (
                                e || delete n.payload,
                                this.constructor.contentTypeUid ||
                                    delete n.content_type_uid,
                                this.constructor.connection
                                    .sendToParent("stackQuery", n)
                                    .then(a)
                                    .catch(s)
                            );
                        }),
                        t
                    );
                })();
                e.default = u;
            },
            573: function (t, e, n) {
                "use strict";
                var r,
                    o =
                        (this && this.__extends) ||
                        ((r = function (t, e) {
                            return (
                                (r =
                                    Object.setPrototypeOf ||
                                    ({ __proto__: [] } instanceof Array &&
                                        function (t, e) {
                                            t.__proto__ = e;
                                        }) ||
                                    function (t, e) {
                                        for (var n in e)
                                            Object.prototype.hasOwnProperty.call(
                                                e,
                                                n
                                            ) && (t[n] = e[n]);
                                    }),
                                r(t, e)
                            );
                        }),
                        function (t, e) {
                            if ("function" != typeof e && null !== e)
                                throw new TypeError(
                                    "Class extends value " +
                                        String(e) +
                                        " is not a constructor or null"
                                );
                            function n() {
                                this.constructor = t;
                            }
                            r(t, e),
                                (t.prototype =
                                    null === e
                                        ? Object.create(e)
                                        : ((n.prototype = e.prototype),
                                          new n()));
                        }),
                    i =
                        (this && this.__spreadArray) ||
                        function (t, e, n) {
                            if (n || 2 === arguments.length)
                                for (var r, o = 0, i = e.length; o < i; o++)
                                    (!r && o in e) ||
                                        (r ||
                                            (r = Array.prototype.slice.call(
                                                e,
                                                0,
                                                o
                                            )),
                                        (r[o] = e[o]));
                            return t.concat(r || Array.prototype.slice.call(e));
                        },
                    a =
                        (this && this.__importDefault) ||
                        function (t) {
                            return t && t.__esModule ? t : { default: t };
                        };
                Object.defineProperty(e, "__esModule", { value: !0 });
                var s = a(n(684)),
                    u = n(896),
                    c = {},
                    l = "",
                    f = (function (t) {
                        function e(e) {
                            var n = t.call(this, e) || this;
                            return (n._query = {}), n;
                        }
                        return (
                            o(e, t),
                            (e.Query = function () {
                                var e = t.Query.call(this);
                                return (
                                    Object.assign(e, {
                                        language: u.language,
                                        environment: u.environment,
                                        includeOwner: u.includeOwner,
                                        includeContentType:
                                            u.includeContentType,
                                        includeSchema: u.includeSchema,
                                        includeReference: u.includeReference,
                                    }),
                                    e
                                );
                            }),
                            Object.defineProperty(e, "connection", {
                                get: function () {
                                    return c;
                                },
                                enumerable: !1,
                                configurable: !0,
                            }),
                            Object.defineProperty(e, "contentTypeUid", {
                                get: function () {
                                    return l;
                                },
                                enumerable: !1,
                                configurable: !0,
                            }),
                            (e.module = function (t) {
                                return (
                                    void 0 === t && (t = !1),
                                    t ? "Entries" : "Entry"
                                );
                            }),
                            (e.prototype.getLanguages = function () {
                                return this.fetch("getEntryLanguages");
                            }),
                            (e.prototype.unlocalize = function (t) {
                                return t && "string" == typeof t
                                    ? ((this._query.locale = t),
                                      this.fetch("unlocalizeEntry"))
                                    : Promise.reject(
                                          new Error(
                                              "Kindly provide valid parameters"
                                          )
                                      );
                            }),
                            (e.prototype.publish = function (t) {
                                return !t ||
                                    "object" != typeof t ||
                                    t instanceof Array
                                    ? Promise.reject(
                                          new Error(
                                              "Kindly provide valid parameters"
                                          )
                                      )
                                    : ((this._query = {}),
                                      this.fetch("publishEntry", t));
                            }),
                            (e.prototype.unpublish = function (t) {
                                return !t ||
                                    "object" != typeof t ||
                                    t instanceof Array
                                    ? Promise.reject(
                                          new Error(
                                              "Kindly provide valid parameters"
                                          )
                                      )
                                    : ((this._query = {}),
                                      this.fetch("unpublishEntry", t));
                            }),
                            (e.prototype.setWorkflowStage = function (t) {
                                return !t ||
                                    "object" != typeof t ||
                                    t instanceof Array
                                    ? Promise.reject(
                                          new Error(
                                              "Kindly provide valid parameters"
                                          )
                                      )
                                    : this.fetch("setWorkflowStageEntry", t);
                            }),
                            (e.prototype.update = function (t, e) {
                                return !t ||
                                    "object" != typeof t ||
                                    t instanceof Array
                                    ? Promise.reject(
                                          new Error(
                                              "Kindly provide valid parameters"
                                          )
                                      )
                                    : ((this._query.locale = e),
                                      this.fetch("updateEntry", t));
                            }),
                            e
                        );
                    })(s.default);
                e.default = function (t, e) {
                    return (
                        (c = t),
                        (l = e),
                        new Proxy(f, {
                            apply: function (t, e, n) {
                                var r = new (t.bind.apply(
                                    t,
                                    i([void 0], n, !1)
                                ))();
                                return (
                                    Object.assign(r, {
                                        getReferences: u.getReferences,
                                        addQuery: u.addQuery,
                                        language: u.language,
                                        environment: u.environment,
                                        includeOwner: u.includeOwner,
                                        includeContentType:
                                            u.includeContentType,
                                        includeSchema: u.includeSchema,
                                        includeReference: u.includeReference,
                                    }),
                                    r
                                );
                            },
                        })
                    );
                };
            },
            701: function (t, e, n) {
                "use strict";
                var r,
                    o =
                        (this && this.__extends) ||
                        ((r = function (t, e) {
                            return (
                                (r =
                                    Object.setPrototypeOf ||
                                    ({ __proto__: [] } instanceof Array &&
                                        function (t, e) {
                                            t.__proto__ = e;
                                        }) ||
                                    function (t, e) {
                                        for (var n in e)
                                            Object.prototype.hasOwnProperty.call(
                                                e,
                                                n
                                            ) && (t[n] = e[n]);
                                    }),
                                r(t, e)
                            );
                        }),
                        function (t, e) {
                            if ("function" != typeof e && null !== e)
                                throw new TypeError(
                                    "Class extends value " +
                                        String(e) +
                                        " is not a constructor or null"
                                );
                            function n() {
                                this.constructor = t;
                            }
                            r(t, e),
                                (t.prototype =
                                    null === e
                                        ? Object.create(e)
                                        : ((n.prototype = e.prototype),
                                          new n()));
                        }),
                    i =
                        (this && this.__spreadArray) ||
                        function (t, e, n) {
                            if (n || 2 === arguments.length)
                                for (var r, o = 0, i = e.length; o < i; o++)
                                    (!r && o in e) ||
                                        (r ||
                                            (r = Array.prototype.slice.call(
                                                e,
                                                0,
                                                o
                                            )),
                                        (r[o] = e[o]));
                            return t.concat(r || Array.prototype.slice.call(e));
                        },
                    a =
                        (this && this.__importDefault) ||
                        function (t) {
                            return t && t.__esModule ? t : { default: t };
                        };
                Object.defineProperty(e, "__esModule", { value: !0 });
                var s = a(n(573)),
                    u = a(n(684)),
                    c = {},
                    l = (function (t) {
                        function e(e) {
                            var n = t.call(this, e) || this;
                            return (
                                (n.Entry = (0, s.default)(
                                    n.constructor.connection,
                                    n.uid
                                )),
                                n
                            );
                        }
                        return (
                            o(e, t),
                            Object.defineProperty(e, "connection", {
                                get: function () {
                                    return c;
                                },
                                enumerable: !1,
                                configurable: !0,
                            }),
                            e
                        );
                    })(u.default);
                e.default = function (t) {
                    return (
                        (c = t),
                        new Proxy(l, {
                            apply: function (t, e, n) {
                                return new (t.bind.apply(
                                    t,
                                    i([void 0], n, !1)
                                ))();
                            },
                        })
                    );
                };
            },
            212: function (t, e, n) {
                "use strict";
                var r =
                        (this && this.__createBinding) ||
                        (Object.create
                            ? function (t, e, n, r) {
                                  void 0 === r && (r = n),
                                      Object.defineProperty(t, r, {
                                          enumerable: !0,
                                          get: function () {
                                              return e[n];
                                          },
                                      });
                              }
                            : function (t, e, n, r) {
                                  void 0 === r && (r = n), (t[r] = e[n]);
                              }),
                    o =
                        (this && this.__setModuleDefault) ||
                        (Object.create
                            ? function (t, e) {
                                  Object.defineProperty(t, "default", {
                                      enumerable: !0,
                                      value: e,
                                  });
                              }
                            : function (t, e) {
                                  t.default = e;
                              }),
                    i =
                        (this && this.__importStar) ||
                        function (t) {
                            if (t && t.__esModule) return t;
                            var e = {};
                            if (null != t)
                                for (var n in t)
                                    "default" !== n &&
                                        Object.prototype.hasOwnProperty.call(
                                            t,
                                            n
                                        ) &&
                                        r(e, t, n);
                            return o(e, t), e;
                        };
                Object.defineProperty(e, "__esModule", { value: !0 });
                var a = i(n(896));
                function s(t) {
                    return "string" == typeof t.data
                        ? Promise.reject(t.data)
                        : Promise.resolve(t.data);
                }
                function u(t) {
                    return Promise.reject(t);
                }
                var c = function (t) {
                        return function (e, n) {
                            if (e && n && "string" == typeof e && void 0 !== n)
                                return (
                                    (this._query.query[e] =
                                        this._query.query.file_size || {}),
                                    (this._query.query[e][t] = n),
                                    this
                                );
                            throw Error("Kindly provide valid parameters.");
                        };
                    },
                    l = function (t) {
                        var e = t ? "$in" : "$nin";
                        return function (t, n) {
                            if (
                                t &&
                                n &&
                                "string" == typeof t &&
                                Array.isArray(n)
                            )
                                return (
                                    (this._query.query[t] =
                                        this._query.query[t] || {}),
                                    (this._query.query[t][e] =
                                        this._query.query[t][e] || []),
                                    (this._query.query[t][e] =
                                        this._query.query[t][e].concat(n)),
                                    this
                                );
                            throw Error("Kindly provide valid parameters.");
                        };
                    },
                    f = function (t) {
                        return function (e) {
                            if (e && "string" == typeof e)
                                return (
                                    (this._query.query[e] =
                                        this._query.query[e] || {}),
                                    (this._query.query[e].$exists = t),
                                    this
                                );
                            throw Error("Kindly provide valid parameters.");
                        };
                    },
                    d = function (t) {
                        return function () {
                            for (
                                var e = [], n = 0, r = arguments.length;
                                n < r;
                                n += 1
                            )
                                arguments[n] instanceof y &&
                                arguments[n]._query.query
                                    ? e.push(arguments[n]._query.query)
                                    : "object" == typeof arguments[n] &&
                                      e.push(arguments[n]);
                            return (
                                this._query.query[t]
                                    ? (this._query.query[t] =
                                          this._query.query[t].concat(e))
                                    : (this._query.query[t] = e),
                                this
                            );
                        };
                    },
                    h = function (t) {
                        return function (e) {
                            if (e && "string" == typeof e)
                                return (this._query[t] = e), this;
                            throw Error("Argument should be a string.");
                        };
                    },
                    p = function (t) {
                        return function (e) {
                            if ("number" == typeof e)
                                return (this._query[t] = e), this;
                            throw Error("Argument should be a number.");
                        };
                    },
                    y = (function () {
                        function t(t, e, n) {
                            (this.module = e),
                                (this._connection = t),
                                (this._query = {}),
                                (this._query.query = this._query.query || {}),
                                (this.contentTypeUid = n),
                                (this.only = a.transform("only")),
                                (this.except = a.transform("except")),
                                (this.addQuery = a.addQuery),
                                (this.lessThan = c("$lt")),
                                (this.lessThanOrEqualTo = c("$lte")),
                                (this.greaterThan = c("$gt")),
                                (this.greaterThanOrEqualTo = c("$gte")),
                                (this.notEqualTo = c("$ne")),
                                (this.containedIn = l(!0)),
                                (this.notContainedIn = l(!1)),
                                (this.exists = f(!0)),
                                (this.notExists = f(!1)),
                                (this.ascending = h("asc")),
                                (this.descending = h("desc")),
                                (this.beforeUid = h("before_uid")),
                                (this.afterUid = h("after_uid")),
                                (this.skip = p("skip")),
                                (this.limit = p("limit")),
                                (this.or = d("$or")),
                                (this.and = d("$and")),
                                (this.addParam = a.addParam);
                        }
                        return (
                            (t.prototype.equalTo = function (t, e) {
                                if (t && "string" == typeof t)
                                    return (this._query.query[t] = e), this;
                                throw Error("Kindly provide valid parameters.");
                            }),
                            (t.prototype.where = function (t, e) {
                                if (t && "string" == typeof t)
                                    return (this._query.query[t] = e), this;
                                throw Error("Kindly provide valid parameters.");
                            }),
                            (t.prototype.count = function () {
                                this._query.count = !0;
                                var t = {
                                    content_type_uid: this.contentTypeUid,
                                    params: this._query,
                                    action: "get" + this.module,
                                };
                                return this._connection
                                    .sendToParent("stackQuery", t)
                                    .then(s)
                                    .catch(u);
                            }),
                            (t.prototype.query = function (t) {
                                if ("object" == typeof t)
                                    return (
                                        (this._query.query = a.mergeDeep(
                                            this._query.query,
                                            t
                                        )),
                                        this
                                    );
                                throw Error("Kindly provide valid parameters");
                            }),
                            (t.prototype.tags = function (t) {
                                if (Array.isArray(t))
                                    return (this._query.tags = t), this;
                                throw Error("Kindly provide valid parameters");
                            }),
                            (t.prototype.includeCount = function () {
                                return (this._query.include_count = !0), this;
                            }),
                            (t.prototype.getQuery = function () {
                                return this._query.query;
                            }),
                            (t.prototype.regex = function (t, e, n) {
                                if (
                                    t &&
                                    e &&
                                    "string" == typeof t &&
                                    "string" == typeof e
                                )
                                    return (
                                        (this._query.query[t] = { $regex: e }),
                                        n &&
                                            (this._query.query[t].$options = n),
                                        this
                                    );
                                throw Error("Kindly provide valid parameters.");
                            }),
                            (t.prototype.search = function (t) {
                                if (t && "string" == typeof t)
                                    return (this._query.typeahead = t), this;
                                throw Error("Kindly provide valid parameters.");
                            }),
                            (t.prototype.find = function () {
                                var t = {
                                    content_type_uid: this.contentTypeUid,
                                    params: this._query,
                                    action: "get" + this.module,
                                };
                                return this._connection
                                    .sendToParent("stackQuery", t)
                                    .then(s)
                                    .catch(u);
                            }),
                            (t.prototype.findOne = function () {
                                (this.singleEntry = !0),
                                    (this._query.limit = 1);
                                var t = {
                                    content_type_uid: this.contentTypeUid,
                                    params: this._query,
                                    action: "get" + this.module,
                                };
                                return this._connection
                                    .sendToParent("stackQuery", t)
                                    .then(s)
                                    .catch(u);
                            }),
                            t
                        );
                    })();
                e.default = y;
            },
            931: function (t, e, n) {
                "use strict";
                var r =
                        (this && this.__awaiter) ||
                        function (t, e, n, r) {
                            return new (n || (n = Promise))(function (o, i) {
                                function a(t) {
                                    try {
                                        u(r.next(t));
                                    } catch (t) {
                                        i(t);
                                    }
                                }
                                function s(t) {
                                    try {
                                        u(r.throw(t));
                                    } catch (t) {
                                        i(t);
                                    }
                                }
                                function u(t) {
                                    var e;
                                    t.done
                                        ? o(t.value)
                                        : ((e = t.value),
                                          e instanceof n
                                              ? e
                                              : new n(function (t) {
                                                    t(e);
                                                })).then(a, s);
                                }
                                u((r = r.apply(t, e || [])).next());
                            });
                        },
                    o =
                        (this && this.__generator) ||
                        function (t, e) {
                            var n,
                                r,
                                o,
                                i,
                                a = {
                                    label: 0,
                                    sent: function () {
                                        if (1 & o[0]) throw o[1];
                                        return o[1];
                                    },
                                    trys: [],
                                    ops: [],
                                };
                            return (
                                (i = { next: s(0), throw: s(1), return: s(2) }),
                                "function" == typeof Symbol &&
                                    (i[Symbol.iterator] = function () {
                                        return this;
                                    }),
                                i
                            );
                            function s(i) {
                                return function (s) {
                                    return (function (i) {
                                        if (n)
                                            throw new TypeError(
                                                "Generator is already executing."
                                            );
                                        for (; a; )
                                            try {
                                                if (
                                                    ((n = 1),
                                                    r &&
                                                        (o =
                                                            2 & i[0]
                                                                ? r.return
                                                                : i[0]
                                                                ? r.throw ||
                                                                  ((o =
                                                                      r.return) &&
                                                                      o.call(r),
                                                                  0)
                                                                : r.next) &&
                                                        !(o = o.call(r, i[1]))
                                                            .done)
                                                )
                                                    return o;
                                                switch (
                                                    ((r = 0),
                                                    o &&
                                                        (i = [
                                                            2 & i[0],
                                                            o.value,
                                                        ]),
                                                    i[0])
                                                ) {
                                                    case 0:
                                                    case 1:
                                                        o = i;
                                                        break;
                                                    case 4:
                                                        return (
                                                            a.label++,
                                                            {
                                                                value: i[1],
                                                                done: !1,
                                                            }
                                                        );
                                                    case 5:
                                                        a.label++,
                                                            (r = i[1]),
                                                            (i = [0]);
                                                        continue;
                                                    case 7:
                                                        (i = a.ops.pop()),
                                                            a.trys.pop();
                                                        continue;
                                                    default:
                                                        if (
                                                            !(
                                                                (o =
                                                                    (o = a.trys)
                                                                        .length >
                                                                        0 &&
                                                                    o[
                                                                        o.length -
                                                                            1
                                                                    ]) ||
                                                                (6 !== i[0] &&
                                                                    2 !== i[0])
                                                            )
                                                        ) {
                                                            a = 0;
                                                            continue;
                                                        }
                                                        if (
                                                            3 === i[0] &&
                                                            (!o ||
                                                                (i[1] > o[0] &&
                                                                    i[1] <
                                                                        o[3]))
                                                        ) {
                                                            a.label = i[1];
                                                            break;
                                                        }
                                                        if (
                                                            6 === i[0] &&
                                                            a.label < o[1]
                                                        ) {
                                                            (a.label = o[1]),
                                                                (o = i);
                                                            break;
                                                        }
                                                        if (
                                                            o &&
                                                            a.label < o[2]
                                                        ) {
                                                            (a.label = o[2]),
                                                                a.ops.push(i);
                                                            break;
                                                        }
                                                        o[2] && a.ops.pop(),
                                                            a.trys.pop();
                                                        continue;
                                                }
                                                i = e.call(t, a);
                                            } catch (t) {
                                                (i = [6, t]), (r = 0);
                                            } finally {
                                                n = o = 0;
                                            }
                                        if (5 & i[0]) throw i[1];
                                        return {
                                            value: i[0] ? i[1] : void 0,
                                            done: !0,
                                        };
                                    })([i, s]);
                                };
                            }
                        },
                    i =
                        (this && this.__importDefault) ||
                        function (t) {
                            return t && t.__esModule ? t : { default: t };
                        };
                Object.defineProperty(e, "__esModule", { value: !0 });
                var a = i(n(160)),
                    s = i(n(701)),
                    u = n(974),
                    c = (function () {
                        function t(t, e, n) {
                            void 0 === t && (t = {}),
                                (this._currentBranch = null),
                                (this._connection = e),
                                (this._data = t),
                                (this.ContentType = (0, s.default)(e)),
                                (this.Asset = (0, a.default)(e)),
                                n.currentBranch &&
                                    (this._currentBranch =
                                        (t.branches || []).find(function (t) {
                                            return t.uid === n.currentBranch;
                                        }) || null);
                        }
                        return (
                            (t.prototype.getData = function () {
                                return this._data;
                            }),
                            (t.prototype.getAllStacks = function (t) {
                                var e = void 0 === t ? {} : t,
                                    n = e.orgUid,
                                    i = void 0 === n ? "" : n,
                                    a = e.params,
                                    s = void 0 === a ? {} : a;
                                return r(this, void 0, void 0, function () {
                                    var t;
                                    return o(this, function (e) {
                                        if ("string" != typeof i)
                                            throw new TypeError(
                                                "orgUid must be a string"
                                            );
                                        return (
                                            (t = {
                                                action: "getStacks",
                                                headers: {
                                                    organization_uid:
                                                        i || this._data.org_uid,
                                                },
                                                skip_api_key: !0,
                                                params: s,
                                            }),
                                            [
                                                2,
                                                this._connection
                                                    .sendToParent(
                                                        "stackQuery",
                                                        t
                                                    )
                                                    .then(u.onData)
                                                    .then(function (t) {
                                                        return t.stacks || [];
                                                    })
                                                    .catch(u.onError),
                                            ]
                                        );
                                    });
                                });
                            }),
                            (t.prototype.getManagementTokens = function () {
                                return r(this, void 0, void 0, function () {
                                    var t,
                                        e = this;
                                    return o(this, function (n) {
                                        return (
                                            (t = {
                                                action: "getManagementTokens",
                                            }),
                                            [
                                                2,
                                                this._connection
                                                    .sendToParent(
                                                        "stackQuery",
                                                        t
                                                    )
                                                    .then(function (t) {
                                                        return r(
                                                            e,
                                                            void 0,
                                                            void 0,
                                                            function () {
                                                                return o(
                                                                    this,
                                                                    function (
                                                                        e
                                                                    ) {
                                                                        switch (
                                                                            e.label
                                                                        ) {
                                                                            case 0:
                                                                                return [
                                                                                    4,
                                                                                    (0,
                                                                                    u.onData)(
                                                                                        t
                                                                                    ),
                                                                                ];
                                                                            case 1:
                                                                                return [
                                                                                    2,
                                                                                    e.sent()
                                                                                        .tokens ||
                                                                                        [],
                                                                                ];
                                                                        }
                                                                    }
                                                                );
                                                            }
                                                        );
                                                    })
                                                    .catch(u.onError),
                                            ]
                                        );
                                    });
                                });
                            }),
                            (t.prototype.search = function (t, e) {
                                void 0 === e && (e = this._data.api_key);
                                var n = {
                                    params: t,
                                    api_key: e,
                                    action: "search",
                                };
                                return this._connection
                                    .sendToParent("stackQuery", n)
                                    .then(u.onData)
                                    .catch(u.onError);
                            }),
                            (t.prototype.getContentType = function (t, e) {
                                if ((void 0 === e && (e = {}), !t))
                                    return Promise.reject(
                                        new Error("uid is required")
                                    );
                                var n = {
                                    uid: t,
                                    params: e,
                                    action: "getContentType",
                                };
                                return this._connection
                                    .sendToParent("stackQuery", n)
                                    .then(u.onData)
                                    .catch(u.onError);
                            }),
                            (t.prototype.getContentTypes = function (t, e) {
                                void 0 === t && (t = {}),
                                    void 0 === e && (e = {});
                                var n = e;
                                n.query = t;
                                var r = {
                                    params: n,
                                    action: "getContentTypes",
                                };
                                return this._connection
                                    .sendToParent("stackQuery", r)
                                    .then(u.onData)
                                    .catch(u.onError);
                            }),
                            (t.prototype.getEnvironment = function (t, e) {
                                if ((void 0 === e && (e = {}), !t))
                                    return Promise.reject(
                                        new Error("name is required")
                                    );
                                var n = {
                                    name: t,
                                    params: e,
                                    action: "getEnvironment",
                                };
                                return this._connection
                                    .sendToParent("stackQuery", n)
                                    .then(u.onData)
                                    .catch(u.onError);
                            }),
                            (t.prototype.getEnvironments = function (t, e) {
                                void 0 === t && (t = {}),
                                    void 0 === e && (e = {});
                                var n = e;
                                n.query = t;
                                var r = {
                                    params: n,
                                    action: "getEnvironments",
                                };
                                return this._connection
                                    .sendToParent("stackQuery", r)
                                    .then(u.onData)
                                    .catch(u.onError);
                            }),
                            (t.prototype.getReleases = function (t, e) {
                                void 0 === t && (t = {}),
                                    void 0 === e && (e = {});
                                var n = e;
                                n.query = t;
                                var r = { params: n, action: "getReleases" };
                                return this._connection
                                    .sendToParent("stackQuery", r)
                                    .then(u.onData)
                                    .catch(u.onError);
                            }),
                            (t.prototype.getPublishes = function (t, e) {
                                void 0 === t && (t = {}),
                                    void 0 === e && (e = {});
                                var n = e;
                                n.query = t;
                                var r = { params: n, action: "getPublishes" };
                                return this._connection
                                    .sendToParent("stackQuery", r)
                                    .then(u.onData)
                                    .catch(u.onError);
                            }),
                            (t.prototype.getLocale = function (t, e) {
                                if ((void 0 === e && (e = {}), !t))
                                    return Promise.reject(
                                        new Error("code is required")
                                    );
                                var n = {
                                    code: t,
                                    params: e,
                                    action: "getLocale",
                                };
                                return this._connection
                                    .sendToParent("stackQuery", n)
                                    .then(u.onData)
                                    .catch(u.onError);
                            }),
                            (t.prototype.getLocales = function (t, e) {
                                void 0 === t && (t = {}),
                                    void 0 === e && (e = {});
                                var n = e;
                                n.query = t;
                                var r = { params: n, action: "getLocales" };
                                return this._connection
                                    .sendToParent("stackQuery", r)
                                    .then(u.onData)
                                    .catch(u.onError);
                            }),
                            (t.prototype.getWorkflow = function (t, e) {
                                if ((void 0 === e && (e = {}), !t))
                                    return Promise.reject(
                                        new Error("workflow uid is required")
                                    );
                                var n = {
                                    uid: t,
                                    params: e,
                                    action: "getWorkflow",
                                };
                                return this._connection
                                    .sendToParent("stackQuery", n)
                                    .then(u.onData)
                                    .catch(u.onError);
                            }),
                            (t.prototype.getWorkflows = function (t, e) {
                                void 0 === t && (t = {}),
                                    void 0 === e && (e = {});
                                var n = e;
                                n.query = t;
                                var r = { params: n, action: "getWorkflows" };
                                return this._connection
                                    .sendToParent("stackQuery", r)
                                    .then(u.onData)
                                    .catch(u.onError);
                            }),
                            (t.prototype.getAllBranches = function () {
                                return this._data.branches || [];
                            }),
                            (t.prototype.getCurrentBranch = function () {
                                return this._currentBranch;
                            }),
                            t
                        );
                    })();
                e.default = c;
            },
            896: (t, e) => {
                "use strict";
                Object.defineProperty(e, "__esModule", { value: !0 }),
                    (e.getReferences =
                        e.includeReference =
                        e.includeSchema =
                        e.includeContentType =
                        e.includeOwner =
                        e.environment =
                        e.language =
                        e.addQuery =
                        e.addParam =
                        e._type =
                        e.mergeDeep =
                        e.merge =
                        e.transform =
                            void 0),
                    (e.transform = function (t) {
                        return function () {
                            switch (arguments.length) {
                                case 1:
                                    if (
                                        Array.isArray(arguments[0]) ||
                                        "string" == typeof arguments[0]
                                    )
                                        return (
                                            (e = (e =
                                                this._query[t + "[BASE]"] ||
                                                []).concat(arguments[0])),
                                            (this._query[t + "[BASE]"] = e),
                                            this
                                        );
                                    throw Error(
                                        "Kindly provide valid parameters"
                                    );
                                case 2:
                                    var e;
                                    if (
                                        "string" == typeof arguments[0] &&
                                        (Array.isArray(arguments[1]) ||
                                            "string" == typeof arguments[1])
                                    )
                                        return (
                                            (e = (e =
                                                this._query[
                                                    t + "[" + arguments[0] + "]"
                                                ] || []).concat(arguments[1])),
                                            (this._query[
                                                t + "[" + arguments[0] + "]"
                                            ] = e),
                                            this
                                        );
                                    throw Error(
                                        "Kindly provide valid parameters"
                                    );
                                default:
                                    throw Error(
                                        "Kindly provide valid parameters"
                                    );
                            }
                        };
                    }),
                    (e.merge = function (t, e) {
                        var n = t;
                        return (
                            t &&
                                e &&
                                Object.keys(e).forEach(function (t) {
                                    n[t] = e[t];
                                }),
                            n
                        );
                    }),
                    (e.mergeDeep = function (t, e) {
                        var n = t,
                            r = this,
                            o = function (t, e) {
                                var n = t;
                                Object.keys(e).forEach(function (t) {
                                    "object" === r._type(e[t]) &&
                                    r._type(n[t]) === r._type(e[t])
                                        ? o(n[t], e[t])
                                        : "array" === r._type(e[t]) &&
                                          r._type(n[t]) === r._type(e[t])
                                        ? (n[t] = n[t].concat(e[t]))
                                        : (n[t] = e[t]);
                                });
                            };
                        return o(n, e), n;
                    }),
                    (e._type = function (t) {
                        var e = typeof t;
                        return (
                            "object" === e && Array.isArray(t) && (e = "array"),
                            e
                        );
                    }),
                    (e.addParam = function (t, e) {
                        if (
                            t &&
                            "string" == typeof t &&
                            e &&
                            "string" == typeof e
                        )
                            return (this._query[t] = e), this;
                        throw Error("Kindly provide valid parameters.");
                    }),
                    (e.addQuery = function (t, e) {
                        if (t && e && "string" == typeof t)
                            return (this._query[t] = e), this;
                        throw Error("First argument should be a String.");
                    }),
                    (e.language = function (t) {
                        if (t && "string" == typeof t)
                            return (this._query.locale = t), this;
                        throw Error("Argument should be a String.");
                    }),
                    (e.environment = function (t) {
                        if (t && "string" == typeof t)
                            return (this._query.environment = t), this;
                        throw Error("Argument should be a String.");
                    }),
                    (e.includeOwner = function () {
                        return (this._query.include_owner = !0), this;
                    }),
                    (e.includeContentType = function () {
                        return (this._query.include_content_type = !0), this;
                    }),
                    (e.includeSchema = function () {
                        return (this._query.include_schema = !0), this;
                    }),
                    (e.includeReference = function (t) {
                        if (Array.isArray(t))
                            for (var e = 0; e < t.length; e += 1)
                                (this._query["include[]"] =
                                    this._query["include[]"] || []),
                                    (this._query["include[]"] = this._query[
                                        "include[]"
                                    ].concat(t[e]));
                        else {
                            if ("string" != typeof t)
                                throw Error(
                                    "Argument should be a String or an Array."
                                );
                            for (e = 0; e < arguments.length; e += 1)
                                (this._query["include[]"] =
                                    this._query["include[]"] || []),
                                    (this._query["include[]"] = this._query[
                                        "include[]"
                                    ].concat(arguments[e]));
                        }
                        return this;
                    }),
                    (e.getReferences = function () {
                        return this.fetch(
                            "get" + this.constructor.module() + "References"
                        );
                    });
            },
            923: (t, e, n) => {
                "use strict";
                Object.defineProperty(e, "__esModule", { value: !0 });
                var r = n(974),
                    o = (function () {
                        function t(t) {
                            this._connection = t;
                        }
                        return (
                            (t.prototype.get = function (t) {
                                if (!t || "string" != typeof t)
                                    throw new Error(
                                        "Kindly provide valid parameters"
                                    );
                                return this._connection
                                    .sendToParent("store", {
                                        action: "get",
                                        key: t,
                                    })
                                    .then(function (t) {
                                        return Promise.resolve(t.data);
                                    })
                                    .catch(r.onError);
                            }),
                            (t.prototype.getAll = function () {
                                return this._connection
                                    .sendToParent("store", { action: "getAll" })
                                    .then(function (t) {
                                        var e = t.data,
                                            n = void 0 === e ? {} : e;
                                        return Promise.resolve(n);
                                    })
                                    .catch(r.onError);
                            }),
                            (t.prototype.set = function (t, e) {
                                if (!t || !e || "string" != typeof t)
                                    throw new Error(
                                        "Kindly provide valid parameters"
                                    );
                                return this._connection
                                    .sendToParent("store", {
                                        action: "set",
                                        key: t,
                                        value: e,
                                    })
                                    .then(function () {
                                        return Promise.resolve(!0);
                                    })
                                    .catch(r.onError);
                            }),
                            (t.prototype.remove = function (t) {
                                if (!t || "string" != typeof t)
                                    throw new Error(
                                        "Kindly provide valid parameters"
                                    );
                                return this._connection
                                    .sendToParent("store", {
                                        action: "remove",
                                        key: t,
                                    })
                                    .then(function () {
                                        return Promise.resolve(!0);
                                    })
                                    .catch(r.onError);
                            }),
                            (t.prototype.clear = function () {
                                return this._connection
                                    .sendToParent("store", { action: "clear" })
                                    .then(function () {
                                        return Promise.resolve(!0);
                                    })
                                    .catch(r.onError);
                            }),
                            t
                        );
                    })();
                e.default = o;
            },
            699: (t, e) => {
                "use strict";
                var n, r, o, i;
                Object.defineProperty(e, "__esModule", { value: !0 }),
                    (e.Region =
                        e.OrganizationLocation =
                        e.StackLocation =
                        e.LocationType =
                        e.DashboardWidth =
                            void 0),
                    ((i =
                        e.DashboardWidth ||
                        (e.DashboardWidth = {})).FULL_WIDTH = "full_width"),
                    (i.HALF_WIDTH = "half_width"),
                    ((o =
                        e.LocationType ||
                        (e.LocationType = {})).APP_CONFIG_WIDGET =
                        "APP_CONFIG_WIDGET"),
                    (o.ASSET_SIDEBAR_WIDGET = "ASSET_SIDEBAR_WIDGET"),
                    (o.DASHBOARD = "DASHBOARD"),
                    (o.FIELD = "FIELD"),
                    (o.FIELD_MODIFIER_LOCATION = "FIELD_MODIFIER_LOCATION"),
                    (o.FULL_PAGE_LOCATION = "FULL_PAGE_LOCATION"),
                    (o.RTE = "RTE"),
                    (o.WIDGET = "WIDGET"),
                    ((r =
                        e.StackLocation ||
                        (e.StackLocation = {})).STACK_CONFIG =
                        "cs.cm.stack.config"),
                    (r.DASHBOARD = "cs.cm.stack.dashboard"),
                    (r.SIDEBAR = "cs.cm.stack.sidebar"),
                    (r.CUSTOM_FIELD = "cs.cm.stack.custom_field"),
                    (r.RTE = "cs.cm.stack.rte"),
                    ((
                        e.OrganizationLocation || (e.OrganizationLocation = {})
                    ).ORG_CONFIG = "cs.org.config"),
                    ((n = e.Region || (e.Region = {})).UNKNOWN = "UNKNOWN"),
                    (n.NA = "NA"),
                    (n.EU = "EU"),
                    (n.AZURE_NA = "AZURE_NA"),
                    (n.AZURE_EU = "AZURE_EU");
            },
            194: (t, e) => {
                "use strict";
                Object.defineProperty(e, "__esModule", { value: !0 }),
                    (e.ERROR_MESSAGES = void 0),
                    (e.ERROR_MESSAGES = Object.freeze({
                        configPage: {
                            setValidity: {
                                isValidTypeBoolean:
                                    "isValid should be a boolean",
                                messageTypeString: "message should be a string",
                            },
                        },
                        entryField: {
                            entry: {
                                tagsShouldNotBeBlank: "Tags cannot be blank",
                                tagsShouldBeArrayOfStrings:
                                    "Tags must be an array of strings",
                            },
                            frame: {
                                dimensionHeightShouldBeNumber:
                                    "Dimension height must be a number",
                                dimensionWidthShouldBeNumber:
                                    "Dimension width must be a number",
                            },
                        },
                    })),
                    (e.default = function (t) {
                        return "Contentstack App SDK: " + t;
                    });
            },
            974: (t, e, n) => {
                "use strict";
                Object.defineProperty(e, "__esModule", { value: !0 }),
                    (e.getPreferredBodyElement =
                        e.formatAppRegion =
                        e.onError =
                        e.onData =
                            void 0);
                var r = n(699);
                (e.onData = function (t) {
                    return "string" == typeof t.data
                        ? Promise.reject(t.data)
                        : Promise.resolve(t.data);
                }),
                    (e.onError = function (t) {
                        return Promise.reject(t);
                    }),
                    (e.formatAppRegion = function (t) {
                        switch (t) {
                            case "NA":
                                return r.Region.NA;
                            case "EU":
                                return r.Region.EU;
                            case "AZURE_NA":
                                return r.Region.AZURE_NA;
                            case "AZURE_EU":
                                return r.Region.AZURE_EU;
                            default:
                                return r.Region.UNKNOWN;
                        }
                    }),
                    (e.getPreferredBodyElement = function (t) {
                        var e,
                            n = 1 / 0,
                            r = [
                                "HEADER",
                                "NAV",
                                "MAIN",
                                "SECTION",
                                "ARTICLE",
                                "ASIDE",
                                "FOOTER",
                                "DIV",
                            ],
                            o = ["SCRIPT", "NOSCRIPT", "STYLE", "TEMPLATE"];
                        return (
                            Array.from(t).forEach(function (t) {
                                var o = r.indexOf(t.nodeName);
                                o >= 0 && o < n && ((n = o), (e = t));
                            }),
                            e ||
                                (e = Array.from(t).find(function (t) {
                                    return !o.includes(t.nodeName);
                                })),
                            e || t[0]
                        );
                    });
            },
            362: function (t, e, n) {
                "use strict";
                var r =
                        (this && this.__awaiter) ||
                        function (t, e, n, r) {
                            return new (n || (n = Promise))(function (o, i) {
                                function a(t) {
                                    try {
                                        u(r.next(t));
                                    } catch (t) {
                                        i(t);
                                    }
                                }
                                function s(t) {
                                    try {
                                        u(r.throw(t));
                                    } catch (t) {
                                        i(t);
                                    }
                                }
                                function u(t) {
                                    var e;
                                    t.done
                                        ? o(t.value)
                                        : ((e = t.value),
                                          e instanceof n
                                              ? e
                                              : new n(function (t) {
                                                    t(e);
                                                })).then(a, s);
                                }
                                u((r = r.apply(t, e || [])).next());
                            });
                        },
                    o =
                        (this && this.__generator) ||
                        function (t, e) {
                            var n,
                                r,
                                o,
                                i,
                                a = {
                                    label: 0,
                                    sent: function () {
                                        if (1 & o[0]) throw o[1];
                                        return o[1];
                                    },
                                    trys: [],
                                    ops: [],
                                };
                            return (
                                (i = { next: s(0), throw: s(1), return: s(2) }),
                                "function" == typeof Symbol &&
                                    (i[Symbol.iterator] = function () {
                                        return this;
                                    }),
                                i
                            );
                            function s(i) {
                                return function (s) {
                                    return (function (i) {
                                        if (n)
                                            throw new TypeError(
                                                "Generator is already executing."
                                            );
                                        for (; a; )
                                            try {
                                                if (
                                                    ((n = 1),
                                                    r &&
                                                        (o =
                                                            2 & i[0]
                                                                ? r.return
                                                                : i[0]
                                                                ? r.throw ||
                                                                  ((o =
                                                                      r.return) &&
                                                                      o.call(r),
                                                                  0)
                                                                : r.next) &&
                                                        !(o = o.call(r, i[1]))
                                                            .done)
                                                )
                                                    return o;
                                                switch (
                                                    ((r = 0),
                                                    o &&
                                                        (i = [
                                                            2 & i[0],
                                                            o.value,
                                                        ]),
                                                    i[0])
                                                ) {
                                                    case 0:
                                                    case 1:
                                                        o = i;
                                                        break;
                                                    case 4:
                                                        return (
                                                            a.label++,
                                                            {
                                                                value: i[1],
                                                                done: !1,
                                                            }
                                                        );
                                                    case 5:
                                                        a.label++,
                                                            (r = i[1]),
                                                            (i = [0]);
                                                        continue;
                                                    case 7:
                                                        (i = a.ops.pop()),
                                                            a.trys.pop();
                                                        continue;
                                                    default:
                                                        if (
                                                            !(
                                                                (o =
                                                                    (o = a.trys)
                                                                        .length >
                                                                        0 &&
                                                                    o[
                                                                        o.length -
                                                                            1
                                                                    ]) ||
                                                                (6 !== i[0] &&
                                                                    2 !== i[0])
                                                            )
                                                        ) {
                                                            a = 0;
                                                            continue;
                                                        }
                                                        if (
                                                            3 === i[0] &&
                                                            (!o ||
                                                                (i[1] > o[0] &&
                                                                    i[1] <
                                                                        o[3]))
                                                        ) {
                                                            a.label = i[1];
                                                            break;
                                                        }
                                                        if (
                                                            6 === i[0] &&
                                                            a.label < o[1]
                                                        ) {
                                                            (a.label = o[1]),
                                                                (o = i);
                                                            break;
                                                        }
                                                        if (
                                                            o &&
                                                            a.label < o[2]
                                                        ) {
                                                            (a.label = o[2]),
                                                                a.ops.push(i);
                                                            break;
                                                        }
                                                        o[2] && a.ops.pop(),
                                                            a.trys.pop();
                                                        continue;
                                                }
                                                i = e.call(t, a);
                                            } catch (t) {
                                                (i = [6, t]), (r = 0);
                                            } finally {
                                                n = o = 0;
                                            }
                                        if (5 & i[0]) throw i[1];
                                        return {
                                            value: i[0] ? i[1] : void 0,
                                            done: !0,
                                        };
                                    })([i, s]);
                                };
                            }
                        },
                    i =
                        (this && this.__importDefault) ||
                        function (t) {
                            return t && t.__esModule ? t : { default: t };
                        };
                Object.defineProperty(e, "__esModule", { value: !0 });
                var a,
                    s = i(n(727)),
                    u = n(699),
                    c = { attributes: !0, childList: !0, subtree: !0 },
                    l = (function () {
                        function t(t, e, n, r) {
                            void 0 === r && (r = u.DashboardWidth.HALF_WIDTH),
                                (this._connection = t || s.default),
                                (this._autoResizingEnabled = !1),
                                (this._resizingEnabled = !1),
                                (this.type = e),
                                (this.state = r),
                                (this._emitter = n);
                        }
                        return (
                            (t.prototype.enableResizing = function () {
                                return r(this, void 0, void 0, function () {
                                    return o(this, function (t) {
                                        switch (t.label) {
                                            case 0:
                                                return this.type !==
                                                    u.LocationType.DASHBOARD
                                                    ? [2, Promise.resolve()]
                                                    : ((this._resizingEnabled =
                                                          !0),
                                                      [
                                                          4,
                                                          this._connection.sendToParent(
                                                              "window",
                                                              {
                                                                  action: "enableResizing",
                                                              }
                                                          ),
                                                      ]);
                                            case 1:
                                                return t.sent(), [2];
                                        }
                                    });
                                });
                            }),
                            (t.prototype.onDashboardResize = function (t) {
                                var e = this;
                                if (this.type !== u.LocationType.DASHBOARD)
                                    return !1;
                                if (!t || "function" != typeof t)
                                    throw Error("Callback must be a function");
                                return (
                                    e._emitter.on(
                                        "dashboardResize",
                                        function (n) {
                                            (e.state = n.state), t(n.state);
                                        }
                                    ),
                                    !0
                                );
                            }),
                            (t.prototype.updateHeight = function (t) {
                                return r(this, void 0, void 0, function () {
                                    return o(this, function (e) {
                                        switch (e.label) {
                                            case 0:
                                                if (
                                                    this.type ===
                                                        u.LocationType
                                                            .DASHBOARD &&
                                                    this.state ===
                                                        u.DashboardWidth
                                                            .HALF_WIDTH
                                                )
                                                    return [
                                                        2,
                                                        Promise.resolve(),
                                                    ];
                                                if (!t || isNaN(t))
                                                    this._height = Math.ceil(
                                                        document.documentElement.getBoundingClientRect()
                                                            .height
                                                    );
                                                else {
                                                    if (this._height === t)
                                                        return [
                                                            2,
                                                            Promise.resolve(),
                                                        ];
                                                    this._height = t;
                                                }
                                                return [
                                                    4,
                                                    this._connection.sendToParent(
                                                        "resize",
                                                        this._height
                                                    ),
                                                ];
                                            case 1:
                                                return e.sent(), [2];
                                        }
                                    });
                                });
                            }),
                            (t.prototype.enableAutoResizing = function () {
                                return (
                                    this._autoResizingEnabled ||
                                        (this.state ===
                                            u.DashboardWidth.HALF_WIDTH &&
                                            this.type ===
                                                u.LocationType.DASHBOARD) ||
                                        ((this._autoResizingEnabled = !0),
                                        (a = new MutationObserver(
                                            this.updateHeight.bind(this)
                                        )).observe(window.document.body, c)),
                                    this
                                );
                            }),
                            (t.prototype.disableAutoResizing = function () {
                                return this._autoResizingEnabled
                                    ? ((this._autoResizingEnabled = !1),
                                      a.disconnect(),
                                      this)
                                    : this;
                            }),
                            (t.prototype.enablePaddingTop = function () {
                                return r(this, void 0, void 0, function () {
                                    return o(this, function (t) {
                                        switch (t.label) {
                                            case 0:
                                                return [
                                                    4,
                                                    s.default.sendToParent(
                                                        "window",
                                                        {
                                                            action: "dashboardEnableTopPadding",
                                                        }
                                                    ),
                                                ];
                                            case 1:
                                                return t.sent(), [2];
                                        }
                                    });
                                });
                            }),
                            (t.prototype.disablePaddingTop = function () {
                                return r(this, void 0, void 0, function () {
                                    return o(this, function (t) {
                                        switch (t.label) {
                                            case 0:
                                                return [
                                                    4,
                                                    s.default.sendToParent(
                                                        "window",
                                                        {
                                                            action: "dashboardDisableTopPadding",
                                                        }
                                                    ),
                                                ];
                                            case 1:
                                                return t.sent(), [2];
                                        }
                                    });
                                });
                            }),
                            t
                        );
                    })();
                e.default = l;
            },
            795: function (t, e, n) {
                var r;
                !(function (e) {
                    "use strict";
                    function o() {}
                    var i = o.prototype,
                        a = e.EventEmitter;
                    function s(t, e) {
                        for (var n = t.length; n--; )
                            if (t[n].listener === e) return n;
                        return -1;
                    }
                    function u(t) {
                        return function () {
                            return this[t].apply(this, arguments);
                        };
                    }
                    function c(t) {
                        return (
                            "function" == typeof t ||
                            t instanceof RegExp ||
                            (!(!t || "object" != typeof t) && c(t.listener))
                        );
                    }
                    (i.getListeners = function (t) {
                        var e,
                            n,
                            r = this._getEvents();
                        if (t instanceof RegExp)
                            for (n in ((e = {}), r))
                                r.hasOwnProperty(n) &&
                                    t.test(n) &&
                                    (e[n] = r[n]);
                        else e = r[t] || (r[t] = []);
                        return e;
                    }),
                        (i.flattenListeners = function (t) {
                            var e,
                                n = [];
                            for (e = 0; e < t.length; e += 1)
                                n.push(t[e].listener);
                            return n;
                        }),
                        (i.getListenersAsObject = function (t) {
                            var e,
                                n = this.getListeners(t);
                            return (
                                n instanceof Array && ((e = {})[t] = n), e || n
                            );
                        }),
                        (i.addListener = function (t, e) {
                            if (!c(e))
                                throw new TypeError(
                                    "listener must be a function"
                                );
                            var n,
                                r = this.getListenersAsObject(t),
                                o = "object" == typeof e;
                            for (n in r)
                                r.hasOwnProperty(n) &&
                                    -1 === s(r[n], e) &&
                                    r[n].push(
                                        o ? e : { listener: e, once: !1 }
                                    );
                            return this;
                        }),
                        (i.on = u("addListener")),
                        (i.addOnceListener = function (t, e) {
                            return this.addListener(t, {
                                listener: e,
                                once: !0,
                            });
                        }),
                        (i.once = u("addOnceListener")),
                        (i.defineEvent = function (t) {
                            return this.getListeners(t), this;
                        }),
                        (i.defineEvents = function (t) {
                            for (var e = 0; e < t.length; e += 1)
                                this.defineEvent(t[e]);
                            return this;
                        }),
                        (i.removeListener = function (t, e) {
                            var n,
                                r,
                                o = this.getListenersAsObject(t);
                            for (r in o)
                                o.hasOwnProperty(r) &&
                                    -1 !== (n = s(o[r], e)) &&
                                    o[r].splice(n, 1);
                            return this;
                        }),
                        (i.off = u("removeListener")),
                        (i.addListeners = function (t, e) {
                            return this.manipulateListeners(!1, t, e);
                        }),
                        (i.removeListeners = function (t, e) {
                            return this.manipulateListeners(!0, t, e);
                        }),
                        (i.manipulateListeners = function (t, e, n) {
                            var r,
                                o,
                                i = t ? this.removeListener : this.addListener,
                                a = t
                                    ? this.removeListeners
                                    : this.addListeners;
                            if ("object" != typeof e || e instanceof RegExp)
                                for (r = n.length; r--; ) i.call(this, e, n[r]);
                            else
                                for (r in e)
                                    e.hasOwnProperty(r) &&
                                        (o = e[r]) &&
                                        ("function" == typeof o
                                            ? i.call(this, r, o)
                                            : a.call(this, r, o));
                            return this;
                        }),
                        (i.removeEvent = function (t) {
                            var e,
                                n = typeof t,
                                r = this._getEvents();
                            if ("string" === n) delete r[t];
                            else if (t instanceof RegExp)
                                for (e in r)
                                    r.hasOwnProperty(e) &&
                                        t.test(e) &&
                                        delete r[e];
                            else delete this._events;
                            return this;
                        }),
                        (i.removeAllListeners = u("removeEvent")),
                        (i.emitEvent = function (t, e) {
                            var n,
                                r,
                                o,
                                i,
                                a = this.getListenersAsObject(t);
                            for (i in a)
                                if (a.hasOwnProperty(i))
                                    for (
                                        n = a[i].slice(0), o = 0;
                                        o < n.length;
                                        o++
                                    )
                                        !0 === (r = n[o]).once &&
                                            this.removeListener(t, r.listener),
                                            r.listener.apply(this, e || []) ===
                                                this._getOnceReturnValue() &&
                                                this.removeListener(
                                                    t,
                                                    r.listener
                                                );
                            return this;
                        }),
                        (i.trigger = u("emitEvent")),
                        (i.emit = function (t) {
                            var e = Array.prototype.slice.call(arguments, 1);
                            return this.emitEvent(t, e);
                        }),
                        (i.setOnceReturnValue = function (t) {
                            return (this._onceReturnValue = t), this;
                        }),
                        (i._getOnceReturnValue = function () {
                            return (
                                !this.hasOwnProperty("_onceReturnValue") ||
                                this._onceReturnValue
                            );
                        }),
                        (i._getEvents = function () {
                            return this._events || (this._events = {});
                        }),
                        (o.noConflict = function () {
                            return (e.EventEmitter = a), o;
                        }),
                        void 0 ===
                            (r = function () {
                                return o;
                            }.call(e, n, e, t)) || (t.exports = r);
                })("undefined" != typeof window ? window : this || {});
            },
            147: (t) => {
                "use strict";
                t.exports = JSON.parse(
                    '{"name":"@contentstack/app-sdk","version":"1.6.0","types":"dist/src/index.d.ts","description":"This SDK helps connect to the development server of the Contentstack and sync the data.","main":"dist/index.js","repository":"https://github.com/contentstack/app-sdk","scripts":{"prepublish":"npm run build","build":"webpack","test":"jest","test:watch":"jest --watchAll","test:coverage":"jest --coverage --coverageDirectory=\\"coverage\\"","dev":"webpack --watch --mode development","lint":"eslint . --ext .ts --max-warnings=0","docs":"typedoc","prettier":"npx prettier src --check","prettier:fix":"npx prettier src --write","lint:fix":"eslint --fix","prepare":"npm run build && husky install","format":"npm run prettier:fix && npm run lint:fix","docs:jsdoc":"node_modules/.bin/jsdoc --configure .jsdoc.json --readme README.md --verbose"},"keywords":[],"author":{"name":"Contentstack","url":"https://www.contentstack.com/"},"maintainers":[{"name":"Deepak Kharah","email":"deepak.kharah@contentstack.com"}],"license":"MIT","devDependencies":{"@babel/core":"^7.2.2","@babel/preset-env":"^7.3.1","@testing-library/jest-dom":"^5.16.5","@types/chai":"^4.2.22","@types/jest":"^27.0.2","@types/react":"^17.0.18","@typescript-eslint/eslint-plugin":"^5.10.1","@typescript-eslint/parser":"^5.10.1","babel-loader":"^9.1.0","better-docs":"^2.7.2","chai":"^4.3.4","css-loader":"^5.2.2","eslint":"^8.7.0","eslint-plugin-only-warn":"^1.1.0","husky":"^8.0.0","jest":"^27.3.1","jsdoc":"^3.6.11","jsdoc-plugin-typescript":"^2.2.1","lint-staged":"^13.1.0","react":"^17.0.2","slate":"^0.72.3","ts-jest":"^27.0.7","ts-loader":"^8.1.0","ts-node":"^10.3.0","typedoc":"^0.22.18","typedoc-plugin-rename-defaults":"^0.6.5","typescript":"^4.4.4","webpack":"^5.65.0","webpack-cli":"^4.9.1","webpack-dev-server":"^4.7.3"},"dependencies":{"loader-utils":"^3.2.1","post-robot":"^8.0.31","wolfy87-eventemitter":"^5.2.9"},"files":["dist"],"lint-staged":{"src/**/*.{ts,css,md}":["npm run prettier:fix ","npm run lint:fix"]}}'
                );
            },
        }),
        (e = {}),
        (function n(r) {
            var o = e[r];
            if (void 0 !== o) return o.exports;
            var i = (e[r] = { exports: {} });
            return t[r].call(i.exports, i, i.exports, n), i.exports;
        })(607)
    );
    var t, e;
});
//# sourceMappingURL=index.js.map
