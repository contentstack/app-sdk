import Metadata from "../src/metadata";

describe("Metadata", () => {
    let connection;
    let sendToParent: typeof jest.fn;

    beforeEach(() => {
        sendToParent = jest.fn().mockReturnValue(Promise.resolve({ data: {} }));
        connection = { sendToParent: sendToParent };
        jest.spyOn(connection, "sendToParent");
    });

    test("should retrieve metadata", async () => {
        const metadata = new Metadata(connection);
        const uid = "some-uid";
        const metadataConfig = { uid };
        await metadata.retrieveMetaData(metadataConfig);
        expect(connection.sendToParent).toHaveBeenCalledWith("stackQuery", {
            uid,
            action: "getMetadata",
            payload: {
                metadata: {
                    uid,
                },
            },
        });
    });

    test("should retrieve all metadata", async () => {
        const metadata = new Metadata(connection);
        const metadataParams = { some: "config" };
        await metadata.retrieveAllMetaData(metadataParams);
        expect(connection.sendToParent).toHaveBeenCalledWith("stackQuery", {
            action: "getAllMetadata",
            params: metadataParams,
        });
    });

    test("should update metadata", async () => {
        const metadata = new Metadata(connection);
        const uid = "some-uid";
        const metadataConfig = { uid, some: "config" };
        await metadata.updateMetaData(metadataConfig);
        expect(connection.sendToParent).toHaveBeenCalledWith("stackQuery", {
            uid,
            action: "updateMetadata",
            payload: {
                metadata: {
                    ...metadataConfig,
                },
            },
        });
    });

    test("should delete metadata", async () => {
        const metadata = new Metadata(connection);
        const uid = "some-uid";
        const metadataConfig = { uid };
        await metadata.deleteMetaData(metadataConfig);
        expect(connection.sendToParent).toHaveBeenCalledWith("stackQuery", {
            uid,
            action: "deleteMetadata",
            payload: {
                metadata: {
                    uid,
                },
            },
        });
    });
});
