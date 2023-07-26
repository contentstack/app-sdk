import * as Utils from "../utils";

function onData(data) {
    if (typeof data.data === "string") {
        return Promise.reject(data.data);
    }
    return Promise.resolve(data.data);
}

function onError(error) {
    return Promise.reject(error);
}

const _extend = {
    compare(type) {
        return function (key, value) {
            if (
                key &&
                value &&
                typeof key === "string" &&
                typeof value !== "undefined"
            ) {
                this._query.query[key] = this._query.query.file_size || {};
                this._query.query[key][type] = value;
                return this;
            }
            throw Error("Kindly provide valid parameters.");
        };
    },
    contained(bool) {
        const type = bool ? "$in" : "$nin";
        return function (key, value) {
            if (
                key &&
                value &&
                typeof key === "string" &&
                Array.isArray(value)
            ) {
                this._query.query[key] = this._query.query[key] || {};
                this._query.query[key][type] =
                    this._query.query[key][type] || [];
                this._query.query[key][type] =
                    this._query.query[key][type].concat(value);
                return this;
            }
            throw Error("Kindly provide valid parameters.");
        };
    },
    exists(bool) {
        return function (key) {
            if (key && typeof key === "string") {
                this._query.query[key] = this._query.query[key] || {};
                this._query.query[key].$exists = bool;
                return this;
            }
            throw Error("Kindly provide valid parameters.");
        };
    },
    logical(type) {
        return function () {
            const _query: any[] = [];
            for (let i = 0, _i = arguments.length; i < _i; i += 1) {
                if (
                    arguments[i] instanceof Query &&
                    arguments[i]._query.query
                ) {
                    _query.push(arguments[i]._query.query);
                } else if (typeof arguments[i] === "object") {
                    _query.push(arguments[i]);
                }
            }
            if (this._query.query[type]) {
                this._query.query[type] =
                    this._query.query[type].concat(_query);
            } else {
                this._query.query[type] = _query;
            }
            return this;
        };
    },
    sort(type) {
        return function (key) {
            if (key && typeof key === "string") {
                this._query[type] = key;
                return this;
            }
            throw Error("Argument should be a string.");
        };
    },
    pagination(type) {
        return function (value) {
            if (typeof value === "number") {
                this._query[type] = value;
                return this;
            }
            throw Error("Argument should be a number.");
        };
    },
};

/**
 * Creates an instance of the query
 * @hideconstructor
 */
class Query {
    module: any;
    _connection: any;
    _query: { [key: string]: any };
    contentTypeUid: string;
    only: any;
    except: any;
    addQuery: any;
    lessThan: any;
    lessThanOrEqualTo: any;
    greaterThan: any;
    greaterThanOrEqualTo: any;
    notEqualTo: any;
    containedIn: any;
    notContainedIn: any;
    exists: any;
    notExists: any;
    ascending: ReturnType<typeof _extend.sort>;
    descending: ReturnType<typeof _extend.sort>;
    beforeUid: ReturnType<typeof _extend.sort>;
    afterUid: ReturnType<typeof _extend.sort>;
    skip: ReturnType<typeof _extend.pagination>;
    limit: ReturnType<typeof _extend.pagination>;
    or: ReturnType<typeof _extend.logical>;
    and: ReturnType<typeof _extend.logical>;
    addParam: ReturnType<typeof Utils.addParam>;
    singleEntry: any;

