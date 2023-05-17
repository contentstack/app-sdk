import postRobot from "post-robot";
import EventEmitter from "wolfy87-eventemitter";

import AssetSidebarWidget from "./AssetSidebarWidget";
import { IRTEPluginInitializer } from "./RTE/types";
import { AppConfig } from "./appConfig";
import Entry from "./entry";
import Field from "./field";
import FieldModifierLocationEntry from "./fieldModifierLocation/entry";
import FieldModifierLocationField from "./fieldModifierLocation/field";
import FieldModifierLocationFrame from "./fieldModifierLocation/frame";
import Metadata from "./metadata";
import Modal from "./modal";
import Stack from "./stack";
import Store from "./store";
import {
    IAppConfigWidget,
    ICustomField,
    IDashboardWidget,
    IEntryFieldLocation,
    IFieldModifierLocation,
    IFullPageLocation,
    IPageWidget,
    ISidebarWidget,
    InitializationData,
    LocationType,
    Region,
} from "./types";
import { GenericObjectType } from "./types/common.types";
import { User } from "./types/user.types";
import { formatAppRegion, onData, onError } from "./utils/utils";
import Window from "./window";

const emitter = new EventEmitter();

/** Class representing an extension from Contentstack App Framework SDK. */

class Extension {
    /**
     * @hideconstructor
     */

    appUID: string;
    installationUID: string;
    currentUser: User;
    private type: LocationType;
    private config: GenericObjectType;
    postRobot: typeof postRobot;
    stack: Stack;
    store: Store;
    metadata: Metadata;
    locationUID: string;
    modal: Modal;
    readonly region: Region;

    location: {
        DashboardWidget: IDashboardWidget | null;
        SidebarWidget: ISidebarWidget | null;
        CustomField: ICustomField | null;
        RTEPlugin: IRTEPluginInitializer | null;
        AppConfigWidget: IAppConfigWidget | null;
        FullscreenAppWidget: IPageWidget | null;
        AssetSidebarWidget: AssetSidebarWidget | null;
        EntryFieldLocation: IEntryFieldLocation | null;
        FullPage: IFullPageLocation | null;
        FieldModifierLocation: IFieldModifierLocation | null;
    };

