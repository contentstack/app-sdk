import postRobot from "post-robot";
import EventEmitter from "wolfy87-eventemitter";

import AssetSidebarWidget from "./AssetSidebarWidget";
import { IRTEPluginInitializer } from "./RTE/types";
import { AppConfig } from "./appConfig";
import Entry from "./entry";
import EventRegistry from "./EventRegistry";
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
    IFieldModifierLocation,
    IFullPageLocation,
    IRTEInitData,
    ISidebarWidget,
    InitializationData,
    LocationType,
    Manifest,
    Region,
} from "./types";
import { GenericObjectType, RequestInit } from "./types/common.types";
import { User } from "./types/user.types";
import { formatAppRegion, onData, onError } from "./utils/utils";
import Window from "./window";
import { createSDKAdapter, dispatchPostRobotRequest } from './utils/adapter';
import {ApiRequestParams, ApiResponse } from './types/api.type';

const emitter = new EventEmitter();

/**
 * Class representing an UI Location from Contentstack App SDK.
 * @hideconstructor
 */

class UiLocation {
    /**
     * This value represents the current app's unique ID.
     */
    appUID: string;

    /**
     * This holds the app's installation ID.
     */
    installationUID: string;

    /**
     * This object holds details of the current user.
     */
    currentUser: User;

    /**
     * The type of UI Location being rendered.
     */
    private type: LocationType;

    /**
     * The configuration set for an app.
     */
    private config: GenericObjectType;

    /**
     * This holds the instance of Cross-domain communication library for posting messages between windows.
     */
    postRobot: typeof postRobot;

    /**
     * This holds the stack instance that allows users to read and manipulate a range of objects in a stack.
     */
    stack: Stack;

    /**
     * Store to persist data for the app.
     * Note: Data is stored in the browser's {@link external:localStorage} and will be lost if the {@link external:localStorage} is cleared in the browser.
     */
    store: Store;

    /**
     * This holds the instance of the Metadata class used to manage metadata.
     */
    metadata: Metadata;

    /**
     * This value represents the current UI location's unique ID. One App may contain multiple UI locations
     */
    locationUID: string;

    /**
     * This holds the instance of a helper class used to manage modals in an App.
     */
    modal: Modal;

    /**
     * The Contentstack Region on which the app is running.
     */
    readonly region: Region;
    version: number | null;

    ids: {
        apiKey: string;
        appUID: string;
        installationUID: string;
        locationUID: string;
        orgUID: string;
        userUID: string;
    };

    /**
     * This holds the information of the currently running UI location of an App.
     */
    location: {
        DashboardWidget: IDashboardWidget | null;
        SidebarWidget: ISidebarWidget | null;
        CustomField: ICustomField | null;
        RTEPlugin: IRTEPluginInitializer | null;
        RTELocation: GenericObjectType | null;
        AppConfigWidget: IAppConfigWidget | null;
        AssetSidebarWidget: AssetSidebarWidget | null;
        FullPage: IFullPageLocation | null;
        FieldModifierLocation: IFieldModifierLocation | null;
    };

    constructor(initData: InitializationData) {
        const initializationData = initData;

        this.postRobot = postRobot;

        this.appUID = initializationData.app_id;

        this.locationUID = initializationData.extension_uid;

        this.installationUID = initializationData.installation_uid;

        this.currentUser = initializationData.user;

        this.type = initializationData.type;

        this.store = new Store(postRobot);

        this.stack = new Stack(initializationData.stack, postRobot, {
            currentBranch: initializationData.currentBranch,
        });

        this.metadata = new Metadata(postRobot);

        this.config = initializationData.config ?? {};

        this.ids = {
            apiKey: initializationData.stack.api_key,
            appUID: initializationData.app_id,
            installationUID: initializationData.installation_uid,
            locationUID: initializationData.extension_uid,
            orgUID: initializationData.stack.org_uid,
            userUID: initializationData.user.uid,
        };

        this.location = {
            DashboardWidget: null,
            CustomField: null,
            SidebarWidget: null,
            RTEPlugin: null,
            RTELocation: null,
            AppConfigWidget: null,
            AssetSidebarWidget: null,
            FullPage: null,
            FieldModifierLocation: null,
        };

        window["postRobot"] = postRobot;

        this.modal = new Modal();

        this.region = formatAppRegion(initializationData.region);

        const stack = new Stack(initializationData.stack, postRobot, {
            currentBranch: initializationData.currentBranch,
        });

        this.version = initializationData.manifest?.version || null;

        switch (initializationData.type) {
            case LocationType.DASHBOARD: {
                this.location.DashboardWidget = {
                    frame: new Window(
                        postRobot,
                        this.type as LocationType.DASHBOARD,
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
                    this.location.RTELocation = {
                        entry: new Entry(
                            initializationData as IRTEInitData,
                            postRobot,
                            emitter
                        ),
                    };
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
                    frame: new Window(
                        postRobot,
                        this.type as LocationType.FIELD,
                        emitter
                    ),
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
            console.error("Extension Event", err);
        }
        emitter.addListener(
            "_eventRegistration",
            this.handleEventRegistration.bind(this)
        );
    }

    private handleEventRegistration(event: any) {
        const eventRegistry = new EventRegistry({
            installationUID: this.installationUID,
            appUID: this.appUID,
            locationType: this.type,
            connection: postRobot,
        });
        eventRegistry.register(event.name);
    }

    pulse = (eventName: string, metadata: GenericObjectType): void => {
        this.postRobot.sendToParent("analytics", { eventName, metadata });
    };

    /**
     * Method used to retrieve the configuration set for an app.
     */
    getConfig = (): Promise<GenericObjectType> => {
        if (!this.installationUID) {
            return Promise.resolve(this.config);
        }
        return this.postRobot
            .sendToParent("getConfig")
            .then(onData)
            .catch(onError);
    };

    /**
     * Method used to get the type of currently running UI location of the app.
     */
    getCurrentLocation = (): LocationType => {
        return this.type;
    };

    /**
     * Conditionally retrieves and returns the app version if not present already
     * @returns version of the app currently running.
     */
    getAppVersion = async (): Promise<number | null> => {
        if (this.version) {
            return Promise.resolve(this.version);
        }
        if (!this.installationUID) {
            return Promise.resolve(null);
        }
        const orgUid = this.stack._data.org_uid;
        const options = {
            uid: this.installationUID,
            action: "getAppManifest",
            headers: { organization_uid: orgUid },
            skip_api_key: true,
        };
        const app: Manifest = await this.postRobot
            .sendToParent<Manifest>("stackQuery", options)
            .then(onData)
            .catch(onError);
        this.version = app.version;
        return this.version;
    };

    /**
     * Method used to get the Contentstack Region on which the app is running.
     */
    getCurrentRegion = (): Region => {
        return this.region;
    };

    /**
     * Method used to make an API request to the Contentstack's CMA APIs.
     */

    api = (url:string, payload:RequestInit)=> dispatchPostRobotRequest(this.postRobot)({url,...payload});

    /**
     * Method used to create an adapter for management sdk.
    */

    createAdapter = <T>(config: unknown) => createSDKAdapter(this.postRobot)(config as unknown as ApiRequestParams) as Promise<ApiResponse<T>>;

    /**
     * Method used to initialize the App SDK.
     * @param version - Version of the app SDK in use.
     */
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

export default UiLocation;
