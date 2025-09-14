### Stack Object

#### Methods

##### [getData()](#stack-getdata)

Returns the data of the current stack.

```ts
const stackData = stack.getData();
console.log('Stack name:', stackData.name);
console.log('Stack UID:', stackData.uid);
```

##### [getAllStacks(orgUid?, params?)](#stack-getallstacks)

Returns all stacks in the current organization.

```ts
const allStacks = await stack.getAllStacks();
const orgStacks = await stack.getAllStacks('org_uid');
```

##### [getContentType(uid, params?)](#stack-getcontenttype)

Retrieves data of a single content type.

```ts
const contentType = await stack.getContentType('content_type_uid');
```

##### [getContentTypes(query?, params?)](#stack-getcontenttypes)

Retrieves data of all content types in the stack.

```ts
const contentTypes = await stack.getContentTypes();
const filteredTypes = await stack.getContentTypes({ title: { $regex: 'blog' } });
```

##### [getEntries(contentType, params?)](#stack-getentries)

Retrieves entries of a specific content type.

```ts
const entries = await stack.getEntries('content_type_uid');
const publishedEntries = await stack.getEntries('content_type_uid', { publish: true });
```

##### [getAssets(query?, params?)](#stack-getassets)

Retrieves assets from the stack.

```ts
const assets = await stack.getAssets();
const images = await stack.getAssets({ content_type: 'image/*' });
```

##### [getManagementTokens()](#stack-getmanagementtokens)

Gets details of all management tokens for the stack.

```ts
const tokens = await stack.getManagementTokens();
```

##### [search(queries, apiKey?)](#stack-search)

Gets search results based on user query.

```ts
const searchResults = await stack.search({
  type: 'entries',
  query: { content_type: 'blog_post' },
  limit: 10
});
```

##### [getEnvironment(name, params?)](#stack-getenvironment)

Retrieves environment details.

```ts
const environment = await stack.getEnvironment('production');
```

##### [getEnvironments(query?, params?)](#stack-getenvironments)

Retrieves details of all environments.

```ts
const environments = await stack.getEnvironments();
```

##### [getReleases(query?, params?)](#stack-getreleases)

Retrieves details of releases of a stack.

```ts
const releases = await stack.getReleases();
```

##### [getPublishes(query?, params?)](#stack-getpublishes)

Retrieves details of publish queue of a stack.

```ts
const publishQueue = await stack.getPublishes();
```

##### [getLocale(code, params?)](#stack-getlocale)

Retrieves a specific locale.

```ts
const locale = await stack.getLocale('en-us');
```

##### [getLocales(query?, params?)](#stack-getlocales)

Retrieves all locales.

```ts
const locales = await stack.getLocales();
```

##### [getWorkflow(uid, params?)](#stack-getworkflow)

Retrieves a specific workflow.

```ts
const workflow = await stack.getWorkflow('workflow_uid');
```

##### [getWorkflows(query?, params?)](#stack-getworkflows)

Retrieves all workflows.

```ts
const workflows = await stack.getWorkflows();
```

##### [getAllBranches()](#stack-getallbranches)

Returns all branches in the current stack.

```ts
const branches = stack.getAllBranches();
```

##### [getCurrentBranch()](#stack-getcurrentbranch)

Returns the current branch details.

```ts
const currentBranch = stack.getCurrentBranch();
```

##### [getVariantById(variant_uid)](#stack-getvariantbyid)

Returns variant group details.

```ts
const variant = await stack.getVariantById('variant_uid');
```

##### [getGlobalField(uid, params?)](#stack-getglobalfield)

Retrieves a specific global field.

```ts
const globalField = await stack.getGlobalField('global_field_uid');
```

##### [getGlobalFields(query?, params?)](#stack-getglobalfields)

Retrieves all global fields.

```ts
const globalFields = await stack.getGlobalFields();
```
