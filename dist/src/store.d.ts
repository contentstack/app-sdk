import { GenericObjectType } from "./types/common.types";
import postRobot from "post-robot";
/**
 * Class used by an app to store your data in {@link external:localStorage}.
 * @hideconstructor
 */
declare class Store {
    _connection: typeof postRobot;
    constructor(connection: typeof postRobot);
    /**
     * Retrieves the stored data value associated with the given key.
     * @param {string} key - The key of the stored data.
     * @example
     * extension.store.get('key').then((value) => console.log(value)); // Logs the value for the given key
     * @returns {Promise<any>} A Promise that resolves to the value associated with the key.
     */
    get(key: string): Promise<any>;
    /**
     * Retrieves an object with all the stored key-value pairs.
     * @example await extension.store.getAll(); // Returns a Promise containing the stored data.
     * @return {Promise<GenericObjectType>} A Promise that resolves with the stored key-value pairs as an object.
     */
    getAll(): Promise<GenericObjectType>;
    /**
     * Sets the value of a key.
     * @param {string} key The key for the stored data.
     * @param {*} value The data to be stored.
     * @example await extension.store.set('key', 'value'); // Returns a Promise that resolves with the success status.
     * @return {Promise<boolean>} A Promise that resolves with the success status (true when the value was set successfully).
     */
    set(key: string, value: any): Promise<boolean>;
    /**
     * Removes the value associated with a key from the store.
     * @param {string} key The key whose value needs to be removed.
     * @example await extension.store.remove('key'); // Returns a Promise that resolves with the success status.
     * @return {Promise<boolean>} A Promise that resolves with the success status (true when the value was removed successfully).
     */
    remove(key: string): Promise<boolean>;
    /**
     * Clears all the stored data of an extension.
     * @example await extension.store.clear(); // Returns a Promise that resolves with the success status.
     * @returns {Promise<boolean>} A Promise that resolves with the success status (true when all values are cleared successfully).
     */
    clear(): Promise<boolean>;
}
export default Store;
//# sourceMappingURL=store.d.ts.map