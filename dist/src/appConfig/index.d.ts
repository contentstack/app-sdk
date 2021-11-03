import { IInstallationData } from "../types";
/**
 * Class representing the current stack in Contentstack UI.
 */
export declare class AppConfig {
    _data: {
        [key: string]: any;
    };
    _connection: any;
    _emitter: EventEmitter;
    constructor(data: {
        [key: string]: any;
    }, connection: any, emitter: EventEmitter);
    setInstallationData: (installationData: IInstallationData) => Promise<{
        [key: string]: any;
    }>;
    getInstallationData: () => Promise<IInstallationData>;
}
//# sourceMappingURL=index.d.ts.map