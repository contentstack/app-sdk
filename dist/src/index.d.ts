import Extension from "./extension";
/** Class to initialize the App on Contentstack UI. */
/**
 * @hideconstructor
 */
declare class ContentstackAppSDK {
    /**
     * You need to first import Contentstack App SDK and then call ContentstackAppSDK.init in your code base
     *
     * @example <caption>Custom Filed</caption>
     * ContentstackUIExtension.init().then(function (sdk) {
     *    const customField = sdk.location.CustomField;
     * })
     * @example <caption>Dashboard Widget</caption>
     * ContentstackUIExtension.init().then(function (sdk) {
     *    const dashboardUILocation = sdk.location.DashboardWidget;
     * })
     * @return {external:Promise}  A promise object which will be resolved with an instance of the {@link Extension} class which is instantiated using the data received from the Contentstack UI.
     */
    static _extension: Extension;
    /**
     * Initializes the App SDK and returns an instance of {@link Extension} class
     * @returns {Promise<Extension>}
     */
    static init(): Promise<Extension>;
    /**
     * Version of Contentstack App SDK.
     * @type {string}
     */
    static get SDK_VERSION(): string;
}
export default ContentstackAppSDK;
//# sourceMappingURL=index.d.ts.map