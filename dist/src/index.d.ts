import UiLocation from "./uiLocation";
/**
 * Class to initialize the App on Contentstack UI.
 * Import Contentstack App SDK and then call ContentstackAppSDK.init in your code base
 *
 * @example <caption>Custom Field UI Location</caption>
 * ContentstackAppSDK.init().then(function (sdk) {
 *    const customField = sdk.location.CustomField;
 * })
 * @example <caption>Dashboard UI Location</caption>
 * ContentstackAppSDK.init().then(function (sdk) {
 *    const dashboardUILocation = sdk.location.DashboardWidget;
 * })
 * @return {Promise} A promise object which will be resolved with an instance of the {@link UiLocation} class.
 * @hideconstructor
 */
declare class ContentstackAppSDK {
    /**
     * A static variable that stores the instance of {@link UiLocation} class after initialization
     */
    static _uiLocation: UiLocation;
    /**
     * Initializes the App SDK and returns an instance of {@link UiLocation} class
     */
    static init(): Promise<UiLocation>;
    /**
     * Version of Contentstack App SDK.
     */
    static get SDK_VERSION(): string;
}
export default ContentstackAppSDK;
//# sourceMappingURL=index.d.ts.map