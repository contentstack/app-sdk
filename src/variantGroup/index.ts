import Base from "../stack/api/base";

/**
 * Class representing the variant group.
 */

let connection = {};
class VariantGroup extends Base {
    constructor(uid: string) {
        super(uid);
    }

    createVariantGroup() {
        console.log("Variant Group created");
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