    constructor(initData: InitializationData) {
        const initializationData = initData;

        this.postRobot = postRobot;

        /**
         * This value represents the current App's unique ID. One App may contain multiple locations
         * @type {string}
         */
        this.appUID = initializationData.app_id;

        /**
         *  This value represents the current location's unique ID. One App may contain multiple locations
         * @type {string}
         */
        this.locationUID = initializationData.extension_uid;

        /**
         * This object holds details of the app initialization user.
         * @type {Object}
         */
        this.installationUID = initializationData.installation_uid;
        /**
         * This object holds details of the current user.
         * @type {Object}
         */
        this.currentUser = initializationData.user;

        /**
         * location of extension, "RTE" | "FIELD" | "DASHBOARD" | "WIDGET" | "APP_CONFIG_WIDGET" | "FULL_SCREEN_WIDGET".
         * @type {string}
         */
        this.type = initializationData.type;

        /**
         * Store to persist data for extension.
         * Note: Data is stored in the browser {@link external:localStorage} and will be lost if the {@link external:localStorage} is cleared in the browser.
         * @type {Store}
         */
        this.store = new Store(postRobot);

        /**
         * This method returns stack object which allows users to read and manipulate a range of objects in a stack.
         * @type {Stack}
         */
        this.stack = new Stack(initializationData.stack, postRobot, {
            currentBranch: initializationData.currentBranch,
        });

        this.metadata = new Metadata(postRobot);

        this.config = initializationData.config ?? {};

        this.location = {
            DashboardWidget: null,
            CustomField: null,
            SidebarWidget: null,
            RTEPlugin: null,
            AppConfigWidget: null,
            FullscreenAppWidget: null,
            AssetSidebarWidget: null,
            FullPage: null,
            EntryFieldLocation: null,
            FieldModifierLocation: null,
        };

        window["postRobot"] = postRobot;

        this.modal = new Modal();

        this.region = formatAppRegion(initializationData.region);

        const stack = new Stack(initializationData.stack, postRobot, {
            currentBranch: initializationData.currentBranch,
        });

        switch (initializationData.type) {
            case LocationType.DASHBOARD: {
                this.location.DashboardWidget = {
                    frame: new Window(
                        postRobot,
                        this.type as "DASHBOARD",
                        emitter,
                        initializationData.dashboard_width
                    ),
                    stack: new Stack(initializationData.stack, postRobot, {
                        currentBranch: initializationData.currentBranch,
                    }),
                };
                break;
            }
            case LocationType.WIDGET: {
                this.location.SidebarWidget = {
                    entry: new Entry(initializationData, postRobot, emitter),
                    stack: new Stack(initializationData.stack, postRobot, {
                        currentBranch: initializationData.currentBranch,
                    }),
                };
                break;
            }

            case LocationType.APP_CONFIG_WIDGET: {
                this.location.AppConfigWidget = {
                    installation: new AppConfig(
                        initializationData,
                        postRobot,
                        emitter,
                        {
                            currentBranch: initializationData.currentBranch,
                        }
                    ),
                    stack: new Stack(initializationData.stack, postRobot, {
                        currentBranch: initializationData.currentBranch,
                    }),
                };
                break;
            }

            case LocationType.ASSET_SIDEBAR_WIDGET: {
                this.location.AssetSidebarWidget = new AssetSidebarWidget(
                    initializationData,
                    postRobot,
                    emitter
                );

                break;
            }

            case LocationType.RTE: {
                import("./RTE").then(({ rtePluginInitializer }) => {
                    this.location.RTEPlugin = rtePluginInitializer;
                });
                break;
            }

            case LocationType.FIELD_MODIFIER_LOCATION: {
                initializationData.self = true;
                this.location.FieldModifierLocation = {
                    entry: new FieldModifierLocationEntry(
                        initializationData,
                        postRobot,
                        emitter
                    ),
                    stack: new Stack(initializationData.stack, postRobot, {
                        currentBranch: initializationData.currentBranch,
                    }),
                    field: new FieldModifierLocationField(
                        initializationData,
                        postRobot,
                        emitter
                    ),
                    frame: new FieldModifierLocationFrame(postRobot, emitter),
                };
                break;
            }

            case LocationType.FULL_PAGE_LOCATION: {
                this.location.FullPage = {
                    stack: stack,
                };
                break;
            }

            case LocationType.FIELD:
            default: {
                initializationData.self = true;
                this.location.CustomField = {
                    field: new Field(initializationData, postRobot, emitter),
                    fieldConfig: initializationData.field_config,
                    entry: new Entry(initializationData, postRobot, emitter),
                    stack: new Stack(initializationData.stack, postRobot, {
                        currentBranch: initializationData.currentBranch,
                    }),
                    frame: new Window(postRobot, this.type as "FIELD", emitter),
                };

                break;
            }
        }

        try {
            postRobot.on("extensionEvent", async (event) => {
                if (event.data.name === "entrySave") {
                    emitter.emitEvent("entrySave", [{ data: event.data.data }]);
                    emitter.emitEvent("updateFields", [
                        { data: event.data.data },
                    ]);
                }

                if (event.data.name === "entryChange") {
                    emitter.emitEvent("entryChange", [
                        {
                            data: event.data.data,
                            resolvedData: event.data.otherData.resolvedData,
                        },
                    ]);
                }

                if (event.data.name === "entryPublish") {
                    emitter.emitEvent("entryPublish", [
                        { data: event.data.data },
                    ]);
                }

                if (event.data.name === "entryUnPublish") {
                    emitter.emitEvent("entryUnPublish", [
                        { data: event.data.data },
                    ]);
                }

                if (event.data.name === "assetSave") {
                    emitter.emitEvent("assetSave", [{ data: event.data.data }]);
                    emitter.emitEvent("updateFields", [
                        { data: event.data.data },
                    ]);
                }

                if (event.data.name === "assetChange") {
                    emitter.emitEvent("assetChange", [
                        { data: event.data.data },
                    ]);
                }

                if (event.data.name === "assetPublish") {
                    emitter.emitEvent("assetPublish", [
                        { data: event.data.data },
                    ]);
                }

                if (event.data.name === "assetUnPublish") {
                    emitter.emitEvent("assetUnPublish", [
                        { data: event.data.data },
                    ]);
                }

                if (event.data.name === "dashboardResize") {
                    emitter.emitEvent("dashboardResize", [
                        { state: event.data.state },
                    ]);
                }

                if (event.data.name === "extensionFieldChange") {
                    emitter.emitEvent("extensionFieldChange", [
                        { data: event.data.data },
                    ]);
                }
            });
        } catch (err) {
            console.error("extension Event", err);
        }
    }

    pulse = (eventName: string, metadata: { [key: string]: any }): void => {
        this.postRobot.sendToParent("analytics", { eventName, metadata });
    };

    getConfig = (): Promise<GenericObjectType> => {
        if (!this.installationUID) {
            return Promise.resolve(this.config);
        }
        return this.postRobot
            .sendToParent("getConfig")
            .then(onData)
            .catch(onError);
    };

    getCurrentLocation = (): LocationType => {
        return this.type;
    };

    getCurrentRegion = (): Region => {
        return this.region;
    };

    static async initialize(version: string): Promise<InitializationData> {
        const meta = {
            sdkType: "app-sdk",
        };
        const initData = await postRobot.sendToParent<InitializationData>(
            "init",
            { version, meta }
        );
        return initData.data;
    }

    setReady(): Promise<ResponseMessageEvent> {
        return this.postRobot.sendToParent("ready");
    }
}

export default Extension;
