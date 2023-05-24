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
    IAppConfigInitData,
    IAppConfigWidget,
    IAssetSidebarInitData,
    ICustomField,
    IDashboardInitData,
    IDashboardWidget,
    IEntryFieldLocation,
    IEntryFieldLocationInitData,
    IFieldInitData,
    IFieldModifierLocation,
    IFieldModifierLocationInitData,
    IFullPageLocation,
    IFullPageLocationInitData,
    ILocation,
    IPageWidget,
    IRTEInitData,
    ISidebarInitData,
    ISidebarWidget,
    IUser,
    Region,
} from "./types";
import { AnyObject } from "./types/common.types";
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
    currentUser: IUser;
    private type: ILocation;
    private config: AnyObject;
    postRobot: any;
    stack: Stack;
    store: Store;
    metadata: Metadata;
    locationUID: string;
    modal: Modal;
    readonly region: Region;
    version: number | null;

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

    constructor(
        initData:
            | IRTEInitData
            | IDashboardInitData
            | IFieldInitData
            | ISidebarInitData
            | IAppConfigInitData
            | IAssetSidebarInitData
            | IFullPageLocationInitData
            | IEntryFieldLocationInitData
            | IFieldModifierLocationInitData
    ) {
        const initializationData = initData;

        this.postRobot = postRobot;

        /**
         * This value represents the current App's unique ID. One App may contain multiple locations
         * @type {string}
         */
        this.appUID = initializationData.data.app_id;

        /**
         *  This value represents the current location's unique ID. One App may contain multiple locations
         * @type {string}
         */
        this.locationUID = initializationData.data.extension_uid;

        /**
         * This object holds details of the app initialization user.
         * @type {Object}
         */
        this.installationUID = initializationData.data.installation_uid;
        /**
         * This object holds details of the current user.
         * @type {Object}
         */
        this.currentUser = initializationData.data.user;

        /**
         * location of extension, "RTE" | "FIELD" | "DASHBOARD" | "WIDGET" | "APP_CONFIG_WIDGET" | "FULL_SCREEN_WIDGET".
         * @type {string}
         */
        this.type = initializationData.data.type;

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
        this.stack = new Stack(initializationData.data.stack, postRobot, {
            currentBranch: initializationData.data.currentBranch,
        });
        this.metadata = new Metadata(postRobot);

        this.config = initializationData.data.config ?? {};

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

        this.region = formatAppRegion(initializationData.data.region);

        this.version = initializationData.data.manifest?.version || null;

        const stack = new Stack(initializationData.data.stack, postRobot, {
            currentBranch: initializationData.data.currentBranch,
        });

        switch (initializationData.data.type) {
            case "DASHBOARD": {
                this.location.DashboardWidget = {
                    frame: new Window(
                        postRobot,
                        this.type as "DASHBOARD",
                        emitter,
                        initializationData.data.dashboard_width
                    ),
                    stack: new Stack(initializationData.data.stack, postRobot, {
                        currentBranch: initializationData.data.currentBranch,
                    }),
                };
                break;
            }
            case "WIDGET": {
                this.location.SidebarWidget = {
                    entry: new Entry(
                        initializationData as ISidebarInitData,
                        postRobot,
                        emitter
                    ),
                    stack: new Stack(initializationData.data.stack, postRobot, {
                        currentBranch: initializationData.data.currentBranch,
                    }),
                };
                break;
            }

            case "APP_CONFIG_WIDGET": {
                this.location.AppConfigWidget = {
                    installation: new AppConfig(
                        initializationData,
                        postRobot,
                        emitter,
                        {
                            currentBranch:
                                initializationData.data.currentBranch,
                        }
                    ),
                    stack: new Stack(initializationData.data.stack, postRobot, {
                        currentBranch: initializationData.data.currentBranch,
                    }),
                };
                break;
            }

            case "ASSET_SIDEBAR_WIDGET": {
                this.location.AssetSidebarWidget = new AssetSidebarWidget(
                    initializationData as IAssetSidebarInitData,
                    postRobot,
                    emitter
                );

                break;
            }

            case "RTE": {
                import("./RTE").then(({ rtePluginInitializer }) => {
                    this.location.RTEPlugin = rtePluginInitializer;
                });
                break;
            }

            case "FIELD_MODIFIER_LOCATION":
            case "ENTRY_FIELD_LOCATION": {
                initializationData.data.self = true;
                this.location.FieldModifierLocation = {
                    entry: new FieldModifierLocationEntry(
                        initializationData as IFieldModifierLocationInitData,
                        postRobot,
                        emitter
                    ),
                    stack: new Stack(initializationData.data.stack, postRobot, {
                        currentBranch: initializationData.data.currentBranch,
                    }),
                    field: new FieldModifierLocationField(
                        initializationData as IFieldInitData,
                        postRobot,
                        emitter
                    ),
                    frame: new FieldModifierLocationFrame(postRobot, emitter),
                };
                break;
            }

            case "FULL_PAGE_LOCATION": {
                this.location.FullPage = {
                    stack: stack,
                };
                break;
            }

            case "FIELD":
            default: {
                initializationData.data.self = true;
                this.location.CustomField = {
                    field: new Field(
                        initializationData as IFieldInitData,
                        postRobot,
                        emitter
                    ),
                    fieldConfig: initializationData.data.field_config,
                    entry: new Entry(
                        initializationData as IFieldInitData,
                        postRobot,
                        emitter
                    ),
                    stack: new Stack(initializationData.data.stack, postRobot, {
                        currentBranch: initializationData.data.currentBranch,
                    }),
                    frame: new Window(postRobot, this.type as "FIELD", emitter),
                };

                break;
            }
        }

        try {
            //@ts-ignore
            postRobot.on("extensionEvent", (event) => {
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

    pulse = (eventName: string, metadata: { [key: string]: any }) => {
        this.postRobot.sendToParent("analytics", { eventName, metadata });
    };

    getConfig = (): Promise<{ [key: string]: any }> => {
        if (!this.installationUID) {
            return Promise.resolve(this.config);
        }
        return this.postRobot
            .sendToParent("getConfig")
            .then(onData)
            .catch(onError);
    };

    getCurrentLocation = () => {
        return this.type;
    };

    getCurrentVersion = () => {
        return this.version;
    };

    getCurrentRegion = () => {
        return this.region;
    };

    static initialize(version: string) {
        const meta = {
            sdkType: "app-sdk",
        };
        //@ts-ignore
        return postRobot.sendToParent("init", { version, meta });
    }

    setReady() {
        return this.postRobot.sendToParent("ready");
    }
}

export default Extension;
