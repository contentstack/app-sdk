import EventEmitter from 'wolfy87-eventemitter';
import Field from './field';
import { ICurrentContentType, IFieldInitData, ISidebarInitData } from './types';

/** Class representing an entry from Contentstack UI. Not available for Dashboard Widget extension.  */

class Entry {
  /**
   * @hideconstructor
   */

  content_type: ICurrentContentType
  _data: { [key: string]: any }
  locale: string
  _connection: any
  _emitter: EventEmitter
  _changedData?: { [key: string]: any; }

  constructor(initializationData: IFieldInitData | ISidebarInitData, connection: any, emitter: EventEmitter) {
    /**
     * Gets the content type of the current entry.
     * @type {Object}
     */
    this.content_type = initializationData.data.content_type;

    this._data = initializationData.data.entry;
    /**
     * Gets the locale of the current entry.
     * @type {string}
     */
    this.locale = initializationData.data.locale;

    this._connection = connection;

    this._emitter = emitter;

    const thisEntry = this;

    this._emitter.on('entrySave', (event: { data: { [key: string]: any; }; }) => {
      thisEntry._data = event.data;
    });

    this._emitter.on('entryChange', (event: { data: { [key: string]: any; }; }) => {
      thisEntry._changedData = event.data;
    });
  }

  /**
   * Gets data of the current entry.
   * @return {Object} Returns entry data.
  */

  getData() {
    return this._data;
  }


  /**
   * Gets the field object which allows you to interact with the field.
   * This object will have all the same methods and properties of extension.field.
   * Note: For fields initialized using the getFields function, the setData function currently works only for the following fields: as single_line, multi_line, RTE, markdown, select, number, boolean, date, link, and extension of data type text, number, boolean, and date.
   * @example
   * var field = entry.getField('field_uid');
   * var fieldSchema = field.schema;
   * var fieldUid = field.uid;
   * var fieldData = field.getData();
   * @param {string} uid Unique ID of the field
   * @return {Object} Field object
  */


  getField(uid: string) {
    const path = uid.split('.');
    let value = this._data;
    let schema = this.content_type.schema;

    try {
      let skipNext = false;
      let skipNextTwo = false;
      path.forEach((key: string | number, index: number) => {
        if (skipNext) {
          if (skipNextTwo) {
            skipNextTwo = false;
          } else {
            skipNext = false;
          }
          return;
        }

        schema = schema.find((x: { uid: any; }) => x.uid === key);
        if (!schema) { throw Error('schema not found'); }

        value = value[key];

        if ((schema.data_type === 'group' || schema.data_type === 'global_field') && schema.multiple === false
          && path.length !== (index + 1)) {
          schema = schema.schema;
        } else if ((schema.data_type === 'group' || schema.data_type === 'global_field') && schema.multiple === true
          && path.length !== (index + 1)) {
          schema = schema.schema;
          value = value[path[index + 1]];
          skipNext = true;
        } else if (schema.data_type === 'blocks' && path.length !== (index + 1)) {
          let blockId = Object.keys(value[path[index + 1]])[0];
          schema = schema.blocks.find((block: { uid: string; }) => block.uid === blockId);
          if (path.length === index + 2) { // complete block value with uid
            value = value[path[index + 1]];
          } else { // block value without uid
            value = value[path[index + 1]][blockId];
            schema = schema.schema;
          }

          skipNext = true;
          skipNextTwo = true;
        }
      });
    } catch (e) {
      throw Error('Invalid uid, Field not found');
    }
    const fieldIntilaizationDataObject = {
      data: {
        uid, value, schema, data_type: schema.data_type
      }
    };

    //@ts-ignore
    const fieldObject = new Field(fieldIntilaizationDataObject, this._connection, this._emitter);
    delete fieldObject.onChange;
    return fieldObject;
  }

  /**
   * This function executes the callback function every time an entry is saved.
   * @param {function} callback The function to be called when an entry is saved.
   */


  onSave(callback: (arg0: any) => void) {
    const entryObj = this;
    if (callback && typeof (callback) === 'function') {
      entryObj._emitter.on('entrySave', (event: { data: any; }) => {
        callback(event.data);
      });
    } else {
      throw Error('Callback must be a function');
    }
  }

  /**
   * The field.onChange() function is called when another extension programmatically changes the data of the current extension field using the field.setData() function. This function is only available for extension fields that support the following data types: text, number, boolean, or date.
   * @param {function} callback The function to be called when an entry is edited/changed.
   */


  onChange(callback: (arg0: any) => void) {
    const entryObj = this;
    if (callback && typeof (callback) === 'function') {
      entryObj._emitter.on('entryChange', (event: { data: any; }) => {
        callback(event.data);
      });
    } else {
      throw Error('Callback must be a function');
    }
  }

  /**
   * The onPublish() function executes the callback function every time an entry has been published with the respective payload.
   * @param {function} callback The function to be called when an entry is published.
   */


  onPublish(callback: (arg0: any) => void) {
    const entryObj = this;
    if (callback && typeof (callback) === 'function') {
      entryObj._emitter.on('entryPublish', (event: { data: any; }) => {
        callback(event.data);
      });
    } else {
      throw Error('Callback must be a function');
    }
  }

  /**
   * The onUnPublish() function executes the callback function every time an entry has been unpublished with the respective payload.
   * @param {function} callback The function to be called when an entry is un published.
   */


  onUnPublish(callback: (arg0: any) => void) {
    const entryObj = this;
    if (callback && typeof (callback) === 'function') {
      entryObj._emitter.on('entryUnPublish', (event: { data: any; }) => {
        callback(event.data);
      });
    } else {
      throw Error('Callback must be a function');
    }
  }
}
export default Entry;
