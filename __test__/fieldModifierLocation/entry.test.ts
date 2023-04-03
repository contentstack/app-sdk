import FieldModifierLocationEntry from "../../src/fieldModifierLocation/entry";
import testData from "../data/testData.json";
import { IFieldModifierLocationInitData } from "../../src/types";
import { errorMessage } from "../../src/utils/errorMessages";

describe("FieldModifierLocationEntry", () => {
    let entryInstance: FieldModifierLocationEntry;
    let sendToParent: any;
    let connection: { sendToParent: (...props: any[]) => any };

    let emitter: any;
    function getEntryInitialData(): IFieldModifierLocationInitData {
        return {
            data: {
                type: "FIELD_MODIFIER_LOCATION",
                config: {},
                content_type: {},
                entry: {
                    tags: ["tag1"],
                },
                locale: "en-us",
                uid: "field_uid",
                schema: {},
                value: {},
                self: false,
                changedData: {
                    tags: ["tag1", "tag2"],
                },
                app_id: "app_id",
                currentBranch: "master",
                extension_uid: "extension_uid",
                installation_uid: "installation_uid",
                stack: {
                    api_key: "api_key",
                    created_at: "created_at",
                    is_asset_download_public: true,
                    name: "name",
                    master_locale: "en-us",
                    org_uid: "org_uid",
                    owner_uid: "owner_uid",
                    settings: {},
                    uid: "uid",
                    updated_at: "updated_at",
                    user_uids: ["user_uids"],
                    branches: [],
                    collaborators: [],
                    discrete_variables: {
                        _version: 1,
                        cms: true,
                        secret_key: "secret_key",
                    },
                },
                user: {},
            },
        };
    }
    const entryIntialData: IFieldModifierLocationInitData =
        getEntryInitialData();

    beforeEach(() => {
        sendToParent = () => {};
        connection = { sendToParent };

        emitter = {
            on: (_event: any, cbf: (...props: any[]) => void) => {
                setTimeout(() => {
                    cbf({ data: { data: testData.entry, name: "entrySave" } });
                    cbf({ data: { data: {}, name: "entryPublish" } });
                    cbf({
                        data: { data: testData.entry, name: "entryChange" },
                    });
                }, 50);
            },
        };

        jest.spyOn(emitter, "on");
        entryInstance = new FieldModifierLocationEntry(
            entryIntialData,
            connection,
            emitter
        );
    });

    describe("getTags", () => {
        it("should return saved tags", () => {
            expect(entryInstance.getTags()).toEqual(["tag1"]);
        });

        it("should return draft tags if useUnsavedSchema is true", () => {
            expect(entryInstance.getTags({ useUnsavedSchema: true })).toEqual([
                "tag1",
                "tag2",
            ]);
        });

        it("should return currently set tags if useUnsavedSchema is true and tags have been set", async () => {
            await entryInstance.setTags(["tag3", "tag4"]);

            expect(entryInstance.getTags({ useUnsavedSchema: true })).toEqual([
                "tag3",
                "tag4",
            ]);
        });

        it("should fallback to saved tags if useUnsavedSchema is true and tags have not been set yet", async () => {
            delete entryInstance._changedData;

            expect(entryInstance.getTags({ useUnsavedSchema: true })).toEqual([
                "tag1",
            ]);
        });

        it("should return old tags and tags have been set", async () => {
            await entryInstance.setTags(["tag3", "tag4"]);
            expect(entryInstance.getTags()).toEqual(["tag1"]);
        });
    });

    describe("setTags", () => {
        it("should set tags on the entry", async () => {
            delete entryInstance._changedData;
            expect(await entryInstance.setTags(["tag3", "tag4"])).toEqual([
                "tag3",
                "tag4",
            ]);
            expect(entryInstance.getTags({ useUnsavedSchema: true })).toEqual([
                "tag3",
                "tag4",
            ]);
        });

        it("should throw an error when tags are not defined", async () => {
            // @ts-ignore
            await expect(entryInstance.setTags()).rejects.toThrow(
                errorMessage.entryField.entry.tagsShouldNotBeBlank
            );
        });

        it("should throw an error if tags is not an array of strings", async () => {
            // @ts-ignore
            await expect(entryInstance.setTags(["tag3", 4])).rejects.toThrow(
                errorMessage.entryField.entry.tagsShouldBeArrayOfStrings
            );

            // @ts-ignore
            await expect(entryInstance.setTags("tag3")).rejects.toThrow(
                errorMessage.entryField.entry.tagsShouldBeArrayOfStrings
            );
        });

        it("should update the tags on the entry", async () => {
            expect(await entryInstance.setTags(["tag3", "tag4"])).toEqual([
                "tag3",
                "tag4",
            ]);
            expect(entryInstance.getTags({ useUnsavedSchema: true })).toEqual([
                "tag3",
                "tag4",
            ]);
        });
    });
});
