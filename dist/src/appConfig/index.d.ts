import Stack from "../stack";
import { IInstallationData } from "../types";
export declare interface AppConfigAdditionalData {
    currentBranch: string;
}
/**
 * Class representing the current stack in Contentstack UI.
 */
export declare class AppConfig {
    _data: {
        [key: string]: any;
    };
    _connection: any;
    _emitter: EventEmitter;
    private _additionalData;
    constructor(data: {
        [key: string]: any;
    }, connection: any, emitter: EventEmitter, additionalData: AppConfigAdditionalData);
    stack: () => Stack;
    setInstallationData: (installationData: IInstallationData) => Promise<{
        [key: string]: any;
    }>;
    getInstallationData: () => Promise<IInstallationData>;
    /**
     *  Set the validation state of the app. If the validation is false, the Contentstack will
     * not allow to save the configuration. The message will be displayed if provided.
     * @param isValidated set the validation state of the app
     * @param message the message to be displayed in the UI
     * @returns  returns a promise with the data sent from the parent
     */
    setValidationState(isValidated: boolean, message?: string): Promise<Record<string, any>>;
}
//# sourceMappingURL=index.d.ts.map