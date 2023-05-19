import React from "react";
import Extension from "../extension";
import { IConfigCallback, IContainerMetaData, IOnFunction, IPluginMetaData, IRteParam, IRteElementType } from "./types";
export declare class RTEPlugin {
    private configCallback;
    private pluginMetaData;
    private isContainer;
    private containerMetaData;
    constructor(id: string, configCallback: IConfigCallback);
    addPlugins: (...plugins: RTEPlugin[]) => void;
    on: <Type extends keyof IOnFunction>(type: Type, callback: IOnFunction[Type]) => void;
    get: (rte: IRteParam | void) => Promise<IPluginMetaData | IContainerMetaData>;
}
export declare const rtePluginInitializer: (id: string, configCallback: IConfigCallback) => RTEPlugin;
interface RTEPluginOptions {
    uid: string;
    title: string;
    icon?: React.ReactElement | null;
    displayOn?: string[];
    elementType: string[];
    shouldOverride?: (element: IRteElementType) => boolean;
}
export declare type PluginBuilderCallback = (appSDK: Extension, rte?: IRteParam, props?: any) => React.ReactElement;
export declare const RTEPluginBuilder: (options: RTEPluginOptions, callback: PluginBuilderCallback) => Promise<RTEPlugin | null>;
export {};
//# sourceMappingURL=index.d.ts.map