import postRobot from "post-robot";
import { GenericObjectType } from "./types/common.types";
export declare interface IMetadata {
    api_key: string;
    _content_type_uid?: string;
    entity_uid: string;
    extension_uid?: string;
    locale?: string;
    scope?: string;
    type: "asset" | "entry";
    uid: string;
    [key: string]: any;
}
export declare interface IMetadataCreateDto {
    entity_uid: string;
    _content_type_uid: string;
    type: "asset" | "entry";
    extension_uid: string;
    [key: string]: any;
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
/**
 * The Metadata class provides methods for creating, retrieving, updating, and deleting metadata.
 */
declare class Metadata {
    private _connection;
    constructor(_connection: typeof postRobot);
    /**
     * Creates a new Metadata record.
     * @param {IMetadataCreateDto} metadataConfig The metadata configuration data required to create the metadata.
     * @returns {Promise<{ metadata: IMetadata }>} A promise that resolves to the newly created metadata record.
     */
    createMetaData(metadataConfig: IMetadataCreateDto): Promise<{
        metadata: IMetadata;
    }>;
    /**
     * Retrieves a metadata record by its ID.
     * @param {IMetadataRetrieveDto} metadataConfig The metadata configuration containing its uid.
     * @returns {Promise<{ metadata: IMetadata }> } A promise that resolves to the metadata record with the specified ID.
     */
    retrieveMetaData(metadataConfig: IMetadataRetrieveDto): Promise<{
        metadata: IMetadata;
    }>;
    /**
     * Retrieves all metadata records.
     * @param {GenericObjectType} params Optional parameters for the query.
     * @returns {Promise<{ metadata: IMetadata[] }>} A promise that resolves to an array of all metadata records.
     */
    retrieveAllMetaData(params?: GenericObjectType): Promise<{
        metadata: IMetadata[];
    }>;
    /**
     * Updates a metadata record.
     * @param {IMetadataUpdateDto} metadataConfig The metadata configuration that needs to be updated.
     * @returns {Promise<{ metadata: IMetadata }>} A promise that resolves to the metadata record that has been updated.
     */
    updateMetaData(metadataConfig: IMetadataUpdateDto): Promise<{
        metadata: IMetadata;
    }>;
    /**
     * Deletes a metadata record.
     * @param {IMetadataDeleteDto} metadataConfig The metadata configuration.
     * @returns {Promise<{ notice: string }>} A promise that resolves with a message upon successful deletion of the metadata record.
     */
    deleteMetaData(metadataConfig: IMetadataDeleteDto): Promise<{
        notice: string;
    }>;
}
export default Metadata;
//# sourceMappingURL=metadata.d.ts.map