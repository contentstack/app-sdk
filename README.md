# App Framework SDK

## JSON Rich text editor plugin

The **JSON Rich Text Editor Plugins** lets you add/create custom plugins to extend the functionality of your [JSON Rich Text Editor](https://www.contentstack.com/docs/developers/json-rich-text-editor/about-json-rich-text-editor/) as per your needs. You can use the prebuilt JSON RTE plugins by modifying the code to suit your requirement.

Some of the examples of the prebuilt JSON Rich Text Editor plugins are:

-   Highlight: Allows you to highlight certain parts of your content, such as a whole line of text or a paragraph.

-   Info Panel: Allows you to place important content inside a colored panel to make it stand out.

-   Word Count: Allows you to track the word count for your JSON Rich Text Editor content.

You can create JSON Rich Text Editor Plugins using the Contentstack App SDK. For more information, read our [documentation](https://www.contentstack.com/docs/developers/json-rich-text-editor-plugins/about-json-rte-plugins/).

## Asset Sidebar Extension

**Asset Sidebar Extensions** enable you to customize and enhance your **asset editing experience**. Using customized extensions, you can tailor your images on Contentstack according to your branding requirements..

You can create Asset Sidebar Extensions using the Contentstack App SDK. For more information, read our documentation.

### AssetSidebarWidget Reference

It is an object representing the current Asset Sidebar Widget reference in the Contentstack UI.

**getData()**

This method returns the object representing the current asset.

**setData(asset: Partial<AssetData>)**

This method modifies the properties of the current asset.

**syncAsset()**

If your asset has been modified externally, you can use this method to load the new asset and sync its settings with the current asset.

**updateWidth(width: number)**

This method is used to modify the width of the asset sidebar panel. Using this method, you can resize the panel depending on the resolution of your content.

**replaceAsset(file: File)**

This method is used to replace the current asset with a new file. Unlike setData(), where you can only modify the properties, you can use this method to replace the actual file.

**onSave(callback: anyFunction)**

This is a callback function that runs after you save the asset settings.

**onChange(callback: anyFunction)**

This is a callback function that runs every time the user modifies the asset data.

**onPublish(callback: anyFunction)**

This is a callback function that is executed after a user publishes an asset.

**onUnPublish(callback: anyFunction)**

This is a callback function that is executed after you unpublish an asset.

**AssetData**

It is the property that you can modify using the setData() method.

## Metadata

Metadata is a piece of information that lets you describe or classify an asset/entry. You can manage your digital entities effectively and enable improved accessibility with additional metadata. This object manages all the CRUD operations you can perform with metadata, e.g., adding, updating, or deleting additional metadata.


> Note: The Metadata feature allows users to update their asset metadata or entry metadata without incrementing the asset or entry version.

### createMetadata(metadataConfig: IMetadataCreate)

```ts
IMetadataCreate {
    entity_uid: string;
    type?: "asset" | "entry"; // default: "asset"
    _content_type_uid?: string;
    locale?: string;
    [key: string]: any; // other fields you want to add
}
```

This method adds new metadata for an asset or entry. It accepts metadata configuration as required arguments. This config contains basic details that you need to identify the metadata object and other data you need for your app.

### retrieveMetadata(metadataConfig: IMetadataRetrieve)

```ts
IMetadateRetrieve {
    uid: string;
}
```

This method retrieves metadata for an asset or entry. It accepts metadata configuration as required arguments. This config contains basic details that you need to identify the metadata object you want to retrieve.

### updateMetadata(metadataConfig: IMetadataUpdate)

```ts
IMetadataUpdate {
    uid: string;
    [key: string]: any; // other fields you want to update
}
```

This method updates existing metadata for an asset or entry. It accepts metadata configuration as required arguments. This config contains basic details that you need to identify the metadata object and other data you want to update.

### deleteMetadata(metadataConfig: IMetadataDelete)

```ts
IMetadateDelete {
    uid: string;
}
```

This method deletes existing metadata for an asset or entry. It accepts metadata configuration as required arguments. This config contains basic details that you need to identify the metadata object you want to delete.
