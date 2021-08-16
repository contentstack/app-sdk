import postRobot from 'post-robot';
import Field from './field';
import Window from './window';
import Stack from './stack';
import Entry from './entry';
import Store from './store';
import EventEmitter from 'wolfy87-eventemitter';
import { IConfig, ICustomField, IDashboardInitData, IDashboardWidget, IFieldConfig, IFieldInitData, ILocation, IRTE, ISidebarInitData, ISidebarWidget, IUser, } from './types'

const emitter = new EventEmitter();

/** Class representing an extension from Contentstack UI. */

class Extension {
  /**
   * @hideconstructor
   */

  config: IConfig
  postRobot: any
  currentUser: IUser
  location: ILocation
  fieldConfig?: IFieldConfig
  field?: Field

  store: Store
  stack: Stack

  Extension: {
    DashboardWidget: IDashboardWidget | null
    SidebarWidget: ISidebarWidget | null
    CustomField: ICustomField | null
    RTE: IRTE | null
  }

  constructor(initData: IDashboardInitData | IFieldInitData | ISidebarInitData) {
    const initializationData = initData;

    this.postRobot = postRobot;
    /**
     * This method gives you the configuration parameters. Check out our {@link https://www.contentstack.com/docs/guide/extensions|UI Extension documentation} .
     * @type {Object}
     */

    this.config = initializationData.data.config;
    /**
     * This object holds details of the current user.
     * @type {Object}
     */
    this.currentUser = initializationData.data.user;
    /**
     * location of extension, 'FIELD' || 'WIDGET' || 'DASHBOARD'.
     * @type {string}
     */
    this.location = initializationData.data.type || 'FIELD';
    /**
     * Store to persist data for extension.
     * Note: Data is stored in the browser {@link external:localStorage} and will be lost if the {@link external:localStorage} is cleared in the browser.
     * @type {Store}
     */
    this.store = new Store(postRobot);

    /**
     * This method returns stack object which allows users to read and manipulate a range of objects in a stack.
     * @type {Stack}
     */
    this.stack = new Stack(initializationData.data.stack, postRobot);


    this.Extension = {
      DashboardWidget: null,
      CustomField: null,
      SidebarWidget: null,
      RTE: null
    }

    switch (initializationData.data.type) {

      case "DASHBOARD": {
        this.Extension.DashboardWidget = {
          frame: new Window(postRobot, this.location as 'DASHBOARD', emitter, initializationData.data.dashboard_width),
          stack: new Stack(initializationData.data.stack, postRobot)
        }
        break
      }
      case "SIDEBAR": {
        this.Extension.SidebarWidget = {
          entry: new Entry(initializationData as ISidebarInitData, postRobot, emitter),
          stack: new Stack(initializationData.data.stack, postRobot)
        }
        break
      }

      case 'FIELD':
      default: {
        this.Extension.CustomField = {
          field: new Field(initializationData as IFieldInitData, postRobot, emitter),
          fieldConfig: initializationData.data.field_config,
          entry: new Entry(initializationData as IFieldInitData, postRobot, emitter),
          stack: new Stack(initializationData.data.stack, postRobot),
          frame: new Window(postRobot, this.location as 'FIELD', emitter)
        }

        break
      }
    }

    //@ts-ignore
    postRobot.on('extensionEvent', (event) => {
      if (event.data.name === 'entrySave') {
        emitter.emitEvent('entrySave', [{ data: event.data.data }]);
        emitter.emitEvent('updateFields', [{ data: event.data.data }]);
      }

      if (event.data.name === 'entryChange') {
        emitter.emitEvent('entryChange', [{ data: event.data.data }]);
      }

      if (event.data.name === 'entryPublish') {
        emitter.emitEvent('entryPublish', [{ data: event.data.data }]);
      }

      if (event.data.name === 'entryUnPublish') {
        emitter.emitEvent('entryUnPublish', [{ data: event.data.data }]);
      }

      if (event.data.name === 'dashboardResize') {
        emitter.emitEvent('dashboardResize', [{ state: event.data.state }]);
      }

      if (event.data.name === 'extensionFieldChange') {
        emitter.emitEvent('extensionFieldChange', [{ data: event.data.data }]);
      }
    });
  }

  static initialize(version: string) {
    //@ts-ignore
    return postRobot.sendToParent('init', { version });
  }

  setReady() {
    return this.postRobot.sendToParent('ready');
  }
}


export default Extension;
