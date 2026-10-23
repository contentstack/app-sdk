/**
 * @jest-environment ./__test__/helpers/fetchEnvironment.js
 */
import PostRobot from "post-robot";
import { AxiosResponse } from "axios";

import { dispatchAdapter, dispatchApiRequest } from "../src/utils/adapter";
import { axiosToFetchResponse } from "../src/utils/utils";

jest.mock("post-robot", () => ({
    __esModule: true,
    default: {
        sendToParent: jest.fn(),
        on: jest.fn(),
        CONFIG: {},
    },
}));

const sendToParent = PostRobot.sendToParent as unknown as jest.Mock;

/** What the host resolves the `apiAdapter` channel with for an HTTP reply. */
const hostHttpReply = (
    status: number,
    statusText: string,
    data: unknown,
    headers: Record<string, string> = { "content-type": "application/json" }
) => ({
    data: { data, status, statusText, headers, config: {}, request: {} },
});

/** What the host resolves with when it could not reach the backend. */
const hostTransportReply = {
    data: {
        status: 502,
        message: "connect ECONNREFUSED",
        stack: "Error: connect ECONNREFUSED\n    at TCPConnectWrap",
    },
};

describe("dispatchApiRequest (appSdk.api)", () => {
    afterEach(() => {
        sendToParent.mockReset();
    });

    it("returns a fetch Response with body and response headers on success", async () => {
        sendToParent.mockResolvedValue(
            hostHttpReply(
                200,
                "OK",
                { ok: true },
                {
                    "content-type": "application/json",
                    "x-request-id": "abc-123",
                }
            )
        );

        const res = await dispatchApiRequest("https://backend.test/x", {
            method: "POST",
            headers: { "x-client": "app" },
            body: JSON.stringify({ a: 1 }),
        });

        expect(sendToParent).toHaveBeenCalledWith(
            "apiAdapter",
            expect.objectContaining({
                url: "https://backend.test/x",
                method: "POST",
                data: JSON.stringify({ a: 1 }),
            })
        );
        expect(res.status).toBe(200);
        expect(res.statusText).toBe("OK");
        expect(await res.json()).toEqual({ ok: true });
        // response headers, not request headers
        expect(res.headers.get("x-request-id")).toBe("abc-123");
        expect(res.headers.get("x-client")).toBeNull();
    });

    it("returns the backend JSON body on a 404 (MKT-19619)", async () => {
        sendToParent.mockResolvedValue(
            hostHttpReply(404, "Not Found", {
                message: "Locale code mismatch for Chinese (Simplified)",
            })
        );

        const res = await dispatchApiRequest("https://backend.test/x", {
            method: "POST",
        });

        expect(res.status).toBe(404);
        expect(res.statusText).toBe("Not Found");
        expect(res.headers.get("content-type")).toBe("application/json");
        expect(await res.json()).toEqual({
            message: "Locale code mismatch for Chinese (Simplified)",
        });
    });

    it("returns a string body on a 404 as-is", async () => {
        sendToParent.mockResolvedValue(
            hostHttpReply(404, "Not Found", '{"message":"already a string"}')
        );

        const res = await dispatchApiRequest("https://backend.test/x");

        expect(res.status).toBe(404);
        expect(await res.text()).toBe('{"message":"already a string"}');
    });

    it("returns a text/plain body on a 500", async () => {
        sendToParent.mockResolvedValue(
            hostHttpReply(500, "Internal Server Error", "boom", {
                "content-type": "text/plain",
            })
        );

        const res = await dispatchApiRequest("https://backend.test/x");

        expect(res.status).toBe(500);
        expect(res.statusText).toBe("Internal Server Error");
        expect(res.headers.get("content-type")).toBe("text/plain");
        expect(await res.text()).toBe("boom");
    });

    it("keeps the host transport error message when the backend is unreachable", async () => {
        sendToParent.mockResolvedValue(hostTransportReply);

        const res = await dispatchApiRequest("https://backend.test/x");

        expect(res.status).toBe(502);
        expect(res.statusText).toBe("connect ECONNREFUSED");
        expect(await res.text()).toContain("ECONNREFUSED");
    });

    it("returns a 500 when the post-robot call itself fails", async () => {
        sendToParent.mockRejectedValue(new Error("no parent"));

        const res = await dispatchApiRequest("https://backend.test/x");

        expect(res.status).toBe(500);
        expect(res.statusText).toBe("Something went wrong with the request");
    });

    it("strips set-cookie and authorization from response headers", async () => {
        sendToParent.mockResolvedValue(
            hostHttpReply(
                200,
                "OK",
                { ok: true },
                {
                    "content-type": "application/json",
                    "set-cookie": "sid=1",
                    authorization: "Bearer x",
                    "x-safe": "yes",
                }
            )
        );

        const res = await dispatchApiRequest("https://backend.test/x");

        expect(res.headers.get("set-cookie")).toBeNull();
        expect(res.headers.get("authorization")).toBeNull();
        expect(res.headers.get("x-safe")).toBe("yes");
    });
});

