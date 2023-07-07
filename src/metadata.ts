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

const metadataActionTypes = {
    creteMetadata: "createMetadata",
    retrieveMetadata: "getMetadata",
    retrieveAllMetadata: "getAllMetadata",
    updateMetadata: "updateMetadata",
    deleteMetadata: "deleteMetadata",
} as const;

/**
 * The Metadata class provides methods for creating, retrieving, updating, and deleting metadata.
 */
class Metadata {
    constructor(private _connection: typeof postRobot) {}

    /**
     * Creates a new Metadata record.
     * @param {IMetadataCreateDto} metadataConfig The metadata configuration data required to create the metadata.
     * @returns {Promise<ResponseMessageEvent<{ metadata: IMetadata }>>} A promise that resolves to the newly created metadata record.
     */
    createMetaData(
        metadataConfig: IMetadataCreateDto
    ): Promise<ResponseMessageEvent<{ metadata: IMetadata }>> {
        const { entity_uid, type = "asset", ...otherMetaData } = metadataConfig;

        const data = {
            action: metadataActionTypes.creteMetadata,
            payload: {
                metadata: {
                    entity_uid,
                    type,
                    ...otherMetaData,
                },
            },
        };

        return this._connection.sendToParent("stackQuery", data);
    }

    /**
     * Retrieves a metadata record by its ID.
     * @param {IMetadataRetrieveDto} metadataConfig The metadata configuration containing its uid.
     * @returns {Promise<ResponseMessageEvent<{ metadata: IMetadata }>> } A promise that resolves to the metadata record with the specified ID.
     */
    retrieveMetaData(
        metadataConfig: IMetadataRetrieveDto
    ): Promise<ResponseMessageEvent<{ metadata: IMetadata }>> {
        const { uid } = metadataConfig;

        const data = {
            uid,
            action: metadataActionTypes.retrieveMetadata,
            payload: {
                metadata: {
                    uid,
                },
            },
        };

        return this._connection.sendToParent("stackQuery", data);
    }

    /**
     * Retrieves all metadata records.
     * @param {GenericObjectType} params Optional parameters for the query.
     * @returns {Promise<ResponseMessageEvent<{ metadata: IMetadata[] }>>} A promise that resolves to an array of all metadata records.
     */
    retrieveAllMetaData(
        params: GenericObjectType = {}
    ): Promise<ResponseMessageEvent<{ metadata: IMetadata[] }>> {
        const data = {
            action: metadataActionTypes.retrieveAllMetadata,
            params,
        };

        return this._connection.sendToParent("stackQuery", data);
    }

    /**
     * Updates a metadata record.
     * @param {IMetadataUpdateDto} metadataConfig The metadata configuration that needs to be updated.
     * @returns {Promise<ResponseMessageEvent<{ metadata: IMetadata }>>} A promise that resolves when the metadata record that has been updated.
     * ? A promise that resolves to the updated metadata record.
     */
    updateMetaData(
        metadataConfig: IMetadataUpdateDto
    ): Promise<ResponseMessageEvent<{ metadata: IMetadata }>> {
        const { uid, ...otherMetaData } = metadataConfig;

        const data = {
            uid,
            action: metadataActionTypes.updateMetadata,
            payload: {
                metadata: {
                    uid,
                    ...otherMetaData,
                },
            },
        };

        return this._connection.sendToParent("stackQuery", data);
    }

    /**
     * Deletes a metadata record.
     * @param {IMetadataDeleteDto} metadataConfig The metadata configuration.
     * @returns {Promise<ResponseMessageEvent<undefined>>} A promise that resolves when the metadata record has been deleted.
     * ? A promise that resolves to the deleted metadata record.
     */
    deleteMetaData(
        metadataConfig: IMetadataDeleteDto
    ): Promise<ResponseMessageEvent<undefined>> {
        const { uid } = metadataConfig;

        const data = {
            uid,
            action: metadataActionTypes.deleteMetadata,
            payload: {
                metadata: {
                    uid,
                },
            },
        };
        return this._connection.sendToParent("stackQuery", data);
    }
}
export default Metadata;

/**
 * NOTE:
 * Publish and unpublish metadata methods are missing
 * Methods return the entire post robot response and not just the actual response
 */
