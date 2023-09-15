import postRobot from "post-robot";
import AssetSidebarWidget from "./AssetSidebarWidget";
import { IRTELocation, IRTEPluginInitializer } from "./RTE/types";
import Metadata from "./metadata";
import Modal from "./modal";
import Stack from "./stack";
import Store from "./store";
import { IAppConfigWidget, ICustomField, IDashboardWidget, IFieldModifierLocation, IFullPageLocation, ISidebarWidget, InitializationData, LocationType, Region } from "./types";
import { GenericObjectType } from "./types/common.types";
import { User } from "./types/user.types";
/**
 * Class representing an extension from Contentstack App SDK.
 * @hideconstructor
 */
declare class Extension {
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
    private type;
    /**
     * The configuration set for an app.
     */
    private config;
    /**
     * This holds the instance of Cross-domain communication library for posting messages between windows.
     */
    postRobot: typeof postRobot;
    /**
     * This holds the stack instance that allows users to read and manipulate a range of objects in a stack.
     */
    stack: Stack;
    /**
     * Store to persist data for extension.
     * Note: Data is stored in the browser's {@link external:localStorage} and will be lost if the {@link external:localStorage} is cleared in the browser.
     */
    store: Store;
    /**
     * This holds the instance of the Metadata class used to manage metadata.
     */
    metadata: Metadata;
    /**
     * This value represents the current location's unique ID. One App may contain multiple locations
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
    /**
     * This holds the information of the currently running location of an App.
     */
    location: {
        DashboardWidget: IDashboardWidget | null;
        SidebarWidget: ISidebarWidget | null;
        CustomField: ICustomField | null;
        RTEPlugin: IRTEPluginInitializer | null;
        RTELocation: IRTELocation | null;
        AppConfigWidget: IAppConfigWidget | null;
        AssetSidebarWidget: AssetSidebarWidget | null;
        FullPage: IFullPageLocation | null;
        FieldModifierLocation: IFieldModifierLocation | null;
    };
    constructor(initData: InitializationData);
    pulse: (eventName: string, metadata: GenericObjectType) => void;
    /**
     * Method used to retrieve the configuration set for an app.
     */
    getConfig: () => Promise<GenericObjectType>;
    /**
     * Method used to get the type of currently running UI location of the app.
     */
    getCurrentLocation: () => LocationType;
    /**
     * Conditionally retrieves and returns the app version if not present already
     * @returns version of the app currently running.
     */
    getAppVersion: () => Promise<number | null>;
    /**
     * Method used to get the Contentstack Region on which the app is running.
     */
    getCurrentRegion: () => Region;
    /**
     * Method used to initialize the App SDK.
     * @param version - Version of the app SDK in use.
     */
    static initialize(version: string): Promise<InitializationData>;
    setReady(): Promise<ResponseMessageEvent>;
}
export default Extension;
//# sourceMappingURL=extension.d.ts.map