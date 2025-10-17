import { RTEPlugin as Plugin, rtePluginInitializer } from "./RTE";
import {
    IConfig,
    IDisplayOnOptions,
    IDynamicFunction,
    IElementTypeOptions,
    IOnFunction,
    IRteElementType,
    IRteParam,
} from "./RTE/types";
import { InitializationData } from "./types";
import UiLocation from "./uiLocation";

type PluginConfigCallback = (sdk: UiLocation) => Promise<IConfig> | IConfig;

interface PluginDefinition {
    id: string;
    config: Partial<IConfig>;
    callbacks: Partial<IOnFunction>;
    asyncConfigCallback?: PluginConfigCallback;
    childBuilders: PluginBuilder[];
}

class PluginBuilder {
    private id: string;
    private _config: Partial<IConfig> = {};
    private _callbacks: Partial<IOnFunction> = {};
    private _asyncConfigCallback?: PluginConfigCallback;
    private _childBuilders: PluginBuilder[] = [];

    constructor(id: string) {
        this.id = id;
        this._config.title = id;
    }

    title(title: string): PluginBuilder {
        this._config.title = title;
        return this;
    }
    icon(icon: React.ReactElement | null): PluginBuilder {
        this._config.icon = icon;
        return this;
    }
    display(display: IDisplayOnOptions | IDisplayOnOptions[]): PluginBuilder {
        this._config.display = display;
        return this;
    }
    elementType(
        elementType:
            | IElementTypeOptions
            | IElementTypeOptions[]
            | IDynamicFunction
    ): PluginBuilder {
        this._config.elementType = elementType;
        return this;
    }
    render(renderFn: (element: React.ReactElement, attrs: { [key: string]: any }, path: number[], rte: IRteParam) => React.ReactElement): PluginBuilder {
        this._config.render = renderFn;
        return this;
    }
    shouldOverride(
        shouldOverrideFn: (element: IRteElementType) => boolean
    ): PluginBuilder {
        this._config.shouldOverride = shouldOverrideFn;
        return this;
    }
    on<T extends keyof IOnFunction>(
        type: T,
        callback: IOnFunction[T]
    ): PluginBuilder {
        this._callbacks[type] = callback;
        return this;
    }
    configure(callback: PluginConfigCallback): PluginBuilder {
        this._asyncConfigCallback = callback;
        return this;
    }
    addPlugins(...builders: PluginBuilder[]): PluginBuilder {
        this._childBuilders.push(...builders);
        return this;
    }

    /**
     * Builds and returns a definition of the RTE Plugin, ready to be materialized
     * into a concrete RTEPlugin instance later when the SDK and Plugin Factory are available.
     * This method no longer performs the actual creation of RTEPlugin instances.
     */
    build(): PluginDefinition {
        return {
            id: this.id,
            config: this._config,
            callbacks: this._callbacks,
            asyncConfigCallback: this._asyncConfigCallback,
            childBuilders: this._childBuilders,
        };
    }
}

async function materializePlugin(
    pluginDef: PluginDefinition,
    sdk: UiLocation
): Promise<Plugin> {
    let finalConfig: Partial<IConfig> = { ...pluginDef.config };
    if (pluginDef.asyncConfigCallback) {
        const dynamicConfig = await Promise.resolve(
            pluginDef.asyncConfigCallback(sdk)
        );
        finalConfig = { ...finalConfig, ...dynamicConfig };
    }
    
    const plugin = rtePluginInitializer(
        pluginDef.id,
        (rte: IRteParam | void) => {
            return finalConfig;
        }
    );
    
    Object.entries(pluginDef.callbacks).forEach(([type, callback]) => {
        plugin.on(type as keyof IOnFunction, callback);
    });
    
    if (pluginDef.childBuilders.length > 0) {
        const childPlugins = await Promise.all(
            pluginDef.childBuilders.map((childBuilder) =>
                materializePlugin(childBuilder.build(), sdk)
            )
        );
        plugin.addPlugins(...childPlugins);
    }

    return plugin;
}

function registerPlugins(
    ...pluginDefinitions: PluginDefinition[]
): (
    context: InitializationData,
    rte: IRteParam
) => Promise<{ [key: string]: Plugin }> {
    const definitionsToProcess = [...pluginDefinitions];
    const plugins = async (context: InitializationData, rte: IRteParam) => {
        try {
            const sdk =  new UiLocation(context);          
            const materializedPlugins: { [key: string]: Plugin } = {};
            for (const def of definitionsToProcess) {
                const pluginInstance = await materializePlugin(def, sdk);
                materializedPlugins[def.id] = pluginInstance;
            }
            rte.sdk = sdk;
            return materializedPlugins;
        } catch (err) {
            console.error("Error during plugin registration:", err);
            throw err;
        }
    };
    return plugins;
}

export {
    IConfig,
    IDisplayOnOptions,
    IDynamicFunction,
    IElementTypeOptions,
    IOnFunction,
    IRteElementType,
    IRteParam,
    Plugin,
    PluginBuilder,
    PluginDefinition,
    registerPlugins
};