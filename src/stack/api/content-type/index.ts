import Entry from './entry';
import Base from '../base';

let connection = {};


class ContentType extends Base {

  Entry: typeof Entry

  constructor(uid: string) {
    super(uid);
    /**
     * @constructor
     * @hideconstructor
     * @name Stack#ContentType#Entry
     * @desc An entry is the actual piece of content created using one of the defined content types
     * @see {@link https://www.contentstack.com/docs/apis/content-management-api/#entries| Entries}
     */

    // @ts-ignore
    this.Entry = Entry(this.constructor.connection, this.uid);
    return this;
  }

  // static module(plural = false) {
  //   return plural ? 'ContentTypes' : 'ContentType';
  // }
  static get connection() {
    return connection;
  }
}
export default (uiConnection: any) => {
  connection = uiConnection;
  return new Proxy(ContentType, {
    // target = Foo
    apply(Target: any, thisArg, argumentsList: any[]) {
      return new Target(...argumentsList);
    }
  });
};
