import Stack from "../stack";
import { IInstallationData, ValidationOptions } from "../types";
import generateErrorMessages, { ERROR_MESSAGES } from "../utils/errorMessages";
import { onData, onError } from "../utils/utils";

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

        this.setValidity = this.setValidity.bind(this);
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

    /**
     * Set the validation state of the app. If the validation is false, the Contentstack App Config
     * will not allow to save the configuration. The message will be displayed if provided.
     * @param isValid set the validation state of the app
     * @param options additional options to be sent to the parent
     * @returns returns a promise with the data sent from the parent
     */
    async setValidity(
        isValid: boolean,
        options?: ValidationOptions
    ): Promise<Record<string, any>> {
        if (typeof isValid !== "boolean") {
            throw new TypeError(
                generateErrorMessages(
                    ERROR_MESSAGES.configPage.setValidity.isValidTypeBoolean
                )
            );
        }

        if (options?.message && typeof options.message !== "string") {
            throw new TypeError(
                generateErrorMessages(
                    ERROR_MESSAGES.configPage.setValidity.messageTypeString
                )
            );
        }

        return this._connection
            .sendToParent("setValidity", { isValid, options })
            .then(onData)
            .catch(onError);
    }
}
