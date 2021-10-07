"use strict";
//@ts-nocheck
Object.defineProperty(exports, "__esModule", { value: true });
exports.getReferences = exports.includeReference = exports.includeSchema = exports.includeContentType = exports.includeOwner = exports.environment = exports.language = exports.addQuery = exports.addParam = exports._type = exports.mergeDeep = exports.merge = exports.transform = void 0;
function transform(type) {
    return function () {
        this._query[type] = this._query[type] || {};
        switch (arguments.length) {
            case 1:
                if (Array.isArray(arguments[0]) || typeof arguments[0] === 'string') {
                    var query = this._query[type].BASE || [];
                    query = query.concat(arguments[0]);
                    this._query[type].BASE = query;
                    return this;
                }
                throw Error('Kindly provide valid parameters');
            case 2:
                if (typeof arguments[0] === 'string' && (Array.isArray(arguments[1]) || typeof arguments[1] === 'string')) {
                    var query = this._query[type][arguments[0]] || [];
                    query = query.concat(arguments[1]);
                    this._query[type][arguments[0]] = query;
                    return this;
                }
                throw Error('Kindly provide valid parameters');
            default:
                throw Error('Kindly provide valid parameters');
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
            if (self._type(source[key]) === 'object' && self._type(target[key]) === self._type(source[key])) {
                _mergeRecursive(target[key], source[key]);
            }
            else if (self._type(source[key]) === 'array' && self._type(target[key]) === self._type(source[key])) {
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
    if (__typeof === 'object' && Array.isArray(val)) {
        __typeof = 'array';
    }
    return __typeof;
}
exports._type = _type;
function addParam(key, value) {
    if (key && typeof key === 'string' && value && typeof value === 'string') {
        this._query[key] = value;
        return this;
    }
    throw Error('Kindly provide valid parameters.');
}
exports.addParam = addParam;
function addQuery(key, value) {
    if (key && value && typeof key === 'string') {
        this._query[key] = value;
        return this;
    }
    throw Error('First argument should be a String.');
}
exports.addQuery = addQuery;
function language(languageCode) {
    if (languageCode && typeof languageCode === 'string') {
        this._query.locale = languageCode;
        return this;
    }
    throw Error('Argument should be a String.');
}
exports.language = language;
function environment(environmentCode) {
    if (environmentCode && typeof environmentCode === 'string') {
        this._query.environment = environmentCode;
        return this;
    }
    throw Error('Argument should be a String.');
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
            this._query['include[]'] = this._query['include[]'] || [];
            this._query['include[]'] = this._query['include[]'].concat(val[i]);
        }
    }
    else if (typeof val === 'string') {
        for (var i = 0; i < arguments.length; i += 1) {
            this._query['include[]'] = this._query['include[]'] || [];
            this._query['include[]'] = this._query['include[]'].concat(arguments[i]);
        }
    }
    else {
        throw Error('Argument should be a String or an Array.');
    }
    return this;
}
exports.includeReference = includeReference;
function getReferences() {
    return this.fetch("get" + this.constructor.module() + "References");
}
exports.getReferences = getReferences;
//# sourceMappingURL=utils.js.map