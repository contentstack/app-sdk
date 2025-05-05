import { BranchDetail, GetAllStacksOptions, StackAdditionalData, StackDetail, StackSearchQuery } from '../types/stack.types';
import { IManagementTokenDetails } from '../types';
import { GenericObjectType } from "../types/common.types";
/**
 * Class representing the current stack in Contentstack UI.
 */
declare class Stack {
    /**
     * @hideconstructor
     */
    _connection: any;
    _data: StackDetail;
    ContentType: any;
    Asset: any;
    private _currentBranch;
    constructor(data: StackDetail | undefined, connection: any, additionalData: StackAdditionalData);
    /**
     * This method returns the data of the current stack.
     * @return Returns stack data.
     */
    getData(): StackDetail;
    /**
     * This method returns all the stacks in the current organization.
     * @param query asks for organization UID and query params to get all stacks
     * @returns Stacks within current organization
     */
    getAllStacks({ orgUid, params }?: GetAllStacksOptions): Promise<StackDetail[]>;
    /**
     * Get the details of all the management tokens of the stack.
     * Note: This API does not return the token value.
     * @see {@link https://www.contentstack.com/docs/developers/apis/content-management-api/#get-all-management-tokens | Get all management tokens}
     * @returns Details of all the management token of the stack
     */
    getManagementTokens(): Promise<IManagementTokenDetails[]>;
    /**
     * Gets the results of the search based on user query
     * @param queries Array of key value pair of query parameters
     * @param apiKey API key of the stack
     * @returns Result of the query
     */
    search(queries: StackSearchQuery, apiKey?: string | null): any;
    /**
     * This API allows you to retrieve data of a content type of a stack using the {@link https://www.contentstack.com/docs/apis/content-management-api/#get-a-single-content-type| Content Type API} requests. This method returns a Promise object.
     * @param {string} uid Uid of the desired content type
     * @param {Object} params Optional parameters for the GET call
     * @return {Object} A promise object which will be resolved with content type details.
     */
    getContentType(uid: string, params?: {}): Promise<{
        [key: string]: any;
    }>;
    /**
     * This API allows you to retrieve data of a content types of a stack using the {@link https://www.contentstack.com/docs/apis/content-management-api/#get-all-content-types| Content Types API} requests. This method returns a Promise object.
     * @param {Object} query Query for the GET call
     * @param {Object} params Optional parameters for the GET call
     * @return {Object} A promise object which will be resolved with details of the content type.
     */
    getContentTypes(query?: {}, params?: {
        [key: string]: any;
    }): Promise<{
        [key: string]: any;
    }>;
    /**
     * This API allows you to retrieve environment details of a stack using the {@link https://www.contentstack.com/docs/apis/content-management-api/#get-a-single-environment| Environment API} requests. This method returns a Promise object.
     * @param {string} name Name of the desired environment
     * @param {Object} params Optional parameters for the GET call
     * @return {Object} A promise object which will be resolved with environment details.
     */
    getEnvironment(name: string, params?: {}): any;
    /**
     * This API allows you to retrieve details of environments of a stack using the {@link https://www.contentstack.com/docs/apis/content-management-api/#get-all-environments| Environments API} requests. This method returns a Promise object.
     * @param {Object} query Query for the GET call
     * @param {Object} params Optional parameters for the GET call
     * @return {Object} A Promise object which will be resolved with details of the environments.
     */
    getEnvironments(query?: {}, params?: {}): any;
    /**
     * This API allows you to retrieve details of releases of a stack using the {@link https://www.contentstack.com/docs/developers/apis/content-management-api/#get-all-releases| Releases API} requests. This method returns a Promise object.
     * @param {Object} query Query for the GET call
     * @param {Object} params Optional parameters for the GET call
     * @return {Object} A Promise object which will be resolved with details of the releases.
     */
    getReleases(query?: {}, params?: {}): any;
    /**
     * This API allows you to retrieve details of publish queue of a stack using the {@link https://www.contentstack.com/docs/developers/apis/content-management-api/#get-publish-queue| Publish Queue API} requests. This method returns a Promise object.
     * @param {Object} query Query for the GET call
     * @param {Object} params Optional parameters for the GET call
     * @return {Object} A Promise object which will be resolved with details of the publish queue.
     */
    getPublishes(query?: {}, params?: {}): any;
    /**
     * This API allows you to retrive a locale of a stack using the {@link https://www.contentstack.com/docs/apis/content-management-api/#get-a-language| Language API} requests. Method returns a Promise object.
     * @param {string} code Code of the desired locale
     * @param {Object} params Optional parameters for the GET call
     * @return {Object} A promise object which will be resolved with locale details.
     */
    getLocale(code: string, params?: {}): any;
    /**
     * This API allows you to retrive the locales of a stack using the {@link https://www.contentstack.com/docs/apis/content-management-api/#get-all-content-types| Languages API} requests. Method returns a Promise object.
     * @param {Object} query Query for the GET call
     * @param {Object} params Optional parameters for the GET call
     * @return {Object} A Promise object which will be resolved with details of the locales.
     */
    getLocales(query?: {}, params?: {}): any;
    /**
     * This API allows you to retrive a workflow of a stack using the {@link https://www.contentstack.com/docs/apis/content-management-api/#get-a-workflow| Language API} requests. Method returns a Promise object.
     * @param {string} code Code of the desired locale
     * @param {Object} params Optional parameters for the GET call
     * @return {Object} A promise object which will be resolved with locale details.
     */
    getWorkflow(uid: string, params?: {}): any;
    /**
     * This API allows you to retrive the locales of a stack using the {@link https://www.contentstack.com/docs/apis/content-management-api/#get-all-content-types| Languages API} requests. Method returns a Promise object.
     * @param {Object} query Query for the GET call
     * @param {Object} params Optional parameters for the GET call
     * @return {Object} A Promise object which will be resolved with details of the locales.
     */
    getWorkflows(query?: {}, params?: {}): any;
    /**
     * This API allows you to retrieve all the branches in the current stack
     * @returns All branches of the current stack
     */
    getAllBranches(): BranchDetail[];
    /**
     * Returns the details of the current branch of the stack if available
     * @returns current branch of the current stack if available
     */
    getCurrentBranch(): BranchDetail | null;
    /**
     * Returns variant groups details.
     * @returns variant groups details.
     */
    getVariantById(variant_uid: string): any;
    /**
     * This API allows you to retrieve data of a single global field of a stack using the {@link https://www.contentstack.com/docs/developers/apis/content-management-api#get-single-global-field| Global Field API} requests. This method returns a Promise object.
     * @param {string} uid of the desired global field
     * @param {Object} params Optional parameters for the GET call
     * @return {Object} A promise object which will be resolved with global field details.
     */
    getGlobalField(uid: string, params?: {}): Promise<{
        [key: string]: GenericObjectType;
    }>;
    /**
     * This API allows you to retrieve data of all global fields of a stack using the {@link https://www.contentstack.com/docs/developers/apis/content-management-api#get-all-global-fields| Global Fields API} requests. This method returns a Promise object.
     * @param {Object} query Query for the GET call
     * @param {Object} params Optional parameters for the GET call
     * @return {Object} A promise object which will be resolved with global field details.
     */
    getGlobalFields(query?: {}, params?: {
        [key: string]: GenericObjectType;
    }): Promise<{
        [key: string]: GenericObjectType;
    }>;
}
export default Stack;
//# sourceMappingURL=index.d.ts.map