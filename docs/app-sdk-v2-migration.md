# App SDK v2.0.0 Migration Guide

With the release of **App SDK version 2.0.0**, certain breaking changes have been introduced to enhance the SDK's functionality and structure. To ensure a smooth transition to the new version, please follow the migration instructions below:

## Managing Metadata Response Changes

If your application previously utilized the metadata module's methods to handle app metadata, you'll need to update your approach for handling the response structure.

Make note of the updated response structures for the following methods:

##### `createMetaData()`

##### `retrieveMetaData()`

##### `retrieveAllMetaData()`

##### `updateMetaData()`

##### `deleteMetaData()`

Here's a comparison of the old and new response structures:

#### Older Response (Version 1.x):

```json
{
  data: {
      metadata: {} // Actual metadata response to be returned,
  },
  origin: app.contentstack.com, // origin where the app is running
  source: global{} // Source information
}
```

#### Newer Response (Version 2.0.0):

```json
{
    "metadata": {} // Actual metadata response to be returned,
}
```

## Field Modifier and Full Page Location Changes

If you were utilizing the `EntryFieldLocation` and `FullscreenAppWidget` properties to manage your field modifier or full page applications, it's essential to adapt to the new property names introduced in version 2.0.0:

Replace occurrences of `appSDK.location.EntryFieldLocation` with `appSDK.location.FieldModifierLocation`.

Replace occurrences of `appSDK.location.FullscreenAppWidget` with `appSDK.location.FullPage`.

## Update for `_extension` Property

In prior versions of the App SDK, the `_extension` property was available on the App SDK instance returned after initialization. In version 2.0.0, this property has been replaced with `_uiLocation`. Make the following adjustment in your code:

Replace `appSdk._extension` with `appSdk._uiLocation`.

Here's an example of how the change can be applied:

```javascript
ContentstackAppSDK.init((appSdk) => {
    // Previous version
    appSdk._extension; // No longer available

    // Updated version
    appSdk._uiLocation; // Instance of the UiLocation
});
```

These migration instructions will help you seamlessly transition to App SDK version 2.0.0. Should you have any questions or need further assistance, please don't hesitate to reach out.
