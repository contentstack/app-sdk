import { GenericObjectType } from "./types/common.types";
import { onError } from "./utils/utils";
import postRobot from "post-robot";

/**
 * Class used by an app to store your data in {@link external:localStorage}.
 * @hideconstructor
 */
class Store {
    _connection: typeof postRobot;

    constructor(connection: typeof postRobot) {
        this._connection = connection;
    }

    /**
     * Retrieves the stored data value associated with the given key.
     * @param {string} key - The key of the stored data.
     * @example
     * appSDK.store.get('key').then((value) => console.log(value)); // Logs the value for the given key
     * @returns {Promise<any>} A Promise that resolves to the value associated with the key.
     */
    get(key: string): Promise<any> {
        if (!key || typeof key !== "string") {
            throw new Error("Kindly provide valid parameters");
        }
        return this._connection
            .sendToParent("store", { action: "get", key })
            .then((event: { data: GenericObjectType }) =>
                Promise.resolve(event.data)
            )
            .catch(onError);
    }

    /**
     * Retrieves an object with all the stored key-value pairs.
     * @example await appSDK.store.getAll(); // Returns a Promise containing the stored data.
     * @return {Promise<GenericObjectType>} A Promise that resolves with the stored key-value pairs as an object.
     */
    getAll(): Promise<GenericObjectType> {
        return this._connection
            .sendToParent("store", { action: "getAll" })
            .then(({ data = {} }) => Promise.resolve(data))
            .catch(onError);
    }

    /**
     * Sets the value of a key.
     * @param {string} key The key for the stored data.
     * @param {*} value The data to be stored.
     * @example await appSDK.store.set('key', 'value'); // Returns a Promise that resolves with the success status.
     * @return {Promise<boolean>} A Promise that resolves with the success status (true when the value was set successfully).
     */
    set(key: string, value: any): Promise<boolean> {
        if (!key || !value || typeof key !== "string") {
            throw new Error("Kindly provide valid parameters");
        }
        return this._connection
            .sendToParent("store", { action: "set", key, value })
            .then(() => Promise.resolve(true))
            .catch(onError);
    }

    /**
     * Removes the value associated with a key from the store.
     * @param {string} key The key whose value needs to be removed.
     * @example await appSDK.store.remove('key'); // Returns a Promise that resolves with the success status.
     * @return {Promise<boolean>} A Promise that resolves with the success status (true when the value was removed successfully).
     */
    remove(key: string): Promise<boolean> {
        if (!key || typeof key !== "string") {
            throw new Error("Kindly provide valid parameters");
        }
        return this._connection
            .sendToParent("store", { action: "remove", key })
            .then(() => Promise.resolve(true))
            .catch(onError);
    }

    /**
     * Clears all the stored data of an UI Location.
     * @example await appSDK.store.clear(); // Returns a Promise that resolves with the success status.
     * @returns {Promise<boolean>} A Promise that resolves with the success status (true when all values are cleared successfully).
     */
    clear(): Promise<boolean> {
        return this._connection
            .sendToParent("store", { action: "clear" })
            .then(() => Promise.resolve(true))
            .catch(onError);
    }
}

export default Store;
