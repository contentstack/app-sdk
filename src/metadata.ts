export declare interface IMetadata {
    uid: string;
    type: "asset" | "entry";
    _content_type_uid?: string;
    locale?: string;
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
        const { uid, type = "asset", ...otherMetaData } = metadataConfig;

        if (!uid) throw new Error("uid is required");

        // _content_type_uid is required for entry

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

    retrieveMetaData(metadataConfig: IMetadata) {
        const {
            uid,
            type = "asset",
            locale,
            _content_type_uid,
        } = metadataConfig;
        if (!uid) throw new Error("uid is required");

        const data = {
            uid,
            action: metadataTypes.retrieveMetadata,
            payload: {
                metadata: {
                    type,
                    locale,
                    _content_type_uid,
                },
            },
        };

        return this._connection.sendToParent("stackQuery", data);
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

    deleteMetaData(metadataConfig: IMetadata) {
        const { uid, type, locale, _content_type_uid } = metadataConfig;
        if (!uid) throw new Error("uid is required");
        if (!type) throw new Error("type is required");

        const data = {
            uid,
            action: metadataTypes.deleteMetadata,
            payload: {
                metadata: {
                    type,
                    locale,
                    _content_type_uid,
                },
            },
        };
        return this._connection.sendToParent("stackQuery", data);
    }
}
export default Metadata;
