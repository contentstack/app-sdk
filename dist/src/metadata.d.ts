import { AnyObject } from "./types/common.types";
export declare interface IMetadata {
    uid: string;
    type: "asset" | "entry";
    _content_type_uid?: string;
    locale?: string;
    [key: string]: any;
}
export declare interface IMetadataCreateDto extends Omit<Partial<IMetadata>, "uid"> {
    entity_uid: string;
}
export declare interface IMetadataUpdateDto {
    uid: string;
    [key: string]: any;
}
export declare interface IMetadataRetrieveDto {
    uid: string;
}
export declare interface IMetadataDeleteDto {
    uid: string;
}
declare class Metadata {
    private _connection;
    constructor(_connection: any);
    createMetaData(metadataConfig: IMetadataCreateDto): any;
    retrieveMetaData(metadataConfig: IMetadataRetrieveDto): any;
    retrieveAllMetaData(metadataConfig: AnyObject): any;
    updateMetaData(metadataConfig: IMetadataUpdateDto): any;
    deleteMetaData(metadataConfig: IMetadataDeleteDto): any;
}
export default Metadata;
//# sourceMappingURL=metadata.d.ts.map