export declare interface IDashboardWidget {
    [key: string]: any;
}
export declare interface ICustomField {
    [key: string]: any;
}
export declare interface ISidebarWidget {
    [key: string]: any;
}
export declare interface IRTE {
    [key: string]: any;
}
export declare interface IAppConfigWidget {
    setInstallationData: (installationData: IInstallationData) => Promise<{
        [key: string]: any;
    }>;
    getInstallationData: () => Promise<IInstallationData>;
    [key: string]: any;
}
export declare interface IPageWidget {
    [key: string]: any;
}
export declare interface IUser {
}
export declare interface ICurrentStack {
    [key: string]: any;
}
export declare interface ICurrentEntry {
    [key: string]: any;
}
export declare interface ICurrentContentType {
    [key: string]: any;
}
export declare interface IConfig {
    [key: string]: any;
}
export declare interface ISchema {
    [key: string]: any;
}
export declare interface IFieldConfig {
    [key: string]: any;
}
export declare interface IDashboardInitData {
    data: {
        app_id: string;
        installation_uid: string;
        dashboard_width: "full_width" | "half_width";
        stack: ICurrentStack;
        config?: {
            [key: string]: any;
        };
        type: "DASHBOARD";
        user: IUser;
    };
}
export declare interface ISidebarInitData {
    data: {
        app_id: string;
        installation_uid: string;
        app_config: IConfig;
        content_type: ICurrentContentType;
        entry: ICurrentEntry;
        locale: string;
        stack: ICurrentStack;
        config?: {
            [key: string]: any;
        };
        type: "WIDGET";
        user: IUser;
    };
}
export declare interface IFieldInitData {
    data: {
        app_id: string;
        installation_uid: string;
        entry: ICurrentEntry;
        content_type: ICurrentContentType;
        locale: string;
        user: IUser;
        uid: string;
        schema: ISchema;
        app_config: IConfig;
        value: any;
        field_config: IFieldConfig;
        config?: {
            [key: string]: any;
        };
        stack: ICurrentStack;
        self: boolean;
        type: "FIELD";
    };
}
export declare interface IRTEInitData {
    data: {
        app_id: string;
        installation_uid: string;
        stack: ICurrentStack;
        type: "RTE_EXTENSION_WIDGET";
        user: IUser;
        config?: {
            [key: string]: any;
        };
    };
}
export declare interface IAppConfigInitData {
    data: {
        app_id: string;
        installation_uid: string;
        stack: ICurrentStack;
        type: "APP_CONFIG_WIDGET";
        user: IUser;
        config?: {
            [key: string]: any;
        };
    };
}
export declare interface IFullScreenInitData {
    data: {
        app_id: string;
        installation_uid: string;
        stack: ICurrentStack;
        config?: {
            [key: string]: any;
        };
        type: "FULL_SCREEN_WIDGET";
        user: IUser;
    };
}
export declare enum StackLocation {
    STACK_CONFIG = "cs.cm.stack.config",
    DASHBOARD = "cs.cm.stack.dashboard",
    SIDEBAR = "cs.cm.stack.sidebar",
    CUSTOM_FIELD = "cs.cm.stack.custom_field",
    RTE = "cs.cm.stack.rte"
}
export declare enum OrganizationLocation {
    ORG_CONFIG = "cs.org.config"
}
export declare type AppLocation = StackLocation | OrganizationLocation;
export interface Scope {
    content_types: string[];
}
/**
 * installation details API response
 */
export interface IInstallationData {
    configuration: {
        [key: string]: any;
    };
    server_configuration: {
        [key: string]: any;
    };
    webhooks?: {
        webhook_uid: string;
        channels: string[];
    }[];
    ui_locations?: {
        type: AppLocation;
        meta: {
            enabled: boolean;
            scope?: Scope;
            extention_uid: string;
        }[];
    }[];
}
export declare interface IInitializationData {
    FIELD: IFieldConfig;
    WIDGET: ISidebarInitData;
    DASHBOARD: IDashboardInitData;
    RTE_EXTENSION_WIDGET: IRTEInitData;
    APP_CONFIG_WIDGET: IAppConfigInitData;
    FULL_SCREEN_WIDGET: IFullScreenInitData;
}
export declare type ILocation = "RTE_EXTENSION_WIDGET" | "FIELD" | "DASHBOARD" | "WIDGET" | "APP_CONFIG_WIDGET" | "FULL_SCREEN_WIDGET";
//# sourceMappingURL=types.d.ts.map