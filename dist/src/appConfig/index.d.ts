import Stack from "../stack";
import { IInstallationData, ValidationOptions } from "../types";
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
     * Set the validation state of the app. If the validation is false, the Contentstack App Config
     * will not allow to save the configuration. The message will be displayed if provided.
     * @param isValid set the validation state of the app
     * @param options additional options to be sent to the parent
     * @returns returns a promise with the data sent from the parent
     */
    setValidity(isValid: boolean, options?: ValidationOptions): Promise<Record<string, any>>;
}
//# sourceMappingURL=index.d.ts.map