    constructor(connection, module, contentTypeUid) {
        this.module = module;
        this._connection = connection;
        this._query = {};
        this._query.query = this._query.query || {};
        this.contentTypeUid = contentTypeUid;

        /**
         * @name Query#only
         * @function
         * @description This method is used to show the selected fields of an entry in the result set.
         * @param {String} [key=BASE] - Single field of an entry
         * @param {Array} values - Array of fields to be shown in the result set
         * @example
         * <caption> Only with field UID </caption>
         * appSDK.stack.ContentType('content_type_uid').Entry.Query().only('title').find();
         * @example
         * <caption> Only with field UID </caption>
         * appSDK.stack.ContentType('content_type_uid').Entry.Query().only('BASE','title').find();
         * @example
         * <caption> Only with field UIDs(array) </caption>
         * appSDK.stack.ContentType('content_type_uid').Entry.Query().only(['title','description']).find();
         * @returns {Query}
         */

        this.only = Utils.transform("only");

        /**
         * @name Query#except
         * @function
         * @description This method is used to hide the selected fields of an entry in the result set.
         * @param {String} [key=BASE] - Single field of an entry
         * @param {Array} values - Array of fields to be hidden in the result set
         * @example
         * <caption> Except with field uid </caption>
         * appSDK.stack.ContentType('content_type_uid').Entry.Query().except('title').find();
         * @example
         * <caption> Except with field uid </caption>
         * appSDK.stack.ContentType('content_type_uid').Entry.Query().except('BASE','title').find();
         * @example
         * <caption> Except with field uids(array) </caption>
         * appSDK.stack.ContentType('content_type_uid').Entry.Query().except(['title','description']).find();
         * @returns {Query}
         */

        this.except = Utils.transform("except");
        /**
       This method includes a query parameter in your query.
       @name Query#addQuery
       @function
       @example appSDK.stack.ContentType('content_type_uid').Entry.Query().addQuery('key', 'value').find().then().catch();
       @param {string} key - Key of the parammeter
       @param {string} value - Value of the parammeter
       @return {Query}
      */
        this.addQuery = Utils.addQuery;

        /**
         * @name Query#lessThan
         * @description This method provides only the entries with values less than the specified value for a field.
         * @param {String} key - UID of the field
         * @param {*} value - The value used to match or compare
         * @example appSDK.stack.ContentType('blog').lessThan('created_at','2015-06-22')
         * @returns {Query}
         */
        this.lessThan = _extend.compare("$lt");

        /**
         * @name Query#lessThanOrEqualTo
         * @description This method provides only the entries with values less than or equal to the specified value for a field.
         * @param {String} key - UID of the field
         * @param {*} value - The value used to match or compare
         * @example appSDK.stack.ContentType('blog').lessThanOrEqualTo('created_at','2015-03-12')
         * @returns {Query}
         */
        this.lessThanOrEqualTo = _extend.compare("$lte");
        /**
         * @function
         * @name Query#greaterThan
         * @description This method provides only the entrieswith values
         *  greater than the specified value for a field.
         * @param {String} key - UID of the field
         * @param {*} value - The value used to match or compare
         * @example appSDK.stack.ContentType('blog').greaterThan('created_at','2015-03-12')
         * @returns {Query}
         */
        this.greaterThan = _extend.compare("$gt");

        /**
         * @function
         * @name Query#greaterThanOrEqualTo
         * @description This method provides only the entries with values greater than or equal to the specified value for a field.
         * @param {String} key - UID of the field
         * @param {*} value - The value used to match or compare
         * @example appSDK.stack.ContentType('blog').greaterThanOrEqualTo('created_at', '2015-06-22')
         * @returns {Query}
         */
        this.greaterThanOrEqualTo = _extend.compare("$gte");

        /**
         * @function
         * @name Query#notEqualTo
         * @description This method provides only the entries with values not equal to the specified value for a field.
         * @param {String} key - UID of the field
         * @param {*} value - The value used to match or compare
         * @example appSDK.stack.ContentType('blog').notEqualTo('title','Demo')
         * @returns {Query}
         */
        this.notEqualTo = _extend.compare("$ne");

        /**
         * @function
         * @name Query#containedIn
         * @description This method provides only the entries with values matching the specified values for a field.
         * @param {String} key - UID of the field
         * @param {*} value - An array of values that are to be used to match or compare
         * @example appSDK.stack.ContentType('blog').containedIn('title', ['Demo', 'Welcome'])
         * @returns {Query}
         */
        this.containedIn = _extend.contained(true);

        /**
         * @function
         * @name Query#notContainedIn
         * @description This method provides only the entries that do not contain values matching the specified values for a field.
         * @param {String} key - UID of the field
         * @param {Array} value - An array of values that are to be used to match or compare
         * @example appSDK.stack.ContentType('blog').notContainedIn('title', ['Demo', 'Welcome'])
         * @returns {Query}
         */
        this.notContainedIn = _extend.contained(false);

        /**
         * @function
         * @name Query#exists
         * @description This method provides only the entries that contains the field matching the specified field UID.
         * @param {String} key - UID of the field
         * @example appSDK.stack.ContentType('blog').exists('featured')
         * @returns {Query}
         */
        this.exists = _extend.exists(true);

        /**
         * @function
         * @name Query#notExists
         * @description This method provides only the entries that do not contain the field matching the specified field UID.
         * @param {String} key - UID of the field
         * @example appSDK.stack.ContentType('blog').notExists('featured')
         * @returns {Query}
         */
        this.notExists = _extend.exists(false);

        /**
         * @function
         * @name Query#ascending
         * @description This parameter sorts the entries in ascending order on the basis of the value of the specified field.
         * @param {String} key - Field UID to be used for sorting.
         * @example appSDK.stack.ContentType('blog').ascending('created_at')
         * @returns {Query}
         */
        this.ascending = _extend.sort("asc");

        /**
         * @function
         * @name Query#descending
         * @description This method sorts the entries in descending order on the basis of the specified field.
         * @param {String} key - Field UID to be used for sorting
         * @example appSDK.stack.ContentType('blog').descending('created_at')
         * @returns {Query}
         */
        this.descending = _extend.sort("desc");

        /**
         * @function
         * @name Query#beforeUid
         * @description This method provides only the entries that are placed before the specified entry ID.
         * @param {String} uid - UID of the entry
         * @example appSDK.stack.ContentType('blog').beforeUid('blt1234567890abcdef')
         * @returns {Query}
         * @ignore
         */
        this.beforeUid = _extend.sort("before_uid");

        /**
         * @function
         * @name Query#afterUid
         * @description This method provides only the entries that are placed after the specified entry ID.
         * @param {String} uid - UID of the entry
         * @example appSDK.stack.ContentType('blog').afterUid('blt1234567890abcdef')
         * @returns {Query}
         * @ignore
         */
        this.afterUid = _extend.sort("after_uid");

        /**
         * @function
         * @name Query#skip
         * @description This method skips the specified number of entries.
         * @param {Number} skip - Number of entries to be skipped
         * @example appSDK.stack.ContentType('blog').skip(5)
         * @returns {Query}
         */
        this.skip = _extend.pagination("skip");

        /**
         * @function
         * @name Query#limit
         * @description This method limits the response by providing only the specified number of entries.
         * @param {Number} limit - Maximum number of entries to be returned in the result.
         * @example appSDK.stack.ContentType('blog').limit(10)
         * @returns {Query}
         */
        this.limit = _extend.pagination("limit");

        /**
         * @function
         * @name Query#or
         * @description This method performs the OR operation on the specified query objects and provides only the matching entries.
         * @param {object} Array of query objects/raw queries
         *  to be taken into consideration
         * @example
         * <caption> OR with query instances</caption>
         * let Query1 = appSDK.stack.ContentType('blog').Entry.Query().where('title', 'Demo')
         * let Query2 = appSDK.stack.ContentType('blog').Entry.Query().lessThan('comments', 10)
         * let blogQuery = appSDK.stack.ContentType('blog').or(Query1, Query2)
         * @example
         * <caption> OR with query instances</caption>
         * let Query1 = appSDK.stack.ContentType('blog').Entry.Query().where('title', 'Demo').getQuery()
         * let Query2 = appSDK.stack.ContentType('blog').Entry.Query().lessThan('comments', 10).getQuery()
         * let blogQuery = appSDK.stack.ContentType('blog').or(Query1, Query2)
         * @returns {Query}
         */
        this.or = _extend.logical("$or");

        /**
         * @function
         * @name Query#and
         * @description This method performs the AND operation on the specified query objects and provides only the matching entries.
         * @param {object} Array of query objects/raw queries to be taken into consideration
         * @example
         * <caption> AND with raw queries</caption>
         * let Query1 = appSDK.stack.ContentType('blog').Entry.Query().where('title', 'Demo');
         * let Query2 = appSDK.stack.ContentType('blog').Entry.Query().lessThan('comments', 10);
         * let blogQuery = appSDK.stack.ContentType('blog').and(Query1, Query2)
         * @example
         * <caption> .and with raw queries</caption>
         * let Query1 = appSDK.stack.ContentType('blog').Entry.Query().where('title', 'Demo').getQuery();
         * let Query2 = appSDK.stack.ContentType('blog').Entry.Query().lessThan('comments', 10).getQuery();
         * let blogQuery = appSDK.stack.ContentType('blog').and(Query1, Query2)
         * @returns {Query}
         */
        this.and = _extend.logical("$and");
        /**
       This method includes a query parameter in your query.
       @name Query#addParam
       @function
       @example appSDK.stack.ContentType('content_type_uid').Entry.Query().addParam('key', 'value').find().then().catch();
       @param {string} key - Key of the parammeter
       @param {string} value - Value of the parammeter
       @return {Query}
      */
        this.addParam = Utils.addParam;
    }

