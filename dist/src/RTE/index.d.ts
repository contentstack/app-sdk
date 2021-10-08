import { IConfigCallback, IContainerMetaData, IOnFunction, IPluginMetaData, IRteParam } from "./types";
export declare class RTEPlugin {
    private configCallback;
    private pluginMetaData;
    private isContainer;
    private containerMetaData;
    constructor(id: string, configCallback: IConfigCallback);
    addPlugins: (...plugins: RTEPlugin[]) => void;
    on: <Type extends keyof IOnFunction>(type: Type, callback: IOnFunction[Type]) => void;
    get: (rte: IRteParam) => IPluginMetaData | IContainerMetaData;
}
export declare const rtePluginInitializer: (id: string, configCallback: IConfigCallback) => RTEPlugin;
//# sourceMappingURL=index.d.ts.map