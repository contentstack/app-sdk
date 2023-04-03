import Stack from "./stack";
import Store from "./store";
import Metadata from "./metadata";
import { IAppConfigInitData, IAppConfigWidget, IAssetSidebarInitData, ICustomField, IDashboardInitData, IDashboardWidget, IFieldInitData, IEntryFieldLocation, IEntryFieldLocationInitData, ILocation, IPageWidget, IRTEInitData, ISidebarInitData, ISidebarWidget, IUser, IFullPageLocationInitData, IFullPageLocation } from "./types";
import { IRTEPluginInitializer } from "./RTE/types";
import AssetSidebarWidget from "./AssetSidebarWidget";
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
    };
    constructor(initData: IRTEInitData | IDashboardInitData | IFieldInitData | ISidebarInitData | IAppConfigInitData | IAssetSidebarInitData | IFullPageLocationInitData | IEntryFieldLocationInitData);
    getConfig: () => Promise<{
        [key: string]: any;
    }>;
    getCurrentLocation: () => ILocation;
    static initialize(version: string): any;
    setReady(): any;
}
export default Extension;
//# sourceMappingURL=extension.d.ts.map