    // -------------------------------------Entry Queries--------------------------------------------------
    /**
     * @function
     * @name Query#includeReference
     * @description This method is used to include referenced entries from other content types. Note: This method is only valid for querying {@link Stack#ContentType#Entry}.
     * @example
     * <caption> .includeReference with reference_field_uids as array </caption>
     * stack.ContentType('contenttype_uid').Entry.Query().includeReference(['category', 'author']).find()
     * @example
     * <caption> .includeReference with reference_field_uids </caption>
     * stack.ContentType('contenttype_uid').Entry.Query().includeReference('category', 'author').find()
     * @returns {Query}
     */

    /**
     * @function
     * @name Query#includeSchema
     * @description This method is used to include the schema of the current contenttype in result set along with the entry/entries. Note: This method is only valid for querying {@link Stack#ContentType#Entry}.
     * @example appSDK.stack.ContentType('contenttype_uid').Entry.Query().includeSchema().find()
     * @returns {Query}
     */

    /**
     * @function
     * @name Query#language
     * @description This method is used to set the language code of which you want to retrieve the data. Note: This method is only valid for querying {@link Stack#ContentType#Entry}.
     * @param {String} languageCode - Language code, for e.g. 'en-us', 'ja-jp', and so on
     * @example appSDK.stack.ContentType('contenttype_uid').Entry.Query().language('en-us').find()
     * @returns {Query}
     */

