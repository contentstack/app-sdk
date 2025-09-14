# Contentstack App SDK API Reference

## Overview

The Contentstack App SDK enables developers to build custom applications that integrate seamlessly with Contentstack's content management interface. Built with TypeScript, it provides type-safe access to content data, UI locations, and platform functionality.

## Installation

```bash
npm install @contentstack/app-sdk
```

## Quick Start

```ts
import { ContentstackAppSDK } from '@contentstack/app-sdk';

const sdk = await ContentstackAppSDK.init();
const customField = sdk.location.CustomField;

if (customField) {
  const field = customField.field;
  const entry = customField.entry;
}
```

## SDK Reference

### ContentstackAppSDK

The main SDK class that provides access to all functionality.

#### Methods

##### [init()](https://github.com/contentstack/app-sdk/blob/main/src/index.ts)

Initializes the SDK and returns a configured instance.

```ts
const sdk = await ContentstackAppSDK.init();
```

**Returns:** `Promise<ContentstackAppSDK>`

#### Properties

##### [location](https://github.com/contentstack/app-sdk/blob/main/src/uiLocation.ts)

Access to all available UI locations.

```ts
const customField = sdk.location.CustomField;
const sidebar = sdk.location.SidebarWidget;
```

##### [region](https://github.com/contentstack/app-sdk/blob/main/src/uiLocation.ts)

The Contentstack region identifier.

```ts
console.log(sdk.region); // "NA", "EU", "AU"
```

##### [version](https://github.com/contentstack/app-sdk/blob/main/src/uiLocation.ts)

The current app version.

```ts
console.log(sdk.version); // 1
```

## UI Locations

The SDK provides access to 11 different UI locations within the Contentstack interface:

| Location | Purpose | Use Cases |
|----------|---------|-----------|
| **DashboardWidget** | Dashboard integration | Analytics, stack overview, management tools |
| **FullPage** | Full-page applications | Complex workflows, data management |
| **GlobalFullPageLocation** | Cross-stack applications | Global settings, multi-stack operations |
| **CustomField** | Field extensions | Custom validation, input components |
| **SidebarWidget** | Entry sidebar integration | Metadata, related content, tools |
| **FieldModifierLocation** | Field transformation | Data processing, field manipulation |
| **AssetSidebarWidget** | Asset management | Asset processing, metadata tools |
| **ContentTypeSidebarWidget** | Content type tools | Schema management, type utilities |
| **RTELocation** | Rich text editor context | Content manipulation, RTE integration |
| **RTEPlugin** | RTE plugin development | Custom buttons, elements, functionality |
| **AppConfigWidget** | App configuration | Settings, configuration management |

### DashboardWidget

Integrates with the Contentstack dashboard to provide stack-level functionality.

```ts
const dashboard = sdk.location.DashboardWidget;
if (dashboard) {
  const stack = dashboard.stack;
  const frame = dashboard.frame;
}
```

#### API Reference

##### [stack](https://github.com/contentstack/app-sdk/blob/main/src/types.ts#L16)

Stack operations and data access.

```ts
// Get content types and entries
const contentTypes = await dashboard.stack.getContentTypes();
const entries = await dashboard.stack.getEntries('blog_post');
```

