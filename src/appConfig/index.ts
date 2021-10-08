import { IInstallationData } from "../types";
import { onData, onError } from "../utils";

/**
 * Class representing the current stack in Contentstack UI.
 */

export class AppConfig {
    _data: { [key: string]: any }
    _connection: any
    _emitter: EventEmitter

    constructor(data: { [key: string]: any }, connection: any, emitter: EventEmitter) {
        this._data = data;
        this._connection = connection;
        this._emitter = emitter;
    }

    setInstallationData = (installationData: IInstallationData): Promise<{ [key: string]: any }> => {
        return this._connection.sendToParent('setInstallationData', installationData).then(onData).catch(onError);
    }

    getInstallationData = (): Promise<IInstallationData> => {
        return this._connection.sendToParent('getInstallationData').then(onData).catch(onError);
    }
}