    /**
     * @function
     * @name Query#includeContentType
     * @description This method is used to include the current content type in the result set along with the entry(ies). Note: This method is only valid for querying {@link Stack#ContentType#Entry}.
     * @example appSDK.stack.ContentType('contenttype_uid').Entry.Query().includeContentType().find()
     * @returns {Query}
     */

    /**
     * @function
     * @name Query#includeOwner
     * @description This method is used to include the owner of the entry(ies) in the result set. Note: This method is only valid for querying {@link Stack#ContentType#Entry}.
     * @example appSDK.stack.ContentType('contenttype_uid').Entry.Query().includeOwner().find()
     * @returns {Query}
     */
    // -----------------------------------------Entry Queries End------------------------------------------------------

    /**
     * @function
     * @name Query#environment
     * @description This method is used to set the environment name of which you want to retrieve the data.
     * @param {String} environment_uid - UID/Name of environment
     * @example appSDK.stack.ContentType('contenttype_uid').Entry.Query().environment('development').find()
     * @returns {Query}
     */

    /**
     * @description This method provides only the entries containing field values matching the specified condition.
     * @param {String} key - UID of the field
     * @param {*} value - The value used to match or compare
     * @example appSDK.stack.ContentType('blog').where('title','Demo')
     * @returns {Query}
     */
    equalTo(key, value) {
        if (key && typeof key === "string") {
            this._query.query[key] = value;

            return this;
        }
        throw Error("Kindly provide valid parameters.");
    }

