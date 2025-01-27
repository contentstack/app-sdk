import { GenericObjectType } from "./common.types";

export declare interface OrganizationDetails {
    uid: string;
    name: string;
    owner_uid: string;
    expires_on: string;
    enabled: boolean;
    created_at: string;
    updated_at: string;
    tags: string[];
}