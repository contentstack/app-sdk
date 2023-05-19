import AssetSidebarWidget from "./AssetSidebarWidget";
import { IRTEPluginInitializer } from "./RTE/types";
import Metadata from "./metadata";
import Modal from "./modal";
import Stack from "./stack";
import Store from "./store";
import { IAppConfigInitData, IAppConfigWidget, IAssetSidebarInitData, ICustomField, IDashboardInitData, IDashboardWidget, IEntryFieldLocation, IEntryFieldLocationInitData, IFieldInitData, IFieldModifierLocation, IFieldModifierLocationInitData, IFullPageLocation, IFullPageLocationInitData, ILocation, IPageWidget, IRTEInitData, ISidebarInitData, ISidebarWidget, IUser, Region } from "./types";
import { AnyObject } from "./types/common.types";
/** Class representing an extension from Contentstack App Framework SDK. */
declare class Extension {
    /**
     * @hideconstructor
     */
    appUID: string;
    installationUID: string;
    currentUser: IUser;
    private type;
    private config;
    postRobot: any;
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
    constructor(initData: IRTEInitData | IDashboardInitData | IFieldInitData | ISidebarInitData | IAppConfigInitData | IAssetSidebarInitData | IFullPageLocationInitData | IEntryFieldLocationInitData | IFieldModifierLocationInitData);
    pulse: (eventName: string, metadata: {
        [key: string]: any;
    }) => void;
    getConfig: () => Promise<{
        [key: string]: any;
    }>;
    getCurrentLocation: () => ILocation;
    getCurrentRegion: () => Region;
    static initialize(metadata: AnyObject): any;
    setReady(): any;
}
export default Extension;
//# sourceMappingURL=extension.d.ts.map