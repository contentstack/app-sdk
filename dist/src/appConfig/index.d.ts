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
     * Set the validation state of the app. If the validation is false, the Contentstack App Config
     * will not allow to save the configuration. The message will be displayed if provided.
     * @param isValid set the validation state of the app
     * @param options additional options to be sent to the parent
     * @returns returns a promise with the data sent from the parent
     */
    setValidity(isValid: boolean, options?: ValidationOptions): Promise<Record<string, any>>;
}
//# sourceMappingURL=index.d.ts.map