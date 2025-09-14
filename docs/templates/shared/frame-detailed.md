## Frame Object

Window management and resizing functionality for UI locations.

#### Methods

### [enableResizing()](#frame-enableresizing)

Activates the resize button that allows you to resize the window size of your Dashboard Widget.

```ts
const frame = dashboard.frame;
await frame.enableResizing();
```

**Returns:** `Promise<void>`

### [updateHeight(height?)](#frame-updateheight)

Updates the Widget height on Contentstack UI. If the 'height' argument is not provided, it will automatically calculate the scroll height and adjust the widget window height accordingly.

```ts
const frame = customField.frame;
await frame.updateHeight(600);
```

**Parameters:**
- `height` (optional): The desired height of the iframe window

**Returns:** `Promise<void>`

### [enableAutoResizing()](#frame-enableautoresizing)

Enables auto resizing of the Widget height.

```ts
const frame = fieldModifier.frame;
frame.enableAutoResizing();
```

**Returns:** `Window` - The context of the Window class

### [disableAutoResizing()](#frame-disableautoresizing)

Disables auto resizing of the Widget height.

```ts
const frame = fieldModifier.frame;
frame.disableAutoResizing();
```

**Returns:** `Window` - The context of the Window class

### [onDashboardResize(callback)](#frame-ondashboardresize)

Executes the callback function whenever a Dashboard Widget is maximized or minimized. Only applicable on Dashboard Widgets.

```ts
const frame = dashboard.frame;
frame.onDashboardResize((state) => {
  console.log('Dashboard resized:', state);
});
```

**Parameters:**
- `callback`: The function to be called when a Dashboard Widget is maximized or minimized

**Returns:** `boolean` - Returns true if the operation completes successfully without errors

### [enablePaddingTop()](#frame-enablepaddingtop)

Adds a padding on top of the Dashboard widget.

```ts
const frame = dashboard.frame;
await frame.enablePaddingTop();
```

**Returns:** `Promise<void>`

### [disablePaddingTop()](#frame-disablepaddingtop)

Removes the padding previously added on top of the Dashboard widget.

```ts
const frame = dashboard.frame;
await frame.disablePaddingTop();
```

**Returns:** `Promise<void>`

### [updateDimension(dimension?)](#frame-updatedimension)

Updates the UI location height and width on Contentstack UI. If the value is not passed, it will update the height and width of the UI location with the current height and width of the UI location.

```ts
const frame = fieldModifier.frame;
await frame.updateDimension({ height: 400, width: 300 });
```

**Parameters:**
- `dimension` (optional): Object with `height` and `width` properties

**Returns:** `Promise<void>`

### [closeModal()](#frame-closemodal)

Closes the app modal.

```ts
const frame = fieldModifier.frame;
await frame.closeModal();
```

**Returns:** `Promise<void>`
