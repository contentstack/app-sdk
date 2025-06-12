import Entry from "../src/entry";
import testData from "./data/testData.json";
import { jest } from "@jest/globals";

describe("Entry", () => {
    let connection: { sendToParent: (...props: any[]) => any };
    let emitter: any;
    let entry: Entry;
    let sendToParent: any;

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

        const changedData = JSON.parse(JSON.stringify(testData));
        changedData.entry.title = "changed title";

        entry = new Entry(
            { ...testData, changedData } as any,
            connection as any,
            emitter
        );
    });

    it("init", (done) => {
        setTimeout(function () {
            expect(entry.content_type).toEqual(testData.content_type);
            expect(entry.locale).toEqual(testData.entry.locale);
            expect(emitter.on).toHaveBeenCalledWith(
                "entrySave",
                expect.any(Function)
            );
            expect(emitter.on).toHaveBeenCalledWith(
                "entryChange",
                expect.any(Function)
            );
            expect(emitter.on).toHaveBeenCalledTimes(2);
            done();
        }, 100);
    });

    it("getData", () => {
        expect(testData.entry).toEqual(entry.getData());
    });

    describe("getDraftData", () => {
        it("should return draft data successfully", async () => {
            const mockDraftData = {
                title: "Draft Title",
                description: "Draft Description",
            };
            const sendToParentSpy = jest
                .spyOn(connection, "sendToParent")
                .mockResolvedValue({ data: mockDraftData });

            const result = await entry.getDraftData();

            expect(sendToParentSpy).toHaveBeenCalledWith("getDraftData");
            expect(result).toEqual(mockDraftData);
        });

        it("should return empty object when response data is null", async () => {
            const sendToParentSpy = jest
                .spyOn(connection, "sendToParent")
                .mockResolvedValue({ data: null });

            const result = await entry.getDraftData();

            expect(sendToParentSpy).toHaveBeenCalledWith("getDraftData");
            expect(result).toEqual({});
        });

        it("should return empty object when response data is undefined", async () => {
            const sendToParentSpy = jest
                .spyOn(connection, "sendToParent")
                .mockResolvedValue({ data: undefined });

            const result = await entry.getDraftData();

            expect(sendToParentSpy).toHaveBeenCalledWith("getDraftData");
            expect(result).toEqual({});
        });

        it("should throw error when sendToParent fails", async () => {
            const sendToParentSpy = jest
                .spyOn(connection, "sendToParent")
                .mockRejectedValue(new Error("Connection failed"));

            await expect(entry.getDraftData()).rejects.toThrow(
                "Failed to retrieve draft data."
            );
            expect(sendToParentSpy).toHaveBeenCalledWith("getDraftData");
        });
    });

    describe("getField", () => {
        it("getField undefined", function () {
            const uid = "group1.group";
            const schema = entry.content_type.schema[5].schema[0];
            const field = entry.getField(uid);

            expect(field.uid).toEqual(uid);
            expect(field.data_type).toEqual(schema.data_type);
            expect(field.schema).toEqual(schema);
        });

        it("getField modular blocks, get complete block", function () {
            const uid = "modular_blocks.0";
            const schema = entry.content_type.schema[6].blocks[2];
            const field = entry.getField(uid);
            expect(field.uid).toEqual(uid);
            expect(field.data_type).toEqual(schema.data_type);
            expect(field.schema).toEqual(schema);
        });

        it("getField modular blocks, get single block", function () {
            const uid = "modular_blocks.0.banner";
            const schema = entry.content_type.schema[6].blocks[2].schema;
            const field = entry.getField(uid);
            expect(field.uid).toEqual(uid);
            expect(field.data_type).toEqual(schema.data_type);
            expect(field.schema).toEqual(schema);
        });

        it("getField modular blocks, get block field", function () {
            const uid = "modular_blocks.0.banner.banner_image";
            const schema = entry.content_type.schema[6].blocks[2].schema[0];
            const field = entry.getField(uid);
            expect(field.uid).toEqual(uid);
            expect(field.data_type).toEqual(schema.data_type);
            expect(field.schema).toEqual(schema);
        });

        it("getField global field", function () {
            const uid = "global_field.single_line";
            const schema = entry.content_type.schema[7].schema[0];
            const field = entry.getField(uid);
            expect(field.uid).toEqual(uid);
            expect(field.data_type).toEqual(schema.data_type);
            expect(field.schema).toEqual(schema);
        });

        it("getField multiple group", function () {
            const uid = "group.group.group.0.single_line";
            const schema =
                entry.content_type.schema[4].schema[0].schema[0].schema[0];
            const field = entry.getField(uid);
            expect(field.uid).toEqual(uid);
            expect(field.data_type).toEqual(schema.data_type);
            expect(field.schema).toEqual(schema);
        });

        it("getField group", function () {
            const uid = "group.group.group";
            const schema = entry.content_type.schema[4].schema[0].schema[0];
            const field = entry.getField(uid);
            expect(field.uid).toEqual(uid);
            expect(field.data_type).toEqual(schema.data_type);
            expect(field.schema).toEqual(schema);
        });

        it("should use unsaved schema if user set options.useUnsavedSchema = true", () => {
            const uid = "title";
            const field = entry.getField(uid, { useUnsavedSchema: true });
            const schema = entry.content_type.schema[0];
            expect(field.uid).toBe(uid);
            expect(field.schema).toEqual(schema);
            expect(field.data_type).toEqual(schema.data_type);
        });
        it("should use custom Field instance if internal flag is set", () => {
            const fieldInstance: any = jest.fn();
            entry = new Entry(testData as any, connection as any, emitter, {
                _internalFlags: {
                    FieldInstance: fieldInstance,
                },
            });

            entry.getField("title");

            expect(fieldInstance).toHaveBeenCalled();
        });
    });

    it("set field data restriction", async () => {
        const uid = "group.group.group";
        const field = entry.getField(uid);

        await expect(field.setData({ d: "dummy" })).rejects.toThrowError(
            "Cannot call set data for current field type"
        );
    });

    it("set field data restriction for modular blocks, one complete block", async () => {
        const uid = "modular_blocks.0";
        const field = entry.getField(uid);
        await expect(field.setData({ d: "dummy" })).rejects.toThrowError(
            "Cannot call set data for current field type"
        );
    });

    it("getField Invalid Uid", function () {
        expect(() => entry.getField("invaliduid")).toThrow(
            "Invalid uid, Field not found"
        );
    });

    it("getField within Create page", function () {
        const dataWithoutEntry = JSON.parse(JSON.stringify(testData));
        dataWithoutEntry.entry = {};
        entry = new Entry(dataWithoutEntry, connection as any, emitter);
        expect(() => entry.getField("invaliduid")).toThrowError(
            "The data is unsaved. Save the data before requesting the field."
        );
    });

    it("onSave Callback must be a function", function () {
        expect(() => (entry as any).onSave()).toThrow(
            "Callback must be a function"
        );
    });
});
