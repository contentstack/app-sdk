import { AnyObject } from "./common.types";
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
        version: string;
        rte_version: number;
        blockAuthQueryParams: boolean;
        allowedCDNTokens: ["access_token"];
        branches: boolean;
        localesOptimization: boolean;
        webhook_enabled: boolean;
        live_preview?: Partial<{
            enabled: boolean;
            "default-env": string;
            "default-url": string;
        }>;
        language_fallback: boolean;
    };
    master_key: string;
    collaborators: {
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
    stack_variables: AnyObject;
    discrete_variables: {
        cms: boolean;
        _version: number;
        secret_key: string;
    };
    global_search: boolean;
    branches?: BranchDetail[];
    usage: {
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
//# sourceMappingURL=stack.types.d.ts.map