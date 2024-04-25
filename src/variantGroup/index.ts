import Base from "../stack/api/base";
import {
    BranchDetail,
    GetAllStacksOptions,
    StackAdditionalData,
    StackDetail,
    StackSearchQuery,
} from "../types/stack.types";

/**
 * Class representing the variant group.
 */

let connection = {};
class VariantGroup {

    /**
     * @hideconstructor
     */

    _connection: any;
    _data: StackDetail;
    private _currentBranch: BranchDetail | null = null;

    constructor(
        data: StackDetail = {} as StackDetail,
        connection: any,
        additionalData: StackAdditionalData
    ) {
        this._connection = connection;
        this._data = data;

        const currentBranch = additionalData.currentBranch || "";

        if (currentBranch) {
            this._currentBranch =
                (data.branches || []).find(
                    (branch) => branch.uid === additionalData.currentBranch
                ) || null;
        }
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
