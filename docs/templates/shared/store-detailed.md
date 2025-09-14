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
