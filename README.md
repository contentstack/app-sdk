# Contentstack App SDK

<div align="center">

[![npm version](https://img.shields.io/npm/v/@contentstack/app-sdk.svg?style=for-the-badge&color=blue)](https://www.npmjs.com/package/@contentstack/app-sdk)
[![npm downloads](https://img.shields.io/npm/dm/@contentstack/app-sdk.svg?style=for-the-badge&color=green)](https://www.npmjs.com/package/@contentstack/app-sdk)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/%3C%2F%3E-TypeScript-%230074c1.svg?style=for-the-badge)](https://www.typescriptlang.org/)

**The modern way to build Contentstack extensions**

*TypeScript-first • Extend Contentstack UI • Production-ready*

[Get Started](#-get-started) • [Documentation](./docs/api-reference.md) • [Examples](#-examples) • [Community](https://community.contentstack.com/)

</div>

## Installation

```bash
npm install @contentstack/app-sdk
```

## Quick Start

```ts
import ContentstackAppSDK from '@contentstack/app-sdk';

const sdk = await ContentstackAppSDK.init();
console.log('SDK initialized:', sdk);
```

## Documentation

- **API Reference**: https://github.com/contentstack/app-sdk/blob/main/docs/api-reference.md
- **Migration Guide**: https://github.com/contentstack/app-sdk/blob/main/docs/app-sdk-v2-migration.md
- **Asset Extension API**: https://github.com/contentstack/app-sdk/blob/main/docs/asset-extension-api-reference.md

## UI Locations

The SDK supports 11 UI locations for extending Contentstack functionality:

| UI Location | Description |
|-------------|-------------|
| **[DashboardWidget](./docs/api-reference.md#dashboardwidget)** | Stack dashboard widgets |
| **[CustomField](./docs/api-reference.md#customfield)** | Custom input components for content types |
| **[SidebarWidget](./docs/api-reference.md#sidebarwidget)** | Entry sidebar functionality |
| **[AssetSidebarWidget](./docs/api-reference.md#assetsidebarwidget)** | Asset management tools |
| **[AppConfigWidget](./docs/api-reference.md#appconfigwidget)** | App configuration interface |
| **[RTEPlugin](./docs/rte-plugin.md)** | Create Rich Text Editor plugins |
| **[FullPage](./docs/api-reference.md#fullpage)** | Full-page applications |
| **[FieldModifierLocation](./docs/api-reference.md#fieldmodifierlocation)** | Field behavior modification |
| **[ContentTypeSidebarWidget](./docs/api-reference.md#contenttypesidebarwidget)** | Content type management |
| **[GlobalFullPageLocation](./docs/api-reference.md#globalfullpagelocation)** | Organization-level applications |
| **[RTELocation](./docs/api-reference.md#rtelocation)** | RTE context access |



### Custom Field

```ts
const customField = sdk.location.CustomField;
if (customField) {
  const fieldData = await customField.field.getData();
  await customField.field.setData('Hello, Contentstack!');
}
```

### Dashboard Widget

```ts
const dashboard = sdk.location.DashboardWidget;
if (dashboard) {
  dashboard.frame.enableAutoResizing();
  const stackData = await dashboard.stack.getData();
}
```

### Asset Sidebar

```ts
const assetSidebar = sdk.location.AssetSidebarWidget;
if (assetSidebar) {
  const assetData = await assetSidebar.getData();
  await assetSidebar.setData({ title: 'Updated Title' });
}
```

## Data Storage

Built-in key-value storage for persisting app data:

```ts
const store = sdk.store;

// Store data
await store.set('userPreferences', { theme: 'dark', language: 'en' });

// Retrieve data
const preferences = await store.get('userPreferences');

// Get all data
const allData = await store.getAll();

// Remove data
await store.remove('userPreferences');

// Clear all data
await store.clear();
```

## Stack Operations

Access stack-level operations and data:

```ts
const stack = sdk.stack;

// Get stack information
const stackData = stack.getData();

// Get content types
const contentTypes = await stack.getContentTypes();

// Get assets
const assets = await stack.Asset.getAssets();

// Search entries
const entries = await stack.search({
  content_type: 'blog_post',
  query: { title: 'Hello World' }
});

// Get environments and locales
const environments = await stack.getEnvironments();
const locales = await stack.getLocales();
```

## Common Functions

Available in all UI locations:

```ts
// Get app configuration
const config = await sdk.getConfig();

// Get current UI location type
const location = sdk.getCurrentLocation();

// Get Contentstack region
const region = sdk.getCurrentRegion();

// Get app version
const version = await sdk.getAppVersion();
```

## Requirements

- Node.js: >= 18.x
- TypeScript: >= 4.4.4 (for development)
- Browsers: Chrome 60+, Firefox 55+, Safari 12+, Edge 79+

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m 'feat: add your feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a Pull Request

### Development

```bash
git clone https://github.com/contentstack/app-sdk.git
cd app-sdk
npm install

npm run dev
npm run build
npm test
npm run lint
```

## Support

- Community Forum: https://community.contentstack.com/
- GitHub Issues: https://github.com/contentstack/app-sdk/issues
- Contact Support: https://www.contentstack.com/support/

## License

MIT — https://opensource.org/licenses/MIT
