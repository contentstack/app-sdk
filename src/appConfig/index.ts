import Stack from "../stack";
import { IInstallationData } from "../types";
import { onData, onError } from "../utils";

export declare interface AppConfigAdditionalData {
    currentBranch: string;
}

/**
 * Class representing the current stack in Contentstack UI.
 */

export class AppConfig {
    _data: { [key: string]: any };
    _connection: any;
    _emitter: EventEmitter;
    private _additionalData: AppConfigAdditionalData;

    constructor(
        data: { [key: string]: any },
        connection: any,
        emitter: EventEmitter,
        additionalData: AppConfigAdditionalData
    ) {
        this._data = data;
        this._connection = connection;
        this._emitter = emitter;
        this._additionalData = additionalData;
    }

    stack = () => {
        return new Stack(this._data.stack, this._connection, {
            currentBranch: this._additionalData.currentBranch,
        });
    };

    setInstallationData = (
        installationData: IInstallationData
    ): Promise<{ [key: string]: any }> => {
        return this._connection
            .sendToParent("setInstallationData", installationData)
            .then(onData)
            .catch(onError);
    };

    getInstallationData = (): Promise<IInstallationData> => {
        return this._connection
            .sendToParent("getInstallationData")
            .then(onData)
            .catch(onError);
    };
}
