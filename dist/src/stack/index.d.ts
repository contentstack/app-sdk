import Asset from './api/asset/index';
import ContentType from './api/content-type/index';
import { BranchDetail, StackAdditionalData, StackDetail } from '../types/stack.types';
/**
 * Class representing the current stack in Contentstack UI.
 */
declare class Stack {
    /**
     * @hideconstructor
     */
    _connection: any;
    _data: StackDetail;
    ContentType: typeof ContentType;
    Asset: typeof Asset;
    private _currentBranch;
    constructor(data: StackDetail | undefined, connection: any, additionalData: StackAdditionalData);
    /**
     * This method returns the data of the current stack.
     * @return {Object} Returns stack data.
     */
    getData(): StackDetail;
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
}
export default Stack;
//# sourceMappingURL=index.d.ts.map