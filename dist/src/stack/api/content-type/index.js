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
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var entry_1 = __importDefault(require("./entry"));
var base_1 = __importDefault(require("../base"));
var connection = {};
var ContentType = /** @class */ (function (_super) {
    __extends(ContentType, _super);
    function ContentType(uid) {
        var _this = _super.call(this, uid) || this;
        /**
         * @constructor
         * @hideconstructor
         * @name Stack#ContentType#Entry
         * @version 2.2.0
         * @desc An entry is the actual piece of content created using one of the defined content types
         * @see {@link https://www.contentstack.com/docs/apis/content-management-api/#entries| Entries}
         */
        // @ts-ignore
        _this.Entry = entry_1.default(_this.constructor.connection, _this.uid);
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
exports.default = (function (uiConnection) {
    connection = uiConnection;
    return new Proxy(ContentType, {
        // target = Foo
        apply: function (Target, thisArg, argumentsList) {
            return new (Target.bind.apply(Target, __spreadArray([void 0], argumentsList)))();
        }
    });
});
//# sourceMappingURL=index.js.map