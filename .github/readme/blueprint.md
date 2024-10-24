Contentstack App SDK Readme
The Contentstack App SDK allows you to customize your applications. This document will help you integrate the App SDK with your application.

Getting started

Include the compiled version of the extension client library by adding the following line to your application.

<script
    src="https://unpkg.com/@contentstack/app-sdk@{{pkg.version}}/dist/index.js"
    integrity="{{subresourceIntegrity.js}}"
    crossorigin="anonymous"
></script>

To include the App SDK in your project, you need to run the following command:

npm install @contentstack/app-sdk
Alternatively, you can use the following command within the script tag to install the App SDK:

<script src="https://unpkg.com/@contentstack/app-sdk@2.0.0/dist/index.js"></script>

Initializing the App SDK
To Initialize the App SDK you need to run the following command:

ContentstackAppSdk.init().then(function (appSdk) {
// add code here
});
For more information, please refer to our App SDK API Reference document.

Download the Boilerplate
You can extend or customize the functionality of Contentstack CMS with Marketplace apps. To simplify and speed up the building process, boilerplates describe repetitive elements in a project. This boilerplate will help you build custom applications for your organization or stack.

Download the boilerplate.

UI Locations and Examples
UI Locations allow you to extend Contentstack's functionality. Through these UI locations, you can customize Contentstack's default behavior and UI. Integration of third-party applications is possible using different UI locations.

The Contentstack App SDK currently supports the following UI Locations:

Custom Field Location
Dashboard Location
Asset Sidebar Location
App Config Location
RTE Location
Sidebar Location
Field Modifier Location
Full Page Location
Custom Field Location
Custom Field Location allows you to create custom fields that can be used in your content types. You can integrate with various business applications, such as Bynder, Cloudinary, Shopify, by adding them as a custom field to your stack's content type.

Dashboard Location
With the Dashboard Location, you can create widgets for your stack dashboard. Integration with Google Analytics provides meaningful insights about your website.

Asset Sidebar Location
Using the Asset Sidebar Location, you can create customized sidebar widgets to extend the functionality of your assets.

Manage, transform, and optimize your stack's assets efficiently using the Image Preset Builder.

App Config Location
App Config UI Location allows you to manage all the app settings centrally. Once configured, all other locations (where the app is installed) can access these settings.

RTE Location
The RTE Location allows you to create custom plugins to expand the functionality of your JSON Rich Text Editor. Using the Audience and Variables plugin, you can tailor your content as per your requirements.

Sidebar Location
The Sidebar Location provides powerful tools for analyzing and recommending ideas for your entry. Use the Smartling sidebar location to help translate your content.

Field Modifier Location
The Field Modifier Location is a type of UI location which extends the capabilities of entry fields. With the Field Modifier UI location, you can allow the different apps to appear on defined field data types such as Text, Number, JSON, Boolean, File, Reference fields etc.

Full Page Location
The Full Page location is a type of UI location that lets you view full page apps such as Release Preview within your stack.

Using Contentstack styles
Install the Venus UI library package to style your app according to the Contentstack UI:

npm i @contentstack/venus-components --save
For more information on styling your application, refer to our style guide.

More information
App SDK API Reference
Marketplace Platform Guides
Marketplace Apps
Contentstack App Development
App SDK v2.0.0 Migration Guide
This guide provides instructions for migrating your application to App SDK version 2.0.0. It covers changes in metadata responses, field modifier and full page location updates, and the transition from the \_extension property to \_uiLocation. If you are upgrading your app to the latest version, make sure to follow these steps for a smooth transition.

Read the Migration Guide

License
Licensed under MIT.
