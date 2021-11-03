//@ts-nocheck

import Query from './query';
import { transform, addParam } from '../utils';


function onData(data: { data: any; }) {
  if (typeof (data.data) === 'string') { return Promise.reject(data.data); }
  return Promise.resolve(data.data);
}

function onError(error: any) {
  return Promise.reject(error);
}
/**
 * This is Base class, it holds all the methods required for Modle instance,
 *  eg ContentType('uid').delete() or Asset('uid').update({...})
 *  @ignore
 */
export default class Base {


  uid: string
  _query: { [key: string]: any }
  only: any
  except: any
  addParam: any

  static connection: any
  static contentTypeUid: string

  constructor(uid: string) {
    if (!uid) { throw new Error('uid is required'); }
    this.uid = uid;
    this._query = {};
    this.only = transform('only');
    this.except = transform('except');
    this.addParam = addParam;
  }

  static Query() {
    //@ts-ignore
    return new Query(this.connection, this.module(true), this.contentTypeUid);
  }


  static create(payload: { [key: string]: any }) {
    const options = { payload, content_type_uid: this.contentTypeUid, action: `create${this.module()}` };
    return this.connection.sendToParent('stackQuery', options).then(onData).catch(onError);
  }

  update(payload: { [key: string]: any }) {
    if (!payload || (typeof payload !== 'object') || (payload instanceof Array)) {
      return Promise.reject(new Error('Kindly provide valid parameters'));
    }
    return this.fetch(`update${this.constructor.module()}`, payload);
  }

  delete() {
    return this.fetch(`delete${this.constructor.module()}`);
  }

  fetch(action: string, payload?: { [key: string]: any }) {
    const options = {
      payload,
      content_type_uid: this.constructor.contentTypeUid,
      uid: this.uid,
      params: this._query,
      action: action || `get${this.constructor.module()}`
    };

    if (!payload) { delete options.payload; }
    if (!this.constructor.contentTypeUid) { delete options.content_type_uid; }
    return this.constructor.connection.sendToParent('stackQuery', options)
      .then(onData).catch(onError);
  }
}
