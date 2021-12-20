export function onData(data: { [key: string]: any }) {
    if (typeof (data.data) === 'string') { return Promise.reject(data.data); }
    return Promise.resolve(data.data);
}

export function onError(error: Error) {
    return Promise.reject(error);
}