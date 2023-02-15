import Stack from "../src/stack";
import { StackSearchQuery } from "../src/types/stack.types";
import testData from "./data/testData.json";

function getStack() {
    return { ...testData.stack };
}

describe("Stack", () => {
    let connection: { sendToParent: (...props: any[]) => any };
    let sendToParent: (...props: any[]) => any;
    let stack: Stack;
    let currentBranch: string;

    let sendToParentError = function () {
        return Promise.reject(new Error("sample error"));
    };

    let sendToParentAjaxCallError = function () {
        return Promise.reject(new Error("ajax error"));
    };

    beforeEach(() => {
        sendToParent = (...para) => {
            return Promise.resolve({ data: {} });
        };

        connection = { sendToParent: sendToParent };
        jest.spyOn(connection, "sendToParent");
        currentBranch = "main_branch";
        stack = new Stack(getStack(), connection, {
            currentBranch: currentBranch,
        });
    });

    describe("Stack Methods", () => {
        it("getData", () => {
            expect(getStack()).toMatchObject(stack.getData());
        });

        describe("getAllStacks", () => {
            it("should get called with default org Uid when not provided", (done) => {
                stack.getAllStacks().then((data) => {
                    expect(data.length).toBe(0);
                    expect(connection.sendToParent).toHaveBeenCalledWith(
                        "stackQuery",
                        {
                            headers: {
                                organization_uid: getStack().org_uid,
                            },
                            action: "getStacks",
                            params: {},
                            skip_api_key: true,
                        }
                    );
                    done();
                });
            });

            it("should get called with provided org Uid", (done) => {
                let orgUid = "some-org-uid";
                stack.getAllStacks({ orgUid }).then((data) => {
                    expect(data.length).toBe(0);
                    expect(connection.sendToParent).toHaveBeenCalledWith(
                        "stackQuery",
                        {
                            headers: { organization_uid: orgUid },
                            action: "getStacks",
                            params: {},
                            skip_api_key: true,
                        }
                    );
                    done();
                });
            });

            it("should throw error when uid is not string", async () => {
                let orgUid = 123 as any;
                await expect(
                    stack.getAllStacks({ orgUid })
                ).rejects.toThrowError("orgUid must be a string");
            });

            it("should send query params", (done) => {
                let params = { sample: "parameter" };
                stack.getAllStacks({ params }).then((data) => {
                    expect(data.length).toBe(0);
                    expect(connection.sendToParent).toHaveBeenCalledWith(
                        "stackQuery",
                        {
                            headers: {
                                organization_uid: getStack().org_uid,
                            },
                            action: "getStacks",
                            params,
                            skip_api_key: true,
                        }
                    );
                    done();
                });
            });
        });

        describe("search", () => {
            it("should ask parent for entries", (done) => {
                const query: StackSearchQuery = { type: "entries" };
                stack.search(query).then(() => {
                    expect(connection.sendToParent).toHaveBeenCalledWith(
                        "stackQuery",
                        {
                            api_key: getStack().api_key,
                            action: "search",
                            params: query,
                        }
                    );
                    done();
                });
            });

            it("should make query to other stack if api key is provided", (done) => {
                const query: StackSearchQuery = { type: "entries" };
                const apiKey = "sample_api_key";
                stack.search(query, apiKey).then(() => {
                    expect(connection.sendToParent).toHaveBeenCalledWith(
                        "stackQuery",
                        {
                            api_key: apiKey,
                            action: "search",
                            params: query,
                        }
                    );
                    done();
                });
            });
        });

        it("getManagementTokens should get management token details", async () => {
            const data = await stack.getManagementTokens();
            expect(data).toEqual({});
            expect(connection.sendToParent).toHaveBeenCalledWith("stackQuery", {
                action: "getManagementTokens",
            });
        });
    });

    describe("ContentType Calls", () => {
        it("getContentType", (done) => {
            let params = { sample: "parameter" };
            stack.getContentType("uid", params).then((data) => {
                expect(data).toEqual({});
                expect(connection.sendToParent).toHaveBeenCalledWith(
                    "stackQuery",
                    { uid: "uid", params, action: "getContentType" }
                );
                done();
            });
        });

        it("getContentType uid is required", async () => {
            //@ts-ignore
            await expect(() => stack.getContentType()).rejects.toThrow(
                "uid is required"
            );
        });

        it("getContentType error case", async () => {
            let newStack = new Stack(
                getStack(),
                { sendToParent: sendToParentError },
                { currentBranch: currentBranch }
            );

            await expect(() => newStack.getContentType("uid")).rejects.toThrow(
                "sample error"
            );
        });

        it("getContentType ajax error", async () => {
            let newStack = new Stack(
                getStack(),
                { sendToParent: sendToParentAjaxCallError },
                { currentBranch: currentBranch }
            );

            await expect(() => newStack.getContentType("uid")).rejects.toThrow(
                "ajax error"
            );
        });

        it("getContentTypes", (done) => {
            let params: { [key: string]: any } = { sample: "parameter" };
            let query = { sample: "query" };
            stack.getContentTypes(query, params).then((data) => {
                params.query = query;
                expect(data).toEqual({});
                expect(connection.sendToParent).toHaveBeenCalledWith(
                    "stackQuery",
                    { params, action: "getContentTypes" }
                );
                done();
            });
        });

        it("getContentTypes error case", async () => {
            let newStack = new Stack(
                getStack(),
                { sendToParent: sendToParentError },
                { currentBranch: currentBranch }
            );
            await expect(() => newStack.getContentTypes()).rejects.toThrow(
                "sample error"
            );
        });

        it("getContentTypes ajax error", async () => {
            let newStack = new Stack(
                getStack(),
                { sendToParent: sendToParentAjaxCallError },
                { currentBranch: currentBranch }
            );

            await expect(() => newStack.getContentTypes()).rejects.toThrow(
                "ajax error"
            );
        });
    });

    describe("Entry Calls", () => {
        it("get entry with uid", (done) => {
            const Query = stack.ContentType("blog").Entry("bltasssss");
            Query.language("en_us")
                .includeReference("r1")
                .includeReference(["r2"])
                .addQuery("key", "value")
                .addParam("k", "v")
                .includeSchema()
                .includeContentType()
                .includeOwner()
                .fetch()
                .then((data: any) => {
                    expect(data).toEqual({});
                    expect(connection.sendToParent).toHaveBeenCalledWith(
                        "stackQuery",
                        {
                            uid: "bltasssss",
                            content_type_uid: "blog",
                            params: {
                                locale: "en_us",
                                "include[]": ["r1", "r2"],
                                key: "value",
                                k: "v",
                                include_schema: true,
                                include_content_type: true,
                                include_owner: true,
                            },
                            action: "getEntry",
                        }
                    );
                    done();
                });
        });

        it("get entry with uid, uid is required", async () => {
            await expect(() => stack.ContentType("blog").Entry()).toThrow(
                "uid is required"
            );
        });

        it("get entry with uid, addParam error", async () => {
            await expect(() =>
                stack.ContentType("blog").Entry("entry_uid").addParam()
            ).toThrow("Kindly provide valid parameters.");
        });

        it("get entry with uid, addQuery error", async () => {
            await expect(() =>
                stack.ContentType("blog").Entry("entry_uid").addQuery()
            ).toThrow("First argument should be a String.");
        });

        it("entries query, addQuery error", async () => {
            await expect(() =>
                stack.ContentType("blog").Entry.Query().addQuery()
            ).toThrow("First argument should be a String.");
        });

        it("get entry with uid, language error.", async () => {
            await expect(() =>
                stack.ContentType("blog").Entry("entry_uid").language()
            ).toThrow("Argument should be a String.");
        });

        it("query entries, language error.", async () => {
            await expect(() =>
                stack.ContentType("blog").Entry.Query().language()
            ).toThrow("Argument should be a String.");
        });

        it("get entry with uid, includeReference error", async () => {
            await expect(() =>
                stack
                    .ContentType("blog")
                    .Entry("entry_uid")
                    .includeReference(["stack"])
                    .includeReference()
            ).toThrow("Argument should be a String or an Array.");
        });

        it("entry only", (done) => {
            const entry = stack.ContentType("newblog").Entry("xys");
            entry.only("title");
            entry.only("BASE", "title");
            entry.only(["deatials", "sample"]);
            entry.fetch().then((data: any) => {
                expect(data).toEqual({});
                expect(connection.sendToParent).toHaveBeenCalledWith(
                    "stackQuery",
                    {
                        uid: "xys",
                        content_type_uid: "newblog",
                        params: {
                            "only[BASE]": [
                                "title",
                                "title",
                                "deatials",
                                "sample",
                            ],
                        },
                        action: "getEntry",
                    }
                );

                done();
            });
            done();
        });

        it("entry except", (done) => {
            const entry = stack.ContentType("newblog").Entry("xys");
            entry.except("title", []);
            entry.except("BASE", "title");
            entry.except(["deatials", "sample"]);
            entry.fetch().then((data: any) => {
                expect(data).toEqual({});
                expect(connection.sendToParent).toHaveBeenCalledWith(
                    "stackQuery",
                    {
                        uid: "xys",
                        content_type_uid: "newblog",
                        params: {
                            "except[title]": [],
                            "except[BASE]": ["title", "deatials", "sample"],
                        },
                        action: "getEntry",
                    }
                );

                done();
            });
            done();
        });

        it("entry only failure cases", (done) => {
            const entry = stack.ContentType("newblog").Entry("xys");
            entry.except("test", []);
            try {
                entry.only();
            } catch (e: any) {
                expect(e.message).toEqual("Kindly provide valid parameters");
            }
            try {
                entry.only({});
            } catch (e: any) {
                expect(e.message).toEqual("Kindly provide valid parameters");
            }

            try {
                entry.only({}, {});
            } catch (e: any) {
                expect(e.message).toEqual("Kindly provide valid parameters");
            }

            done();
        });

        it("entry except failure cases", async () => {
            const entry = stack.ContentType("newblog").Entry("xys");
            await expect(() => entry.except()).toThrow(
                "Kindly provide valid parameters"
            );
            await expect(() => entry.except({})).toThrow(
                "Kindly provide valid parameters"
            );
            await expect(() => entry.except({}, {})).toThrow(
                "Kindly provide valid parameters"
            );
        });

        it("find entry query", (done) => {
            const Query = stack.ContentType("newblog").Entry.Query();
            expect(Query.getQuery()).toEqual({});

            Query.query({ l: "c" })
                .tags(["k"])
                .includeCount()
                .addParam("x1", "y")
                .addQuery("zz", "aa")
                .equalTo("x2", "y")
                .where("x3", "y")
                .language("en_us")
                .environment("development")
                .includeReference("r1")
                .includeReference(["r2"])
                .includeOwner()
                .includeSchema()
                .includeContentType()
                .regex("k1", "v", {})
                .search("search")
                .lessThan("k2", "v")
                .lessThanOrEqualTo("k3", "v")
                .greaterThan("k4", "v")
                .greaterThanOrEqualTo("k5", "v")
                .notEqualTo("k6", "v")
                .containedIn("k7", ["v"])
                .notContainedIn("k7", ["v"])
                .exists("k8")
                .ascending("k9")
                .descending("k10")
                .beforeUid("k11")
                .afterUid("k12")
                .skip(100)
                .limit(100)
                .and({})
                .or({});
            expect(Query.getQuery()).toEqual({
                l: "c",
                x2: "y",
                x3: "y",
                k1: { $regex: "v", $options: {} },
                k2: { $lt: "v" },
                k3: { $lte: "v" },
                k4: { $gt: "v" },
                k5: { $gte: "v" },
                k6: { $ne: "v" },
                k7: { $in: ["v"], $nin: ["v"] },
                k8: { $exists: true },
                $and: [{}],
                $or: [{}],
            });

            Query.find().then((data: any) => {
                expect(data).toEqual({});
                expect(connection.sendToParent).toHaveBeenCalledWith(
                    "stackQuery",
                    Object({
                        content_type_uid: "newblog",
                        params: Object({
                            query: Object({
                                l: "c",
                                x2: "y",
                                x3: "y",
                                k1: Object({
                                    $regex: "v",
                                    $options: Object({}),
                                }),
                                k2: Object({ $lt: "v" }),
                                k3: Object({ $lte: "v" }),
                                k4: Object({ $gt: "v" }),
                                k5: Object({ $gte: "v" }),
                                k6: Object({ $ne: "v" }),
                                k7: Object({ $in: ["v"], $nin: ["v"] }),
                                k8: Object({ $exists: true }),
                                $and: [Object({})],
                                $or: [Object({})],
                            }),
                            tags: ["k"],
                            include_count: true,
                            x1: "y",
                            zz: "aa",
                            locale: "en_us",
                            environment: "development",
                            "include[]": ["r1", "r2"],
                            include_owner: true,
                            include_schema: true,
                            include_content_type: true,
                            typeahead: "search",
                            asc: "k9",
                            desc: "k10",
                            before_uid: "k11",
                            after_uid: "k12",
                            skip: 100,
                            limit: 100,
                        }),
                        action: "getEntries",
                    })
                );
                done();
            });
        });

        it("find one entry", (done) => {
            const Query = stack.ContentType("newblog").Entry.Query();
            expect(Query.getQuery()).toEqual({});
            Query.query({ l: "c" })
                .tags(["k"])
                .includeCount()
                .addParam("x1", "y")
                .equalTo("x2", "y")
                .where("x3", "y")
                .regex("k1", "v", {})
                .search("search")
                .lessThan("k2", "v")
                .lessThanOrEqualTo("k3", "v")
                .greaterThan("k4", "v")
                .greaterThanOrEqualTo("k5", "v")
                .notEqualTo("k6", "v")
                .containedIn("k7", ["v"])
                .notContainedIn("k7", ["v"])
                .exists("k8")
                .ascending("k9")
                .descending("k10")
                .beforeUid("k11")
                .afterUid("k12")
                .skip(100)
                .limit(100)
                .and({})
                .or({});
            expect(Query.getQuery()).toEqual({
                l: "c",
                x2: "y",
                x3: "y",
                k1: { $regex: "v", $options: {} },
                k2: { $lt: "v" },
                k3: { $lte: "v" },
                k4: { $gt: "v" },
                k5: { $gte: "v" },
                k6: { $ne: "v" },
                k7: { $in: ["v"], $nin: ["v"] },
                k8: { $exists: true },
                $and: [{}],
                $or: [{}],
            });
            Query.findOne().then((data: any) => {
                expect(data).toEqual({});
                expect(connection.sendToParent).toHaveBeenCalledWith(
                    "stackQuery",
                    {
                        content_type_uid: "newblog",
                        params: {
                            query: {
                                l: "c",
                                x2: "y",
                                x3: "y",
                                k1: { $regex: "v", $options: {} },
                                k2: { $lt: "v" },
                                k3: { $lte: "v" },
                                k4: { $gt: "v" },
                                k5: { $gte: "v" },
                                k6: { $ne: "v" },
                                k7: { $in: ["v"], $nin: ["v"] },
                                k8: { $exists: true },
                                $and: [{}],
                                $or: [{}],
                            },
                            tags: ["k"],
                            include_count: true,
                            x1: "y",
                            typeahead: "search",
                            asc: "k9",
                            desc: "k10",
                            before_uid: "k11",
                            after_uid: "k12",
                            skip: 100,
                            limit: 1,
                        },
                        action: "getEntries",
                    }
                );
                done();
            });
        });

        it("and query", (done) => {
            const Query = stack.ContentType("newblog").Entry.Query();
            let Query1 = stack
                .ContentType("blog")
                .Entry.Query()
                .where("title", "Demo");
            let Query2 = stack
                .ContentType("blog")
                .Entry.Query()
                .lessThan("comments", 10);
            Query.and(Query1, Query2);
            expect(Query.getQuery()).toEqual({
                $and: [{ title: "Demo" }, { comments: { $lt: 10 } }],
            });
            Query.findOne().then((data: any) => {
                expect(data).toEqual({});
                expect(connection.sendToParent).toHaveBeenCalledWith(
                    "stackQuery",
                    {
                        content_type_uid: "newblog",
                        params: {
                            query: {
                                $and: [
                                    { title: "Demo" },
                                    { comments: { $lt: 10 } },
                                ],
                            },
                            limit: 1,
                        },
                        action: "getEntries",
                    }
                );
                let newQuery = Query.and("new", "Demo");
                expect(Query.getQuery()).toEqual({
                    $and: [{ title: "Demo" }, { comments: { $lt: 10 } }],
                });
                done();
            });
        });

        it("or query", (done) => {
            const Query = stack.ContentType("newblog").Entry.Query();
            let Query1 = stack
                .ContentType("blog")
                .Entry.Query()
                .where("title", "Demo");
            let Query2 = stack
                .ContentType("blog")
                .Entry.Query()
                .lessThan("comments", 10);
            Query.or(Query1, Query2);
            expect(Query.getQuery()).toEqual({
                $or: [{ title: "Demo" }, { comments: { $lt: 10 } }],
            });
            Query.findOne().then((data: any) => {
                expect(data).toEqual({});
                expect(connection.sendToParent).toHaveBeenCalledWith(
                    "stackQuery",
                    {
                        content_type_uid: "newblog",
                        params: {
                            query: {
                                $or: [
                                    { title: "Demo" },
                                    { comments: { $lt: 10 } },
                                ],
                            },
                            limit: 1,
                        },
                        action: "getEntries",
                    }
                );
                done();
            });
        });

        it("count entries", (done) => {
            const Query = stack.ContentType("newblog").Entry.Query();
            expect(Query.getQuery()).toEqual({});
            Query.query({ l: "c" })
                .tags(["k"])
                .includeCount()
                .addParam("x1", "y")
                .equalTo("x2", "y")
                .where("x3", "y")
                .regex("k1", "v", {})
                .regex("k13", "v")
                .search("search")
                .lessThan("k2", "v")
                .lessThanOrEqualTo("k3", "v")
                .greaterThan("k4", "v")
                .greaterThanOrEqualTo("k5", "v")
                .notEqualTo("k6", "v")
                .containedIn("k7", ["v"])
                .notContainedIn("k7", ["v"])
                .exists("k8")
                .ascending("k9")
                .descending("k10")
                .beforeUid("k11")
                .afterUid("k12")
                .skip(100)
                .limit(100)
                .and({})
                .or({});
            expect(Query.getQuery()).toEqual({
                l: "c",
                x2: "y",
                x3: "y",
                k1: { $regex: "v", $options: {} },
                k13: { $regex: "v" },
                k2: { $lt: "v" },
                k3: { $lte: "v" },
                k4: { $gt: "v" },
                k5: { $gte: "v" },
                k6: { $ne: "v" },
                k7: { $in: ["v"], $nin: ["v"] },
                k8: { $exists: true },
                $and: [{}],
                $or: [{}],
            });
            Query.count().then((data: any) => {
                expect(data).toEqual({});
                expect(connection.sendToParent).toHaveBeenCalledWith(
                    "stackQuery",
                    {
                        content_type_uid: "newblog",
                        params: {
                            query: {
                                l: "c",
                                x2: "y",
                                x3: "y",
                                k1: { $regex: "v", $options: {} },
                                k13: { $regex: "v" },
                                k2: { $lt: "v" },
                                k3: { $lte: "v" },
                                k4: { $gt: "v" },
                                k5: { $gte: "v" },
                                k6: { $ne: "v" },
                                k7: { $in: ["v"], $nin: ["v"] },
                                k8: { $exists: true },
                                $and: [{}],
                                $or: [{}],
                            },
                            tags: ["k"],
                            include_count: true,
                            x1: "y",
                            typeahead: "search",
                            asc: "k9",
                            desc: "k10",
                            before_uid: "k11",
                            after_uid: "k12",
                            skip: 100,
                            limit: 100,
                            count: true,
                        },
                        action: "getEntries",
                    }
                );
                done();
            });
        });

        it("query error cases", () => {
            const Query = stack.ContentType("newblog").Entry.Query();

            expect(() => Query.query()).toThrow(
                "Kindly provide valid parameters"
            );
            expect(() => Query.tags()).toThrow(
                "Kindly provide valid parameters"
            );
            expect(() => Query.addParam()).toThrow(
                "Kindly provide valid parameters"
            );
            expect(() => Query.equalTo()).toThrow(
                "Kindly provide valid parameters"
            );
            expect(() => Query.where()).toThrow(
                "Kindly provide valid parameters"
            );
            expect(() => Query.regex()).toThrow(
                "Kindly provide valid parameters"
            );
            expect(() => Query.search()).toThrow(
                "Kindly provide valid parameters"
            );
            expect(() => Query.lessThan()).toThrow(
                "Kindly provide valid parameters"
            );
            expect(() => Query.lessThanOrEqualTo()).toThrow(
                "Kindly provide valid parameters"
            );
            expect(() => Query.greaterThan()).toThrow(
                "Kindly provide valid parameters"
            );
            expect(() => Query.greaterThanOrEqualTo()).toThrow(
                "Kindly provide valid parameters"
            );
            expect(() => Query.notEqualTo()).toThrow(
                "Kindly provide valid parameters"
            );
            expect(() => Query.containedIn()).toThrow(
                "Kindly provide valid parameters"
            );
            expect(() => Query.notContainedIn()).toThrow(
                "Kindly provide valid parameters"
            );
            expect(() => Query.exists()).toThrow(
                "Kindly provide valid parameters"
            );
            expect(() => Query.ascending()).toThrow(
                "Argument should be a string."
            );
            expect(() => Query.descending()).toThrow(
                "Argument should be a string."
            );
            expect(() => Query.beforeUid()).toThrow(
                "Argument should be a string."
            );
            expect(() => Query.afterUid()).toThrow(
                "Argument should be a string."
            );
            expect(() => Query.skip()).toThrow("Argument should be a number.");
            expect(() => Query.limit()).toThrow("Argument should be a number.");
            expect(() => Query.where()).toThrow(
                "Kindly provide valid parameters"
            );
        });

        it("find entry query, includeReference error", () => {
            expect(() =>
                stack
                    .ContentType("blog")
                    .Entry("entry_uid")
                    .includeReference(["stack"])
                    .includeReference()
            ).toThrow("Argument should be a String or an Array.");
        });

        it("query entries, includeReference error", () => {
            expect(() =>
                stack
                    .ContentType("blog")
                    .Entry.Query()
                    .includeReference(["stack"])
                    .includeReference()
            ).toThrow("Argument should be a String or an Array.");
        });

        it("query entries, environment error", () => {
            expect(() =>
                stack.ContentType("blog").Entry.Query().environment()
            ).toThrow("Argument should be a String.");
        });

        it("query find ajax error", async () => {
            let newStack = new Stack(
                getStack(),
                { sendToParent: sendToParentAjaxCallError },
                { currentBranch: currentBranch }
            );

            await expect(() =>
                newStack.ContentType("blog").Entry.Query().find()
            ).rejects.toThrow("ajax error");
        });

        it("get entry with uid ajax error", async () => {
            let newStack = new Stack(
                getStack(),
                { sendToParent: sendToParentAjaxCallError },
                { currentBranch: currentBranch }
            );
            await expect(() =>
                newStack.ContentType("blog").Entry("uid").fetch()
            ).rejects.toThrow("ajax error");
        });

        it("getLanguages", (done) => {
            const Query = stack.ContentType("blog").Entry("bltasssss");
            Query.getLanguages().then((data: any) => {
                expect(data).toEqual({});
                expect(connection.sendToParent).toHaveBeenCalledWith(
                    "stackQuery",
                    Object({
                        content_type_uid: "blog",
                        uid: "bltasssss",
                        params: Object({}),
                        action: "getEntryLanguages",
                    })
                );
                done();
            });
        });

        it("create an entry", (done) => {
            const Query = stack.ContentType("blog").Entry;
            Query.create({ sample: "payload" }).then((data: any) => {
                expect(data).toEqual({});
                expect(connection.sendToParent).toHaveBeenCalledWith(
                    "stackQuery",
                    Object({
                        payload: Object({ sample: "payload" }),
                        content_type_uid: "blog",
                        action: "createEntry",
                    })
                );
                done();
            });
        });

        it("unlocalize entry", (done) => {
            const Query = stack.ContentType("blog").Entry("bltasssss");
            Query.unlocalize("uid").then((data: any) => {
                expect(data).toEqual({});
                expect(connection.sendToParent).toHaveBeenCalledWith(
                    "stackQuery",
                    Object({
                        content_type_uid: "blog",
                        uid: "bltasssss",
                        params: Object({ locale: "uid" }),
                        action: "unlocalizeEntry",
                    })
                );
                done();
            });
        });

        it("unlocalize entry invalid parameters", async () => {
            const Query = stack.ContentType("blog").Entry("bltasssss");
            await expect(() => Query.unlocalize()).rejects.toThrow(
                "Kindly provide valid parameters"
            );
        });

        it("publish entry", (done) => {
            const Query = stack.ContentType("blog").Entry("bltasssss");
            Query.publish({ sample: "payload" }).then((data: any) => {
                expect(data).toEqual({});
                expect(connection.sendToParent).toHaveBeenCalledWith(
                    "stackQuery",
                    Object({
                        payload: Object({ sample: "payload" }),
                        content_type_uid: "blog",
                        uid: "bltasssss",
                        params: Object({}),
                        action: "publishEntry",
                    })
                );
                done();
            });
        });

        it("publish entry invalid parameters", async () => {
            const Query = stack.ContentType("blog").Entry("bltasssss");
            await expect(() => Query.publish()).rejects.toThrow(
                "Kindly provide valid parameters"
            );
        });

        it("unpublish entry", (done) => {
            const Query = stack.ContentType("blog").Entry("bltasssss");
            Query.unpublish({ sample: "payload" }).then((data: any) => {
                expect(data).toEqual({});
                expect(connection.sendToParent).toHaveBeenCalledWith(
                    "stackQuery",
                    Object({
                        payload: Object({ sample: "payload" }),
                        content_type_uid: "blog",
                        uid: "bltasssss",
                        params: Object({}),
                        action: "unpublishEntry",
                    })
                );
                done();
            });
        });

        it("unpublish entry invalid parameters", async () => {
            const Query = stack.ContentType("blog").Entry("bltasssss");
            // await Query.unpublish();
            await expect(() => Query.unpublish()).rejects.toThrow(
                "Kindly provide valid parameters"
            );
        });

        it("set workflow stage for an entry", (done) => {
            const Query = stack.ContentType("blog").Entry("bltasssss");
            Query.setWorkflowStage({ sample: "payload" }).then((data: any) => {
                expect(data).toEqual({});
                expect(connection.sendToParent).toHaveBeenCalledWith(
                    "stackQuery",
                    Object({
                        payload: Object({ sample: "payload" }),
                        content_type_uid: "blog",
                        uid: "bltasssss",
                        params: Object({}),
                        action: "setWorkflowStageEntry",
                    })
                );
                done();
            });
        });

        it("set workflow stage invalid parameters", async () => {
            const Query = stack.ContentType("blog").Entry("bltasssss");
            await expect(Query.setWorkflowStage()).rejects.toThrow(
                "Kindly provide valid parameters"
            );
        });

        it("update an entry", (done) => {
            const Query = stack.ContentType("blog").Entry("bltasssss");
            Query.update({ sample: "payload" }, "fr-fr").then((data: any) => {
                expect(data).toEqual({});
                expect(connection.sendToParent).toHaveBeenCalledWith(
                    "stackQuery",
                    Object({
                        payload: Object({ sample: "payload" }),
                        content_type_uid: "blog",
                        uid: "bltasssss",
                        params: Object({ locale: "fr-fr" }),
                        action: "updateEntry",
                    })
                );
                done();
            });
        });

        it("update entry invalid parameters", async () => {
            const Query = stack.ContentType("blog").Entry("bltasssss");
            await expect(Query.update()).rejects.toThrow(
                "Kindly provide valid parameters"
            );
        });
    });

    describe("Environment Calls", () => {
        it("getEnvironment", (done) => {
            let params = { sample: "parameter" };
            stack.getEnvironment("uid", params).then((data: any) => {
                expect(data).toEqual({});
                expect(connection.sendToParent).toHaveBeenCalledWith(
                    "stackQuery",
                    { name: "uid", params, action: "getEnvironment" }
                );
                done();
            });
        });

        it("getEnvironment name is required", async () => {
            //@ts-ignore
            await expect(stack.getEnvironment()).rejects.toThrow(
                "name is required"
            );
        });

        it("getEnvironment error case", async () => {
            let stack = new Stack(
                getStack(),
                { sendToParent: sendToParentError },
                { currentBranch: currentBranch }
            );

            await expect(stack.getEnvironment("uid")).rejects.toThrow(
                "sample error"
            );
        });

        it("getEnvironment ajax error", async () => {
            let newStack = new Stack(
                getStack(),
                { sendToParent: sendToParentAjaxCallError },
                { currentBranch: currentBranch }
            );
            await expect(newStack.getEnvironment("uid")).rejects.toThrow(
                "ajax error"
            );
        });

        it("getEnvironments", (done) => {
            let params: { [key: string]: any } = { sample: "parameter" };
            let query = { sample: "query" };
            stack.getEnvironments(query, params).then((data: any) => {
                params.query = query;
                expect(data).toEqual({});
                expect(connection.sendToParent).toHaveBeenCalledWith(
                    "stackQuery",
                    { params, action: "getEnvironments" }
                );
                done();
            });
        });

        it("getEnvironments error case", async () => {
            let newStack = new Stack(
                getStack(),
                { sendToParent: sendToParentError },
                { currentBranch: currentBranch }
            );
            await expect(newStack.getEnvironments()).rejects.toThrow(
                "sample error"
            );
        });

        it("getEnvironments ajax error", async () => {
            let newStack = new Stack(
                getStack(),
                { sendToParent: sendToParentAjaxCallError },
                { currentBranch: currentBranch }
            );
            await expect(newStack.getEnvironments()).rejects.toThrow(
                "ajax error"
            );
        });
    });

    describe("Assets Calls", () => {
        it("get single asset", (done) => {
            const Query = stack.Asset("bltasssss").addParam("kz", "zz");
            Query.fetch().then((data: any) => {
                expect(connection.sendToParent).toHaveBeenCalledWith(
                    "stackQuery",
                    {
                        uid: "bltasssss",
                        params: { kz: "zz" },
                        action: "getAsset",
                    }
                );
                expect(data).toEqual({});
                done();
            });
        });

        it("get single asset, Kindly provide an asset uid", async () => {
            await expect(() => stack.Asset()).toThrow("uid is required");
        });

        it("get asset with uid, addParam error", async () => {
            await expect(() => stack.Asset("blog").addParam()).toThrow(
                "Kindly provide valid parameters."
            );
        });

        it("getAssets ajax error", async () => {
            let newStack = new Stack(
                getStack(),
                { sendToParent: sendToParentAjaxCallError },
                { currentBranch: currentBranch }
            );
            await expect(newStack.Asset("bltasssss").fetch()).rejects.toThrow(
                "ajax error"
            );
        });

        it("find assets query", () => {
            const Query = stack.Asset.Query();
            expect(Query.getQuery()).toEqual({});
            Query.query({ l: "c" })
                .tags(["k"])
                .includeCount()
                .addParam("x1", "y")
                .equalTo("x2", "y")
                .where("x3", "y")
                .regex("k1", "v", {})
                .search("search")
                .lessThan("k2", "v")
                .lessThanOrEqualTo("k3", "v")
                .greaterThan("k4", "v")
                .greaterThanOrEqualTo("k5", "v")
                .notEqualTo("k6", "v")
                .containedIn("k7", ["v"])
                .notContainedIn("k7", ["v"])
                .exists("k8")
                .ascending("k9")
                .descending("k10")
                .beforeUid("k11")
                .afterUid("k12")
                .skip(100)
                .limit(100)
                .and({})
                .or({});
            expect(Query.getQuery()).toEqual({
                l: "c",
                x2: "y",
                x3: "y",
                k1: { $regex: "v", $options: {} },
                k2: { $lt: "v" },
                k3: { $lte: "v" },
                k4: { $gt: "v" },
                k5: { $gte: "v" },
                k6: { $ne: "v" },
                k7: { $in: ["v"], $nin: ["v"] },
                k8: { $exists: true },
                $and: [{}],
                $or: [{}],
            });

            Query.find().then((data: any) => {
                expect(data).toEqual({});
                expect(connection.sendToParent).toHaveBeenCalledWith(
                    "stackQuery",
                    {
                        content_type_uid: undefined,
                        params: {
                            query: {
                                l: "c",
                                x2: "y",
                                x3: "y",
                                k1: { $regex: "v", $options: {} },
                                k2: { $lt: "v" },
                                k3: { $lte: "v" },
                                k4: { $gt: "v" },
                                k5: { $gte: "v" },
                                k6: { $ne: "v" },
                                k7: { $in: ["v"], $nin: ["v"] },
                                k8: { $exists: true },
                                $and: [{}],
                                $or: [{}],
                            },
                            tags: ["k"],
                            include_count: true,
                            x1: "y",
                            typeahead: "search",
                            asc: "k9",
                            desc: "k10",
                            before_uid: "k11",
                            after_uid: "k12",
                            skip: 100,
                            limit: 100,
                        },
                        action: "getAssets",
                    }
                );
            });
        });

        it("find one asset", (done) => {
            const Query = stack.Asset.Query();
            expect(Query.getQuery()).toEqual({});
            Query.query({ l: "c" })
                .tags(["k"])
                .includeCount()
                .addParam("x1", "y")
                .equalTo("x2", "y")
                .where("x3", "y")
                .regex("k1", "v", {})
                .search("search")
                .lessThan("k2", "v")
                .lessThanOrEqualTo("k3", "v")
                .greaterThan("k4", "v")
                .greaterThanOrEqualTo("k5", "v")
                .notEqualTo("k6", "v")
                .containedIn("k7", ["v"])
                .notContainedIn("k7", ["v"])
                .exists("k8")
                .ascending("k9")
                .descending("k10")
                .beforeUid("k11")
                .afterUid("k12")
                .skip(100)
                .limit(100)
                .and({})
                .or({});
            expect(Query.getQuery()).toEqual({
                l: "c",
                x2: "y",
                x3: "y",
                k1: { $regex: "v", $options: {} },
                k2: { $lt: "v" },
                k3: { $lte: "v" },
                k4: { $gt: "v" },
                k5: { $gte: "v" },
                k6: { $ne: "v" },
                k7: { $in: ["v"], $nin: ["v"] },
                k8: { $exists: true },
                $and: [{}],
                $or: [{}],
            });
            Query.findOne().then((data: any) => {
                expect(data).toEqual({});
                expect(connection.sendToParent).toHaveBeenCalledWith(
                    "stackQuery",
                    {
                        content_type_uid: undefined,
                        params: {
                            query: {
                                l: "c",
                                x2: "y",
                                x3: "y",
                                k1: { $regex: "v", $options: {} },
                                k2: { $lt: "v" },
                                k3: { $lte: "v" },
                                k4: { $gt: "v" },
                                k5: { $gte: "v" },
                                k6: { $ne: "v" },
                                k7: { $in: ["v"], $nin: ["v"] },
                                k8: { $exists: true },
                                $and: [{}],
                                $or: [{}],
                            },
                            tags: ["k"],
                            include_count: true,
                            x1: "y",
                            typeahead: "search",
                            asc: "k9",
                            desc: "k10",
                            before_uid: "k11",
                            after_uid: "k12",
                            skip: 100,
                            limit: 1,
                        },
                        action: "getAssets",
                    }
                );
                done();
            });
        });

        it("count assets", (done) => {
            const Query = stack.Asset.Query();
            expect(Query.getQuery()).toEqual({});
            Query.query({ l: "c" })
                .tags(["k"])
                .includeCount()
                .addParam("x1", "y")
                .equalTo("x2", "y")
                .where("x3", "y")
                .regex("k1", "v", {})
                .search("search")
                .lessThan("k2", "v")
                .lessThanOrEqualTo("k3", "v")
                .greaterThan("k4", "v")
                .greaterThanOrEqualTo("k5", "v")
                .notEqualTo("k6", "v")
                .containedIn("k7", ["v"])
                .notContainedIn("k7", ["v"])
                .exists("k8")
                .ascending("k9")
                .descending("k10")
                .beforeUid("k11")
                .afterUid("k12")
                .skip(100)
                .limit(100)
                .and({})
                .or({});
            expect(Query.getQuery()).toEqual({
                l: "c",
                x2: "y",
                x3: "y",
                k1: { $regex: "v", $options: {} },
                k2: { $lt: "v" },
                k3: { $lte: "v" },
                k4: { $gt: "v" },
                k5: { $gte: "v" },
                k6: { $ne: "v" },
                k7: { $in: ["v"], $nin: ["v"] },
                k8: { $exists: true },
                $and: [{}],
                $or: [{}],
            });
            Query.count().then((data: any) => {
                expect(data).toEqual({});
                expect(connection.sendToParent).toHaveBeenCalledWith(
                    "stackQuery",
                    {
                        content_type_uid: undefined,
                        params: {
                            query: {
                                l: "c",
                                x2: "y",
                                x3: "y",
                                k1: { $regex: "v", $options: {} },
                                k2: { $lt: "v" },
                                k3: { $lte: "v" },
                                k4: { $gt: "v" },
                                k5: { $gte: "v" },
                                k6: { $ne: "v" },
                                k7: { $in: ["v"], $nin: ["v"] },
                                k8: { $exists: true },
                                $and: [{}],
                                $or: [{}],
                            },
                            tags: ["k"],
                            include_count: true,
                            x1: "y",
                            typeahead: "search",
                            asc: "k9",
                            desc: "k10",
                            before_uid: "k11",
                            after_uid: "k12",
                            skip: 100,
                            limit: 100,
                            count: true,
                        },
                        action: "getAssets",
                    }
                );
                done();
            });
        });

        it("getRteAssets", (done) => {
            const Query = stack.Asset;
            Query.getRteAssets().then((data: any) => {
                expect(data).toEqual({});
                expect(connection.sendToParent).toHaveBeenCalledWith(
                    "stackQuery",
                    Object({ action: "getRteAssets" })
                );
                done();
            });
        });
        it("getAssetsOfSpecificTypes", (done) => {
            const Query = stack.Asset;
            Query.getAssetsOfSpecificTypes("image/png").then((data: any) => {
                expect(data).toEqual({});
                expect(connection.sendToParent).toHaveBeenCalledWith(
                    "stackQuery",
                    Object({
                        action: "getAssetsOfSpecificTypes",
                        asset_type: "image/png",
                    })
                );
                done();
            });
        });

        it("getAssetsOfSpecificTypes invalid parameters", async () => {
            const Query = stack.Asset;
            await expect(Query.getAssetsOfSpecificTypes()).rejects.toThrow(
                "Kindly provide valid parameters"
            );
        });

        it("getAssetsOfSpecificTypes error", async () => {
            let newStack = new Stack(
                getStack(),
                { sendToParent: sendToParentAjaxCallError },
                { currentBranch: currentBranch }
            );
            await expect(() =>
                newStack.Asset.getAssetsOfSpecificTypes("uid")
            ).rejects.toThrow("ajax error");
        });

        it("get references of an asset", (done) => {
            const Query = stack.Asset("bltasssss");
            Query.getReferences().then((data: any) => {
                expect(data).toEqual({});
                expect(connection.sendToParent).toHaveBeenCalledWith(
                    "stackQuery",
                    Object({
                        uid: "bltasssss",
                        params: Object({}),
                        action: "getAssetReferences",
                    })
                );
                done();
            });
        });

        it("publish asset", (done) => {
            const Query = stack.Asset("bltasssss");
            Query.publish({ sample: "payload" }).then((data: any) => {
                expect(data).toEqual({});
                expect(connection.sendToParent).toHaveBeenCalledWith(
                    "stackQuery",
                    Object({
                        payload: Object({ sample: "payload" }),
                        uid: "bltasssss",
                        params: Object({}),
                        action: "publishAsset",
                    })
                );
                done();
            });
        });

        it("publish asset invalid parameters", async () => {
            const Query = stack.Asset("bltasssss");
            await expect(Query.publish()).rejects.toThrow(
                "Kindly provide valid parameters"
            );
        });

        it("unpublish asset", (done) => {
            const Query = stack.Asset("bltasssss");
            Query.unpublish({ sample: "payload" }).then((data: any) => {
                expect(data).toEqual({});
                expect(connection.sendToParent).toHaveBeenCalledWith(
                    "stackQuery",
                    Object({
                        payload: Object({ sample: "payload" }),
                        uid: "bltasssss",
                        params: Object({}),
                        action: "unpublishAsset",
                    })
                );
                done();
            });
        });

        it("unpublish asset invalid parameters", async () => {
            const Query = stack.Asset("bltasssss");

            await expect(Query.unpublish()).rejects.toThrow(
                "Kindly provide valid parameters"
            );
        });

        it("update an asset", (done) => {
            const Query = stack.Asset("bltasssss");
            Query.update({ sample: "payload" }).then((data: any) => {
                expect(data).toEqual({});
                expect(connection.sendToParent).toHaveBeenCalledWith(
                    "stackQuery",
                    Object({
                        payload: Object({ sample: "payload" }),
                        uid: "bltasssss",
                        params: Object({}),
                        action: "updateAsset",
                    })
                );
                done();
            });
        });

        it("update asset invalid parameters", async () => {
            const Query = stack.Asset("bltasssss");
            await expect(Query.update()).rejects.toThrow(
                "Kindly provide valid parameters"
            );
        });

        it("delete an asset", (done) => {
            const Query = stack.Asset("bltasssss");
            Query.delete({ sample: "payload" }).then((data: any) => {
                expect(data).toEqual({});
                expect(connection.sendToParent).toHaveBeenCalledWith(
                    "stackQuery",
                    Object({
                        uid: "bltasssss",
                        params: Object({}),
                        action: "deleteAsset",
                    })
                );
                done();
            });
        });
    });

    describe("Locale Calls", () => {
        it("getLocale", (done) => {
            let params = { sample: "parameter" };
            let setData = stack.getLocale("uid", params).then((data: any) => {
                expect(data).toEqual({});
                expect(connection.sendToParent).toHaveBeenCalledWith(
                    "stackQuery",
                    { code: "uid", params, action: "getLocale" }
                );
                done();
            });
        });

        it("getLocale code is required", async () => {
            // @ts-ignore
            await expect(stack.getLocale()).rejects.toThrow("code is required");
        });

        it("getLocale error case", async () => {
            let newStack = new Stack(
                getStack(),
                { sendToParent: sendToParentError },
                { currentBranch: currentBranch }
            );

            await expect(newStack.getLocale("uid")).rejects.toThrow(
                "sample error"
            );
        });

        it("getLocale ajax error", async () => {
            let newStack = new Stack(
                getStack(),
                { sendToParent: sendToParentAjaxCallError },
                { currentBranch: currentBranch }
            );

            await expect(newStack.getLocale("uid")).rejects.toThrow(
                "ajax error"
            );
        });

        it("getLocales", (done) => {
            let params: { [key: string]: any } = { sample: "parameter" };
            let query = { sample: "query" };
            stack.getLocales(query, params).then((data: any) => {
                params.query = query;
                expect(data).toEqual({});
                expect(connection.sendToParent).toHaveBeenCalledWith(
                    "stackQuery",
                    { params, action: "getLocales" }
                );
                done();
            });
        });

        it("getLocales error case", async () => {
            let newStack = new Stack(
                getStack(),
                { sendToParent: sendToParentError },
                { currentBranch: currentBranch }
            );

            await expect(newStack.getLocales()).rejects.toThrow("sample error");
        });

        it("getLocales ajax error", async () => {
            let newStack = new Stack(
                getStack(),
                { sendToParent: sendToParentAjaxCallError },
                { currentBranch: currentBranch }
            );

            await expect(newStack.getLocales()).rejects.toThrow("ajax error");
        });
    });

    describe("Branch calls", () => {
        test("it should return list of branches if available", async () => {
            const branches = stack.getAllBranches();
            const actualBranches = getStack().branches;

            expect(branches).not.toBeUndefined();
            expect(branches.length).toBeGreaterThanOrEqual(1);

            expect(branches).toMatchObject(actualBranches);
        });
        test("it should return empty array if branches are not available", () => {
            const stackData = getStack();
            // @ts-ignore
            delete stackData.branches;

            stack = new Stack(stackData, connection, {
                currentBranch: "",
            });

            const branches = stack.getAllBranches();

            expect(branches).not.toBeUndefined();
            expect(branches.length).toBe(0);
        });
        test("it should return detail on current branch if available", () => {
            const branch = stack.getCurrentBranch();

            expect(branch).not.toBeUndefined();
            expect(branch).toMatchObject(getStack().branches[0]);
        });
        test("it should return null if current branch is not available", () => {
            const stackData = getStack();
            // @ts-ignore
            delete stackData.branches;

            stack = new Stack(stackData, connection, {
                currentBranch: "random_branch",
            });

            const branch = stack.getCurrentBranch();

            expect(branch).toBeNull();
        });
    });
});
