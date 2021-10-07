"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
//# sourceMappingURL=utils.js.map