describe("dispatchAdapter (appSdk.createAdapter)", () => {
    afterEach(() => {
        sendToParent.mockReset();
    });

    it("resolves with an axios-like response on success", async () => {
        sendToParent.mockResolvedValue(hostHttpReply(200, "OK", { ok: true }));
        const config = { url: "/x", method: "GET" };

        const res = (await dispatchAdapter(PostRobot)(config)) as AxiosResponse;

        expect(res.status).toBe(200);
        expect(res.data).toEqual({ ok: true });
        expect(res.config).toBe(config);
    });

    it("rejects an HTTP error with the flat keys plus a nested response", async () => {
        sendToParent.mockResolvedValue(
            hostHttpReply(404, "Not Found", { message: "nope" })
        );

        await expect(
            dispatchAdapter(PostRobot)({ url: "/x" })
        ).rejects.toMatchObject({
            // existing shape apps already rely on
            status: 404,
            statusText: "Not Found",
            data: { message: "nope" },
            config: { url: "/x" },
            // new: nested response for api()
            response: { status: 404, data: { message: "nope" } },
        });
    });

    it("rejects a transport error without a nested response", async () => {
        sendToParent.mockResolvedValue(hostTransportReply);

        const err: any = await dispatchAdapter(PostRobot)({ url: "/x" }).catch(
            (e) => e
        );

        expect(err.status).toBe(502);
        expect(err.message).toBe("connect ECONNREFUSED");
        expect(err.response).toBeUndefined();
    });

    it("rejects with an AxiosError when post-robot fails", async () => {
        sendToParent.mockRejectedValue(new Error("no parent"));

        await expect(
            dispatchAdapter(PostRobot)({ url: "/x" })
        ).rejects.toMatchObject({
            isAxiosError: true,
            code: "ERR_INTERNAL_SERVER",
            message: "Something went wrong with the request",
        });
    });
});

describe("axiosToFetchResponse", () => {
    const base = { status: 200, statusText: "OK", config: {} as any };

    it("JSON-encodes object bodies and defaults content-type to application/json", async () => {
        const res = axiosToFetchResponse({
            ...base,
            data: { a: 1 },
            headers: {},
        } as AxiosResponse);

        expect(res.headers.get("content-type")).toBe("application/json");
        expect(await res.json()).toEqual({ a: 1 });
    });

    it("passes string bodies through and defaults content-type to octet-stream", async () => {
        const res = axiosToFetchResponse({
            ...base,
            data: "raw",
            headers: {},
        } as AxiosResponse);

        expect(res.headers.get("content-type")).toBe(
            "application/octet-stream"
        );
        expect(await res.text()).toBe("raw");
    });

    it("tolerates a missing headers object", async () => {
        const res = axiosToFetchResponse({
            ...base,
            data: null,
            headers: undefined,
        } as unknown as AxiosResponse);

        expect(res.status).toBe(200);
        expect(await res.text()).toBe("null");
    });
});
