export declare interface IMetadata {
    uid: string;
    type: "asset" | "entry";
    [key: string]: any;
}

const metadataTypes = {
    creteMetadata: "createMetadata",
    retrieveMetadata: "retrieveMetadata",
    updateMetadata: "updateMetadata",
    deleteMetadata: "deleteMetadata",
} as const;

class Metadata {
    constructor(private _connection: any) {}

    createMetaData(metadataConfig: IMetadata) {
        const { uid, type, ...otherMetaData } = metadataConfig;

        if (!uid) throw new Error("uid is required");
        if (!type) throw new Error("type is required");

        const data = {
            uid,
            action: metadataTypes.creteMetadata,
            payload: {
                metadata: {
                    type,
                    ...otherMetaData,
                },
            },
        };

        return this._connection.sendToParent("stackQuery", data);
    }

    retrieveMetaData(type: "asset" | "entry" = "asset") {
        return this._connection.sendToParent(
            metadataTypes.retrieveMetadata,
            type
        );
    }

    updateMetaData(metadataConfig: IMetadata) {
        const { uid, type, _content_type_uid, ...otherMetaData } =
            metadataConfig;

        if (!uid) throw new Error("uid is required");
        if (!type) throw new Error("type is required");
        // type is entry and uid !== stackApiKey:  _content_type_uid is required

        const data = {
            uid,
            action: metadataTypes.updateMetadata,
            payload: {
                metadata: {
                    type,
                    ...otherMetaData,
                },
            },
        };

        return this._connection.sendToParent("stackQuery", data);
    }

    deleteMetaData() {
        //
        return this._connection.sendToParent(metadataTypes.deleteMetadata);
    }
}
export default Metadata;
