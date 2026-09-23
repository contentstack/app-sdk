import { AxiosRequestConfig, AxiosResponse } from "axios";
export type RequestConfig = AxiosRequestConfig;
export type ProxyResponse = AxiosResponse;

/**
 * URLs for Contentstack products, keyed by product.
 *
 * The SDK does not resolve these URLs itself — the host shell (e.g. Developer Hub /
 * Marketplace UI) injects the values into the initialization data at init time, and
 * the SDK exposes them verbatim via `appSdk.endpoints`. Apps build request URLs from
 * `appSdk.endpoints.<KEY>` and dispatch them with `appSdk.api(url, option)`.
 *
 * `appSdk.api()` proxies the request to the host shell, which attaches the app's
 * OAuth access token. So only Contentstack APIs that accept an OAuth token (the
 * management plane — `Authorization: Bearer <token>` / OAuth `authorization` header)
 * can be called through `api()`. This type therefore surfaces only the management-plane
 * endpoints. Delivery-plane APIs (Content/GraphQL Delivery, Preview, Image/Asset CDN,
 * Personalize Edge) require a separate delivery/preview token and are intentionally
 * NOT listed — apps that need them call those endpoints with their own credentials.
 *
 * `APP`, `CMA` and `DEVELOPER_HUB` are always injected by the host shell, so they are
 * required (kept for backward compatibility — `APP` is the web-app URL). Every other
 * key is OPTIONAL: it resolves to a URL only when the host shell injects it, and
 * availability varies by region (e.g. `ASSET_MANAGEMENT` exists only in the AWS North
 * America region). Treat a missing key as "not available in this host / region".
 *
 * Source of truth for products and per-region URLs:
 * https://artifacts.contentstack.com/regions.json
 */
export type ContentstackEndpoints = {
    /** Application (web app) URL. Always injected by the host shell. */
    APP: string;
    /** Content Management API URL. OAuth-callable. Always injected by the host shell. */
    CMA: string;
    /** Developer Hub API URL. OAuth-callable. Always injected by the host shell. */
    DEVELOPER_HUB: string;
    /** Launch API URL. OAuth-callable (management plane). */
    LAUNCH?: string;
    LYTICS?: string;
    /** Automate (Automations) Management API URL. OAuth-callable (management plane). */
    AUTOMATE?: string;
    /** Brand Kit Management API URL. OAuth-callable (management plane). */
    BRAND_KIT?: string;
    /** Generative AI API URL. OAuth-callable (management plane). */
    GEN_AI?: string;
    /** Personalize Management API URL. OAuth-callable (management plane). */
    PERSONALIZE?: string;
    /** Asset Management API URL. OAuth-callable. Available only in the AWS North America region. */
    ASSETS?: string;
    [key: string]: string | undefined;
};
