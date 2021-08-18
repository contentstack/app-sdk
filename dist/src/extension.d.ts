import Field from './field';
import Stack from './stack';
import Store from './store';
import { IConfig, ICustomField, IDashboardInitData, IDashboardWidget, IFieldConfig, IFieldInitData, ILocation, IRTE, IRTEInitData, ISidebarInitData, ISidebarWidget, IType, IUser } from './types';
/** Class representing an extension from Contentstack UI. */
declare class Extension {
    /**
     * @hideconstructor
     */
    config: IConfig;
    postRobot: any;
    currentUser: IUser;
    location?: ILocation;
    type?: IType;
    fieldConfig?: IFieldConfig;
    field?: Field;
    app_id?: string;
    store: Store;
    stack: Stack;
    Extension: {
        DashboardWidget: IDashboardWidget | null;
        SidebarWidget: ISidebarWidget | null;
        CustomField: ICustomField | null;
        RTEPlugin: IRTE | null;
    };
    constructor(initData: IRTEInitData | IDashboardInitData | IFieldInitData | ISidebarInitData);
    static initialize(version: string): any;
    setReady(): any;
}
export default Extension;
//# sourceMappingURL=extension.d.ts.map