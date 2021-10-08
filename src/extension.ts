import postRobot from 'post-robot';
import Field from './field';
import Window from './window';
import Stack from './stack';
import Entry from './entry';
import Store from './store';
import EventEmitter from 'wolfy87-eventemitter';
import { IAppConfigInitData, IAppConfigWidget, ICustomField, IDashboardInitData, IDashboardWidget, IFieldInitData, IFullScreenInitData, ILocation, IPageWidget, IRTE, IRTEInitData, ISidebarInitData, ISidebarWidget, IUser, } from './types'
import { IRTEPluginInitializer } from './RTE/types';
import { onData, onError } from "./utils";
import { AppConfig } from './appConfig';

const emitter = new EventEmitter();

/** Class representing an extension from Contentstack App Framework SDK. */

class Extension {
  /**
   * @hideconstructor
   */

  appUID: string
  installationUID: string
  currentUser: IUser
  private type: ILocation
  postRobot: any
  stack: Stack
  store: Store

  location: {
    DashboardWidget: IDashboardWidget | null
    SidebarWidget: ISidebarWidget | null
    CustomFieldWidget: ICustomField | null
    RTEPlugin: IRTEPluginInitializer | null
    AppConfigWidget: IAppConfigWidget | null
    FullscreenAppWidget: IPageWidget | null
  }

  constructor(initData: IRTEInitData | IDashboardInitData | IFieldInitData | ISidebarInitData | IAppConfigInitData | IFullScreenInitData) {
    const initializationData = initData;

    this.postRobot = postRobot;
    /**
     * This method gives you the configuration parameters. Check out our {@link https://www.contentstack.com/docs/guide/extensions|UI Extension documentation} .
     * @type {Object}
     */

    this.appUID = initializationData.data.app_id

    /**
     * This object holds details of the app initialization user.
     * @type {Object}
     */
     this.installationUID = initializationData.data.installation_uid;
    /**
     * This object holds details of the current user.
     * @type {Object}
     */
    this.currentUser = initializationData.data.user;

    /**
     * location of extension, "RTE_EXTENSION_WIDGET" | "CUSTOM_FIELD_WIDGET" | "DASHBOARD_WIDGET" | "SIDEBAR_WIDGET" | "APP_CONFIG_WIDGET" | "FULL_SCREEN_WIDGET".
     * @type {string}
     */
    this.type = initializationData.data.type;

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


    this.location = {
      DashboardWidget: null,
      CustomFieldWidget: null,
      SidebarWidget: null,
      RTEPlugin: null,
      AppConfigWidget: null,
      FullscreenAppWidget: null
    }

    switch (initializationData.data.type) {

      case "DASHBOARD_WIDGET": {
        this.location.DashboardWidget = {
          frame: new Window(postRobot, this.type as 'DASHBOARD', emitter, initializationData.data.dashboard_width),
          stack: new Stack(initializationData.data.stack, postRobot)
        }
        break
      }
      case "SIDEBAR_WIDGET": {
        this.location.SidebarWidget = {
          entry: new Entry(initializationData as ISidebarInitData, postRobot, emitter),
          stack: new Stack(initializationData.data.stack, postRobot)
        }
        break
      }

      case "CUSTOM_FIELD_WIDGET": {
        this.location.CustomFieldWidget = {
          field: new Field(initializationData as IFieldInitData, postRobot, emitter),
          fieldConfig: initializationData.data.field_config,
          entry: new Entry(initializationData as IFieldInitData, postRobot, emitter),
          stack: new Stack(initializationData.data.stack, postRobot),
          frame: new Window(postRobot, this.type as 'FIELD', emitter)
        }

        break
      }

      case "APP_CONFIG_WIDGET": {        
        this.location.AppConfigWidget = new AppConfig(initializationData, postRobot, emitter)
        break
      }

      case "FULL_SCREEN_WIDGET": {
        break
      }

      case 'RTE_EXTENSION_WIDGET':
      default: {
        import('./RTE').then(({ rtePluginInitializer }) => {
          this.location.RTEPlugin = rtePluginInitializer
        })
        break;
      }
    }

    try {
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
    }catch(err) {
      console.log('extension Event',err);
    }
  }
  
  getConfig = () : Promise<{[key: string]: any}> => {
    return this.postRobot.sendToParent('getConfig').then(onData).catch(onError)
  }

  getCurrentLocation = () => {
    return this.type
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
