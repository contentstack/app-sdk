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
    }

    static get connection() {
        return connection;
    }

    createVariantGroup() {
        return "Hello World";
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
