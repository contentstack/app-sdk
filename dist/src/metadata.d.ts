export declare interface IMetadata {
    uid: string;
    type: "asset" | "entry";
    [key: string]: any;
}
declare class Metadata {
    private _connection;
    constructor(_connection: any);
    createMetaData(metadataConfig: IMetadata): any;
    retrieveMetaData(type?: "asset" | "entry"): any;
    updateMetaData(metadataConfig: IMetadata): any;
    deleteMetaData(): any;
}
export default Metadata;
//# sourceMappingURL=metadata.d.ts.map