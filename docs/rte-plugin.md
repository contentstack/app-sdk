# JSON RTE Plugin Development Guide

Quick reference for creating JSON Rich Text Editor plugins using the new simplified approach.

## 🚀 Quick Start

```typescript
import ContentstackAppSDK, { PluginBuilder } from '@contentstack/app-sdk';

// Create a simple plugin
const boldPlugin = new PluginBuilder('bold-plugin')
  .title('Bold')
  .elementType('inline')
  .on('exec', (rte) => {
    rte.addMark('bold', true);
  })
  .build();

// Register the plugin
ContentstackAppSDK.registerRTEPlugins(boldPlugin);
```

## 📋 Plugin Types

### Inline Plugin
For text formatting (bold, italic, etc.)

```typescript
const italicPlugin = new PluginBuilder('italic')
  .title('Italic')
  .elementType('inline')
  .display(['toolbar', 'hoveringToolbar'])
  .on('exec', (rte) => {
    rte.addMark('italic', true);
  })
  .build();
```

### Block Plugin
For block-level elements (headings, paragraphs, etc.)

```typescript
const headingPlugin = new PluginBuilder('heading')
  .title('Heading')
  .elementType('block')
  .render(({ children, attrs }) => (
    <h2 style={{ color: attrs.color || 'black' }}>
      {children}
    </h2>
  ))
  .on('exec', (rte) => {
    rte.insertNode({
      type: 'heading',
      attrs: { level: 2 },
      children: [{ text: 'New Heading' }]
    });
  })
  .build();
```

### Void Plugin
For self-closing elements (images, embeds, etc.)

```typescript
const imagePlugin = new PluginBuilder('image')
  .title('Image')
  .elementType('void')
  .render(({ attrs }) => (
    <img 
      src={attrs.src} 
      alt={attrs.alt || 'Image'} 
      style={{ maxWidth: '100%' }}
    />
  ))
  .on('exec', (rte) => {
    const src = prompt('Enter image URL:');
    if (src) {
      rte.insertNode({
        type: 'image',
        attrs: { src },
        children: [{ text: '' }]
      });
    }
  })
  .build();
```

## 🎛️ Builder Methods

### Basic Configuration
```typescript
new PluginBuilder('plugin-id')
  .title('Plugin Name')           // Toolbar button text
  .icon(<CustomIcon />)           // Button icon (React element)
  .elementType('block')           // 'inline' | 'block' | 'void'
```

### Display Options
```typescript
  .display(['toolbar'])                    // Show in main toolbar only
  .display(['hoveringToolbar'])           // Show in hover toolbar only  
  .display(['toolbar', 'hoveringToolbar']) // Show in both
```

### Event Handlers
```typescript
  .on('exec', (rte) => {})              // Button click
  .on('keydown', ({ event, rte }) => {}) // Key press
  .on('paste', ({ rte, preventDefault }) => {}) // Paste event
```

### Advanced Options
```typescript
  .render(ComponentFunction)              // Custom render component
  .shouldOverride((element) => boolean)   // Override existing elements
  .configure(async (sdk) => {})          // Dynamic configuration
```

## 🔧 Event Handling

### Click Handler
```typescript
.on('exec', (rte) => {
  // Insert text
  rte.insertText('Hello World');
  
  // Add formatting
  rte.addMark('bold', true);
  
  // Insert node
  rte.insertNode({
    type: 'custom-element',
    attrs: { id: 'unique-id' },
    children: [{ text: 'Content' }]
  });
})
```

### Keyboard Handler
```typescript
.on('keydown', ({ event, rte }) => {
  if (event.key === 'Enter' && event.ctrlKey) {
    event.preventDefault();
    // Custom enter behavior
    rte.insertBreak();
  }
})
```

## 📦 Container Plugins (Dropdowns)

Create grouped plugins in a dropdown menu:

```typescript
const mediaContainer = new PluginBuilder('media-dropdown')
  .title('Media')
  .icon(<MediaIcon />)
  .addPlugins(
    imagePlugin,
    videoPlugin,
    audioPlugin
  )
  .build();
```

## 🔄 Plugin Registration

### Single Plugin
```typescript
ContentstackAppSDK.registerRTEPlugins(myPlugin);
```

### Multiple Plugins
```typescript
ContentstackAppSDK.registerRTEPlugins(
  boldPlugin,
  italicPlugin,
  headingPlugin,
  imagePlugin
);
```

### With Enhanced SDK Context
```typescript
// Register plugins first (captures RTE context)
await ContentstackAppSDK.registerRTEPlugins(myPlugin);

// Then initialize SDK (gets enhanced context)
const sdk = await ContentstackAppSDK.init();
```

## 💡 Real-World Examples

### YouTube Embed Plugin
```typescript
const youtubePlugin = new PluginBuilder('youtube')
  .title('YouTube')
  .elementType('void')
  .render(({ attrs }) => (
    <iframe
      width="560"
      height="315"
      src={`https://www.youtube.com/embed/${attrs.videoId}`}
      frameBorder="0"
      allowFullScreen
    />
  ))
  .on('exec', (rte) => {
    const url = prompt('Enter YouTube URL:');
    const videoId = extractVideoId(url);
    if (videoId) {
      rte.insertNode({
        type: 'youtube',
        attrs: { videoId },
        children: [{ text: '' }]
      });
    }
  })
  .build();
```

### Smart Quote Plugin
```typescript
const smartQuotePlugin = new PluginBuilder('smart-quote')
  .title('Smart Quotes')
  .elementType('inline')
  .on('keydown', ({ event, rte }) => {
    if (event.key === '"') {
      event.preventDefault();
      const isStart = rte.selection.isAtStart();
      rte.insertText(isStart ? '"' : '"');
    }
  })
  .build();
```

### Dynamic Configuration Plugin
```typescript
const configurablePlugin = new PluginBuilder('configurable')
  .title('Dynamic Plugin')
  .configure(async (sdk) => {
    const config = await sdk.getConfig();
    return {
      title: config.customTitle || 'Default Title',
      icon: config.customIcon || <DefaultIcon />
    };
  })
  .on('exec', (rte) => {
    // Plugin logic using dynamic config
  })
  .build();
```

## 🎯 Best Practices

1. **Use semantic IDs**: `'heading-h2'` instead of `'plugin1'`
2. **Provide clear titles**: Users see these in the toolbar
3. **Handle edge cases**: Check for selection, validate inputs
4. **Use TypeScript**: Better development experience
5. **Test thoroughly**: Different content structures, browser compatibility

## 📚 Migration from Legacy

### Old Way (Legacy RTEPlugin)
```typescript
const oldPlugin = new RTEPlugin('my-plugin', (rte) => ({
  title: 'My Plugin',
  icon: <Icon />,
  display: ['toolbar'],
  elementType: ['block'],
  render: MyComponent
}));
oldPlugin.on('exec', handler);
```

### New Way (PluginBuilder)
```typescript
const newPlugin = new PluginBuilder('my-plugin')
  .title('My Plugin')
  .icon(<Icon />)
  .display(['toolbar'])
  .elementType('block')
  .render(MyComponent)
  .on('exec', handler)
  .build();
```

## 🔗 Resources

- [Contentstack RTE Documentation](https://www.contentstack.com/docs/developers/developer-hub/rte-location)
- [JSON RTE API Structure Guide](https://www.contentstack.com/docs/developers/apis/content-management-api/##json-rte-plugins)
- [App SDK API Reference](https://github.com/contentstack/app-sdk-docs)

---

**Happy plugin building! 🚀** 