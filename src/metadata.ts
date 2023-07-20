import postRobot from "post-robot";

import { GenericObjectType } from "./types/common.types";
import { onData, onError } from "./utils/utils";

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
     * @returns {Promise<{ metadata: IMetadata }>} A promise that resolves to the newly created metadata record.
     */
    createMetaData(
        metadataConfig: IMetadataCreateDto
    ): Promise<{ metadata: IMetadata }> {
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

        return this._connection
            .sendToParent<{ metadata: IMetadata }>("stackQuery", data)
            .then(onData)
            .catch(onError);
    }

    /**
     * Retrieves a metadata record by its ID.
     * @param {IMetadataRetrieveDto} metadataConfig The metadata configuration containing its uid.
     * @returns {Promise<{ metadata: IMetadata }> } A promise that resolves to the metadata record with the specified ID.
     */
    retrieveMetaData(
        metadataConfig: IMetadataRetrieveDto
    ): Promise<{ metadata: IMetadata }> {
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

        return this._connection
            .sendToParent<{ metadata: IMetadata }>("stackQuery", data)
            .then(onData)
            .catch(onError);
    }

    /**
     * Retrieves all metadata records.
     * @param {GenericObjectType} params Optional parameters for the query.
     * @returns {Promise<{ metadata: IMetadata[] }>} A promise that resolves to an array of all metadata records.
     */
    retrieveAllMetaData(
        params: GenericObjectType = {}
    ): Promise<{ metadata: IMetadata[] }> {
        const data = {
            action: metadataActionTypes.retrieveAllMetadata,
            params,
        };

        return this._connection
            .sendToParent<{ metadata: IMetadata[] }>("stackQuery", data)
            .then(onData)
            .catch(onError);
    }

    /**
     * Updates a metadata record.
     * @param {IMetadataUpdateDto} metadataConfig The metadata configuration that needs to be updated.
     * @returns {Promise<{ metadata: IMetadata }>} A promise that resolves to the metadata record that has been updated.
     */
    updateMetaData(
        metadataConfig: IMetadataUpdateDto
    ): Promise<{ metadata: IMetadata }> {
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

        return this._connection
            .sendToParent<{ metadata: IMetadata }>("stackQuery", data)
            .then(onData)
            .catch(onError);
    }

    /**
     * Deletes a metadata record.
     * @param {IMetadataDeleteDto} metadataConfig The metadata configuration.
     * @returns {Promise<{ notice: string }>} A promise that resolves with a message upon successful deletion of the metadata record.
     */
    deleteMetaData(
        metadataConfig: IMetadataDeleteDto
    ): Promise<{ notice: string }> {
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
        return this._connection
            .sendToParent<{ notice: string }>("stackQuery", data)
            .then(onData)
            .catch(onError);
    }
}
export default Metadata;
