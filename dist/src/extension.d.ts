import Stack from './stack';
import Store from './store';
import { IAppConfigInitData, IAppConfigWidget, ICustomField, IDashboardInitData, IDashboardWidget, IFieldInitData, IFullScreenInitData, ILocation, IPageWidget, IRTEInitData, ISidebarInitData, ISidebarWidget, IStackConfgWidget, IStackConfigInitData, IUser } from './types';
import { IRTEPluginInitializer } from './RTE/types';
/** Class representing an extension from Contentstack App Framework SDK. */
declare class Extension {
    /**
     * @hideconstructor
     */
    app_id: string;
    currentUser: IUser;
    location: ILocation;
    postRobot: any;
    stack: Stack;
    store: Store;
    Extension: {
        DashboardWidget: IDashboardWidget | null;
        SidebarWidget: ISidebarWidget | null;
        CustomField: ICustomField | null;
        RTEPlugin: IRTEPluginInitializer | null;
        StackConfigWidget: IStackConfgWidget | null;
        AppConfigWidget: IAppConfigWidget | null;
        FullscreenAppWidget: IPageWidget | null;
    };
    constructor(initData: IRTEInitData | IDashboardInitData | IFieldInitData | ISidebarInitData | IStackConfigInitData | IAppConfigInitData | IFullScreenInitData);
    getAppConfig: () => void;
    static initialize(version: string): any;
    setReady(): any;
}
export default Extension;
//# sourceMappingURL=extension.d.ts.map