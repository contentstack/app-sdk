import EntryClass from "./entry";
import Field from "./field";
import FieldModifierLocationField from "./fieldModifierLocation/field";
import FieldModifierLocationFrame from "./fieldModifierLocation/frame";
import Stack from "./stack";
import { GenericObjectType } from "./types/common.types";
import { Entry } from "./types/entry.types";
import { Asset, ContentType, Schema, StackDetail } from "./types/stack.types";
import { OrganizationDetails } from "./types/organization.types";
import { ContentstackEndpoints } from "./types/api.type";
import { User } from "./types/user.types";
import Window from "./window";

export declare interface IDashboardWidget {
    frame: Window;
    stack: Stack;
}

export declare interface ICustomField {
    entry: EntryClass;
    field: Field;
    fieldConfig: GenericObjectType;
    frame: Window;
    stack: Stack;
}

export declare interface ISidebarWidget {
    entry: EntryClass;
    stack: Stack;
}

export declare interface IFieldModifierLocation {
    entry: EntryClass;
    stack: Stack;
    field: FieldModifierLocationField;
    frame: FieldModifierLocationFrame;
}

export declare interface IFullPageLocation {
    stack: Stack;
}

export declare interface ManifestUser {
    uid: string;
    first_name: string;
    last_name: string;
}

export declare interface Manifest {
    created_by: ManifestUser;
    icon: string;
    name: string;
    target_type: string;
    uid: string;
    updated_by: ManifestUser;
    version: number;
    visibility: string;
}

export declare interface IAppConfigWidget {
    installation: {
        setInstallationData: (
            installationData: IInstallationData
        ) => Promise<GenericObjectType>;
        getInstallationData: () => Promise<IInstallationData>;
        setValidity: (isValid: boolean, options?: ValidationOptions) => void;
        stack(): Stack;
    };
    stack: Stack;
}

export declare interface IGlobalFullPageLocation {
    currentOrganization: OrganizationDetails;
}

export enum DashboardWidth {
    FULL_WIDTH = "full_width",
    HALF_WIDTH = "half_width",
}

export enum LocationType {
    APP_CONFIG_WIDGET = "APP_CONFIG_WIDGET",
    ASSET_SIDEBAR_WIDGET = "ASSET_SIDEBAR_WIDGET",
    DASHBOARD = "DASHBOARD",
    FIELD = "FIELD",
    FIELD_MODIFIER_LOCATION = "FIELD_MODIFIER_LOCATION",
    FULL_PAGE_LOCATION = "FULL_PAGE_LOCATION",
    RTE = "RTE",
    WIDGET = "WIDGET",
    CONTENT_TYPE_SIDEBAR_WIDGET = "CONTENT_TYPE_SIDEBAR_WIDGET",
    GLOBAL_FULL_PAGE_LOCATION = "GLOBAL_FULL_PAGE_LOCATION",
}

// Init data

declare interface ICommonInitData {
    app_id: string;
    currentBranch: string;
    extension_uid: string;
    installation_uid: string;
    region: string;
    stack: StackDetail;
    type: LocationType;
    user: User;
    manifest?: Manifest;
    endpoints: ContentstackEndpoints;
}

export declare interface IGlobalFullPageLocationInitData
    extends ICommonInitData {
    organization: OrganizationDetails;
    config?: GenericObjectType;
    type: LocationType.GLOBAL_FULL_PAGE_LOCATION;
}

export declare interface IDashboardInitData extends ICommonInitData {
    dashboard_width: DashboardWidth;
    config?: GenericObjectType;
    type: LocationType.DASHBOARD;
}

export declare interface ISidebarInitData extends ICommonInitData {
    config?: GenericObjectType;
    content_type: ContentType;
    entry: Entry;
    locale: string;
    type: LocationType.WIDGET;
}

export declare interface IFieldInitData extends ICommonInitData {
    config?: GenericObjectType;
    content_type: ContentType;
    entry: Entry;
    field_config: GenericObjectType;
    locale: string;
    schema: Schema;
    self: boolean;
    type: LocationType.FIELD;
    uid: string;
    value: any;
}

export declare interface IFullPageLocationInitData extends ICommonInitData {
    config?: GenericObjectType;
    type: LocationType.FULL_PAGE_LOCATION;
}

export declare interface IRTEInitData extends ICommonInitData {
    config?: GenericObjectType;
    type: LocationType.RTE;
    entry: Entry;
    content_type: ContentType;
    locale: string;
}

export declare interface IAppConfigInitData extends ICommonInitData {
    config?: GenericObjectType;
    type: LocationType.APP_CONFIG_WIDGET;
}

export declare interface IAssetSidebarInitData extends ICommonInitData {
    config: GenericObjectType;
    currentAsset: Asset;
    type: LocationType.ASSET_SIDEBAR_WIDGET;
}

export declare interface IContentTypeSidebarInitData extends ICommonInitData {
    config?: GenericObjectType;
    currentContentType: ContentType;
    type: LocationType.CONTENT_TYPE_SIDEBAR_WIDGET;
}

export declare interface IFieldModifierLocationInitData
    extends ICommonInitData {
    changedData: Entry;
    config?: GenericObjectType;
    content_type: ContentType;
    entry: Entry;
    locale: string;
    schema: Schema;
    self: boolean;
    value: any;
    type: LocationType.FIELD_MODIFIER_LOCATION;
    uid: string;
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

export type InitializationData =
    | IAppConfigInitData
    | IAssetSidebarInitData
    | IDashboardInitData
    | IFieldInitData
    | IFieldModifierLocationInitData
    | IFullPageLocationInitData
    | IRTEInitData
    | ISidebarInitData
    | IContentTypeSidebarInitData
    | IGlobalFullPageLocationInitData;

/**
 * installation details API response
 */
export interface IInstallationData {
    configuration: { [key: string]: any };
    serverConfiguration: { [key: string]: any };
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
// End of Init data

export declare interface ValidationOptions {
    message?: string;
}

export declare interface IManagementTokenDetails {
    uid: string;
    name: string;
}

export enum Region {
    UNKNOWN = "UNKNOWN",
    NA = "NA",
    EU = "EU",
    AZURE_NA = "AZURE_NA",
    AZURE_EU = "AZURE_EU",
    GCP_NA = "GCP_NA",
    GCP_EU = "GCP_EU",
}

export type RegionType =
    | "UNKNOWN"
    | "NA"
    | "EU"
    | "AZURE_NA"
    | "AZURE_EU"
    | "GCP_NA"
    | string;

export type Extension = {
    app_installation_uid: string
    app_uid: string
    config: GenericObjectType
    created_at: string
    created_by: string
    signed: boolean
    src: string
    tags: string[]
    title: string
    type: string
    uid: string
    updated_at: string
    updated_by: string
    _version: number
}

export type RTEContext = IRTEInitData & {
    extension: Extension
}