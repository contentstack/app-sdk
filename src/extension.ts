import postRobot from 'post-robot';
import Field from './field';
import Window from './window';
import Stack from './stack';
import Entry from './entry';
import Store from './store';
import EventEmitter from 'wolfy87-eventemitter';
import { IAppConfigInitData, IAppConfigWidget, ICustomField, IDashboardInitData, IDashboardWidget, IFieldInitData, IFullScreenInitData, ILocation, IPageWidget, IRTE, IRTEInitData, ISidebarInitData, ISidebarWidget, IStackConfgWidget, IStackConfigInitData, IUser, } from './types'
import { IRTEPluginInitializer } from './RTE/types';

const emitter = new EventEmitter();

/** Class representing an extension from Contentstack App Framework SDK. */

class Extension {
  /**
   * @hideconstructor
   */

  app_id: string
  currentUser: IUser
  location: ILocation
  postRobot: any
  stack: Stack
  store: Store

  Extension: {
    DashboardWidget: IDashboardWidget | null
    SidebarWidget: ISidebarWidget | null
    CustomField: ICustomField | null
    RTEPlugin: IRTEPluginInitializer | null
    StackConfigWidget: IStackConfgWidget | null
    AppConfigWidget: IAppConfigWidget | null
    FullscreenAppWidget: IPageWidget | null
  }

  constructor(initData: IRTEInitData | IDashboardInitData | IFieldInitData | ISidebarInitData | IStackConfigInitData | IAppConfigInitData | IFullScreenInitData) {
    const initializationData = initData;

    this.postRobot = postRobot;
    /**
     * This method gives you the configuration parameters. Check out our {@link https://www.contentstack.com/docs/guide/extensions|UI Extension documentation} .
     * @type {Object}
     */

    this.app_id = initializationData.data.app_id
    /**
     * This object holds details of the current user.
     * @type {Object}
     */
    this.currentUser = initializationData.data.user;

    /**
     * location of extension, "RTE_EXTENSION_WIDGET" | "CUSTOM_FIELD_WIDGET" | "DASHBOARD_WIDGET" | "SIDEBAR_WIDGET" | "STACK_CONFIG_WIDGET" | "APP_CONFIG_WIDGET" | "FULL_SCREEN_WIDGET".
     * @type {string}
     */
    this.location = initializationData.data.type;

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
      RTEPlugin: null,
      StackConfigWidget: null,
      AppConfigWidget: null,
      FullscreenAppWidget: null
    }

    switch (initializationData.data.type) {

      case "DASHBOARD_WIDGET": {
        this.Extension.DashboardWidget = {
          frame: new Window(postRobot, this.location as 'DASHBOARD', emitter, initializationData.data.dashboard_width),
          stack: new Stack(initializationData.data.stack, postRobot)
        }
        break
      }
      case "SIDEBAR_WIDGET": {
        this.Extension.SidebarWidget = {
          entry: new Entry(initializationData as ISidebarInitData, postRobot, emitter),
          stack: new Stack(initializationData.data.stack, postRobot)
        }
        break
      }

      case "CUSTOM_FIELD_WIDGET": {
        this.Extension.CustomField = {
          field: new Field(initializationData as IFieldInitData, postRobot, emitter),
          fieldConfig: initializationData.data.field_config,
          entry: new Entry(initializationData as IFieldInitData, postRobot, emitter),
          stack: new Stack(initializationData.data.stack, postRobot),
          frame: new Window(postRobot, this.location as 'FIELD', emitter)
        }

        break
      }

      case 'STACK_CONFIG_WIDGET': {
        this.Extension.StackConfigWidget = {
          setStackConfig: (config: { [key: string]: any }) => {
            this.postRobot.sendToParent('setStackConfig', config)
          },
          setServerSecrets: (config: { [key: string]: any }) => {
            this.postRobot.sendToParent('setServerSecrets', config)
          }
        }
        break
      }

      case "APP_CONFIG_WIDGET": {
        this.Extension.AppConfigWidget = {
          setAppConfig: (config: { [key: string]: any }) => {
            this.postRobot.sendToParent('setAppConfig', config)
          }
        }
        break
      }

      case "FULL_SCREEN_WIDGET": {
        break
      }

      case 'RTE_EXTENSION_WIDGET':
      default: {
        import('./RTE').then(({ rtePluginInitializer }) => {
          this.Extension.RTEPlugin = rtePluginInitializer
        })
        break;
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

  getStackConfig = () => {
    //@ts-ignore
    this.postRobot.sendToParent('getStackConfig')
  }

  getAppConfig = () => {
    //@ts-ignore
    this.postRobot.sendToParent('getAppConfig')
  }


  getServerSecrets = () => {
    //@ts-ignore
    this.postRobot.sendToParent('getServerSecrets')
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
