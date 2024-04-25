import Base from "../stack/api/base";

/**
 * Class representing the variant group.
 */

let connection = {};
class VariantGroup extends Base {
    constructor(uid: string) {
        if (!uid) {
            throw new Error("uid is required");
        }
        super(uid);
        this._query = {};
        return this
    }

    static get connection() {
        return connection;
    }

    getGroupedVariants() {
        console.log("getGroupedVariants",this.uid);
        this._query.group_uid = this.uid
        return this.fetch("getGroupedVariants");
    }
}

export default (uiConnection: any) => {
    connection = uiConnection;
    return new Proxy(VariantGroup, {
        apply(Target: any, thisArg, argumentsList: any[]) {
            return new Target(...argumentsList);
        },
    });
};
