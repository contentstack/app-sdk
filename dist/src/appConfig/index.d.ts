import { InstallationData } from "../types";
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
    setInstallationData: (installationData: InstallationData) => Promise<{
        [key: string]: any;
    }>;
    getInstallationData: () => Promise<InstallationData>;
}
//# sourceMappingURL=index.d.ts.map