import { AnyObject } from "./types/common.types";
import { StackDetail } from "./types/stack.types";
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
export declare interface IFieldModifierLocation {
    [key: string]: any;
}
export declare interface IEntryFieldLocation {
    [key: string]: any;
}
export declare interface IFullPageLocation {
    [key: string]: any;
}
export declare interface IAppConfigWidget {
    installation: {
        setInstallationData: (installationData: IInstallationData) => Promise<AnyObject>;
        getInstallationData: () => Promise<IInstallationData>;
        setValidity: (isValid: boolean, options?: ValidationOptions) => void;
        [key: string]: any;
    };
    stack: AnyObject;
}
export declare interface IPageWidget {
    [key: string]: any;
}
export declare interface IUser {
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
declare interface ICommonInitData {
    app_id: string;
    installation_uid: string;
    extension_uid: string;
    stack: StackDetail;
    user: IUser;
    currentBranch: string;
}
export declare interface IDashboardInitData {
    data: ICommonInitData & {
        dashboard_width: "full_width" | "half_width";
        config?: AnyObject;
        type: "DASHBOARD";
    };
}
export declare interface ISidebarInitData {
    data: ICommonInitData & {
        app_config: IConfig;
        content_type: ICurrentContentType;
        entry: ICurrentEntry;
        locale: string;
        config?: AnyObject;
        changedData: ICurrentEntry;
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
        config?: AnyObject;
        changedData: ICurrentEntry;
        self: boolean;
        type: "FIELD";
    };
}
export declare interface IFullPageLocationInitData {
    data: ICommonInitData & {
        type: "FULL_PAGE_LOCATION";
        config?: AnyObject;
    };
}
export declare interface IRTEInitData {
    data: ICommonInitData & {
        type: "RTE";
        config?: AnyObject;
    };
}
export declare interface IAppConfigInitData {
    data: ICommonInitData & {
        type: "APP_CONFIG_WIDGET";
        config?: AnyObject;
    };
}
export declare interface ICurrentAsset {
    [key: string]: any;
}
export declare interface IAssetSidebarInitData {
    data: ICommonInitData & {
        type: "ASSET_SIDEBAR_WIDGET";
        currentAsset: ICurrentAsset;
        config: {
            [key: string]: any;
        };
    };
}
export declare interface IFieldModifierLocationInitData {
    data: ICommonInitData & {
        type: "FIELD_MODIFIER_LOCATION";
        config?: Record<string, any>;
        content_type: ICurrentContentType;
        entry: ICurrentEntry;
        locale: string;
        uid: string;
        schema: ISchema;
        value: any;
        self: boolean;
        changedData: ICurrentEntry;
    };
}
export declare interface IEntryFieldLocationInitData {
    data: ICommonInitData & {
        type: "ENTRY_FIELD_LOCATION";
        config?: Record<string, any>;
        content_type: ICurrentContentType;
        entry: ICurrentEntry;
        locale: string;
        uid: string;
        schema: ISchema;
        value: any;
        self: boolean;
        changedData: ICurrentEntry;
    };
}
export declare interface setAssetDto {
    title: string;
    description: string;
    tags: string[];
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
    serverConfiguration: {
        [key: string]: any;
    };
    webhooks?: {
        channels: string[];
    }[];
    uiLocations?: {
        type: AppLocation;
        meta: {
            enabled: boolean;
            scope?: Scope;
            name: string;
            extentionUid: string;
        }[];
    }[];
}
export declare interface IInitializationData {
    FIELD: IFieldConfig;
    WIDGET: ISidebarInitData;
    DASHBOARD: IDashboardInitData;
    RTE: IRTEInitData;
    APP_CONFIG_WIDGET: IAppConfigInitData;
    ASSET_SIDEBAR_WIDGET: IAssetSidebarInitData;
}
export declare type ILocation = "RTE" | "FIELD" | "DASHBOARD" | "WIDGET" | "APP_CONFIG_WIDGET" | "ASSET_SIDEBAR_WIDGET" | "FULL_PAGE_LOCATION" | "ENTRY_FIELD_LOCATION" | "FIELD_MODIFIER_LOCATION";
export declare interface ValidationOptions {
    message?: string;
}
export declare interface IManagementTokenDetails {
    uid: string;
    name: string;
}
export {};
//# sourceMappingURL=types.d.ts.map