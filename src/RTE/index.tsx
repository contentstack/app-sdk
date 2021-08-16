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
    static allPlugins = [];

    static register = () => {};

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
                this.pluginMetaData.meta.id;
            this.containerMetaData.meta.dependentPlugins.push(plugin);
            plugin.pluginMetaData.meta.isDependent = true;
        });
    };

    register = () => {
        if (this.isContainer) {
            //* register as container

            // register dependent plugin
            this.containerMetaData.meta.dependentPlugins.forEach((plugin) => {
                plugin.register();
            });
        } else {
            //* register as plugin
        }
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

            case "render": {
                this.pluginMetaData.registry.Component = callback;
                break;
            }

            case "paste":
            case "deleteBackward":
            case "deleteForward":
            case "insertBreak":
            case "normalize": {
                this.pluginMetaData.meta.editorCallbacks[type] = callback;
                break;
            }
        }
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
                case "icon": {
                    PluginMetaData.registry.icon = value;
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
                }
            }
        }
    );

    return new RTEPlugin(PluginMetaData);
};
