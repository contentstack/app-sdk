import { AnyObject } from "./types/common.types";

export declare interface IMetadata {
    uid: string;
    type: "asset" | "entry";
    _content_type_uid?: string;
    locale?: string;
    [key: string]: any;
}

export declare interface IMetadataCreateDto
    extends Omit<Partial<IMetadata>, "uid"> {
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

const metadataTypes = {
    creteMetadata: "createMetadata",
    retrieveMetadata: "getMetadata",
    retrieveAllMetadata: "getAllMetadata",
    updateMetadata: "updateMetadata",
    deleteMetadata: "deleteMetadata",
} as const;

class Metadata {
    constructor(private _connection: any) {}

    createMetaData(metadataConfig: IMetadataCreateDto) {
        const { entity_uid, type = "asset", ...otherMetaData } = metadataConfig;

        const data = {
            action: metadataTypes.creteMetadata,
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

    retrieveMetaData(metadataConfig: IMetadataRetrieveDto) {
        const { uid } = metadataConfig;

        const data = {
            uid,
            action: metadataTypes.retrieveMetadata,
            payload: {
                metadata: {
                    uid,
                },
            },
        };

        return this._connection.sendToParent("stackQuery", data);
    }

    retrieveAllMetaData(params: AnyObject = {}) {
        const data = {
            action: metadataTypes.retrieveAllMetadata,
            params,
        };

        return this._connection.sendToParent("stackQuery", data);
    }

    updateMetaData(metadataConfig: IMetadataUpdateDto) {
        const { uid, ...otherMetaData } = metadataConfig;

        const data = {
            uid,
            action: metadataTypes.updateMetadata,
            payload: {
                metadata: {
                    uid,
                    ...otherMetaData,
                },
            },
        };

        return this._connection.sendToParent("stackQuery", data);
    }

    deleteMetaData(metadataConfig: IMetadataDeleteDto) {
        const { uid } = metadataConfig;

        const data = {
            uid,
            action: metadataTypes.deleteMetadata,
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
