# Asset Sidebar widget

It is an object representing the Asset Sidebar widget.

-   [Asset Sidebar widget](#asset-sidebar-widget)
    -   [getData()](#getdata)
    -   [setData(asset: Partial<AssetData>)](#setdataasset-partialassetdata)
    -   [syncAsset()](#syncasset)
    -   [updateWidth(width: number)](#updatewidthwidth-number)
    -   [replaceAsset(file: File)](#replaceassetfile-file)
    -   [onSave(callback: anyFunction)](#onsavecallback-anyfunction)
    -   [onChange(callback: anyFunction)](#onchangecallback-anyfunction)
    -   [onPublish(callback: anyFunction)](#onpublishcallback-anyfunction)
    -   [onUnPublish(callback: anyFunction)](#onunpublishcallback-anyfunction)
    -   [AssetData](#assetdata)

## getData()

It returns the object representing the current Asset.

## setData(asset: Partial<[AssetData](#assetdata)>)

It modifies the properties of the current Asset.

## syncAsset()

If your asset is modified externally, we could use this method to load the new asset and sync it with the current asset.

## updateWidth(width: number)

This method is use to modify the width of the asset sidebar panel. Using this method you could resize the panel depending on the content.

## replaceAsset(file: File)

This method is use to replace the file of the current asset. Unlike setData, where you could only modify the properties, you could use this method to replace the actual file.

## onSave(callback: anyFunction)

This is a callback function that runs after the asset is save.

## onChange(callback: anyFunction)

This is a callback function that runs everytime a the user modifies the asset data.

## onPublish(callback: anyFunction)

This is a callback that executes after the asset is publish

## onUnPublish(callback: anyFunction)

This is a callback function that executes after the user unpublish an asset.

## AssetData

It is the properties we could modify using the [setData()](#setdataasset-partialassetdata) method
