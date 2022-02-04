# Contentstack App SDK

The Extensions SDK allows you to extend Contentstack’s UI by helping you create Custom Fields, Custom Widgets, Dashboard Widgets, App Configuration, and JSON RTE Plugins.

**Custom Fields** enable users to introduce simpler interface controls, such as color picker, code editor, video selector, and more, or maybe complex micro web applications such as Shopify or Snipkart. Because of their dissociated nature, custom fields can be reused multiple times.

**Custom Widgets** are like micro content-processing apps that help you analyze the entry content and provide recommendations. Some of the useful widgets you can create using this type of extension are text intelligence, SEO recommendations, language translation, grammar checker and more.

**Dashboard Widgets** let you add powerful widgets to the stack’s dashboard that let users do more from a centralized location. Some examples of this type of extension include personal notes, recently published content, notification center, and stack usage summary.

The **JSON Rich Text Editor Plugins** lets you add/create custom plugins to extend the functionality of your [JSON Rich Text Editor](https://www.contentstack.com/docs/developers/json-rich-text-editor/about-json-rich-text-editor/) as per your needs. You can use the prebuilt JSON RTE plugins by modifying the code to suit your requirement. Some of the basic prebuilt plugins include Highlight, Info Panel, and Word Count.

**App Configuration** lets you add configuration data related to the extensions after they have been installed from Marketplace.

This SDK overview document introduces you to the concept of custom extensions.

## **Getting started**

You can install the app-sdk from npm using the following code

```sh
npm install @contentstack/app-sdk
```

Include the compiled version of the extension client library by adding the following line to your application.

```html
<script src="https://unpkg.com/@contentstack/app-sdk@1.1.0/dist/index.js"></script>
```

## **Extensions examples**

### **JSON Rich Text Editor Plugins**

Some of the examples of the JSON Rich Text Editor plugins are:

-   [Highlight](https://github.com/contentstack/extensions/tree/master/highlight): Allows you to highlight certain parts of your content, such as a whole line of text or a paragraph.
-   [Info Panel](https://github.com/contentstack/extensions/tree/master/info-panel): Allows you to place important content inside a colored panel to make it stand out.
-   [Word Count](https://github.com/contentstack/extensions/tree/master/word-count): Allows you to track the word count for your JSON Rich Text Editor content.

## Additional resources

-   Marketplace Get started
-   [App SDK API reference](./docs/api-reference.md)
