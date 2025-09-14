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
