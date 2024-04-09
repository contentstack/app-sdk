# **Contentstack App SDK API Reference**

In this document, we will discuss the API requests that a custom location can use to communicate with Contentstack.

# **How to Include App SDK into Your Project**

To include the **app-sdk** library in your React app or project, you need to open command prompt and run the following command:

```sh
npm install https://github.com/contentstack/ui-app-sdk
```

Alternatively, you can run the following command to install the app-sdk library:

```sh
npm install @contentstack/app-sdk
```

The above command will install the **app-sdk** library in your project which contains the necessary toolkit you need to manage installed apps on specific locations.

# **Top level Objects**

Below we have listed some of the top-level objects used in the App SDK.

-   [Location](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#supported-locations): It's an object that represents all locations from the Contentstack UI.
-   [Store](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Store): It refers to a class that is used by a location to store your data in the [local storage](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#external_localStorage).
-   [Stack](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Stack): It's a class representing the current stack in the Contentstack UI.
-   [Window Frame](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Frame): It refers to a class that represents an iframe window from the Contentstack UI.

    **Note**: This class is not available for Custom Widgets.

-   [Entry](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Entry): It's a class that represents an entry from the Contentstack UI.

    > **Note**: It's not available for the Dashboard Widget extension.

# **Supported Locations**

Locations refers to the position or the placement of the app (sidebar widget, custom field, etc). As of now, the following locations are supported:

-   [CustomField](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#CustomField): It's an object representing the current Custom field reference in the Contentstack UI.
-   [DashboardWidget](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#DashboardWidget): It's an object representing the Dashboard widget reference in the Contentstack UI.
-   [SidebarWidget](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#SidebarWidget): It's an object representing the current Sidebar widget reference in the Contentstack UI.
-   [AppConfigWidget](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#AppConfigWidget): It's an object representing the current App configuration for the current App in the Contentstack UI.

# **External**

-   [Promise](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#external_Promise): The Promise object represents the eventual completion (or failure) of an asynchronous operation and its resulting value.
-   [localStorage](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#external_localStorage): The read-only localStorage property allows you to access a Storage object for the Document's origin; the stored data is saved across browser sessions.

# **Using the Contentstack App SDK**

**Kind**: global class

[ContentstackAppSdk](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#ContentstackAppSdk)

-   [.SDK_VERSION](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#ContentstackAppSdk.SDK_VERSION) : string
-   [.init()](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#ContentstackAppSdk.init) ⇒ [Promise](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#external_Promise)

### **ContentstackAppSdk.SDK_VERSION : string**

The above defines the version of the Contentstack UI App SDK.

**Kind**: static property of [ContentstackAppSdk](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#ContentstackAppSdk)

### **ContentstackAppSdk.init() ⇒ [Promise](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#external_Promise)**

To start using the APP SDK, you first need to include the Contentstack UI App SDK and Contentstack Venus UI Stylesheet in your HTML file and then call **ContentstackAppSdk.init** on component mount.

**Kind**: The static method of [ContentstackAppSdk](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#ContentstackAppSdk)

**Returns**: [Promise](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#external_Promise) - A promise object which will be resolved with an instance of the [Location](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Location) class which is instantiated using the data received from the Contentstack UI.

**Example** _(App Config Widget)_

```js
ContentstackAppSdk.init().then(function (appSdk) {
    // Get AppConfigWidget object
    // this is only initialized on the App configuration page.
    // on other locations this will return undefined.
    var appConfigWidget = await appSdk.location.AppConfigWidget;

    // fetch all Installation configuration related to
    // 1. App Configuration
    // 2. Server Configuration
    // 3. Webhooks channels
    // 4. UI Locations configured in the app
    var installationData = await appConfigWidget.getInstallationData();

    // Update all Installation configuration related to
    // 1. App Configuration
    // 2. Server Configuration
    // 3. Webhooks channels
    // 4. UI Locations configured in the app
    var getInstallationData = await appConfigWidget.setInstallationData(
        installationData
    );
});
```

**Example** _(Custom Field)_

```js
ContentstackAppSdk.init().then(function (appSdk) {
    // Get CustomField object
    // this is only initialized on the Entry create/edit page.
    // on other locations this will return undefined.
    var customField = await appSdk.location.CustomField;

    // fetch app configuration
    var appConfig = await appSdk.getConfig();

    // fetch entry field information
    var fieldData = await customField.entry.getData();
});
```

**Example** _(Sidebar Widget)_

```js
ContentstackAppSdk.init().then(function (location) {
    // Get SidebarWidget object
    // this is only initialized on the Entry edit page.
    // on other locations this will return undefined.
    var sidebarWidget = await appSdk.location.SidebarWidget;

    // fetch app configuration
    var appConfig = await appSdk.getConfig();

    // fetch entry field information
    var fieldData = await sidebarWidget.entry.getData();
});
```

**Example** _(Dashboard Widget)_

```js
ContentstackAppSdk.init().then(function (location) {
    // Get SidebarWidget object
    // this is only initialized on the Entry edit page.
    // on other locations this will return undefined.
    var dashboardWidget = await appSdk.location.DashboardWidget;

    // fetch app configuration
    var appConfig = await appSdk.getConfig();

    // fetch stack information
    var stackData = await appSdk.stack.getData();
});
```

## **CustomField**

It is an object representing the current Custom field reference in the Contentstack UI.

**Kind**: The instance property of [AppConfigWidget](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#supported-locations)

[CustomField](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#CustomField)

-   [.fieldConfig](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Location+fieldConfig) : Object
-   [.field](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Location+field) : [Field](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Field)
-   [.entry](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Location+entry) : [Entry](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Entry)
-   [.frame](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#frame) : [Frame](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#frame)
-   [.stack](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#stack) : [Stack](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#stack)

### **customfield.fieldConfig : Object**

The above method gives you the instance configuration parameters set from the content type builder page in the field settings. This is only available for the Custom Field location.

**Kind**: instance property of [CustomField](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#CustomField)

### **customfield.field : [Field](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Field)**

This method gives you the custom field object which allows you to interact with the field. Please note that it is available only for the Custom Field location.

**Kind**: instance property of [CustomField](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#CustomField)

### **customfield.entry : [Entry](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Entry)**

This method gives you the entry object which allows you to interact with the current entry. Please note that it is not available for the Dashboard Widget location.

**Kind**: instance property of [CustomField](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#CustomField)

### **customfield.frame : [Frame](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Frame)**

The frame object provides users with methods that allow them to adjust the size of the iframe containing the location. Note that it is not available for the custom widgets location.

**Kind**: instance property of [CustomField](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#CustomField)

### **customfield.stack : [Stack](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Stack)**

This method returns the stack object which allows users to read and manipulate a range of objects in a stack.

**Kind**: instance property of [CustomField](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#CustomField)

## **DashboardWidget**

DashboardWidget

**Kind**: instance property of [AppConfigWidget](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#supported-locations)

[DashboardWidget](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#DashboardWidget)

-   [.frame](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Location+frame) : [Frame](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Frame)
-   [.stack](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Location+stack) : [Stack](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Stack)

### **dashboardWidget.frame : [Frame](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Frame)**

This frame object provides users with methods that allow them to adjust the size of the iframe that contains the extension. Not available in case of custom widgets.

**Kind**: instance property of [Location](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Location)

### **dashboardWidget.stack : [Stack](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Stack)**

This method returns the stack object which allows users to read and manipulate a range of objects in a stack.

**Kind**: instance property of [Location](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Location)

## **SidebarWidget**

It is an object representing the current Sidebar widget reference in the Contentstack UI.

**Kind**: global class

[Extension](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Extension)

-   [.entry](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Extension+entry) : [Entry](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Entry)
-   [.stack](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Extension+stack) : [Stack](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Stack)

### **extension.entry : [Entry](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Entry)**

This gives you the entry object to interact with the current entry. Please note that it is not available for the Dashboard Widget extension.

**Kind**: instance property of [Extension](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Extension)

### **extension.stack : [Stack](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Stack)**

This method returns the stack object to read and manipulate a range of objects in a stack.

**Kind**: instance property of [Extension](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Extension)

## **AppConfigWidget**

It's an object representing the current App configuration for the current App in the Contentstack UI.

**Kind**: instance property of [AppConfigWidget](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#supported-locations)

[AppConfigWidget](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#AppConfigWidget)

-   [.getInstallationData](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#AppConfigWidget+getInstallationData) : [InstallationData](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#InstallationData)
-   [.setInstallationData](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#AppConfigWidget+setInstallationData) : [InstallationData](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#InstallationData)

### **appconfig.getInstallationData : InstallationData**

This method gives you the complete installation data.

**Kind**: instance property of [AppConfigWidget](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#AppConfigWidget)

### **appconfig.setInstallationData : InstallationData**

This method updates installation data for the app.

**Kind**: instance property of [AppConfigWidget](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#AppConfigWidget)

## **frame**

It is a class representing an iframe window from the Contentstack UI. Please note that it is not available for Custom Widgets.

**Kind**: global class

[frame](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#frame)

-   [.enableResizing()](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#frame+enableResizing) ⇒ [Promise](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#external_Promise)
-   [.onDashboardResize(callback)](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#frame+onDashboardResize) ⇒ boolean
-   [.updateHeight(height)](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#frame+updateHeight) ⇒ [Promise](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#external_Promise)
-   [.enableAutoResizing()](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#frame+enableAutoResizing) ⇒ [frame](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#frame)
-   [.disableAutoResizing()](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#frame+disableAutoResizing) ⇒ [frame](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#frame)

### **frame.enableResizing() ⇒ [Promise](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#external_Promise)**

This method activates the resize button that gives you the provision to resize your Dashboard Widget.

**Kind**: instance method of [frame](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#frame)

**Returns**: [Promise](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#external_Promise) - A promise object which will resolve when a resize button is visible on the Dashboard Widget.

### **frame.onDashboardResize(callback) ⇒ boolean**

This function executes the callback function whenever a Dashboard Widget extension is maximized or minimized. Please note that it is only applicable for Dashboard Widget extensions.

**Kind**: instance method of [frame](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#frame)

**Returns**: boolean - Will return true

| **Parameter** | **Type** | **Description**                                                                   |
| :------------ | :------- | :-------------------------------------------------------------------------------- |
| callback      | function | Function to be called when a Dashboard Widget extension is maximized or minimized |

### **frame.updateHeight(height) ⇒ [Promise](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#external_Promise)**

This method updates the extension height on the Contentstack UI. If the ‘height’ argument is not passed, it will calculate the scroll height and set the height of the location window accordingly.

**Kind**: instance method of [frame](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#frame)

**Returns**: [Promise](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#external_Promise) - A promise object which will be resolved when Contentstack UI sends an acknowledgement stating that the height has been updated.

| **Parameter** | **Type** | **Description** |
| :------------ | :------- | :-------------- | ----------------------------------- |
| height        | string   | number          | Desired height of the iframe window |

### **frame.enableAutoResizing() ⇒ [frame](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#frame)**

This method enables the auto resizing of the extension height.

**Kind**: instance method of [frame](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#frame)

**Returns**: [frame](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#frame)

### **frame.disableAutoResizing() ⇒ [frame](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#frame)**

This method disables the auto resizing of the extension height.

**Kind**: instance method of [frame](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#frame)

**Returns**: [frame](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#frame).

## **Stack**

It is a class representing the current stack in Contentstack UI.

**Kind**: global class

[Stack](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Stack)

-   [.ContentType](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Stack+ContentType)
    -   [new this.ContentType(uid)](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#new_Stack+ContentType_new)
    -   [.Entry](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Stack+ContentType+Entry)
        -   [new Entry()](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#new_Stack+ContentType+Entry_new)
        -   _instance_
            -   [.only(\[key\], values)](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Stack+ContentType+Entry+only) ⇒ [Entry](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Stack+ContentType+Entry)
            -   [.except(\[key\], values)](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Stack+ContentType+Entry+except) ⇒ [Entry](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Stack+ContentType+Entry)
            -   [.addParam(key, value)](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Stack+ContentType+Entry+addParam) ⇒ [Entry](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Stack+ContentType+Entry)
            -   [.getReferences()](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Stack+ContentType+Entry+getReferences) ⇒ [Promise](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#external_Promise)
            -   [.delete()](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Stack+ContentType+Entry+delete) ⇒ [Promise](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#external_Promise)
            -   [.fetch()](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Stack+ContentType+Entry+fetch) ⇒ [Promise](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#external_Promise)
            -   [.includeReference()](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Stack+ContentType+Entry+includeReference) ⇒ [Entry](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Stack+ContentType+Entry)
            -   [.language(languageCode)](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Stack+ContentType+Entry+language) ⇒ [Entry](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Stack+ContentType+Entry)
            -   [.environment(environment_uid)](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Stack+ContentType+Entry+environment) ⇒ [Entry](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Stack+ContentType+Entry)
            -   [.addQuery(key, value)](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Stack+ContentType+Entry+addQuery) ⇒ [Entry](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Stack+ContentType+Entry)
            -   [.includeSchema()](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Stack+ContentType+Entry+includeSchema) ⇒ [Entry](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Stack+ContentType+Entry)
            -   [.includeContentType()](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Stack+ContentType+Entry+includeContentType) ⇒ [Entry](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Stack+ContentType+Entry)
            -   [.includeOwner()](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Stack+ContentType+Entry+includeOwner) ⇒ [Entry](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Stack+ContentType+Entry)
            -   [.getLanguages()](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Stack+ContentType+Entry+getLanguages) ⇒ [Promise](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#external_Promise)
            -   [.unlocalize(locale)](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Stack+ContentType+Entry+unlocalize) ⇒ [Promise](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#external_Promise)
            -   [.publish(payload)](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Stack+ContentType+Entry+publish) ⇒ [Promise](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#external_Promise)
            -   [.unpublish(payload)](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Stack+ContentType+Entry+unpublish) ⇒ [Promise](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#external_Promise)
            -   [.setWorkflowStage(payload)](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Stack+ContentType+Entry+setWorkflowStage) ⇒ [Promise](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#external_Promise)
            -   [.update(payload, \[locale\])](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Stack+ContentType+Entry+update) ⇒ [Promise](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#external_Promise)
        -   _static_
            -   [.Query()](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Stack+ContentType+Entry.Query) ⇒ [Query](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Query)
            -   [.create(payload)](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Stack+ContentType+Entry.create) ⇒ [Promise](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#external_Promise)
-   [.Asset](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Stack+Asset)
    -   [new this.Asset(uid)](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#new_Stack+Asset_new)
    -   _instance_
        -   [.only(\[key\], values)](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Stack+Asset+only) ⇒ [Asset](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Stack+Asset)
        -   [.except(\[key\], values)](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Stack+Asset+except) ⇒ [Asset](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Stack+Asset)
        -   [.environment(environment_uid)](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Stack+Asset+environment) ⇒ [Asset](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Stack+Asset)
        -   [.addParam(key, value)](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Stack+Asset+addParam) ⇒ [Asset](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Stack+Asset)
        -   [.addQuery(key, value)](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Stack+Asset+addQuery) ⇒ [Asset](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Stack+Asset)
        -   [.getReferences()](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Stack+Asset+getReferences) ⇒ [Promise](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#external_Promise)
        -   [.delete()](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Stack+Asset+delete) ⇒ [Promise](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#external_Promise)
        -   [.publish(payload)](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Stack+Asset+publish) ⇒ [Promise](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#external_Promise)
        -   [.unpublish(payload)](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Stack+Asset+unpublish) ⇒ [Promise](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#external_Promise)
    -   _static_
        -   [.Query()](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Stack+Asset.Query) ⇒ [Query](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Query)
        -   [.getRteAssets()](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Stack+Asset.getRteAssets) ⇒ [Promise](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#external_Promise)
        -   [.getAssetsOfSpecificTypes(assetType)](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Stack+Asset.getAssetsOfSpecificTypes) ⇒ [Promise](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#external_Promise)
-   [.getData()](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Stack+getData) ⇒ Object
-   [.getContentType(uid, params)](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Stack+getContentType) ⇒ Object
-   [.getContentTypes(query, params)](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Stack+getContentTypes) ⇒ Object
-   [.getEnvironment(name, params)](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Stack+getEnvironment) ⇒ Object
-   [.getEnvironments(query, params)](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Stack+getEnvironments) ⇒ Object
-   [.getLocale(code, params)](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Stack+getLocale) ⇒ Object
-   [.getLocales(query, params)](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Stack+getLocales) ⇒ Object

### **stack.ContentType**

**Kind**: instance class of [Stack](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Stack)

**See**: [ContentType](https://www.contentstack.com/docs/apis/content-management-api/#content-types)

[.ContentType](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Stack+ContentType)

-   [new this.ContentType(uid)](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#new_Stack+ContentType_new)
-   [.Entry](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Stack+ContentType+Entry)
    -   [new Entry()](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#new_Stack+ContentType+Entry_new)
    -   _instance_
        -   [.only(\[key\], values)](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Stack+ContentType+Entry+only) ⇒ [Entry](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Stack+ContentType+Entry)
        -   [.except(\[key\], values)](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Stack+ContentType+Entry+except) ⇒ [Entry](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Stack+ContentType+Entry)
        -   [.addParam(key, value)](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Stack+ContentType+Entry+addParam) ⇒ [Entry](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Stack+ContentType+Entry)
        -   [.getReferences()](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Stack+ContentType+Entry+getReferences) ⇒ [Promise](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#external_Promise)
        -   [.delete()](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Stack+ContentType+Entry+delete) ⇒ [Promise](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#external_Promise)
        -   [.fetch()](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Stack+ContentType+Entry+fetch) ⇒ [Promise](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#external_Promise)
        -   [.includeReference()](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Stack+ContentType+Entry+includeReference) ⇒ [Entry](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Stack+ContentType+Entry)
        -   [.language(languageCode)](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Stack+ContentType+Entry+language) ⇒ [Entry](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Stack+ContentType+Entry)
        -   [.environment(environment_uid)](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Stack+ContentType+Entry+environment) ⇒ [Entry](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Stack+ContentType+Entry)
        -   [.addQuery(key, value)](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Stack+ContentType+Entry+addQuery) ⇒ [Entry](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Stack+ContentType+Entry)
        -   [.includeSchema()](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Stack+ContentType+Entry+includeSchema) ⇒ [Entry](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Stack+ContentType+Entry)
        -   [.includeContentType()](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Stack+ContentType+Entry+includeContentType) ⇒ [Entry](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Stack+ContentType+Entry)
        -   [.includeOwner()](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Stack+ContentType+Entry+includeOwner) ⇒ [Entry](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Stack+ContentType+Entry)
        -   [.getLanguages()](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Stack+ContentType+Entry+getLanguages) ⇒ [Promise](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#external_Promise)
        -   [.unlocalize(locale)](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Stack+ContentType+Entry+unlocalize) ⇒ [Promise](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#external_Promise)
        -   [.publish(payload)](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Stack+ContentType+Entry+publish) ⇒ [Promise](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#external_Promise)
        -   [.unpublish(payload)](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Stack+ContentType+Entry+unpublish) ⇒ [Promise](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#external_Promise)
        -   [.setWorkflowStage(payload)](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Stack+ContentType+Entry+setWorkflowStage) ⇒ [Promise](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#external_Promise)
        -   [.update(payload, \[locale\])](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Stack+ContentType+Entry+update) ⇒ [Promise](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#external_Promise)
    -   _static_
        -   [.Query()](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Stack+ContentType+Entry.Query) ⇒ [Query](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Query)
        -   [.create(payload)](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Stack+ContentType+Entry.create) ⇒ [Promise](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#external_Promise)

#### new this.ContentType(uid)

A content type defines the structure or the schema of a page or a section of your web or mobile property.

| **Parameter** | **Type** | **Description**     |
| :------------ | :------- | :------------------ |
| uid           | string   | UID of content type |

**Example**

extension.stack.ContentType('content_type_uid')

#### contentType.Entry

**Kind**: instance class of [ContentType](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Stack+ContentType)

**See**: [Entries](https://www.contentstack.com/docs/apis/content-management-api/#entries)

-   [.Entry](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Stack+ContentType+Entry)
    -   [new Entry()](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#new_Stack+ContentType+Entry_new)
    -   _instance_
        -   [.only(\[key\], values)](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Stack+ContentType+Entry+only) ⇒ [Entry](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Stack+ContentType+Entry)
        -   [.except(\[key\], values)](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Stack+ContentType+Entry+except) ⇒ [Entry](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Stack+ContentType+Entry)
        -   [.addParam(key, value)](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Stack+ContentType+Entry+addParam) ⇒ [Entry](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Stack+ContentType+Entry)
        -   [.getReferences()](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Stack+ContentType+Entry+getReferences) ⇒ [Promise](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#external_Promise)
        -   [.delete()](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Stack+ContentType+Entry+delete) ⇒ [Promise](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#external_Promise)
        -   [.fetch()](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Stack+ContentType+Entry+fetch) ⇒ [Promise](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#external_Promise)
        -   [.includeReference()](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Stack+ContentType+Entry+includeReference) ⇒ [Entry](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Stack+ContentType+Entry)
        -   [.language(languageCode)](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Stack+ContentType+Entry+language) ⇒ [Entry](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Stack+ContentType+Entry)
        -   [.environment(environment_uid)](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Stack+ContentType+Entry+environment) ⇒ [Entry](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Stack+ContentType+Entry)
        -   [.addQuery(key, value)](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Stack+ContentType+Entry+addQuery) ⇒ [Entry](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Stack+ContentType+Entry)
        -   [.includeSchema()](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Stack+ContentType+Entry+includeSchema) ⇒ [Entry](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Stack+ContentType+Entry)
        -   [.includeContentType()](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Stack+ContentType+Entry+includeContentType) ⇒ [Entry](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Stack+ContentType+Entry)
        -   [.includeOwner()](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Stack+ContentType+Entry+includeOwner) ⇒ [Entry](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Stack+ContentType+Entry)
        -   [.getLanguages()](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Stack+ContentType+Entry+getLanguages) ⇒ [Promise](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#external_Promise)
        -   [.unlocalize(locale)](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Stack+ContentType+Entry+unlocalize) ⇒ [Promise](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#external_Promise)
        -   [.publish(payload)](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Stack+ContentType+Entry+publish) ⇒ [Promise](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#external_Promise)
        -   [.unpublish(payload)](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Stack+ContentType+Entry+unpublish) ⇒ [Promise](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#external_Promise)
        -   [.setWorkflowStage(payload)](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Stack+ContentType+Entry+setWorkflowStage) ⇒ [Promise](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#external_Promise)
        -   [.update(payload, \[locale\])](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Stack+ContentType+Entry+update) ⇒ [Promise](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#external_Promise)
    -   _static_
        -   [.Query()](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Stack+ContentType+Entry.Query) ⇒ [Query](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Query)
        -   [.create(payload)](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Stack+ContentType+Entry.create) ⇒ [Promise](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#external_Promise)

##### new Entry()

An entry is the actual piece of content created using one of the defined content types.

##### entry.only([key], values) ⇒ [Entry](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Stack+ContentType+Entry)

This method is used to show the selected fields of an entry in the result set.

**Kind**: instance method of [Entry](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Stack+ContentType+Entry)

| **Parameter** | **Type** | **Default** | **Description**                               |
| :------------ | :------- | :---------- | :-------------------------------------------- |
| [key]         | String   | BASE        | Single field of an entry                      |
| values        | Array    |             | Array of fields to be shown in the result set |

**Example** _( Only with field UID )_

```js
extension.stack
    .ContentType("content_type_uid")
    .Entry("bltsomething123")
    .only("title")
    .fetch();
```

**Example** _( Only with field UID )_

```js
extension.stack
    .ContentType("content_type_uid")
    .Entry("bltsomething123")
    .only("BASE", "title")
    .fetch();
```

**Example** _( Only with field UIDs(array) )_

```js
extension.stack
    .ContentType("content_type_uid")
    .Entry("bltsomething123")
    .only(["title", "description"])
    .fetch();
```

entry.except([key], values) ⇒ [Entry](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Stack+ContentType+Entry)

This method is used to hide the selected fields of an entry in the result set.

**Kind**: instance method of [Entry](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Stack+ContentType+Entry)

| **Parameter** | **Type** | **Default** | **Description**                                |
| :------------ | :------- | :---------- | :--------------------------------------------- |
| [key]         | String   | BASE        | Single field of an entry                       |
| values        | Array    |             | Array of fields to be hidden in the result set |

**Example** _( Except with field uid )_

```js
extension.stack
    .ContentType("content_type_uid")
    .Entry("bltsomething123")
    .except("title")
    .fetch();
```

**Example** _( Except with field uid )_

```js
extension.stack
    .ContentType("content_type_uid")
    .Entry("bltsomething123")
    .except("BASE", "title")
    .fetch();
```

**Example** _( Except with field uids(array) )_

```js
extension.stack
    .ContentType("content_type_uid")
    .Entry("bltsomething123")
    .except(["title", "description"])
    .fetch();
```

entry.addParam(key, value) ⇒ [Entry](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Stack+ContentType+Entry)

This method includes a query parameter in a query.

**Kind**: instance method of [Entry](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Stack+ContentType+Entry)

**Returns**: [Entry](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Stack+ContentType+Entry) - Returns

| **Parameter** | **Type** | **Description**        |
| :------------ | :------- | :--------------------- |
| key           | string   | Key of the parameter   |
| value         | string   | Value of the parameter |

**Example**

```js
extension.stack
    .ContentType("content_type_uid")
    .Entry("uid")
    .addParam("include_count", "true")
    .fetch()
    .then()
    .catch();
```

##### entry.getReferences() ⇒ [Promise](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#external_Promise)

This method fetches all the entries in which the current entry is referenced.

**Kind**: instance method of [Entry](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Stack+ContentType+Entry)

**Returns**: [Promise](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#external_Promise) - Required data if resolved successfully

**Additional Resource**: Learn more about [Entry references](https://www.contentstack.com/docs/apis/content-management-api/#get-all-references-of-an-entry%7C%20Entry%20References)

**Example**

```js
extension.stack
    .ContentType("content_type_uid")
    .Entry("uid")
    .getReferences()
    .then()
    .catch();
```

entry.delete() ⇒ [Promise](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#external_Promise)

This method deletes an existing entry.

**Kind**: instance method of [Entry](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Stack+ContentType+Entry)

**Returns**: [Promise](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#external_Promise) - Required data if resolved successfully

**Additional Resource**: Learn more about [Deleting an Entry](https://www.contentstack.com/docs/apis/content-management-api/#delete-an-entry%7C%20Delete%20Entry).

**Example**

```js
extension.stack
    .ContentType("content_type_uid")
    .Entry("uid")
    .delete()
    .then()
    .catch();
```

##### entry.fetch() ⇒ [Promise](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#external_Promise)

This method fetches information of a specific entry.

**Kind**: instance method of [Entry](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Stack+ContentType+Entry)

**Returns**: [Promise](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#external_Promise) - Required data if resolved successfully.

**Additional Resource**: Learn more about [Fetching a Single Entry](https://www.contentstack.com/docs/apis/content-management-api/#get-a-single-an-entry%7C%20Get%20A%20Single%20Entry).

**Example**

```js
extension.stack
    .ContentType("content_type_uid")
    .Entry("uid")
    .fetch()
    .then()
    .catch();
```

##### entry.includeReference() ⇒ [Entry](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Stack+ContentType+Entry)

This method is used to include referenced entries from other content types.

**Kind**: instance method of [Entry](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Stack+ContentType+Entry)

**Example** _( .includeReference with reference_field_uids as array )_

```js
stack
    .ContentType("contenttype_uid")
    .Entry("bltsomething123")
    .includeReference(["category", "author"])
    .fetch();
```

**Example** _( .includeReference with reference_field_uids )_

```js
stack
    .ContentType("contenttype_uid")
    .Entry("bltsomething123")
    .includeReference("category", "author")
    .fetch();
```

##### entry.language(languageCode) ⇒ [Entry](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Stack+ContentType+Entry)

This method is used to set the language code of which you want to retrieve the data.

**Kind**: instance method of [Entry](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Stack+ContentType+Entry)

| **Parameter** | **Type** | **Description**                                      |
| :------------ | :------- | :--------------------------------------------------- |
| languageCode  | String   | Language code, for e.g. ‘en-us’, ‘ja-jp’, and so on. |

**Example**

```js
extension.stack
    .ContentType("contenttype_uid")
    .Entry("bltsomething123")
    .language("en-us")
    .fetch();
```

##### entry.environment(environment_uid) ⇒ [Entry](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Stack+ContentType+Entry)

This method is used to set the environment name of which you want to retrieve the data.

**Kind**: instance method of [Entry](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Stack+ContentType+Entry)

| **Parameter**   | **Type** | **Description**          |
| :-------------- | :------- | :----------------------- |
| environment_uid | String   | UID/Name of environment. |

**Example**

```js
extension.stack
    .ContentType("contenttype_uid")
    .Entry("bltsomething123")
    .environment("development")
    .fetch();
```

##### entry.addQuery(key, value) ⇒ [Entry](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Stack+ContentType+Entry)

This method is used to add a query to an entry object.

**Kind**: instance method of [Entry](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Stack+ContentType+Entry)

| **Parameter** | **Type** | **Description**    |
| :------------ | :------- | :----------------- |
| key           | String   | Key of the query   |
| value         | String   | Value of the query |

**Example**

```js
extension.stack
    .ContentType("contenttype_uid")
    .Entry("bltsomething123")
    .addQuery("include_schema", true)
    .fetch();
```

##### entry.includeSchema() ⇒ [Entry](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Stack+ContentType+Entry)

This method is used to include the schema of the current content type in the result set along with the entry/entries.

**Kind**: instance method of [Entry](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Stack+ContentType+Entry)

**Example**

```js
extension.stack
    .ContentType("contenttype_uid")
    .Entry("bltsomething123")
    .includeSchema()
    .fetch();
```

##### entry.includeContentType() ⇒ [Entry](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Stack+ContentType+Entry)

This method is used to include the current content type in the result set along with the entry(ies).

**Kind**: instance method of [Entry](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Stack+ContentType+Entry)

**Example**

```js
extension.stack
    .ContentType("contenttype_uid")
    .Entry("bltsomething123")
    .includeContentType()
    .fetch();
```

##### entry.includeOwner() ⇒ [Entry](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Stack+ContentType+Entry)

This method is used to include the owner of the entry(ies) in the result set.

**Kind**: instance method of [Entry](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Stack+ContentType+Entry)

**Example**

```js
extension.stack
    .ContentType("contenttype_uid")
    .Entry("bltsomething123")
    .includeOwner()
    .fetch();
```

##### entry.getLanguages() ⇒ [Promise](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#external_Promise)

This method returns the details of all languages in which the entry is localized.

**Kind**: instance method of [Entry](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Stack+ContentType+Entry)

**Example**

```js
extension.stack
    .ContentType("contenttype_uid")
    .Entry("bltsomething123")
    .getLanguages();
```

##### entry.unlocalize(locale) ⇒ [Promise](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#external_Promise)

This method is used to unlocalize an entry.

**Kind**: instance method of [Entry](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Stack+ContentType+Entry)

| **Parameter** | **Type** | **Description**                                 |
| :------------ | :------- | :---------------------------------------------- |
| locale        | string   | Locale in which the entry is to be unlocalized. |

**Example**

```js
extension.stack.ContentType('contenttype_uid').Entry('bltsomething123').unlocalize('fr-fr').then(...).catch(...);
```

##### entry.publish(payload) ⇒ [Promise](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#external_Promise)

This method lets you publish an entry either immediately or schedule it to be published automatically at a later date/time.

**Kind**: instance method of [Entry](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Stack+ContentType+Entry)

| **Parameter** | **Type** | **Description**          |
| :------------ | :------- | :----------------------- |
| payload       | object   | Payload for the request. |

**Example**

```js
extension.stack.ContentType('contenttype_uid').Entry('bltsomething123').publish({
 "entry": {
 "environments": ["development"],
 "locales": ["en-us"]
 },
 "locale": "en-us",
 "version": 1,
 "scheduled_at": "2019-02-14T18:30:00.000Z"
 }).then(...).catch(...);
```

##### entry.unpublish(payload) ⇒ [Promise](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#external_Promise)

This method lets you unpublish an entry either immediately or schedule it to be unpublished automatically at a later date/time.

**Kind**: instance method of [Entry](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Stack+ContentType+Entry)

| **Parameter** | **Type** | **Description**          |
| :------------ | :------- | :----------------------- |
| payload       | object   | Payload for the request. |

**Example**

```js
extension.stack.ContentType('contenttype_uid').Entry('bltsomething123').unpublish({
      "entry": {
          "environments": ["development"],
          "locales": ["en-us"]
      },
      "locale": "en-us",
      "version": 1,
      "scheduled_at": "2019-02-14T18:30:00.000Z"
  }).then(...).catch(...);
```

##### entry.setWorkflowStage(payload) ⇒ [Promise](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#external_Promise)

This method allows you to either set a particular workflow stage or update the workflow stage details of an entry.

**Kind**: instance method of [Entry](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Stack+ContentType+Entry)

| **Parameter** | **Type** | **Description**          |
| :------------ | :------- | :----------------------- |
| payload       | object   | Payload for the request. |

**Example**

```js
extension.stack.ContentType('contenttype_uid').Entry('bltsomething123').setWorkflowStage({
     "workflow": {
         "workflow_stage": {
             "comment": "Test Comment",
             "due_date": "Thu Dec 01 2018",
             "notify": false,
             "uid": "blt9f52a2cd5e0014fb",
             "assigned_to": [{
                 "uid": "blt296a22e28cc0c63c",
                 "name": "John Doe",
                 "email": "john.doe@contentstack.com"
             }],
             "assigned_by_roles": [{
                 "uid": "blt5b74c24c7ae25d94",
                 "name": "Content Manager"
             }]
         }
     }
  }).then(...).catch(...);
```

##### entry.update(payload, [locale]) ⇒ [Promise](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#external_Promise)

This call allows you to update the entry content.

**Kind**: instance method of [Entry](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Stack+ContentType+Entry)

**See**: [Update Entry](https://www.contentstack.com/docs/apis/content-management-api/#update-an-entry)

| **Parameter** | **Type** | **Description**                                                                 |
| :------------ | :------- | :------------------------------------------------------------------------------ |
| payload       | object   | Payload for the request.                                                        |
| [locale]      | string   | Passing the ‘locale’ parameter will localize the entry in the specified locale. |

**Example**

```js
extension.stack.ContentType('contenttype_uid').Entry('bltsomething123').update(
      {
      "entry": {
          "title": "example",
          "url": "/example"
      }
  }).then(...).catch(...);
```

##### Entry.Query() ⇒ [Query](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Query)

This static method instantiates the query module for entries. To see the list of methods that can be used for querying entries, refer to the [Query](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Query) module.

**Kind**: static method of [Entry](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Stack+ContentType+Entry)

**Example**

```js
let entryQuery = extension.stack.ContentType('content_type_uid').Entry.Query();
entryQuery.where("field_uid": "10").limit(10).skip(10).find().then(...).catch(...);
```

##### Entry.create(payload) ⇒ [Promise](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#external_Promise)

This method creates a new entry.

**Kind**: static method of [Entry](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Stack+ContentType+Entry)

**Returns**: [Promise](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#external_Promise) - Required data if resolved successfully

**Additional Resource:** Learn more about [Creating an Entry](https://www.contentstack.com/docs/apis/content-management-api/#create-a-an-entry%7C%20Create%20Entry).

| **Parameter** | **Type** | **Description**          |
| :------------ | :------- | :----------------------- |
| payload       | Object   | Data to create an entry. |

**Example**

```js
extension.stack.ContentType('content_type_uid').Entry.create({
    "entry": {
      "title": "example",
      "url": "/example"
    }
  }).then(...).catch(...);
```

### **stack.Asset**

**Kind**: instance class of [Stack](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Stack)

**See**: [Asset](https://www.contentstack.com/docs/apis/content-management-api/#assets)

[.Asset](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Stack+Asset)

-   [new this.Asset(uid)](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#new_Stack+Asset_new)
-   _instance_
    -   [.only(\[key\], values)](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Stack+Asset+only) ⇒ [Asset](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Stack+Asset)
    -   [.except(\[key\], values)](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Stack+Asset+except) ⇒ [Asset](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Stack+Asset)
    -   [.environment(environment_uid)](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Stack+Asset+environment) ⇒ [Asset](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Stack+Asset)
    -   [.addParam(key, value)](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Stack+Asset+addParam) ⇒ [Asset](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Stack+Asset)
    -   [.addQuery(key, value)](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Stack+Asset+addQuery) ⇒ [Asset](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Stack+Asset)
    -   [.getReferences()](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Stack+Asset+getReferences) ⇒ [Promise](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#external_Promise)
    -   [.delete()](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Stack+Asset+delete) ⇒ [Promise](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#external_Promise)
    -   [.publish(payload)](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Stack+Asset+publish) ⇒ [Promise](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#external_Promise)
    -   [.unpublish(payload)](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Stack+Asset+unpublish) ⇒ [Promise](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#external_Promise)
-   _static_
    -   [.Query()](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Stack+Asset.Query) ⇒ [Query](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Query)
    -   [.getRteAssets()](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Stack+Asset.getRteAssets) ⇒ [Promise](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#external_Promise)
    -   [.getAssetsOfSpecificTypes(assetType)](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Stack+Asset.getAssetsOfSpecificTypes) ⇒ [Promise](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#external_Promise)

#### new this.Asset(uid)

An initializer is responsible for creating an Asset object.

| **Parameter** | **Type** | **Description**   |
| :------------ | :------- | :---------------- |
| uid           | string   | UID of the asset. |

**Example**

```js
extension.stack.Asset("asset_uid");
```

#### asset.only([key], values) ⇒ [Asset](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Stack+Asset)

This method is used to show the selected fields of the assets in the result set.

**Kind**: instance method of [Asset](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Stack+Asset)

| **Parameter** | **Type** | **Default** | **Description**                               |
| :------------ | :------- | :---------- | :-------------------------------------------- |
| [key]         | String   | BASE        | Single field of an asset                      |
| values        | Array    |             | Array of fields to be shown in the result set |

**Example** _( Only with the field UID )_

```js
extension.stack.Asset("bltsomething123").only("title").fetch();
```

**Example** _( Only with the field UID )_

```js
extension.stack.Asset("bltsomething123").only("BASE", "title").fetch();
```

**Example** _( Only with the field UIDs(array) )_

```js
extension.stack.Asset("bltsomething123").only(["title", "description"]).fetch();
```

#### asset.except([key], values) ⇒ [Asset](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Stack+Asset)

This method is used to hide the selected fields of the assets in the result set.

**Kind**: instance method of [Asset](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Stack+Asset)

| **Parameter** | **Type** | **Default** | **Description**                                |
| :------------ | :------- | :---------- | :--------------------------------------------- |
| [key]         | String   | BASE        | Single field of an asset                       |
| values        | Array    |             | Array of fields to be hidden in the result set |

**Example** _( .Except with the field UID )_

```js
extension.stack.Asset("bltsomething123").except("title").fetch();
```

**Example** _( .Except with the field UID )_

```js
extension.stack.Asset("bltsomething123").except("BASE", "title").fetch();
```

**Example** _( .Except with the field UIDs(array) )_

```js
extension.stack
    .Asset("bltsomething123")
    .except(["title", "description"])
    .fetch();
```

#### asset.environment(environment_uid) ⇒ [Asset](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Stack+Asset)

This method is used to set the environment name of which you want to retrieve the data.

**Kind**: instance method of [Asset](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Stack+Asset)

| **Parameter**   | **Type** | **Description**         |
| :-------------- | :------- | :---------------------- |
| environment_uid | String   | UID/Name of environment |

**Example**

```js
extension.stack.Asset("bltsomething123").environment("development").fetch();
```

#### asset.addParam(key, value) ⇒ [Asset](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Stack+Asset)

This method includes a query parameter in your query.

**Kind**: instance method of [Asset](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Stack+Asset)

| **Parameter** | **Type** | **Description**        |
| :------------ | :------- | :--------------------- |
| key           | string   | Key of the parameter   |
| value         | string   | Value of the parameter |

**Example**

```js
extension.stack.Asset("uid").addParam("key", "value").fetch().then().catch();
```

#### asset.addQuery(key, value) ⇒ [Asset](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Stack+Asset)

This method includes a query parameter in your query.

**Kind**: instance method of [Asset](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Stack+Asset)

| **Parameter** | **Type** | **Description**        |
| :------------ | :------- | :--------------------- |
| key           | string   | Key of the parameter   |
| value         | string   | Value of the parameter |

**Example**

```js
extension.stack.Asset("uid").addQuery("key", "value").fetch().then().catch();
```

#### asset.getReferences() ⇒ [Promise](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#external_Promise)

This method fetches the details of entries and the assets in which the specified asset is referenced.

**Kind**: instance method of [Asset](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Stack+Asset)

**Additional Resource**: Learn more about [Asset References](https://www.contentstack.com/docs/apis/content-management-api/#get-all-references-of-asset%7C%20Asset%20References).

**Example**

```js
extension.stack.Asset("uid").getReferences().then().catch();
```

#### asset.delete() ⇒ [Promise](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#external_Promise)

This method deletes an existing asset.

**Kind**: instance method of [Asset](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Stack+Asset)

Additional Resource: Learn more about [Deleting an Asset](https://www.contentstack.com/docs/apis/content-management-api/#delete-an-asset%7C%20Delete%20Asset).

**Example**

```js
extension.stack.Asset("uid").delete().then().catch();
```

#### asset.publish(payload) ⇒ [Promise](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#external_Promise)

This method allows you to publish the asset either immediately or schedule the publish for a later date/time.

**Kind**: instance method of [Asset](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Stack+Asset)

| **Parameter** | **Type** | **Description**          |
| :------------ | :------- | :----------------------- |
| payload       | object   | Payload for the request. |

**Example**

```js
extension.stack.Asset("bltsomething123").publish({
    asset: {
        locales: ["en-us"],
        environments: ["development"],
    },
    version: 1,
    scheduled_at: "2019-02-08T18:30:00.000Z",
});
```

#### asset.unpublish(payload) ⇒ [Promise](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#external_Promise)

This method instantly unpublishes the asset and also gives you the provision to automatically unpublish the asset at a later date/time.

**Kind**: instance method of [Asset](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Stack+Asset)

| **Parameter** | **Type** | **Description**          |
| :------------ | :------- | :----------------------- |
| payload       | object   | Payload for the request. |

**Example**

```js
extension.stack.Asset("bltsomething123").unpublish({
    asset: {
        locales: ["en-us"],
        environments: ["development"],
    },
    version: 1,
    scheduled_at: "2019-02-08T18:30:00.000Z",
});
```

#### Asset.Query() ⇒ [Query](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Query)

This static method instantiates the query module for assets. To see the list of methods that can be used for querying assets, refer to the [Query](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Query) module.

**Kind**: static method of [Asset](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Stack+Asset)

**Example**

```js
let assetQuery = extension.stack.Asset.Query();
assetQuery.where("title": "main.js").limit(10).skip(10).find().then(...).catch(...);
```

#### Asset.getRteAssets() ⇒ [Promise](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#external_Promise)

This static method retrieves comprehensive information on all assets uploaded through the Rich Text Editor field.

**Kind**: static method of [Asset](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Stack+Asset)

#### Asset.getAssetsOfSpecificTypes(assetType) ⇒ [Promise](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#external_Promise)

This static method retrieves assets that are either image or video files, based on the request query.

**Kind**: static method of [Asset](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Stack+Asset)

| **Parameter** | **Type** | **Description**                                    |
| :------------ | :------- | :------------------------------------------------- |
| assetType     | String   | Type of asset to be received for e.g., ‘image/png’ |

### **stack.getData() ⇒ Object**

This method returns the data of the current stack.

**Kind**: instance method of [Stack](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Stack)

**Returns**: Object - Returns stack data.

### **stack.getContentType(uid, params) ⇒ Object**

This API allows you to retrieve data of a content type of a stack using the [Content Type API](https://www.contentstack.com/docs/apis/content-management-api/#get-a-single-content-type) requests. This method returns a Promise object.

**Kind**: instance method of [Stack](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Stack)

**Returns**: Object - A promise object which will be resolved with content type details.

| **Parameter** | **Type** | **Description**                      |
| :------------ | :------- | :----------------------------------- |
| uid           | string   | UID of the desired content type      |
| params        | Object   | Optional parameters for the GET call |

### **stack.getContentTypes(query, params) ⇒ Object**

This API allows you to retrieve data of a content type of a stack using the [Content Types API](https://www.contentstack.com/docs/apis/content-management-api/#get-all-content-types) requests. This method returns a Promise object.

**Kind**: instance method of [Stack](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Stack)

**Returns**: Object - A promise object which will be resolved with details of the content type.

| **Parameter** | **Type** | **Description**                      |
| :------------ | :------- | :----------------------------------- |
| query         | Object   | Query for the GET call               |
| params        | Object   | Optional parameters for the GET call |

### **stack.getEnvironment(name, params) ⇒ Object**

This API allows you to retrieve environment details of a stack using the [Environment API](https://www.contentstack.com/docs/apis/content-management-api/#get-a-single-environment) requests. This method returns a Promise object.

**Kind**: instance method of [Stack](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Stack)

**Returns**: Object - A promise object which will be resolved with environment details.

| **Parameter** | **Type** | **Description**                      |
| :------------ | :------- | :----------------------------------- |
| name          | string   | Name of the desired environment      |
| params        | Object   | Optional parameters for the GET call |

### **stack.getEnvironments(query, params) ⇒ Object**

This API allows you to retrieve details of environments of a stack using the [Environments API](https://www.contentstack.com/docs/apis/content-management-api/#get-all-environments) requests. This method returns a Promise object.

**Kind**: instance method of [Stack](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Stack)

**Returns**: Object - A Promise object which will be resolved with details of the environments.

| **Parameter** | **Type** | **Description**                      |
| :------------ | :------- | :----------------------------------- |
| query         | Object   | Query for the GET call               |
| params        | Object   | Optional parameters for the GET call |

### **stack.getLocale(code, params) ⇒ Object**

This API allows you to retrieve a locale of a stack using the [Language API](https://www.contentstack.com/docs/apis/content-management-api/#get-a-language) requests. Method returns a Promise object.

**Kind**: instance method of [Stack](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Stack)

**Returns**: Object - A promise object which will be resolved with locale details.

| **Parameter** | **Type** | **Description**                      |
| :------------ | :------- | :----------------------------------- |
| code          | string   | Code of the desired locale           |
| params        | Object   | Optional parameters for the GET call |

### **stack.getLocales(query, params) ⇒ Object**

This API allows you to retrieve the locales of a stack using the [Languages API](https://www.contentstack.com/docs/apis/content-management-api/#get-all-content-types) requests. Method returns a Promise object.

**Kind**: instance method of [Stack](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Stack)

**Returns**: Object - A Promise object which will be resolved with details of the locales.

| **Parameter** | **Type** | **Description**                      |
| :------------ | :------- | :----------------------------------- |
| query         | Object   | Query for the GET call               |
| params        | Object   | Optional parameters for the GET call |

` `## The Store Class used by an extension to store your data in [localStorage](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#external_localStorage).

**Kind**: global class

-   [Store](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Store)
    -   [.get(key)](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Store+get) ⇒ [Promise](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#external_Promise)
    -   [.getAll()](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Store+getAll) ⇒ [Promise](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#external_Promise)
    -   [.set(key, value)](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Store+set) ⇒ [Promise](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#external_Promise)
    -   [.remove(key)](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Store+remove) ⇒ [Promise](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#external_Promise)
    -   [.clear()](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Store+clear) ⇒ [Promise](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#external_Promise)

### **store.get(key) ⇒ [Promise](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#external_Promise)**

It fetches the value of a key.

**Kind**: instance method of [Store](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Store)

| **Parameter** | **Type** | **Description**        |
| :------------ | :------- | :--------------------- |
| key           | string   | Key of the stored data |

**Example**

```js
extension.store.get("key").then((value) => console.log(value)); // will log value for the given key
```

### **store.getAll() ⇒ [Promise](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#external_Promise)**

It fetches an object with all the stored key-value pairs.

**Kind**: instance method of [Store](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Store)

**Example**

```js
extension.store.getAll().then((obj) => obj);
```

### **store.set(key, value) ⇒ [Promise](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#external_Promise)**

It sets the value of a key

**Kind**: instance method of [Store](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Store)

| **Parameter** | **Type** | **Description**         |
| :------------ | :------- | :---------------------- |
| key           | string   | Key of the stored data. |
| value         | \*       | Data to be stored.      |

**Example**

```js
extension.store.set("key", "value").then((success) => console.log(success)); // will log 'true' when value is set
```

### **store.remove(key) ⇒ [Promise](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#external_Promise)**

It removes the value of a key.

**Kind**: instance method of [Store](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Store)

| **Parameter** | **Type** | **Description**                              |
| :------------ | :------- | :------------------------------------------- |
| key           | string   | Key of the data to be removed from the store |

**Example**

```js
extension.store.remove("key").then((success) => console.log(success)); // will log 'true' when value is removed
```

### **store.clear() ⇒ [Promise](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#external_Promise)**

It clears all the stored data of an extension.

**Kind**: instance method of [Store](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Store)

**Example**

```js
extension.store.clear().then((success) => console.log(success)); // will log 'true' when values are cleared
```

## **Query**

Creates an instance of the query

**Kind**: global class
**Version**: 2.2.0

-   [Query](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Query)
    -   [.lessThan](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Query+lessThan) ⇒ [Query](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Query)
    -   [.lessThanOrEqualTo](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Query+lessThanOrEqualTo) ⇒ [Query](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Query)
    -   [.only(\[key\], values)](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Query+only) ⇒ [Query](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Query)
    -   [.except(\[key\], values)](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Query+except) ⇒ [Query](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Query)
    -   [.addQuery(key, value)](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Query+addQuery) ⇒ [Query](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Query)
    -   [.greaterThan(key, value)](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Query+greaterThan) ⇒ [Query](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Query)
    -   [.greaterThanOrEqualTo(key, value)](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Query+greaterThanOrEqualTo) ⇒ [Query](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Query)
    -   [.notEqualTo(key, value)](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Query+notEqualTo) ⇒ [Query](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Query)
    -   [.containedIn(key, value)](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Query+containedIn) ⇒ [Query](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Query)
    -   [.notContainedIn(key, value)](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Query+notContainedIn) ⇒ [Query](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Query)
    -   [.exists(key)](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Query+exists) ⇒ [Query](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Query)
    -   [.notExists(key)](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Query+notExists) ⇒ [Query](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Query)
    -   [.ascending(key)](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Query+ascending) ⇒ [Query](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Query)
    -   [.descending(key)](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Query+descending) ⇒ [Query](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Query)
    -   [.skip(skip)](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Query+skip) ⇒ [Query](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Query)
    -   [.limit(limit)](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Query+limit) ⇒ [Query](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Query)
    -   [.or(Array)](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Query+or) ⇒ [Query](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Query)
    -   [.and(Array)](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Query+and) ⇒ [Query](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Query)
    -   [.addParam(key, value)](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Query+addParam) ⇒ [Query](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Query)
    -   [.includeReference()](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Query+includeReference) ⇒ [Query](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Query)
    -   [.includeSchema()](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Query+includeSchema) ⇒ [Query](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Query)
    -   [.language(languageCode)](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Query+language) ⇒ [Query](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Query)
    -   [.includeContentType()](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Query+includeContentType) ⇒ [Query](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Query)
    -   [.includeOwner()](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Query+includeOwner) ⇒ [Query](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Query)
    -   [.environment(environment_uid)](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Query+environment) ⇒ [Query](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Query)
    -   [.equalTo(key, value)](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Query+equalTo) ⇒ [Query](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Query)
    -   [.count()](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Query+count) ⇒ [Query](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Query)
    -   [.query(query)](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Query+query) ⇒ [Query](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Query)
    -   [.tags(values)](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Query+tags) ⇒ [Query](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Query)
    -   [.includeCount()](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Query+includeCount) ⇒ [Query](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Query)
    -   [.getQuery()](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Query+getQuery) ⇒ [Query](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Query)
    -   [.regex(key, value, \[options\])](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Query+regex) ⇒ [Query](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Query)
    -   [.search(value)](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Query+search) ⇒ [Query](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Query)
    -   [.find()](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Query+find)
    -   [.findOne()](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Query+findOne)

### **query.lessThan ⇒ [Query](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Query)**

This method provides only the entries with values less than the specified value for a field.

**Kind**: instance property of [Query](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Query)

| **Parameter** | **Type** | **Description**                     |
| :------------ | :------- | :---------------------------------- |
| key           | String   | UID of the field                    |
| value         | \*       | The value used to match or compare. |

**Example**

```js
extension.stack.ContentType("blog").lessThan("created_at", "2015-06-22");
```

### **query.lessThanOrEqualTo ⇒ [Query](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Query)**

This method provides the entries with values less than or equal to the specified value for a field.

**Kind**: instance property of [Query](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Query)

| **Parameter** | **Type** | **Description**                    |
| :------------ | :------- | :--------------------------------- |
| key           | String   | UID of the field                   |
| value         | \*       | The value used to match or compare |

**Example**

```js
extension.stack
    .ContentType("blog")
    .lessThanOrEqualTo("created_at", "2015-03-12");
```

### **query.only([key], values) ⇒ [Query](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Query)**

This method is used to show the selected fields of an entry in the result set.

**Kind**: instance method of [Query](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Query)

| **Parameter** | **Type** | **Default** | **Description**                               |
| :------------ | :------- | :---------- | :-------------------------------------------- |
| [key]         | String   | BASE        | Single field of an entry                      |
| values        | Array    |             | Array of fields to be shown in the result set |

**Example** _( Only with field UID )_

```js
extension.stack
    .ContentType("content_type_uid")
    .Entry.Query()
    .only("title")
    .find();
```

**Example** _( Only with field UID )_

```js
extension.stack
    .ContentType("content_type_uid")
    .Entry.Query()
    .only("BASE", "title")
    .find();
```

**Example** _( Only with field UIDs(array) )_

```js
extension.stack
    .ContentType("content_type_uid")
    .Entry.Query()
    .only(["title", "description"])
    .find();
```

### **query.except([key], values) ⇒ [Query](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Query)**

This method is used to hide the selected fields of an entry in the result set.

**Kind**: instance method of [Query](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Query)

| **Parameter** | **Type** | **Default** | **Description**                                |
| :------------ | :------- | :---------- | :--------------------------------------------- |
| [key]         | String   | BASE        | Single field of an entry                       |
| values        | Array    |             | Array of fields to be hidden in the result set |

**Example** _( Except with field uid )_

```js
extension.stack
    .ContentType("content_type_uid")
    .Entry.Query()
    .except("title")
    .find();
```

**Example** _( Except with field uid )_

```js
extension.stack
    .ContentType("content_type_uid")
    .Entry.Query()
    .except("BASE", "title")
    .find();
```

**Example** _( Except with field uids(array) )_

```js
extension.stack
    .ContentType("content_type_uid")
    .Entry.Query()
    .except(["title", "description"])
    .find();
```

### **query.addQuery(key, value) ⇒ [Query](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Query)**

This method includes a query parameter in a query.

**Kind**: instance method of [Query](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Query)

| **Parameter** | **Type** | **Description**        |
| :------------ | :------- | :--------------------- |
| key           | string   | Key of the parameter   |
| value         | string   | Value of the parameter |

**Example**

```js
extension.stack
    .ContentType("content_type_uid")
    .Entry.Query()
    .addQuery("key", "value")
    .find()
    .then()
    .catch();
```

### **query.greaterThan(key, value) ⇒ [Query](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Query)**

This method provides the entries with values greater than the specified value for a field.

**Kind**: instance method of [Query](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Query)

| **Parameter** | **Type** | **Description**                    |
| :------------ | :------- | :--------------------------------- |
| key           | String   | UID of the field                   |
| value         | \*       | The value used to match or compare |

**Example**

```js
extension.stack.ContentType("blog").greaterThan("created_at", "2015-03-12");
```

### **query.greaterThanOrEqualTo(key, value) ⇒ [Query](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Query)**

This method provides the entries with values greater than or equal to the specified value for a field.

**Kind**: instance method of [Query](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Query)

| **Parameter** | **Type** | **Description**                    |
| :------------ | :------- | :--------------------------------- |
| key           | String   | UID of the field                   |
| value         | \*       | The value used to match or compare |

**Example**

```js
extension.stack
    .ContentType("blog")
    .greaterThanOrEqualTo("created_at", "2015-06-22");
```

### **query.notEqualTo(key, value) ⇒ [Query](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Query)**

This method provides the entries with values not equal to the specified value for a field.

**Kind**: instance method of [Query](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Query)

| **Parameter** | **Type** | **Description**                    |
| :------------ | :------- | :--------------------------------- |
| key           | String   | UID of the field                   |
| value         | \*       | The value used to match or compare |

**Example**

```js
extension.stack.ContentType("blog").notEqualTo("title", "Demo");
```

### **query.containedIn(key, value) ⇒ [Query](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Query)**

This method provides the entries with values matching the specified values for a field.

**Kind**: instance method of [Query](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Query)

| **Parameter** | **Type** | **Description**                                            |
| :------------ | :------- | :--------------------------------------------------------- |
| key           | String   | UID of the field                                           |
| value         | \*       | An array of values that are to be used to match or compare |

**Example**

```js
extension.stack.ContentType("blog").containedIn("title", ["Demo", "Welcome"]);
```

### **query.notContainedIn(key, value) ⇒ [Query](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Query)**

This method provides the entries that do not contain values matching the specified values for a field.

**Kind**: instance method of [Query](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Query)

| **Parameter** | **Type** | **Description**                                            |
| :------------ | :------- | :--------------------------------------------------------- |
| key           | String   | UID of the field                                           |
| value         | Array    | An array of values that are to be used to match or compare |

**Example**

```js
extension.stack
    .ContentType("blog")
    .notContainedIn("title", ["Demo", "Welcome"]);
```

### **query.exists(key) ⇒ [Query](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Query)**

This method provides the entries that contain the field matching the specified field UID.

**Kind**: instance method of [Query](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Query)

| **Parameter** | **Type** | **Description**      |
| :------------ | :------- | :------------------- |
| key           | String   | The UID of the field |

**Example**

```js
extension.stack.ContentType("blog").exists("featured");
```

### **query.notExists(key) ⇒ [Query](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Query)**

This method provides the entries that do not contain the field matching the specified field UID.

**Kind**: instance method of [Query](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Query)

| **Parameter** | **Type** | **Description**      |
| :------------ | :------- | :------------------- |
| key           | String   | The UID of the field |

**Example**

```js
extension.stack.ContentType("blog").notExists("featured");
```

### **query.ascending(key) ⇒ [Query](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Query)**

This parameter sorts the entries in the ascending order on the basis of the value of the specified field.

**Kind**: instance method of [Query](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Query)

| **Parameter** | **Type** | **Description**                   |
| :------------ | :------- | :-------------------------------- |
| key           | String   | Field UID to be used for sorting. |

**Example**

```js
extension.stack.ContentType("blog").ascending("created_at");
```

### **query.descending(key) ⇒ [Query](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Query)**

This method sorts the entries in the descending order on the basis of the specified field.

**Kind**: instance method of [Query](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Query)

| **Parameter** | **Type** | **Description**                  |
| :------------ | :------- | :------------------------------- |
| key           | String   | Field UID to be used for sorting |

**Example**

```js
extension.stack.ContentType("blog").descending("created_at");
```

### **query.skip(skip) ⇒ [Query](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Query)**

This method skips the specified number of entries.

**Kind**: instance method of [Query](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Query)

| **Parameter** | **Type** | **Description**                 |
| :------------ | :------- | :------------------------------ |
| skip          | Number   | Number of entries to be skipped |

**Example**

```js
extension.stack.ContentType("blog").skip(5);
```

### **query.limit(limit) ⇒ [Query](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Query)**

This method limits the response by providing only the specified number of entries.

**Kind**: instance method of [Query](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Query)

| **Parameter** | **Type** | **Description**                                         |
| :------------ | :------- | :------------------------------------------------------ |
| limit         | Number   | Maximum number of entries to be returned in the result. |

**Example**

```js
extension.stack.ContentType("blog").limit(10);
```

### **query.or(Array) ⇒ [Query](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Query)**

This method performs the OR operation on the specified query objects and provides only the matching entries.

**Kind**: instance method of [Query](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Query)

| **Parameter** | **Type** | **Description**                                             |
| :------------ | :------- | :---------------------------------------------------------- |
| Array         | object   | of query objects/raw queries to be taken into consideration |

**Example** _( OR with query instances)_

```js
let Query1 = extension.stack
    .ContentType("blog")
    .Entry.Query()
    .where("title", "Demo");
let Query2 = extension.stack
    .ContentType("blog")
    .Entry.Query()
    .lessThan("comments", 10);
let blogQuery = extension.stack.ContentType("blog").or(Query1, Query2);
```

**Example** _( OR with query instances)_

```js
let Query1 = extension.stack
    .ContentType("blog")
    .Entry.Query()
    .where("title", "Demo")
    .getQuery();
let Query2 = extension.stack
    .ContentType("blog")
    .Entry.Query()
    .lessThan("comments", 10)
    .getQuery();
let blogQuery = extension.stack.ContentType("blog").or(Query1, Query2);
```

### **query.and(Array) ⇒ [Query](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Query)**

This method performs the AND operation on the specified query objects and provides only the matching entries.

**Kind**: instance method of [Query](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Query)

| **Parameter** | **Type** | **Description**                                             |
| :------------ | :------- | :---------------------------------------------------------- |
| Array         | object   | of query objects/raw queries to be taken into consideration |

**Example** _( AND with raw queries)_

```js
let Query1 = extension.stack
    .ContentType("blog")
    .Entry.Query()
    .where("title", "Demo");
let Query2 = extension.stack
    .ContentType("blog")
    .Entry.Query()
    .lessThan("comments", 10);
let blogQuery = extension.stack.ContentType("blog").and(Query1, Query2);
```

**Example** _( .and with raw queries)_

```js
let Query1 = extension.stack
    .ContentType("blog")
    .Entry.Query()
    .where("title", "Demo")
    .getQuery();
let Query2 = extension.stack
    .ContentType("blog")
    .Entry.Query()
    .lessThan("comments", 10)
    .getQuery();
let blogQuery = extension.stack.ContentType("blog").and(Query1, Query2);
```

### **query.addParam(key, value) ⇒ [Query](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Query)**

This method includes a query parameter in a query.

**Kind**: instance method of [Query](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Query)

| **Parameter** | **Type** | **Description**        |
| :------------ | :------- | :--------------------- |
| key           | string   | Key of the parameter   |
| value         | string   | Value of the parameter |

**Example**

```js
extension.stack
    .ContentType("content_type_uid")
    .Entry.Query()
    .addParam("key", "value")
    .find()
    .then()
    .catch();
```

### **query.includeReference() ⇒ [Query](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Query)**

This method is used to include the referenced entries from other content types.

**Note**: This method is only valid for querying [Entry](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Stack+ContentType+Entry).

**Kind**: instance method of [Query](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Query)

**Example** _( .includeReference with reference_field_uids as array )_

```js
stack
    .ContentType("contenttype_uid")
    .Entry.Query()
    .includeReference(["category", "author"])
    .find();
```

**Example** _( .includeReference with reference_field_uids )_

```js
stack
    .ContentType("contenttype_uid")
    .Entry.Query()
    .includeReference("category", "author")
    .find();
```

### **query.includeSchema() ⇒ [Query](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Query)**

This method is used to include the schema of the current content type in the result set along with the entry/entries.

**Note**: This method is only valid for querying [Entry](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Stack+ContentType+Entry).

**Kind**: instance method of [Query](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Query)

**Example**

```js
extension.stack
    .ContentType("contenttype_uid")
    .Entry.Query()
    .includeSchema()
    .find();
```

### **query.language(languageCode) ⇒ [Query](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Query)**

This method is used to set the language code of which you want to retrieve the data.

**Note**: This method is only valid for querying [Entry](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Stack+ContentType+Entry).

**Kind**: instance method of [Query](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Query)

| **Parameter** | **Type** | **Description**                                     |
| :------------ | :------- | :-------------------------------------------------- |
| languageCode  | String   | Language code, for e.g. ‘en-us’, ‘ja-jp’, and so on |

**Example**

```js
extension.stack
    .ContentType("contenttype_uid")
    .Entry.Query()
    .language("en-us")
    .find();
```

### **query.includeContentType() ⇒ [Query](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Query)**

This method is used to include the current content type in the result set along with the entry(ies).

**Note**: This method is only valid for querying [Entry](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Stack+ContentType+Entry).

**Kind**: instance method of [Query](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Query)

**Example**

```js
extension.stack
    .ContentType("contenttype_uid")
    .Entry.Query()
    .includeContentType()
    .find();
```

### **query.includeOwner() ⇒ [Query](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Query)**

This method is used to include the owner of the entry(ies) in the result set.

**Note**: This method is only valid for querying [Entry](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Stack+ContentType+Entry).

**Kind**: instance method of [Query](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Query)

**Example**

```js
extension.stack
    .ContentType("contenttype_uid")
    .Entry.Query()
    .includeOwner()
    .find();
```

### **query.environment(environment_uid) ⇒ [Query](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Query)**

This method is used to set the environment name of which you want to retrieve the data.

**Kind**: instance method of [Query](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Query)

| Param           | Type   | Description              |
| :-------------- | :----- | :----------------------- |
| environment_uid | String | UID/Name of environment. |

**Example**

```js
extension.stack
    .ContentType("contenttype_uid")
    .Entry.Query()
    .environment("development")
    .find();
```

### **query.equalTo(key, value) ⇒ [Query](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Query)**

This method provides only the entries containing field values that match the specified condition.

**Kind**: instance method of [Query](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Query)

| **Parameter** | **Type** | **Description**                    |
| :------------ | :------- | :--------------------------------- |
| key           | String   | UID of the field                   |
| value         | \*       | The value used to match or compare |

**Example**

```js
extension.stack.ContentType("blog").where("title", "Demo");
```

### **query.count() ⇒ [Query](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Query)**

This method provides only the number of entries that match the specified filters.

**Kind**: instance method of [Query](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Query)

**Example**

```js
extension.stack.ContentType("blog").count();
```

### **query.query(query) ⇒ [Query](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Query)**

This method is used to set raw queries on the Query instance.

**Kind**: instance method of [Query](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Query)

| **Parameter** | **Type** | **Description**                                             |
| :------------ | :------- | :---------------------------------------------------------- |
| query         | object   | Raw {json} queries to filter the entries in the result set. |

### **query.tags(values) ⇒ [Query](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Query)**

The 'tags' parameter allows you to specify an array of tags to search for objects.

**Kind**: instance method of [Query](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Query)

| **Parameter** | **Type** | **Description** |
| :------------ | :------- | :-------------- |
| values        | Array    | Tags            |

**Example**

```js
extension.stack.ContentType("blog").tags(["technology", "business"]);
```

### **query.includeCount() ⇒ [Query](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Query)**

This method also includes the total number of entries returned in the response.

**Kind**: instance method of [Query](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Query)

**Example**

```js
extension.stack.ContentType("blog").includeCount();
```

### **query.getQuery() ⇒ [Query](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Query)**

This method provides raw{json} queries based on the filters applied on the Query object.

**Kind**: instance method of [Query](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Query)

**Summary**: returns Returns the raw query which can be used for further calls (.and/.or).

**Example**

```js
extension.stack.ContentType("blog").where("title", "Demo").getQuery();
```

### **query.regex(key, value, [options]) ⇒ [Query](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Query)**

This method provides only the entries that match the regular expression for the specified field.

**Kind**: instance method of [Query](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Query)

| **Parameter** | **Type** | **Description**                       |
| :------------ | :------- | :------------------------------------ |
| key           | String   | UID of the field                      |
| value         | \*       | The value used to match or compare    |
| [options]     | String   | Match or compare a value in the entry |

**Example** _( .regex without options)_

```js
let blogQuery = extension.stack.ContentType('blog').regex('title','^Demo') |
```

**Example** _( .regex with options)_

```js
let blogQuery = extension.stack.ContentType('blog').regex('title','^Demo', 'i') |
```

### **query.search(value) ⇒ [Query](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Query)**

This method is used to search data in entries.

**Kind**: instance method of [Query](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Query)

| **Parameter** | **Type** | **Description**                 |
| :------------ | :------- | :------------------------------ |
| value         | string   | Value to search in the entries. |

**Example**

```js
extension.stack.ContentType("blog").search("Welcome to demo");
```

### **query.find()**

This method provides all the entries which satisfy the specified query.

**Kind**: instance method of [Query](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Query)

**Example**

```js
let blogQuery = extension.stack.ContentType('blog').find() |
```

### **query.findOne()**

This method provides a single entry from the resultant set.

**Kind**: instance method of [Query](https://github.com/contentstack/app-sdk/blob/main/docs/api.md#Query)

**Example**:

```js
let blogQuery = extension.stack.ContentType('blog').findOne() |
```

## **Promise**

The **Promise** object represents the eventual completion (or failure) of an asynchronous operation and its resulting value.

**Kind**: global external

**See**: [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)

## **localStorage**

**localStorage** is the read-only property that allows you to access a Storage object for the Document’s origin. The data that gets stored is saved across browser sessions.

**Kind**: global external

**See**: [localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)

## **JSON RTE Plugins**

In this document, we will discuss the API requests that a JSON RTE Plugin can use to communicate with Contentstack.

# Contentstack JSON RTE Plugins SDK API Reference

This document describes the API requests that a JSON RTE plugin can use to communicate with Contentstack.

## Prerequisites

-   Basic understanding of JSON Rich Text Editor
-   JSON structure and terminology associated with it

## Structure of JSON Rich Text Editor

```json
{
    "type": "doc",
    "children": [
        {
            "type": "p",
            "children": [
                {
                    "text": "Paragraph"
                }
            ]
        },
        {
            "type": "h1",
            "children": [
                {
                    "text": "Heading One"
                }
            ]
        }
    ]
}
```

In the JSON Rich Text Editor, the JSON structure is represented as a **Node** which consists of two types:

1. Block Node
2. Leaf Node

The editor content that is inside a Node of type doc acts as a root for the content. Where a Block node is a JSON structure with a “children” key in it. Whereas a Leaf node will just have “text” which may include formatting properties (mark) like “bold”, “italic”, etc.

\
**Mark:** You'll see a mark used in below example which is nothing but a leaf property on how to render content. \
For example,

```json
{ "text": "I am Bold", "bold": true }
```

Then, bold is the mark for text "I am Bold"

![Block Leaf Image](./images/BlockLeaf.png "Block Leaf")

### Render Type

A Block node can be rendered in three different ways as follow:

1. Block
2. Inline
3. Void

![Block Types](./images/BlockTypes.png "Block Types")

### Path

Path arrays are a list of indexes that describe a node's exact position.

![Path](./images/Path.png "Path")

In JSON Rich Text Editor, a Path has the following structure:

```javascript
Number[]
```

### Point

Point objects refer to a specific location of text in the leaf node. Its path refers to the location of the node in the tree, and its offset refers to distance into the node's string of text.

![Point](./images/Point.png "Point")

In JSON Rich Text Editor, a Point has the following structure:

```javascript
{
    path: Path,
    offset: Number
}
```

### Range

A Range is a set of `start (anchor)` and `end (focus)` Points specifying a range in a JSON document.

![Range](./images/Range.png "Range")

The structure of a Range is as follows:

```javascript
{
    anchor: Point,
    focus: Point
}
```

### Location

Location is one of the ways to specify the location in a JSON document. It could be a Path, Point, or Range.

## Inclusion in your project

For JSON RTE Plugins, you will need to install `@contentstack/app-sdk` in your react project. You will also need to clone the [boilerplate](https://github.com/Deepak-Kharah/contentstack-rte-plugin-boilerplate) GitHub repository that contains the template needed to create a JSON RTE plugin.

For other extensions you will need to include the contentstack-extension-sdk library in your HTML5 app:

```html
<script src="https://unpkg.com/@contentstack/app-sdk@1.0.0/dist/index.js"></script>
```

## Classes

### `RTEPlugin(plugin_id, callback)`

This method allows you to create a JSON RTE plugin instance for the JSON Rich Text Editor field.

**Kind:** instance property of JSON RTE plugin

**Returns** : Object - Plugin Object

| **Parameter**    | **Type**                    | **Description**                                                                                                                                                                |
| ---------------- | --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `plugin_id`      | string                      | Unique ID of the plugin                                                                                                                                                        |
| `configCallback` | (rte: IRteParam) => IConfig | This function receives an [RTE instance](#rte) as argument and it expects you to return a [config object](#config-object) that includes details like title, icon, render, etc. |

<span id='config-object'></span>

### `configCallback: (rte) => IConfig`

**IConfig** : This user defined object will have all the essential metadata for the plugin.

The following table contains possible properties of IConfig:

| **Key**       | **Type**                           | **Description**                                                                           |
| ------------- | ---------------------------------- | ----------------------------------------------------------------------------------------- |
| `title`       | string                             | Identifier for the toolbar button                                                         |
| `icon`        | ReactNode                          | Icon which will be used for buttons                                                       |
| `display`     | (‘toolbar’ \| ‘hoveringToolbar’)[] | Location of the plugin                                                                    |
| `elementType` | (‘inline’ \| ‘void’ \| ‘block’)[]  | Render type                                                                               |
| `render`      | ReactNode                          | Component to be rendered within the editor when corresponding plugin_uid appears in json. |

<span id="rte">**rte**</span> : An instance which has all essential functions to interact with JSON RTE.

Following are a list of helpful functions and properties for a JSON RTE instance.

### Properties:

**rte.ref :** Returns the HTML reference of the JSON RTE.

**rte.fieldConfig** : Contains metadata about the JSON RTE field which can be specified in the content type builder page.

| **Key**          | **Description**                                                               | **Type**                         |
| ---------------- | ----------------------------------------------------------------------------- | -------------------------------- |
| `rich_text_type` | Type of JSON RTE                                                              | 'basic' \| 'advance' \| 'custom' |
| `reference_to`   | List of content type uid used in JSON RTE references.                         | string[]                         |
| `options`        | Array of selected toolbar buttons ( available if rich_text_type is ‘custom’ ) | string[]                         |
| `title`          | Title of the field                                                            | string                           |
| `uid`            | Unique ID for the field                                                       | string                           |

### `rte.getConfig: () => Object`

Provides configuration which are defined while creating the plugin or while selecting a plugin in the content type builder page.

For example, if your plugin requires API Key or any other config parameters then, you can specify these configurations while creating a new plugin or you can specify field specific configurations from the content type builder page while selecting the plugin. These configurations can be accessed through the `getConfig() `method.

### Methods:

These methods are part of the RTE instance and can be accessed as rte.methodName().

| **Method**         | **Description**                                                                                                                                                                                                 | **Type**                                                                                                                         |
| ------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| `getPath`          | Retrieves the path of the node                                                                                                                                                                                  | (node:Node) => Path                                                                                                              |
| `setAttrs`         | Sets attributes for the node. <br/> For Eg: These attributes can be <br/> href for anchor plugin <br/>width, src for image plugin.                                                                              | (attrs:Object, options?:Option) => void </br> Option: [NodeOptions](#node-options)                                                |
| `isNodeOfType`     | Retrieves a boolean value, whether the node at the current selection is of input type                                                                                                                           | (type:string) => boolean                                                                                                         |
| `getNode`          | Retrieves node at given location                                                                                                                                                                                | (location:Location) => Node                                                                                                      |
| `getNodes`         | Retrieves a [generator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Generator) of nodes which includes the location specified in options `at` default at current selection | (options?:Option) => Node[] </br> Option: [NodeOptions](#node-options)                                                            |
| `string`           | String value of JSON in given path                                                                                                                                                                              | (location:Location) => string                                                                                                    |
| `addMark`          | Adds mark to the text                                                                                                                                                                                           | (key:string, val:any) => void                                                                                                    |
| `removeMark`       | Removes mark from the text                                                                                                                                                                                      | (key:string) => void                                                                                                             |
| `hasMark`          | Checks if the selected text has a mark                                                                                                                                                                          | (key:string) => boolean                                                                                                          |
| `insertText`       | Inserts text at a given location                                                                                                                                                                                | (text:string, location: Location) => void                                                                                        |
| `getText`          | Gets text from a given location                                                                                                                                                                                 | () => string                                                                                                                     |
| `deleteText`       | Deletes text from selected range                                                                                                                                                                                | () => void                                                                                                                       |
| `updateNode`       | Updates nodes based on provided options                                                                                                                                                                         | (type:string,attrs:Object, options?: Option) => void </br> Option: [NodeOptions](#node-options)                                   |
| `unsetNode`        | Converts a node to a normal paragraph based on provided options                                                                                                                                                 | (options?: Option) => void </br> Option: [NodeOptions](#node-options)                                                             |
| `insertNode`       | Inserts a node at a given location. Having `select` option true will select the node after insertion                                                                                                            | (node:Node, options?: Option) => void </br> Option: [NodeOptions](#node-options)` & { select?: boolean }`                        |
| `deleteNode`       | Deletes a node at a given location                                                                                                                                                                              | (options?: Option) => void </br> Option: `{at?: Location, distance?: number, unit?: 'character' \| 'word' \| 'line' \| 'block'} ` |
| `wrapNode`         | Wraps node based on provided options with given node                                                                                                                                                            | (node:Node, options?: Option) => void </br> Option: [NodeOptions](#node-options)                                                  |
| `unWrapNode`       | Unwraps node based on provided options from the parent node                                                                                                                                                     | (options?: Option) => void </br> Option: [NodeOptions](#node-options)                                                             |
| `mergeNodes`       | Merges nodes based on provided options                                                                                                                                                                          | (options?: Option) => void </br> Option: [NodeOptions](#node-options)                                                             |
| `getEmbeddedItems` | Gets details of embedded items JSON RTE.                                                                                                                                                                        | () => Object                                                                                                                     |
| `getVariable`      | Gets local variable                                                                                                                                                                                             | (name: string) => any                                                                                                            |
| `setVariable`      | Sets a local variable                                                                                                                                                                                           | (name: string, val:any) => void                                                                                                  |

**rte.selection:** Contains a set of functions to perform selection related tasks.

| **Function**   | **Description**                                                            | **Type**                                                                                                                                             |
| -------------- | -------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| `get`          | Retrieves current selection                                                | () => Range                                                                                                                                          |
| `set`          | Sets the selection to a given location                                     | (location: Location) => void                                                                                                                         |
| `isSelected`   | It is a React hook which returns `true` when the current node is selected. | () => boolean                                                                                                                                        |
| `isFocused`    | It is React hook which returns `true` when the current node is focused     | () => boolean                                                                                                                                        |
| `getEnd`       | Retrieves the end location of the editor                                   | () => Path                                                                                                                                           |
| `before`       | Retrieves the prior location before current selection                      | (location: Location, options?: Option) => Location </br> Option: `{distance?: number, unit?: 'offset' \| 'character' \| 'word' \| 'line' \| 'block'}` |
| `after`        | Retrieves the subsequent location after current selection                  | (location: Location, options?: Option) => Location </br> Option: `{distance?: number, unit?: 'offset' \| 'character' \| 'word' \| 'line' \| 'block'}` |
| `isPointEqual` | Checks if two points are equal                                             | (point1: Point, point2: Point) => boolean                                                                                                            |

<span id='node-options' />

### Node Options:

Functions which involve transformation or change have an `options` parameter which includes options specific to transform and general `NodeOptions` to specify which Nodes in the document the transform function is applied to.

```json
interface NodeOptions {
  at?: Location
  match?: (node: Node, path: Location) => boolean
}
```

-   The `at `option selects a `Location `in the editor. It defaults to the user's current selection
-   The `match `option filters the set of Nodes with a custom function.

### Events function

| **Function** | **Description**                | **Arguments** |
| ------------ | ------------------------------ | ------------- |
| `isFocused`  | Check if the editor is focused | () => boolean |
| `focus`      | Focuses the editor             | () => boolean |
| `blur`       | Blurs the editor               | () => boolean |

## Plugin:

## Editor Events

### `Plugin.on: (event_type, callback) => void`

| **event_type**   | **Description**                                                                | **Callback Arguments**                                                                                    |
| ---------------- | ------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------- |
| `keydown`        | When keydown is performed                                                      | ({event: KeyboardEvent, rte: RTE}) => void                                                                |
| `exec`           | When a button is clicked or triggered                                          | (rte: RTE) => void                                                                                        |
| `deleteBackward` | When backward deletion occurs                                                  | ({rte: RTE, preventDefault: Function, ...args:[unit:"character" \| "word" \| "line" \| "block"]}) => void |
| `deleteForward`  | When forward deletion occurs                                                   | ({rte: RTE, preventDefault: Function, ...args:[unit:"character" \| "word" \| "line" \| "block"]}) => void |
| `normalize`      | It is used to normalize any dirty ( unwanted structure ) objects in the editor | ({rte: RTE, preventDefault: Function, ...args:[[node:Node, path:Path]]}) => void                          |
| `insertText`     | Inserts text in the current selection                                          | ({rte: RTE, preventDefault: Function, ...args:[string]}) => void                                          |
| `change`         | When there is a change in the editor                                           | ({rte: RTE, , preventDefault: Function}) => void                                                          |
| `insertBreak`    | When the enter key is pressed                                                  | ({rte: RTE, preventDefault: Function}) => void                                                            |

## Dropdown plugin

### Plugin.addPlugins: (...Plugin) => void

The addPlugins method can help you to group the plugins under a dropdown that share the same theme. Also, the addPlugins method takes a list of plugins as an input.

For example, the code for addPlugins is as follows:

```javascript
const ChooseAsset = RTE("choose-asset", () => {
    /** Choose Asset Code   */
});
const UploadAsset = RTE("upload-asset", () => {
    /** Upload Asset Code   */
});
const Asset = RTE("asset-picker", () => {
    /** Asset Picker Code */
});
Asset.addPlugins(ChooseAsset, UploadAsset);
```

<img src="./images/Dropdown.jpg" width='350' style="text-align:center" />
