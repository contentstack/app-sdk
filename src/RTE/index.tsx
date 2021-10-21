import {
    IConfigCallback,
    IContainerMetaData,
    IOnFunction,
    IPluginMetaData,
    IRteParam,
    IConfig
} from "./types";

export class RTEPlugin {
    private pluginMetaData: IPluginMetaData = {
        registry: {
            title: "",
            toolbar: {
                inMainToolbar: true,
                inHoveringToolbar: true,
            },
            dndOptions: {},
            isContentstackElement: true,
        },
        meta: {
            id: "",
            elementType: null,
            editorCallbacks: {},
            isDependent: false,
        },
    };
    private isContainer: boolean = false;
    private containerMetaData: IContainerMetaData = {
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

    constructor(id: string, private configCallback: IConfigCallback) {
        this.pluginMetaData.meta.id = id;
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

            case "keydown": {
                this.pluginMetaData.meta.editorCallbacks["keydown"] =
                    callback;
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

    get = (rte: IRteParam | void) => {
        const config = this.configCallback(rte);

        Object.entries(config).forEach(
            //@ts-ignore
            <Key extends keyof IConfig>([key, value]: [Key, any]) => {
                switch (key) {
                    case "title": {
                        this.pluginMetaData.registry.title = value;
                        break;
                    }
                    case "iconName": {
                        this.pluginMetaData.registry.iconName = value;
                        this.containerMetaData.registry.iconName = value
                        break;
                    }
                    case "displayOn": {
                        // make every other options false
                        this.pluginMetaData.registry.toolbar = {
                            inHoveringToolbar: false,
                            inMainToolbar: false,
                        };

                        if (typeof value === "string") {
                            switch (value) {
                                case "toolbar": {
                                    this.pluginMetaData.registry.toolbar.inMainToolbar =
                                        true;
                                    break;
                                }
                                case "hoveringToolbar": {
                                    this.pluginMetaData.registry.toolbar.inHoveringToolbar =
                                        true;
                                    break;
                                }
                            }
                        } else if (Array.isArray(value)) {
                            value.forEach((display) => {
                                switch (display) {
                                    case "toolbar": {
                                        this.pluginMetaData.registry.toolbar.inMainToolbar =
                                            true;
                                        break;
                                    }
                                    case "hoveringToolbar": {
                                        this.pluginMetaData.registry.toolbar.inHoveringToolbar =
                                            true;
                                        break;
                                    }
                                }
                            });
                        }
                        break;
                    }

                    case "elementType": {
                        this.pluginMetaData.meta.elementType = value;
                        break;
                    }

                    case "dnd": {
                        if (
                            typeof value === "object" &&
                            !Array.isArray(value)
                        ) {
                            if (
                                typeof this.pluginMetaData.registry
                                    .dndOptions === "undefined"
                            ) {
                                this.pluginMetaData.registry.dndOptions = {
                                    DisableDND: false,
                                };
                            }
                            Object.entries(value).forEach(
                                ([option, val]: [option: string, val: any]) => {
                                    switch (option) {
                                        case "disable": {
                                            this.pluginMetaData.registry.dndOptions.DisableDND =
                                                val;
                                            break;
                                        }

                                        case "hideSelectionBackground": {
                                            this.pluginMetaData.registry.dndOptions.DisableSelectionHalo =
                                                val;
                                            break;
                                        }
                                        case "icon": {
                                            this.pluginMetaData.registry.dndOptions.CustomDndIcon =
                                                val;
                                            break;
                                        }
                                        case "className": {
                                            this.pluginMetaData.registry.dndOptions.ContainerClassName =
                                                val;
                                            break;
                                        }
                                        case "droppableContainer": {
                                            this.pluginMetaData.registry.dndOptions.getDroppableContainer =
                                                val;
                                            break;
                                        }
                                        case "disableColumnLayout": {
                                            this.pluginMetaData.registry.dndOptions.DisableGridDnd =
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
                        this.pluginMetaData.registry.Component = value;
                        break;
                    }
                }
            }
        );

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

        return this.isContainer ? this.containerMetaData : this.pluginMetaData;
    };
}

export const rtePluginInitializer = (
    id: string,
    configCallback: IConfigCallback
) => {
    if (!(id && configCallback)) throw Error("i am an error");

    return new RTEPlugin(id, configCallback);
};
