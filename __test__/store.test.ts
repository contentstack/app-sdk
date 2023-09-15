import Store from "../src/store";

describe("Store", () => {
    let storeObj: Store;
    let connection: { sendToParent: (...props: any[]) => any };
    let sendToParent;
    let sendToParentError = function () {
        return Promise.reject(new Error("sample store error"));
    };

    beforeEach(function () {
        sendToParent = function () {
            return Promise.resolve({});
        };

        connection = { sendToParent: sendToParent };
        jest.spyOn(connection, "sendToParent");
        storeObj = new Store(connection as any);
    });

    it("get", (done) => {
        storeObj.get("55").then(() => {
            expect(connection.sendToParent).toHaveBeenCalledWith(
                "store",
                Object({ action: "get", key: "55" })
            );
            done();
        });
    });

    it("get all", (done) => {
        storeObj.getAll().then(() => {
            expect(connection.sendToParent).toHaveBeenCalledWith(
                "store",
                Object({ action: "getAll" })
            );
            done();
        });
    });

    it("set", (done) => {
        storeObj.set("key", "value").then(() => {
            expect(connection.sendToParent).toHaveBeenCalledWith(
                "store",
                Object({ action: "set", key: "key", value: "value" })
            );
            done();
        });
    });

    it("remove", (done) => {
        storeObj.remove("55").then(() => {
            expect(connection.sendToParent).toHaveBeenCalledWith(
                "store",
                Object({ action: "remove", key: "55" })
            );
            done();
        });
    });

    it("clear", (done) => {
        storeObj.clear().then(() => {
            expect(connection.sendToParent).toHaveBeenCalledWith(
                "store",
                Object({ action: "clear" })
            );
            done();
        });
    });

    it("get invalid parameter", () => {
        //@ts-ignore
        expect(() => storeObj.get()).toThrow("Kindly provide valid parameters");
    });

    it("set invalid parameter", () => {
        //@ts-ignore
        expect(() => storeObj.set()).toThrow("Kindly provide valid parameters");
    });

    it("remove invalid parameter", () => {
        //@ts-ignore
        expect(() => storeObj.remove()).toThrow(
            "Kindly provide valid parameters"
        );
    });

    it("errorCase", async () => {
        let storeWithError = new Store({
            sendToParent: sendToParentError,
        } as any);

        await expect(() => storeWithError.remove("a")).rejects.toThrow(
            "sample store error"
        );
    });
});
