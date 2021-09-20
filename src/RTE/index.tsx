import {
    IConfig,
    IContainerMetaData,
    IOnFunction,
    IPluginMetaData,
} from "./types";

export class RTEPlugin {
    private pluginMetaData: IPluginMetaData;
    private isContainer: boolean = false;
    private containerMetaData: IContainerMetaData;

    constructor(pluginMetaData: IPluginMetaData) {
        this.pluginMetaData = pluginMetaData;

        this.containerMetaData = {
            registry: {
                id: this.pluginMetaData.meta.id,
                title: this.pluginMetaData.registry.title,
                rootCategory: false,
                toolbar: {
                    ...this.pluginMetaData.registry.toolbar,
                },
            },
            meta: {
                id: this.pluginMetaData.meta.id,
                dependentPlugins: [],
            },
        };
    }

    addPlugins = (...plugins: RTEPlugin[]) => {
        // convert to dropdown if not already
        if (this.pluginMetaData.meta.isDependent)
            throw Error("cannot have another container inside");

        this.isContainer = true;

        // clean pluginMetaData

        plugins.forEach((plugin) => {
            // make sure that this plugin is not another dropdown
            if (plugin.isContainer) {
                throw Error("cannot have another container inside");
            }

            plugin.pluginMetaData.registry.category =
                this.pluginMetaData.registry;
            this.containerMetaData.meta.dependentPlugins.push(plugin);
            plugin.pluginMetaData.meta.isDependent = true;
        });
    };

    on = <Type extends keyof IOnFunction>(
        type: Type,
        callback: IOnFunction[Type]
    ) => {
        switch (type) {
            case "beforeChildRender": {
                this.pluginMetaData.registry.beforeChildrenRender = callback;
                break;
            }

            case "beforeRender": {
                this.pluginMetaData.registry.beforeElementRender = callback;
                break;
            }

            case "exec": {
                this.pluginMetaData.registry.handleMouseDown = callback;
                break;
            }

            case "paste":
            case "deleteBackward":
            case "deleteForward":
            case "insertBreak":
            case "normalize":
            default: {
                this.pluginMetaData.meta.editorCallbacks[type] = callback;
                break;
            }
        }
    };

    get = () => {
        return this.isContainer ? this.containerMetaData : this.pluginMetaData;
    };
}

export const rtePluginInitializer = (
    id: string,
    title: string,
    config: Partial<IConfig>
) => {
    if (!(id && title && config)) throw Error("i am an error");
    const PluginMetaData: IPluginMetaData = {
        registry: {
            title,
            toolbar: {
                inMainToolbar: true,
                inHoveringToolbar: true,
            },
            dndOptions: {},
            isContentstackElement: true,
        },
        meta: {
            id,
            elementType: null,
            editorCallbacks: {},
            isDependent: false,
        },
    };

    Object.entries(config).forEach(
        //@ts-ignore
        <Key extends keyof IConfig>([key, value]: [Key, any]) => {
            switch (key) {
                case "iconName": {
                    PluginMetaData.registry.iconName = value;
                    break;
                }
                case "displayOn": {
                    // make every other options false
                    PluginMetaData.registry.toolbar = {
                        inHoveringToolbar: false,
                        inMainToolbar: false,
                    };

                    if (typeof value === "string") {
                        switch (value) {
                            case "toolbar": {
                                PluginMetaData.registry.toolbar.inMainToolbar =
                                    true;
                                break;
                            }
                            case "hoveringToolbar": {
                                PluginMetaData.registry.toolbar.inHoveringToolbar =
                                    true;
                                break;
                            }
                        }
                    } else if (Array.isArray(value)) {
                        value.forEach((display) => {
                            switch (display) {
                                case "toolbar": {
                                    PluginMetaData.registry.toolbar.inMainToolbar =
                                        true;
                                    break;
                                }
                                case "hoveringToolbar": {
                                    PluginMetaData.registry.toolbar.inHoveringToolbar =
                                        true;
                                    break;
                                }
                            }
                        });
                    }
                    break;
                }

                case "elementType": {
                    PluginMetaData.meta.elementType = value;
                    break;
                }

                case "dnd": {
                    if (typeof value === "object" && !Array.isArray(value)) {
                        if (
                            typeof PluginMetaData.registry.dndOptions ===
                            "undefined"
                        ) {
                            PluginMetaData.registry.dndOptions = {
                                DisableDND: false,
                            };
                        }
                        Object.entries(value).forEach(
                            ([option, val]: [option: string, val: any]) => {
                                switch (option) {
                                    case "disable": {
                                        PluginMetaData.registry.dndOptions.DisableDND =
                                            val;
                                        break;
                                    }

                                    case "hideSelectionBackground": {
                                        PluginMetaData.registry.dndOptions.DisableSelectionHalo =
                                            val;
                                        break;
                                    }
                                    case "icon": {
                                        PluginMetaData.registry.dndOptions.CustomDndIcon =
                                            val;
                                        break;
                                    }
                                    case "className": {
                                        PluginMetaData.registry.dndOptions.ContainerClassName =
                                            val;
                                        break;
                                    }
                                    case "droppableContainer": {
                                        PluginMetaData.registry.dndOptions.getDroppableContainer =
                                            val;
                                        break;
                                    }
                                    case "disableColumnLayout": {
                                        PluginMetaData.registry.dndOptions.DisableGridDnd =
                                            val;
                                        break;
                                    }
                                }
                            }
                        );
                    }
                    break;
                }

                case "Component": {
                    PluginMetaData.registry.Component = value
                    break
                }
            }
        }
    );

    return new RTEPlugin(PluginMetaData);
};