    where(key, value) {
        if (key && typeof key === "string") {
            this._query.query[key] = value;
            return this;
        }
        throw Error("Kindly provide valid parameters.");
    }

    /**
     * @description This method provides only the number of entries matching the specified filters.
     * @example appSDK.stack.ContentType('blog').count()
     * @returns {Query}
     */
    count() {
        this._query.count = true;
        const options = {
            content_type_uid: this.contentTypeUid,
            params: this._query,
            action: `get${this.module}`,
        };
        return this._connection
            .sendToParent("stackQuery", options)
            .then(onData)
            .catch(onError);
    }

    /**
     * @description This method is used to set raw queries on the Query instance.
     * @param {object} query -  Raw{json} queries to filter the entries in the result set.
     * @returns {Query}
     */
    query(query) {
        if (typeof query === "object") {
            this._query.query = Utils.mergeDeep(this._query.query, query);
            return this;
        }
        throw Error("Kindly provide valid parameters");
    }

    /**
     * @description The ’tags’ parameter allows you to specify an array of tags to search for objects.
     * @param {Array} values - Tags
     * @example appSDK.stack.ContentType('blog').tags(['technology', 'business'])
     * @returns {Query}
     */
    tags(values) {
        if (Array.isArray(values)) {
            this._query.tags = values;
            return this;
        }
        throw Error("Kindly provide valid parameters");
    }

    /**
     * @description This method also includes the total number of entries returned in the response.
     * @example appSDK.stack.ContentType('blog').includeCount()
     * @returns {Query}
     */
    includeCount() {
        this._query.include_count = true;
        return this;
    }

    /**
     * @summary returns Returns the raw query which can be used for further calls (.and/.or).
     * @description This method provides raw{json} queries based on the filters applied on the Query object.
     * @example appSDK.stack.ContentType('blog').where('title','Demo').getQuery()
     * @returns {Query}
     */
    getQuery() {
        return this._query.query;
    }

    /**
     * @description This method provides only the entries matching the regular expression for the specified field.
     * @param {String} key - UID of the field
     * @param {*} value - The value used to match or compare
     * @param {String} [options] - Match or compare a value in the entry
     * @example
     * <caption> .regex without options</caption>
     * let blogQuery = appSDK.stack.ContentType('blog').regex('title','^Demo')
     * @example
     * <caption> .regex with options</caption>
     * let blogQuery = appSDK.stack.ContentType('blog').regex('title','^Demo', 'i')
     * @returns {Query}
     */
    regex(key, value, options) {
        if (
            key &&
            value &&
            typeof key === "string" &&
            typeof value === "string"
        ) {
            this._query.query[key] = {
                $regex: value,
            };
            if (options) this._query.query[key].$options = options;
            return this;
        }
        throw Error("Kindly provide valid parameters.");
    }

    /**
     * @description This method is used to search data in entries.
     * @param {string} value - Value to search in the entries.
     * @example appSDK.stack.ContentType('blog').search('Welcome to demo')
     * @returns {Query}
     */
    search(value) {
        if (value && typeof value === "string") {
            this._query.typeahead = value;
            return this;
        }
        throw Error("Kindly provide valid parameters.");
    }

    /**
     * @description This method provides all the entries which satisfy the specified query.
     * @example
     * let blogQuery = appSDK.stack.ContentType('blog').find()
     */
    find() {
        const options = {
            content_type_uid: this.contentTypeUid,
            params: this._query,
            action: `get${this.module}`,
        };
        return this._connection
            .sendToParent("stackQuery", options)
            .then(onData)
            .catch(onError);
    }

    /**
     * @description This method provides a single entry from the result set.
     * @example
     * let blogQuery = appSDK.stack.ContentType('blog').findOne()
     */
    findOne() {
        this.singleEntry = true;
        this._query.limit = 1;
        const options = {
            content_type_uid: this.contentTypeUid,
            params: this._query,
            action: `get${this.module}`,
        };
        return this._connection
            .sendToParent("stackQuery", options)
            .then(onData)
            .catch(onError);
    }
}

export default Query;
