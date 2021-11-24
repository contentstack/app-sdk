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
            //@ts-ignore
            testData.self = true;
            //@ts-ignore
            field = new Field({ data: testData }, connection, emitter);
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
                //@ts-ignore
                { data: testData },
                { sendToParent: sendToParentError },
                emitter
            );
            //@ts-ignore
            await expect(newField.setData()).rejects.toMatch("sample error");
        });

        it("setFocus", () => {
            field.setFocus().then(() => {
                expect(connection.sendToParent).toHaveBeenCalledWith("focus");
            });
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
                //@ts-ignore
                { data: fileFieldData.single },
                connection,
                emitter
            );
            multipleFileField = new Field(
                //@ts-ignore
                { data: fileFieldData.multiple },
                connection,
                emitter
            );
        });

        it("blank initial value test", () => {
            let clonedfileField = helpers.clone(fileFieldData);
            delete clonedfileField.single.value;
            delete clonedfileField.multiple.value;
            let emptySingleFileField = new Field(
                { data: clonedfileField.single },
                connection,
                emitter
            );
            let emptyMultipleFileField = new Field(
                { data: clonedfileField.multiple },
                connection,
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
                fileFieldData.multiple.value.map((file) => file.uid)
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
                //@ts-ignore
                singleFileField.onChange?.();
            }).toThrow("Callback must be a function");
        });
    });
});
