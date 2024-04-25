import Base from "../stack/api/base";
import { GenericObjectType } from "../types/common.types";

/**
 * Class representing the Variant Group.
 */

let connection = {};

class VariantGroup extends Base {
    constructor(uid: string) {
        if (!uid) {
            throw new Error("uid is required");
        }
        super(uid);
        this._query = {};
        return this;
    }

    static get connection() {
        return connection;
    }
 /**
     * @function
     * @name Stack#VariantGroup#createVariant
     * @description This method creates a new variant in a group.
     * @example appSDK.stack.VariantGroup("variant_group_uid").createVariant(variant_payload);
     * @return {external:Promise}
     */
    createVariant(payload: GenericObjectType) {
        return this.fetch("createVariant", payload);
    }
    /**
     * @function
     * @name Stack#VariantGroup#getVariantsByGroup
     * @description This method returns all the variants within a group.
     * @example appSDK.stack.VariantGroup("variant_group_uid").getVariantsByGroup();
     * @return {external:Promise}
     */
    getVariantsByGroup() {
        return this.fetch("getVariantsByGroup");
    }

    /**
     * @function
     * @name Stack#VariantGroup#getVariantsByGroup#deleteVariant
     * @description This method deletes a specified variant from a group.
     * @example appSDK.stack.VariantGroup("variant_group_uid").deleteVariant("variant_uid");
     * @return {external:Promise}
     */
    deleteVariant(variant_uid: string) {
        this._query.variant_uid = variant_uid;
        return this.fetch("deleteVariant");
    }
}

export default (uiConnection: GenericObjectType) => {
    connection = uiConnection;
    return new Proxy(VariantGroup, {
        apply(Target: any, thisArg, argumentsList: any[]) {
            return new Target(...argumentsList);
        },
    });
};
