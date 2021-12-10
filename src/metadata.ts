export declare interface IMetadata {
    uid: string;
    type: "asset" | "entry";
    [key: string]: any;
}

const metadataTypes = {
    CREATE_METADATA: "CREATE_METADATA",
    RETRIEVE_METADATA: "RETRIEVE_METADATA",
    UPDATE_METADATA: "UPDATE_METADATA",
    DELETE_METADATA: "DELETE_METADATA",
} as const;

class Metadata {
    constructor(private _connection: any) {}

    createMetaData(metadataConfig: IMetadata) {
        return this._connection.sendToParent(
            metadataTypes.CREATE_METADATA,
            metadataConfig
        );
    }

    retrieveMetaData(type: "asset" | "entry" = "asset") {
        return this._connection.sendToParent(
            metadataTypes.RETRIEVE_METADATA,
            type
        );
    }

    updateMetaData(metadataConfig: IMetadata) {
        return this._connection.sendToParent(
            metadataTypes.UPDATE_METADATA,
            metadataConfig
        );
    }

    deleteMetaData() {
        return this._connection.sendToParent(metadataTypes.DELETE_METADATA);
    }
}
export default Metadata;
