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
