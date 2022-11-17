export declare interface BranchDetail {
    created_at: string;
    created_by: string;
    deleted_at: boolean;
    source: string;
    uid: string;
    updated_at: string;
    updated_by: string;
    alias: {
        uid: string;
    }[];
}
declare class Branch {
    _connection: any;
    private _branches;
    private _currentBranch;
    /**
     * @constructor
     * @hideconstructor
     * @name Stack#Branch
     * @desc This class provides you methods to help with the branches.
     * @see {@link https://www.contentstack.com/docs/developers/apis/content-management-api/#branches}
     */
    constructor(branches?: BranchDetail[], currentBranch?: string);
    get getAllBranches(): BranchDetail[];
    get getCurrentBranch(): BranchDetail | null;
}
export default Branch;
//# sourceMappingURL=Branch.d.ts.map