**Available Methods:**
- [getContentTypes(query?, params?)](#stack-getcontenttypes) - data of all content types in the stack
- [getEntries(contentType, params?)](#stack-getentries) - entries of a specific content type
- [getAssets(query?, params?)](#stack-getassets) - assets from the stack
- [getManagementTokens()](#stack-getmanagementtokens) - details of all management tokens for the stack
- [search(queries, apiKey?)](#stack-search) - search results based on user query
- [getEnvironment(name, params?)](#stack-getenvironment) - environment details
- [getEnvironments(query?, params?)](#stack-getenvironments) - details of all environments
- [getLocale(code, params?)](#stack-getlocale) - a specific locale
- [getLocales(query?, params?)](#stack-getlocales) - all locales
- [getWorkflow(uid, params?)](#stack-getworkflow) - a specific workflow
- [getWorkflows(query?, params?)](#stack-getworkflows) - all workflows
- [getAllBranches()](#stack-getallbranches) - all branches in the current stack
- [getCurrentBranch()](#stack-getcurrentbranch) - the current branch details
- [getVariantById(variant_uid)](#stack-getvariantbyid) - variant group details
- [getGlobalField(uid, params?)](#stack-getglobalfield) - a specific global field
- [getGlobalFields(query?, params?)](#stack-getglobalfields) - all global fields

##### [frame](https://github.com/contentstack/app-sdk/blob/main/src/types.ts#L15)

Window management and resizing.

```ts
const frame = dashboard.frame;
await frame.enableResizing();
await frame.updateHeight(600);
```

### FullPage

Enables full-page applications within the Contentstack interface.

```ts
const fullPage = sdk.location.FullPage;
if (fullPage) {
  const stack = fullPage.stack;
  const contentTypes = await stack.getContentTypes();
}
```

#### API Reference

##### [stack](https://github.com/contentstack/app-sdk/blob/main/src/types.ts#L40)

Stack operations and data access.

```ts
// Get content types and entries
const contentTypes = await fullPage.stack.getContentTypes();
const entries = await fullPage.stack.getEntries('blog_post');
```

**Available Methods:**
- [getContentTypes(query?, params?)](#stack-getcontenttypes) - data of all content types in the stack
- [getEntries(contentType, params?)](#stack-getentries) - entries of a specific content type
- [getAssets(query?, params?)](#stack-getassets) - assets from the stack
- [getManagementTokens()](#stack-getmanagementtokens) - details of all management tokens for the stack
- [search(queries, apiKey?)](#stack-search) - search results based on user query
- [getEnvironment(name, params?)](#stack-getenvironment) - environment details
- [getEnvironments(query?, params?)](#stack-getenvironments) - details of all environments
- [getLocale(code, params?)](#stack-getlocale) - a specific locale
- [getLocales(query?, params?)](#stack-getlocales) - all locales
- [getWorkflow(uid, params?)](#stack-getworkflow) - a specific workflow
- [getWorkflows(query?, params?)](#stack-getworkflows) - all workflows
- [getAllBranches()](#stack-getallbranches) - all branches in the current stack
- [getCurrentBranch()](#stack-getcurrentbranch) - the current branch details
- [getVariantById(variant_uid)](#stack-getvariantbyid) - variant group details
- [getGlobalField(uid, params?)](#stack-getglobalfield) - a specific global field
- [getGlobalFields(query?, params?)](#stack-getglobalfields) - all global fields

### GlobalFullPageLocation

Provides cross-stack functionality for global applications.

```ts
const globalFullPage = sdk.location.GlobalFullPageLocation;
if (globalFullPage) {
  const currentOrg = globalFullPage.currentOrganization;
  console.log('Current organization:', currentOrg);
}
```

#### API Reference

##### [currentOrganization](https://github.com/contentstack/app-sdk/blob/main/src/types.ts#L73)

Current organization details.

```ts
const currentOrg = globalFullPage.currentOrganization;
console.log('Organization name:', currentOrg.name);
console.log('Organization UID:', currentOrg.uid);
```

### CustomField

Extends field functionality with custom validation and input components.

```ts
const customField = sdk.location.CustomField;
if (customField) {
  const field = customField.field;
  const entry = customField.entry;
  const stack = customField.stack;
  const frame = customField.frame;
}
```

#### API Reference

##### [field](https://github.com/contentstack/app-sdk/blob/main/src/types.ts#L21)

Field data operations and validation.

```ts
// Get and set field data
const fieldData = customField.field.getData();
customField.field.setData({ title: 'New Title' });
```

**Available Methods:**
- [getData(options?)](#field-getdata) - the data of the current field
- [setData(data)](#field-setdata) - the data for the current field

##### [entry](https://github.com/contentstack/app-sdk/blob/main/src/types.ts#L20)

Entry data access and monitoring.

```ts
// Get entry data and listen for changes
const entryData = customField.entry.getData();
customField.entry.onChange((data) => {
  console.log('Entry changed:', data);
});
```

**Available Methods:**
- [getData()](#entry-getdata) - data of the current entry
- [getDraftData()](#entry-getdraftdata) - the draft data of the current unsaved entry. Returns an empty object if there are no changes
- [getField(uid, options?)](#entry-getfield) - the field object for the saved data
- [getPropertySafely(obj, key)](#entry-getpropertysafely) - Safely retrieves the value of a property from an object to mitigate prototype pollution vulnerabilities
- [onSave(callback)](#entry-onsave) - callback when entry is saved
- [onChange(callback)](#entry-onchange) - callback when entry is updated
- [onPublish(callback)](#entry-onpublish) - callback when entry is published
- [onUnPublish(callback)](#entry-onunpublish) - callback when entry is unpublished

##### [stack](https://github.com/contentstack/app-sdk/blob/main/src/types.ts#L24)

Stack operations and data access.

```ts
// Get content types and entries
const contentTypes = await customField.stack.getContentTypes();
const entries = await customField.stack.getEntries('blog_post');
```

**Available Methods:**
- [getContentTypes(query?, params?)](#stack-getcontenttypes) - data of all content types in the stack
- [getEntries(contentType, params?)](#stack-getentries) - entries of a specific content type
- [getAssets(query?, params?)](#stack-getassets) - assets from the stack
- [getManagementTokens()](#stack-getmanagementtokens) - details of all management tokens for the stack
- [search(queries, apiKey?)](#stack-search) - search results based on user query
- [getEnvironment(name, params?)](#stack-getenvironment) - environment details
- [getEnvironments(query?, params?)](#stack-getenvironments) - details of all environments
- [getLocale(code, params?)](#stack-getlocale) - a specific locale
- [getLocales(query?, params?)](#stack-getlocales) - all locales
- [getWorkflow(uid, params?)](#stack-getworkflow) - a specific workflow
- [getWorkflows(query?, params?)](#stack-getworkflows) - all workflows
- [getAllBranches()](#stack-getallbranches) - all branches in the current stack
- [getCurrentBranch()](#stack-getcurrentbranch) - the current branch details
- [getVariantById(variant_uid)](#stack-getvariantbyid) - variant group details
- [getGlobalField(uid, params?)](#stack-getglobalfield) - a specific global field
- [getGlobalFields(query?, params?)](#stack-getglobalfields) - all global fields

##### [frame](https://github.com/contentstack/app-sdk/blob/main/src/types.ts#L23)

Window management and resizing.

```ts
const frame = customField.frame;
await frame.updateHeight(300);
```

##### [fieldConfig](https://github.com/contentstack/app-sdk/blob/main/src/types.ts#L22)

Field configuration and metadata.

```ts
const fieldConfig = customField.fieldConfig;
console.log('Field config:', fieldConfig);
console.log('Field type:', fieldConfig.type);
```

### SidebarWidget

Integrates with entry sidebars to provide contextual tools and information.

```ts
const sidebar = sdk.location.SidebarWidget;
if (sidebar) {
  const entry = sidebar.entry;
  const stack = sidebar.stack;
}
```

#### API Reference

##### [entry](https://github.com/contentstack/app-sdk/blob/main/src/types.ts#L28)

Entry data access and monitoring.

```ts
// Get entry data and listen for changes
const entryData = sidebar.entry.getData();
sidebar.entry.onChange((data) => {
  console.log('Entry changed:', data);
});
```

**Available Methods:**
- [getData()](#entry-getdata) - data of the current entry
- [getDraftData()](#entry-getdraftdata) - the draft data of the current unsaved entry. Returns an empty object if there are no changes
- [getField(uid, options?)](#entry-getfield) - the field object for the saved data
- [getPropertySafely(obj, key)](#entry-getpropertysafely) - Safely retrieves the value of a property from an object to mitigate prototype pollution vulnerabilities
- [onSave(callback)](#entry-onsave) - callback when entry is saved
- [onChange(callback)](#entry-onchange) - callback when entry is updated
- [onPublish(callback)](#entry-onpublish) - callback when entry is published
- [onUnPublish(callback)](#entry-onunpublish) - callback when entry is unpublished

##### [stack](https://github.com/contentstack/app-sdk/blob/main/src/types.ts#L29)

Stack operations and data access.

```ts
// Get content types and entries
const contentTypes = await sidebar.stack.getContentTypes();
const entries = await sidebar.stack.getEntries('blog_post');
```

**Available Methods:**
- [getContentTypes(query?, params?)](#stack-getcontenttypes) - data of all content types in the stack
- [getEntries(contentType, params?)](#stack-getentries) - entries of a specific content type
- [getAssets(query?, params?)](#stack-getassets) - assets from the stack
- [getManagementTokens()](#stack-getmanagementtokens) - details of all management tokens for the stack
- [search(queries, apiKey?)](#stack-search) - search results based on user query
- [getEnvironment(name, params?)](#stack-getenvironment) - environment details
- [getEnvironments(query?, params?)](#stack-getenvironments) - details of all environments
- [getLocale(code, params?)](#stack-getlocale) - a specific locale
- [getLocales(query?, params?)](#stack-getlocales) - all locales
- [getWorkflow(uid, params?)](#stack-getworkflow) - a specific workflow
- [getWorkflows(query?, params?)](#stack-getworkflows) - all workflows
- [getAllBranches()](#stack-getallbranches) - all branches in the current stack
- [getCurrentBranch()](#stack-getcurrentbranch) - the current branch details
- [getVariantById(variant_uid)](#stack-getvariantbyid) - variant group details
- [getGlobalField(uid, params?)](#stack-getglobalfield) - a specific global field
- [getGlobalFields(query?, params?)](#stack-getglobalfields) - all global fields

### FieldModifierLocation

Enables field data transformation and manipulation.

```ts
const fieldModifier = sdk.location.FieldModifierLocation;
if (fieldModifier) {
  const field = fieldModifier.field;
  const entry = fieldModifier.entry;
  const stack = fieldModifier.stack;
  const frame = fieldModifier.frame;
}
```

#### API Reference

##### [entry](https://github.com/contentstack/app-sdk/blob/main/src/types.ts#L33)

Entry data access and monitoring.

```ts
// Get entry data and listen for changes
const entryData = fieldModifier.entry.getData();
fieldModifier.entry.onChange((data) => {
  console.log('Entry changed:', data);
});
```

**Available Methods:**
- [getData()](#entry-getdata) - data of the current entry
- [getDraftData()](#entry-getdraftdata) - the draft data of the current unsaved entry. Returns an empty object if there are no changes
- [getField(uid, options?)](#entry-getfield) - the field object for the saved data
- [getPropertySafely(obj, key)](#entry-getpropertysafely) - Safely retrieves the value of a property from an object to mitigate prototype pollution vulnerabilities
- [onSave(callback)](#entry-onsave) - callback when entry is saved
- [onChange(callback)](#entry-onchange) - callback when entry is updated
- [onPublish(callback)](#entry-onpublish) - callback when entry is published
- [onUnPublish(callback)](#entry-onunpublish) - callback when entry is unpublished

##### [field](https://github.com/contentstack/app-sdk/blob/main/src/types.ts#L35)

Field data operations and validation.

```ts
// Get and set field data
const fieldData = fieldModifier.field.getData();
fieldModifier.field.setData({ title: 'New Title' });
```

**Available Methods:**
- [getData(options?)](#field-getdata) - the data of the current field
- [setData(data)](#field-setdata) - the data for the current field

##### [stack](https://github.com/contentstack/app-sdk/blob/main/src/types.ts#L34)

Stack operations and data access.

```ts
// Get content types and entries
const contentTypes = await fieldModifier.stack.getContentTypes();
const entries = await fieldModifier.stack.getEntries('blog_post');
```

**Available Methods:**
- [getContentTypes(query?, params?)](#stack-getcontenttypes) - data of all content types in the stack
- [getEntries(contentType, params?)](#stack-getentries) - entries of a specific content type
- [getAssets(query?, params?)](#stack-getassets) - assets from the stack
- [getManagementTokens()](#stack-getmanagementtokens) - details of all management tokens for the stack
- [search(queries, apiKey?)](#stack-search) - search results based on user query
- [getEnvironment(name, params?)](#stack-getenvironment) - environment details
- [getEnvironments(query?, params?)](#stack-getenvironments) - details of all environments
- [getLocale(code, params?)](#stack-getlocale) - a specific locale
- [getLocales(query?, params?)](#stack-getlocales) - all locales
- [getWorkflow(uid, params?)](#stack-getworkflow) - a specific workflow
- [getWorkflows(query?, params?)](#stack-getworkflows) - all workflows
- [getAllBranches()](#stack-getallbranches) - all branches in the current stack
- [getCurrentBranch()](#stack-getcurrentbranch) - the current branch details
- [getVariantById(variant_uid)](#stack-getvariantbyid) - variant group details
- [getGlobalField(uid, params?)](#stack-getglobalfield) - a specific global field
- [getGlobalFields(query?, params?)](#stack-getglobalfields) - all global fields

##### [frame](https://github.com/contentstack/app-sdk/blob/main/src/types.ts#L36)

Window management and resizing.

```ts
const frame = fieldModifier.frame;
frame.enableAutoResizing();
frame.startAutoResizing();
```

##### [stack](https://github.com/contentstack/app-sdk/blob/main/src/uiLocation.ts#L133)

Stack operations and data access.

```ts
// Get content types and entries
const contentTypes = await fieldModifier.stack.getContentTypes();
const entries = await fieldModifier.stack.getEntries('blog_post');
```

**Available Methods:**
- [getContentTypes(query?, params?)](#stack-getcontenttypes) - data of all content types in the stack
- [getEntries(contentType, params?)](#stack-getentries) - entries of a specific content type
- [getAssets(query?, params?)](#stack-getassets) - assets from the stack
- [getManagementTokens()](#stack-getmanagementtokens) - details of all management tokens for the stack
- [search(queries, apiKey?)](#stack-search) - search results based on user query
- [getEnvironment(name, params?)](#stack-getenvironment) - environment details
- [getEnvironments(query?, params?)](#stack-getenvironments) - details of all environments
- [getLocale(code, params?)](#stack-getlocale) - a specific locale
- [getLocales(query?, params?)](#stack-getlocales) - all locales
- [getWorkflow(uid, params?)](#stack-getworkflow) - a specific workflow
- [getWorkflows(query?, params?)](#stack-getworkflows) - all workflows
- [getAllBranches()](#stack-getallbranches) - all branches in the current stack
- [getCurrentBranch()](#stack-getcurrentbranch) - the current branch details
- [getVariantById(variant_uid)](#stack-getvariantbyid) - variant group details
- [getGlobalField(uid, params?)](#stack-getglobalfield) - a specific global field
- [getGlobalFields(query?, params?)](#stack-getglobalfields) - all global fields

### AssetSidebarWidget

Integrates with asset management interfaces.

```ts
const assetSidebar = sdk.location.AssetSidebarWidget;
if (assetSidebar) {
  const assetData = assetSidebar.getData();
  await assetSidebar.setData({ title: 'New Asset Title' });
  assetSidebar.onSave((updatedAsset) => {
    console.log('Asset saved:', updatedAsset);
  });
}
```

#### API Reference

##### [getData()](https://github.com/contentstack/app-sdk/blob/main/src/AssetSidebarWidget.ts#L61)

Gets the current asset data.

```ts
const assetData = assetSidebar.getData();
console.log('Asset title:', assetData.title);
console.log('Asset URL:', assetData.url);
```

##### [setData(asset)](https://github.com/contentstack/app-sdk/blob/main/src/AssetSidebarWidget.ts#L70)

Sets data for the asset.

```ts
await assetSidebar.setData({ 
  title: 'New Asset Title',
  description: 'Updated description'
});
```

##### [syncAsset()](https://github.com/contentstack/app-sdk/blob/main/src/AssetSidebarWidget.ts#L78)

Synchronizes the asset with the parent application.

```ts
await assetSidebar.syncAsset();
```

##### [updateWidth(width)](https://github.com/contentstack/app-sdk/blob/main/src/AssetSidebarWidget.ts#L88)

Updates the width of the Asset Sidebar widget.

```ts
await assetSidebar.updateWidth(400);
```

##### [replaceAsset(file)](https://github.com/contentstack/app-sdk/blob/main/src/AssetSidebarWidget.ts#L103)

Replaces the current asset with a new file.

```ts
const fileInput = document.getElementById('fileInput');
const file = fileInput.files[0];
await assetSidebar.replaceAsset(file);
```

##### [onSave(callback)](https://github.com/contentstack/app-sdk/blob/main/src/AssetSidebarWidget.ts#L113)

Listens for asset save events.

```ts
assetSidebar.onSave((savedAsset) => {
  console.log('Asset saved:', savedAsset);
});
```

##### [onChange(callback)](https://github.com/contentstack/app-sdk/blob/main/src/AssetSidebarWidget.ts#L132)

Listens for asset change events.

```ts
assetSidebar.onChange((changedAsset) => {
  console.log('Asset changed:', changedAsset);
});
```

##### [onPublish(callback)](https://github.com/contentstack/app-sdk/blob/main/src/AssetSidebarWidget.ts#L154)

Listens for asset publish events.

```ts
assetSidebar.onPublish((publishedAsset) => {
  console.log('Asset published:', publishedAsset);
});
```

##### [onUnPublish(callback)](https://github.com/contentstack/app-sdk/blob/main/src/AssetSidebarWidget.ts#L176)

Listens for asset unpublish events.

```ts
assetSidebar.onUnPublish((unpublishedAsset) => {
  console.log('Asset unpublished:', unpublishedAsset);
});
```

##### [currentAsset](https://github.com/contentstack/app-sdk/blob/main/src/AssetSidebarWidget.ts#L15)

Gets the current asset object directly.

```ts
const asset = assetSidebar.currentAsset;
console.log('Current asset:', asset);
```

### ContentTypeSidebarWidget

Provides content type management and schema tools.

```ts
const contentTypeSidebar = sdk.location.ContentTypeSidebarWidget;
if (contentTypeSidebar) {
  const contentTypeData = contentTypeSidebar.getData();
  contentTypeSidebar.onSave((updatedType) => {
    console.log('Content type updated:', updatedType);
  });
}
```

#### API Reference

##### [getData()](https://github.com/contentstack/app-sdk/blob/main/src/ContentTypeSidebarWidget.ts#L44)

Gets the current content type data.

```ts
const contentTypeData = contentTypeSidebar.getData();
console.log('Content type:', contentTypeData.title);
console.log('Schema:', contentTypeData.schema);
```

##### [onSave(callback)](https://github.com/contentstack/app-sdk/blob/main/src/ContentTypeSidebarWidget.ts#L53)

Listens for content type save events.

```ts
contentTypeSidebar.onSave((updatedContentType) => {
  console.log('Content type saved:', updatedContentType);
  // Handle the updated content type
});
```

##### [currentContentType](https://github.com/contentstack/app-sdk/blob/main/src/ContentTypeSidebarWidget.ts#L14)

Gets the current content type object directly.

```ts
const contentType = contentTypeSidebar.currentContentType;
console.log('Current content type:', contentType);
```

### AppConfigWidget

Enables app configuration and settings management.

```ts
const appConfig = sdk.location.AppConfigWidget;
if (appConfig) {
  const stack = appConfig.stack;
  const installation = appConfig.installation;
}
```

#### API Reference

##### [stack](https://github.com/contentstack/app-sdk/blob/main/src/types.ts#L69)

Stack operations and data access.

```ts
// Get content types and entries
const contentTypes = await appConfig.stack.getContentTypes();
const entries = await appConfig.stack.getEntries('blog_post');
```

**Available Methods:**
- [getContentTypes(query?, params?)](#stack-getcontenttypes) - data of all content types in the stack
- [getEntries(contentType, params?)](#stack-getentries) - entries of a specific content type
- [getAssets(query?, params?)](#stack-getassets) - assets from the stack
- [getManagementTokens()](#stack-getmanagementtokens) - details of all management tokens for the stack
- [search(queries, apiKey?)](#stack-search) - search results based on user query
- [getEnvironment(name, params?)](#stack-getenvironment) - environment details
- [getEnvironments(query?, params?)](#stack-getenvironments) - details of all environments
- [getLocale(code, params?)](#stack-getlocale) - a specific locale
- [getLocales(query?, params?)](#stack-getlocales) - all locales
- [getWorkflow(uid, params?)](#stack-getworkflow) - a specific workflow
- [getWorkflows(query?, params?)](#stack-getworkflows) - all workflows
- [getAllBranches()](#stack-getallbranches) - all branches in the current stack
- [getCurrentBranch()](#stack-getcurrentbranch) - the current branch details
- [getVariantById(variant_uid)](#stack-getvariantbyid) - variant group details
- [getGlobalField(uid, params?)](#stack-getglobalfield) - a specific global field
- [getGlobalFields(query?, params?)](#stack-getglobalfields) - all global fields

##### [installation](https://github.com/contentstack/app-sdk/blob/main/src/types.ts#L61)

App installation data management.

```ts
const installation = appConfig.installation;
const data = await installation.getInstallationData();
await installation.setInstallationData(newData);
installation.setValidity(true);
```

## Core Objects

These objects provide the fundamental functionality for working with Contentstack data across all UI locations.

### Entry Object

#### Properties

##### [content_type](#entry-content-type)

Gets the content type of the current entry.

```ts
const contentType = entry.content_type;
console.log('Content type:', contentType.title);
```

##### [locale](#entry-locale)

Gets the locale of the current entry.

```ts
const locale = entry.locale;
console.log('Entry locale:', locale);
```

#### Methods

##### [getData()](#entry-getdata)

Gets data of the current entry.

```ts
const entryData = entry.getData();
```

##### [getDraftData()](#entry-getdraftdata)

Retrieves the draft data of the current unsaved entry. Returns an empty object if there are no changes.

```ts
const draftData = await entry.getDraftData();
console.log('Draft data:', draftData);
```

##### [getField(uid, options?)](#entry-getfield)

Gets the field object for the saved data.

```ts
const titleField = entry.getField('title');
const fieldWithUnsavedSchema = entry.getField('title', { useUnsavedSchema: true });
```

##### [getPropertySafely(obj, key)](#entry-getpropertysafely)

Safely retrieves the value of a property from an object to mitigate prototype pollution vulnerabilities.

```ts
const value = entry.getPropertySafely(dataObject, 'propertyName');
```

##### [onSave(callback)](#entry-onsave)

Executes callback when entry is saved.

```ts
entry.onSave((savedEntry) => {
  console.log('Entry saved:', savedEntry);
});
```

##### [onChange(callback)](#entry-onchange)

Executes callback when entry is updated.

```ts
entry.onChange((unresolvedEntry, resolvedEntry) => {
  console.log('Entry changed:', unresolvedEntry);
  console.log('Resolved entry:', resolvedEntry);
});
```

##### [onPublish(callback)](#entry-onpublish)

Executes callback when entry is published.

```ts
entry.onPublish((publishDetails) => {
  console.log('Entry published:', publishDetails);
});
```

##### [onUnPublish(callback)](#entry-onunpublish)

Executes callback when entry is unpublished.

```ts
entry.onUnPublish((publishDetails) => {
  console.log('Entry unpublished:', publishDetails);
});
```


### Field Object

#### Methods

##### [getData(options?)](#field-getdata)

Gets the data of the current field.

```ts
const fieldData = field.getData();
const resolvedData = field.getData({ resolved: true });
```

##### [setData(data)](#field-setdata)

Sets the data for the current field.

```ts
await field.setData('new value');
```

#### Properties

##### [uid](#field-uid)

Unique identifier of the field.

```ts
const fieldUid = field.uid;
console.log('Field UID:', fieldUid);
```

##### [data_type](#field-data-type)

Data type of the field.

```ts
const dataType = field.data_type;
console.log('Field data type:', dataType);
```

##### [schema](#field-schema)

Schema definition of the field.

```ts
const fieldSchema = field.schema;
console.log('Field schema:', fieldSchema);
```


### Stack Object

#### Methods

##### [getContentTypes(query?, params?)](#stack-getcontenttypes)

Retrieves data of all content types in the stack.

```ts
const contentTypes = await stack.getContentTypes();
const filteredTypes = await stack.getContentTypes({ title: { $regex: 'blog' } });
```

##### [getEntries(contentType, params?)](#stack-getentries)

Retrieves entries of a specific content type.

```ts
const entries = await stack.getEntries('content_type_uid');
const publishedEntries = await stack.getEntries('content_type_uid', { publish: true });
```

##### [getAssets(query?, params?)](#stack-getassets)

Retrieves assets from the stack.

```ts
const assets = await stack.getAssets();
const images = await stack.getAssets({ content_type: 'image/*' });
```

##### [getManagementTokens()](#stack-getmanagementtokens)

Gets details of all management tokens for the stack.

```ts
const tokens = await stack.getManagementTokens();
```

##### [search(queries, apiKey?)](#stack-search)

Gets search results based on user query.

```ts
const searchResults = await stack.search({
  type: 'entries',
  query: { content_type: 'blog_post' },
  limit: 10
});
```

##### [getEnvironment(name, params?)](#stack-getenvironment)

Retrieves environment details.

```ts
const environment = await stack.getEnvironment('production');
```

##### [getEnvironments(query?, params?)](#stack-getenvironments)

Retrieves details of all environments.

```ts
const environments = await stack.getEnvironments();
```

##### [getLocale(code, params?)](#stack-getlocale)

Retrieves a specific locale.

```ts
const locale = await stack.getLocale('en-us');
```

##### [getLocales(query?, params?)](#stack-getlocales)

Retrieves all locales.

```ts
const locales = await stack.getLocales();
```

##### [getWorkflow(uid, params?)](#stack-getworkflow)

Retrieves a specific workflow.

```ts
const workflow = await stack.getWorkflow('workflow_uid');
```

##### [getWorkflows(query?, params?)](#stack-getworkflows)

Retrieves all workflows.

```ts
const workflows = await stack.getWorkflows();
```

##### [getAllBranches()](#stack-getallbranches)

Returns all branches in the current stack.

```ts
const branches = stack.getAllBranches();
```

##### [getCurrentBranch()](#stack-getcurrentbranch)

Returns the current branch details.

```ts
const currentBranch = stack.getCurrentBranch();
```

##### [getVariantById(variant_uid)](#stack-getvariantbyid)

Returns variant group details.

```ts
const variant = await stack.getVariantById('variant_uid');
```

##### [getGlobalField(uid, params?)](#stack-getglobalfield)

Retrieves a specific global field.

```ts
const globalField = await stack.getGlobalField('global_field_uid');
```

##### [getGlobalFields(query?, params?)](#stack-getglobalfields)

Retrieves all global fields.

```ts
const globalFields = await stack.getGlobalFields();
```


### Store Object

#### Methods

##### [get(key)](#store-get)

Retrieves stored data by key.

```ts
const value = await store.get('userPreferences');
```

##### [set(key, value)](#store-set)

Sets data with a key.

```ts
await store.set('userPreferences', { theme: 'dark' });
```

##### [getAll()](#store-getall)

Retrieves all stored data.

```ts
const allData = await store.getAll();
```

##### [remove(key)](#store-remove)

Removes data by key.

```ts
await store.remove('userPreferences');
```

##### [clear()](#store-clear)

Clears all stored data.

```ts
await store.clear();
```


## Rich Text Editor

### RTEPlugin

Create custom plugins for the Rich Text Editor.

#### [rtePlugin(id, config)](https://github.com/contentstack/app-sdk/blob/main/src/RTE/index.tsx)

Registers a plugin with the RTE system.

```ts
import { rtePlugin } from '@contentstack/app-sdk';

rtePlugin('my-plugin', (rte) => {
  return {
    title: 'My Plugin',
    icon: '<svg>...</svg>',
    render: (props) => {
      // Plugin implementation
    }
  };
});
```

### RTELocation

Access RTE context and entry data within rich text fields.

```ts
const rteLocation = sdk.location.RTELocation;
if (rteLocation) {
  const entry = rteLocation.entry;
  const entryData = entry.getData();
}
```

#### API Reference

##### [entry](https://github.com/contentstack/app-sdk/blob/main/src/uiLocation.ts#L129)

Entry data access and monitoring.

```ts
// Get entry data and listen for changes
const entryData = rteLocation.entry.getData();
rteLocation.entry.onChange((data) => {
  console.log('Entry changed:', data);
});
```

**Available Methods:**
- [getData()](#entry-getdata) - data of the current entry
- [getDraftData()](#entry-getdraftdata) - the draft data of the current unsaved entry. Returns an empty object if there are no changes
- [getField(uid, options?)](#entry-getfield) - the field object for the saved data
- [getPropertySafely(obj, key)](#entry-getpropertysafely) - Safely retrieves the value of a property from an object to mitigate prototype pollution vulnerabilities
- [onSave(callback)](#entry-onsave) - callback when entry is saved
- [onChange(callback)](#entry-onchange) - callback when entry is updated
- [onPublish(callback)](#entry-onpublish) - callback when entry is published
- [onUnPublish(callback)](#entry-onunpublish) - callback when entry is unpublished

## Error Handling

The SDK provides comprehensive error handling for all operations:

```ts
try {
  const sdk = await ContentstackAppSDK.init();
  const customField = sdk.location.CustomField;
  
  if (customField) {
    const field = customField.field;
    await field.setData('new value');
  }
} catch (error) {
  console.error('SDK Error:', error);
}
```

## Best Practices

1. **Location Validation**: Always check if a location exists before use
2. **TypeScript**: Leverage TypeScript for better development experience
3. **Error Handling**: Implement proper error handling in production
4. **Testing**: Test applications across different UI locations
5. **Design Consistency**: Follow Contentstack's design guidelines

## Common Patterns

### Entry Monitoring

```ts
const entry = customField.entry;

entry.onChange((unresolved, resolved) => {
  console.log('Entry changed:', resolved);
});

entry.onSave((savedEntry) => {
  console.log('Entry saved:', savedEntry);
});
```

### Field Operations

```ts
const field = customField.field;
const currentData = field.getData();
await field.setData('new value');
```

### Stack Queries

```ts
const stack = customField.stack;
const contentTypes = await stack.getContentTypes();
const entries = await stack.getEntries('content_type_uid');
const assets = await stack.getAssets();
```

## TypeScript Support

The SDK provides comprehensive TypeScript definitions:

- `ContentstackAppSDK` - Main SDK class
- `UiLocation` - UI location interfaces
- `Entry` - Entry object interface
- `Field` - Field object interface
- `Stack` - Stack object interface
- `Store` - Store object interface

## Version History

**v2.3.2** - Current version
- Enhanced TypeScript support
- Improved error handling
- Performance optimizations
- New UI locations and capabilities