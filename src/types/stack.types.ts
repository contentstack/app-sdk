import Entry from "../entry";
import { AnyProperty, GenericObjectType } from "./common.types";

export declare interface StackDetail {
    created_at: string;
    updated_at: string;
    uid: string;
    name: string;
    org_uid: string;
    api_key: string;
    master_locale: string;
    is_asset_download_public: boolean;
    owner_uid: string;
    user_uids: string[];
    settings: {
        version?: string;
        rte_version?: number;
        blockAuthQueryParams?: boolean;
        allowedCDNTokens?: ["access_token"];
        branches?: boolean;
        localesOptimization?: boolean;
        webhook_enabled?: boolean;
        live_preview?: Partial<{
            enabled: boolean;
            "default-env": string;
            "default-url": string;
        }>;
        language_fallback?: boolean;
    };
    master_key?: string;
    collaborators?: {
        uid: string;
        created_at: string;
        updated_at: string;
        email: string;
        username: string;
        first_name: string;
        last_name: string;
        active: boolean;
        metadata: {
            idp_user: boolean;
        };
        settings: {
            preferences: {
                global: any[];
                stack: any[];
            };
        };
        accepted: boolean;
        invited_at: string;
        invited_by: string;
    }[];
    stack_variables?: GenericObjectType;
    discrete_variables?: {
        cms: boolean;
        _version: number;
        secret_key: string;
    };
    global_search?: boolean;
    branches?: BranchDetail[];
    usage?: {
        content_types: number;
        entries: number;
        assets: number;
        environments: number;
        locales: number;
        roles: number;
        webhooks: number;
        extensions: number;
        saved_searches: number;
        global_fields: number;
        branches: number;
        labels: number;
        releases: number;
        branch_aliases: number;
    };
}

export declare interface BranchDetail {
    api_key: string;
    uid: string;
    source: string;
    alias: {
        uid: string;
    }[];
}

export declare interface StackAdditionalData {
    currentBranch: string;
}

export declare interface StackSearchQuery {
    type: "entries" | "assets";
    skip?: number;
    limit?: number;
    include_publish_details?: boolean;
    include_unpublished?: boolean;
    include_workflow?: boolean;
    include_fields?: boolean;
    include_rules?: boolean;
    include_title_field_uid?: boolean;
    query?: GenericObjectType;
    search?: string;
    save_recent_search?: boolean;
    desc?: string;
}

export declare interface GetAllStacksOptions {
    orgUid?: string;
    params?: GenericObjectType;
}

export interface ContentType extends AnyProperty {
    title: string;
    uid: string;
    schema: Array<Schema>;
    options: ContentTypeOptions;
}

export interface ContentTypeOptions {
    is_page: boolean;
    singleton: boolean;
    title: string;
    sub_title: Array<any>;
    url_pattern?: string;
}

export interface Schema extends AnyProperty {
    display_name: string;
    uid: string;
    $uid: string;
    data_type: string;
    mandatory?: boolean;
    unique?: boolean;
    field_metadata?: GenericObjectType;
}

export interface Asset extends AnyProperty {
    uid: string;
    title: string;
    description?: string;
    parent_uid?: string;
    url?: string;
    filename?: string;
}

export interface PublishDetails extends AnyProperty {
    entries: Array<Entry>;
    environments: Array<String>;
    locales: Array<String>;
    publish_with_reference: boolean;
    rules: GenericObjectType;
}

export type RequestMethods = "GET" | "POST" | "PUT" | "DELETE";

export type ApiRequestProps = {
        method: RequestMethods,
        url: string,
        baseURL: string,
        headers?: GenericObjectType,
        body?: unknown,
        params?:GenericObjectType
        multipart_data?: {
          [key:string]: {
            "type": string,
            "value": any
          }
        }
}
