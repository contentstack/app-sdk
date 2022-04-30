export declare interface anyObjectType {
    [key: string]: any;
}

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
    setInstallationData: (
        installationData: IInstallationData
    ) => Promise<{ [key: string]: any }>;
    getInstallationData: () => Promise<IInstallationData>;
    [key: string]: any;
}

export declare interface IPageWidget {
    [key: string]: any;
}

// initialization data
export declare interface IUser {
    [key: string]: any;
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

// Init data

declare interface ICommonInitData {
    app_id: string;
    installation_uid: string;
    extension_uid: string;
    stack: ICurrentStack;
    user: IUser;
}

export declare interface IDashboardInitData {
    data: ICommonInitData & {
        dashboard_width: "full_width" | "half_width";
        config?: anyObjectType;
        type: "DASHBOARD";
    };
}

export declare interface ISidebarInitData {
    data: ICommonInitData & {
        app_config: IConfig;
        content_type: ICurrentContentType;
        entry: ICurrentEntry;
        locale: string;
        config?: anyObjectType;
        type: "WIDGET";
    };
}

export declare interface IFieldInitData {
    data: ICommonInitData & {
        entry: ICurrentEntry;
        content_type: ICurrentContentType;
        locale: string;
        uid: string;
        schema: ISchema;
        app_config: IConfig;
        value: any;
        field_config: IFieldConfig;
        config?: anyObjectType;
        self: boolean;
        type: "FIELD";
    };
}

export declare interface IRTEInitData {
    data: ICommonInitData & {
        type: "RTE";
        config?: anyObjectType;
    };
}

export declare interface IAppConfigInitData {
    data: ICommonInitData & {
        type: "APP_CONFIG_WIDGET";
        config?: anyObjectType;
    };
}

export declare interface ICurrentAsset {
    [key: string]: any;
}

export declare interface IAssetSidebarInitData {
    data: ICommonInitData & {
        type: "ASSET_SIDEBAR_WIDGET";
        currentAsset: ICurrentAsset;
        config: { [key: string]: any };
    };
}

export declare interface setAssetDto {
    title: string;
    description: string;
    tags: string[];
}

export enum StackLocation {
    STACK_CONFIG = "cs.cm.stack.config",
    DASHBOARD = "cs.cm.stack.dashboard",
    SIDEBAR = "cs.cm.stack.sidebar",
    CUSTOM_FIELD = "cs.cm.stack.custom_field",
    RTE = "cs.cm.stack.rte",
}

export enum OrganizationLocation {
    ORG_CONFIG = "cs.org.config",
}

export type AppLocation = StackLocation | OrganizationLocation;

export interface Scope {
    content_types: string[];
}

/**
 * installation details API response
 */
export interface IInstallationData {
    configuration: { [key: string]: any };
    server_configuration: { [key: string]: any };
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
// End of Init data

export declare interface IInitializationData {
    FIELD: IFieldConfig;
    WIDGET: ISidebarInitData;
    DASHBOARD: IDashboardInitData;
    RTE: IRTEInitData;
    APP_CONFIG_WIDGET: IAppConfigInitData;
    ASSET_SIDEBAR_WIDGET: IAssetSidebarInitData;
}

export declare type ILocation =
    | "RTE"
    | "FIELD"
    | "DASHBOARD"
    | "WIDGET"
    | "APP_CONFIG_WIDGET"
    | "ASSET_SIDEBAR_WIDGET";
