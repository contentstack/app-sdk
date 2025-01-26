import { GenericObjectType } from "./common.types";

export declare interface OrganizationDetails {
    uid: string;
    name: string;
    plan_id: string;
    owner_uid: string;
    is_transfer_set: boolean;
    expires_on: string;
    enabled: boolean;
    is_over_usage_allowed: boolean;
    created_at: string;
    updated_at: string;
    settings: GenericObjectType;
    tags: string[];
    plan?: {
        plan_id: string;
        name: string;
        message: string;
        price: string;
        features: {
            uid: string;
            name: string;
            enabled: boolean;
            limit: number;
            max_limit: number;
            is_required: boolean;
            depends_on: string[];
        }[];
        created_at: string;
        updated_at: string;
        blockedAssetTypes: any[];
    };
}