import Stack from './stack';
import Store from './store';
import { IAppConfigInitData, IAppConfigWidget, ICustomField, IDashboardInitData, IDashboardWidget, IFieldInitData, IFullScreenInitData, ILocation, IPageWidget, IRTEInitData, ISidebarInitData, ISidebarWidget, IUser } from './types';
import { IRTEPluginInitializer } from './RTE/types';
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
    location: {
        DashboardWidget: IDashboardWidget | null;
        SidebarWidget: ISidebarWidget | null;
        CustomField: ICustomField | null;
        RTEPlugin: IRTEPluginInitializer | null;
        AppConfigWidget: IAppConfigWidget | null;
        FullscreenAppWidget: IPageWidget | null;
    };
    constructor(initData: IRTEInitData | IDashboardInitData | IFieldInitData | ISidebarInitData | IAppConfigInitData | IFullScreenInitData);
    getConfig: () => Promise<{
        [key: string]: any;
    }>;
    getCurrentLocation: () => ILocation;
    static initialize(version: string): any;
    setReady(): any;
}
export default Extension;
//# sourceMappingURL=extension.d.ts.map