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
}
//# sourceMappingURL=index.d.ts.map