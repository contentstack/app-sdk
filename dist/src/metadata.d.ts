export declare interface IMetadata {
    uid: string;
    type: "asset" | "entry";
    _content_type_uid?: string;
    locale?: string;
    [key: string]: any;
}
declare class Metadata {
    private _connection;
    constructor(_connection: any);
    createMetaData(metadataConfig: IMetadata): any;
    retrieveMetaData(metadataConfig: IMetadata): any;
    updateMetaData(metadataConfig: IMetadata): any;
    deleteMetaData(metadataConfig: IMetadata): any;
}
export default Metadata;
//# sourceMappingURL=metadata.d.ts.map