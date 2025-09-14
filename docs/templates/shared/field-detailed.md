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

##### [setFocus()](#field-setfocus)

Sets the focus for a field when an App is being used. This method shows user presence and highlights the App's Custom Field that the user is currently accessing in Contentstack UI.

```ts
await field.setFocus();
```

##### [onChange(callback)](#field-onchange)

Executes callback when another extension or app programmatically modifies the data of this field using the `field.setData()` function. It is specifically designed for App's Custom Fields of data types text, number, boolean, or date.

```ts
field.onChange((data) => {
  console.log('Field changed:', data);
});
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
