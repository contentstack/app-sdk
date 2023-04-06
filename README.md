# Contentstack App SDK Readme

The Contentstack App SDK allows you to customize your applications. This document will help you integrate the App SDK with your application.

## Getting started

To include the App SDK in your project, you need to run the following command:

```sh
npm install @contentstack/app-sdk
```

Alternatively, you can use the following command within the script tag to install the App SDK:

```html
<script src="https://unpkg.com/@contentstack/app-sdk@^1.3.0/dist/index.js"></script>
```

### Initializing the App SDK

To Initialize the App SDK you need to run the following command:

```js
ContentstackAppSdk.init().then(function (appSdk) {
    // add code here
});
```

For more information, please refer to our [App SDK API Reference](https://github.com/contentstack/app-sdk-docs#contentstack-app-sdk-api-reference) document.

## Download the Boilerplate

You can extend or customize the functionality of Contentstack CMS with Marketplace apps. To simplify and speed up the building process, boilerplates describe repetitive elements in a project. This boilerplate will help you build custom applications for your organization or stack.

Download the [boilerplate](https://assets.contentstack.io/v3/assets/blt23180bf2502c7444/blt2bccdd28a2d44d1b/62fcb522da3c526fe6314886/app-boilerplate.zip?disposition=download).

## UI Locations and Examples

UI Locations allow you to extend Contentstack's functionality. Through these UI locations, you can customize Contentstack's default behavior and UI. Integration of third-party applications is possible using different UI locations.

The Contentstack App SDK currently supports the following UI Locations:

-   [Custom Field Location](https://www.contentstack.com/docs/developers/developer-hub/custom-field-location)
-   [Dashboard Location](https://www.contentstack.com/docs/developers/developer-hub/dashboard-location)
-   [Asset Sidebar Location](https://www.contentstack.com/docs/developers/developer-hub/asset-sidebar-location)
-   [App Config Location](https://www.contentstack.com/docs/developers/developer-hub/app-config-location)
-   [RTE Location](https://www.contentstack.com/docs/developers/developer-hub/rte-location)
-   [Sidebar Location](https://www.contentstack.com/docs/developers/developer-hub/sidebar-location)

### Custom Field Location

Custom Field Location allows you to create custom fields that can be used in your content types. You can integrate with various business applications, such as [Bynder](https://www.contentstack.com/docs/developers/marketplace-apps/bynder), [Cloudinary](https://www.contentstack.com/docs/developers/marketplace-apps/cloudinary), [Shopify](https://www.contentstack.com/docs/developers/marketplace-apps/shopify), by adding them as a custom field to your stack's content type.

### Dashboard Location

With the Dashboard Location, you can create widgets for your stack dashboard. Integration with [Google Analytics](https://www.contentstack.com/docs/developers/marketplace-apps/google-analytics/) provides meaningful insights about your website.

### Asset Sidebar Location

Using the Asset Sidebar Location, you can create customized sidebar widgets to extend the functionality of your assets.

Manage, transform, and optimize your stack's assets efficiently using the [Image Preset Builder](https://www.contentstack.com/docs/developers/marketplace-apps/image-preset-builder).

### App Config Location

App Config UI Location allows you to manage all the app settings centrally. Once configured, all other locations (where the app is installed) can access these settings.

### RTE Location

The RTE Location allows you to create custom plugins to expand the functionality of your JSON Rich Text Editor. Using the Audience and Variables plugin, you can tailor your content as per your requirements.

### Sidebar Location

The Sidebar Location provides powerful tools for analyzing and recommending ideas for your entry. Use the [Smartling](https://help.smartling.com/hc/en-us/articles/4865477629083) sidebar location to help translate your content.

## Using Contentstack styles

Install the Venus UI library package to style your app according to the Contentstack UI:

```sh
npm i @contentstack/venus-components --save
```

For more information on styling your application, refer to our [style guide](https://www.contentstack.com/docs/developers/venus-component-library/).

## More information

-   [App SDK API Reference](https://github.com/contentstack/app-sdk-docs#readme)
-   [Marketplace Platform Guides](https://www.contentstack.com/docs/developers/marketplace-platform-guides/)
-   [Marketplace Apps](https://www.contentstack.com/docs/developers/marketplace-apps/)
-   [Contentstack App Development](https://www.contentstack.com/docs/developers/developer-hub/)

## License

Licensed under [MIT](https://opensource.org/licenses/MIT).
