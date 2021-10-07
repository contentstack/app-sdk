"use strict";
//@ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var query_1 = __importDefault(require("./query"));
var utils_1 = require("../utils");
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
        this.only = utils_1.transform('only');
        this.except = utils_1.transform('except');
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
exports.default = Base;
//# sourceMappingURL=base.js.map