import Field from "../src/field";
import testData from "./data/testData.json";
import fileFieldData from "./data/fileField.json";
import helpers from "./helpers";
import EventEmitter from "wolfy87-eventemitter";

describe("Field", () => {
    let connection: { sendToParent: (...props: any[]) => any };
    let emitter: EventEmitter;
    let sendToParent;
    let field: Field;
    let sendToParentError = function () {
        return Promise.reject("sample error");
    };

    describe("Generic", () => {
        beforeEach(() => {
            sendToParent = function () {
                return Promise.resolve();
            };

            connection = { sendToParent: sendToParent };
            emitter = {
                on: (_event, cbf) => {
                    setTimeout(() => {
                        cbf({ data: testData.entry });
                    }, 100);
                },
            } as EventEmitter;
            jest.spyOn(connection, "sendToParent");
            jest.spyOn(emitter, "on");
            (testData as any).self = true;
            field = new Field(testData as any, connection as any, emitter);
        });

        it("init", (done) => {
            setTimeout(() => {
                expect(field.uid).toBe(testData.uid);
                expect(field.data_type).toBe(testData.schema.data_type);
                expect(field.schema).toMatchObject(testData.schema);
                expect(emitter.on).toHaveBeenCalled();
                done();
            }, 150);
        });

        it("getData", () => {
            expect(testData.value).toEqual(field.getData());
        });

        it("setData", (done) => {
            field.setData("sampleData").then((fieldObj) => {
                expect(fieldObj.uid).toEqual(testData.uid);
                expect(fieldObj.data_type).toEqual(testData.schema.data_type);
                expect(fieldObj.schema).toEqual(testData.schema);
                expect(connection.sendToParent).toHaveBeenCalledWith(
                    "setData",
                    { data: "sampleData", uid: field.uid, self: true }
                );
                done();
            });
        });

        it("setData Error Case", async () => {
            let newField = new Field(
                testData as any,
                { sendToParent: sendToParentError } as any,
                emitter
            );
            await expect((newField as any).setData()).rejects.toMatch(
                "sample error"
            );
        });

        it("setFocus", () => {
            field.setFocus();
            expect(connection.sendToParent).toHaveBeenCalledWith("focus");
        });

        it("setData rejects on bridge VALIDATION_ERROR", async () => {
            jest.spyOn(connection, "sendToParent").mockResolvedValue({
                data: {
                    code: "VALIDATION_ERROR",
                    message: "bad",
                    details: [],
                },
            });
            await expect(field.setData("bad")).rejects.toMatchObject({
                code: "VALIDATION_ERROR",
            });
        });

        it("setData rejects on host SETDATA_RESOLUTION_ERROR", async () => {
            jest.spyOn(connection, "sendToParent").mockResolvedValue({
                data: {
                    code: "SETDATA_RESOLUTION_ERROR",
                    message: "resolve failed",
                    failures: [{ kind: "asset", uid: "bltx", reason: "x" }],
                },
            });
            await expect(field.setData("bltx")).rejects.toMatchObject({
                code: "SETDATA_RESOLUTION_ERROR",
                failures: [{ kind: "asset", uid: "bltx", reason: "x" }],
            });
        });

        it("setData resolves with warnings when bridge returns warnings", async () => {
            const warn = [
                {
                    field: "title",
                    fieldUid: "title",
                    fieldLabel: "Title",
                    fieldType: "text",
                    reasons: [{ reason: "MIN_LENGTH", message: "too short" }],
                },
            ];
            jest.spyOn(connection, "sendToParent").mockResolvedValue({
                data: { warnings: warn },
            });
            const out: any = await field.setData("ab");
            expect(out.warnings).toEqual(warn);
        });

        it("setData skips _data update when debounced skipped", async () => {
            const before = field.getData();
            jest.spyOn(connection, "sendToParent").mockResolvedValue({
                data: { debounced: true, skipped: true },
            });
            const out: any = await field.setData("new");
            expect(out.debounced).toBe(true);
            expect(field.getData()).toEqual(before);
        });

        it("setData skips _data when debounced nested like app-extension-component", async () => {
            const before = field.getData();
            jest.spyOn(connection, "sendToParent").mockResolvedValue({
                data: { data: { debounced: true, skipped: true } },
            });
            const out: any = await field.setData("new");
            expect(out.debounced).toBe(true);
            expect(field.getData()).toEqual(before);
        });
    });

    describe("File", () => {
        let singleFileField: Field;
        let multipleFileField: Field;
        let emitter: EventEmitter;
        beforeEach(() => {
            sendToParent = function () {
                return Promise.resolve();
            };
            connection = { sendToParent: sendToParent };
            emitter = {
                on: (event, cbf) => {
                    setTimeout(() => {
                        cbf({ data: testData.entry });
                    }, 100);
                },
            } as EventEmitter;
            jest.spyOn(connection, "sendToParent");
            jest.spyOn(emitter, "on");
            singleFileField = new Field(
                fileFieldData.single as any,
                connection as any,
                emitter
            );
            multipleFileField = new Field(
                fileFieldData.multiple as any,
                connection as any,
                emitter
            );
        });

        it("blank initial value test", () => {
            let clonedfileField = helpers.clone(fileFieldData);
            delete clonedfileField.single.value;
            delete clonedfileField.multiple.value;
            let emptySingleFileField = new Field(
                clonedfileField.single,
                connection as any,
                emitter
            );
            let emptyMultipleFileField = new Field(
                clonedfileField.multiple,
                connection as any,
                emitter
            );
            expect(emptySingleFileField.getData()).toBe(undefined);
            expect(emptyMultipleFileField.getData().length).toBe(0);
        });

        it("getData default", () => {
            expect(fileFieldData.single.value.uid).toEqual(
                singleFileField.getData()
            );
            expect(
                fileFieldData.multiple.value.map(({ file }) => file.uid)
            ).toEqual(multipleFileField.getData());
        });

        it("getData resolved", () => {
            expect(fileFieldData.single.value).toEqual(
                singleFileField.getData({ resolved: true })
            );
            expect(fileFieldData.multiple.value).toEqual(
                multipleFileField.getData({ resolved: true })
            );
        });

        it("onChange Callback must be a function", function () {
            expect(() => {
                (singleFileField as any).onChange();
            }).toThrow("Callback must be a function");
        });
    });
});
