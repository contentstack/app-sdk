import Stack from "../stack";
import { IInstallationData } from "../types";
import generateErrorMessages, { ERROR_MESSAGES } from "../utils/errorMessages";
import { onData, onError } from "../utils/utils";

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

        this.setValidationState = this.setValidationState.bind(this);
    }

    stack = () => {
        return new Stack(this._data.stack, this._connection)
    }

    setInstallationData = (installationData: IInstallationData): Promise<{ [key: string]: any }> => {
        return this._connection.sendToParent('setInstallationData', installationData).then(onData).catch(onError);
    }

    getInstallationData = (): Promise<IInstallationData> => {
        return this._connection.sendToParent('getInstallationData').then(onData).catch(onError);
    }

    /**
     *  Set the validation state of the app. If the validation is false, the Contentstack will
     * not allow to save the configuration. The message will be displayed if provided.
     * @param isValidated set the validation state of the app
     * @param message the message to be displayed in the UI
     * @returns  returns a promise with the data sent from the parent
     */
    async setValidationState(isValidated: boolean, message?: string): Promise<Record<string, any>> {

        if (typeof isValidated !== "boolean") {
            throw new TypeError(
                generateErrorMessages(
                    ERROR_MESSAGES.configPage.setValidationState
                        .isValidatedTypeBoolean
                )
            );
        }

        if (typeof message !== "undefined" && typeof message !== "string") {
            throw new TypeError(
                generateErrorMessages(
                    ERROR_MESSAGES.configPage.setValidationState
                        .messageTypeString
                )
            );
        }

        return this._connection.sendToParent('setValidationState', {
            isValidated: isValidated,
            message: message

        }).then(onData).catch(onError);
    }
}