import Location from "./location";
/**
 * Class to initialize the App on Contentstack UI.
 * Import Contentstack App SDK and then call ContentstackAppSDK.init in your code base
 *
 * @example <caption>Custom Filed</caption>
 * ContentstackAppSDK.init().then(function (sdk) {
 *    const customField = sdk.location.CustomField;
 * })
 * @example <caption>Dashboard Widget</caption>
 * ContentstackAppSDK.init().then(function (sdk) {
 *    const dashboardUILocation = sdk.location.DashboardWidget;
 * })
 * @return {external:Promise} A promise object which will be resolved with an instance of the {@link Location} class which is instantiated using the data received from the Contentstack UI.
 * @hideconstructor
 */
declare class ContentstackAppSDK {
    /**
     * A static variable that stores the instance of {@link Location} class after initialization
     */
    static _extension: Location;
    /**
     * Initializes the App SDK and returns an instance of {@link Location} class
     */
    static init(): Promise<Location>;
    /**
     * Version of Contentstack App SDK.
     */
    static get SDK_VERSION(): string;
}
export default ContentstackAppSDK;
//# sourceMappingURL=index.d.ts.map