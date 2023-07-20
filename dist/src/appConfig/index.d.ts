import Stack from "../stack";
import postRobot from "post-robot";
import { IInstallationData, ValidationOptions, IAppConfigInitData } from "../types";
import { GenericObjectType } from "../types/common.types";
export declare interface AppConfigAdditionalData {
    currentBranch: string;
}
/**
 * Class representing the current stack in Contentstack UI.
 */
export declare class AppConfig {
    _data: IAppConfigInitData;
    _connection: typeof postRobot;
    _emitter: EventEmitter;
    private _additionalData;
    constructor(data: IAppConfigInitData, connection: typeof postRobot, emitter: EventEmitter, additionalData: AppConfigAdditionalData);
    stack: () => Stack;
    setInstallationData: (installationData: IInstallationData) => Promise<GenericObjectType>;
    getInstallationData: () => Promise<IInstallationData>;
    /**
     * Sets the validation state of the app. If the validation is false, the Contentstack App Config
     * will not allow saving the configuration. The message will be displayed if provided.
     * @param {boolean} isValid - The validation state of the app.
     * @param {object} options - Additional options to be sent to the parent.
     * @returns {Promise<void>} - A promise that resolves to void.
     */
    setValidity(isValid: boolean, options?: ValidationOptions): Promise<void>;
}
//# sourceMappingURL=index.d.ts.map