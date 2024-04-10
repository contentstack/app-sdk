import postRobot from "post-robot";

import Stack from "../stack";
import {
    IInstallationData,
    ValidationOptions,
    IAppConfigInitData,
} from "../types";
import generateErrorMessages, { ERROR_MESSAGES } from "../utils/errorMessages";
import { onData, onError } from "../utils/utils";

export declare interface AppConfigAdditionalData {
    currentBranch: string;
}

/**
 * Class representing the current stack in Contentstack UI.
 */

export class AppConfig {
    _data: IAppConfigInitData;
    _connection: typeof postRobot;
    _emitter: EventEmitter;
    private _additionalData: AppConfigAdditionalData;

    constructor(
        data: IAppConfigInitData,
        connection: typeof postRobot,
        emitter: EventEmitter,
        additionalData: AppConfigAdditionalData
    ) {
        this._data = data;
        this._connection = connection;
        this._emitter = emitter;
        this._additionalData = additionalData;

        this.setValidity = this.setValidity.bind(this);
    }

    stack = () => {
        return new Stack(this._data.stack, this._connection, {
            currentBranch: this._additionalData.currentBranch,
        });
    };

    setInstallationData = (
        installationData: IInstallationData
    ): Promise<IInstallationData> => {
        return this._connection
            .sendToParent<IInstallationData>(
                "setInstallationData",
                installationData
            )
            .then(onData)
            .catch(onError);
    };

    getInstallationData = (): Promise<IInstallationData> => {
        return this._connection
            .sendToParent<IInstallationData>("getInstallationData")
            .then(onData)
            .catch(onError);
    };

    /**
     * Optional method to check if the current plan supports a feature.
     * Only available for apps that are white-listed.
     */
 
    isCurrentPlanSupportsFeature = (plan:string)=> {
        return this._connection.sendToParent("isCurrentPlanSupportsFeature", {plan}).then((e)=>{console.log(e); return e}).then(onData).catch(onError);
       }

    /**
     * Sets the validation state of the app. If the validation is false, the Contentstack App Config
     * will not allow saving the configuration. The message will be displayed if provided.
     * @param {boolean} isValid - The validation state of the app.
     * @param {ValidationOptions} options - Additional options to be sent to the parent.
     * @returns {Promise<void>} - A promise that resolves to void.
     */
    async setValidity(
        isValid: boolean,
        options?: ValidationOptions
    ): Promise<void> {
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

        await this._connection
            .sendToParent("setValidity", { isValid, options })
            .then(onData)
            .catch(onError);
    }
}
