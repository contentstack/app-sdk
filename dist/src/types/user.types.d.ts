import { AnyProperty, GenericObjectType } from "./common.types";
export interface User extends AnyProperty {
    uid: string;
    email: string;
    username: string;
    first_name: string;
    last_name: string;
    org_uid: Array<string>;
    organizations: Array<GenericObjectType>;
    roles: Array<GenericObjectType>;
}
//# sourceMappingURL=user.types.d.ts.map