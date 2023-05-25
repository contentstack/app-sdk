import postRobot from "post-robot";
import AssetSidebarWidget from "./AssetSidebarWidget";
import { IRTEPluginInitializer } from "./RTE/types";
import Metadata from "./metadata";
import Modal from "./modal";
import Stack from "./stack";
import Store from "./store";
import { IAppConfigWidget, ICustomField, IDashboardWidget, IFieldModifierLocation, IFullPageLocation, ISidebarWidget, InitializationData, LocationType, Region } from "./types";
import { GenericObjectType } from "./types/common.types";
import { User } from "./types/user.types";
/** Class representing an extension from Contentstack App Framework SDK. */
declare class Extension {
    /**
     * @hideconstructor
     */
    appUID: string;
    installationUID: string;
    currentUser: User;
    private type;
    private config;
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
        AssetSidebarWidget: AssetSidebarWidget | null;
        FullPage: IFullPageLocation | null;
        FieldModifierLocation: IFieldModifierLocation | null;
    };
    constructor(initData: InitializationData);
    pulse: (eventName: string, metadata: {
        [key: string]: any;
    }) => void;
    /**
     *
     * @returns The configuration set for the app.
     */
    getConfig: () => Promise<GenericObjectType>;
    /**
     *
     * @returns the current UI location of the app that is running.
     */
    getCurrentLocation: () => LocationType;
    /**
     *
     * @returns Contentstack Region on which the app is running.
     */
    getCurrentRegion: () => Region;
    static initialize(version: string): Promise<InitializationData>;
    setReady(): Promise<ResponseMessageEvent>;
}
export default Extension;
//# sourceMappingURL=extension.d.ts.map