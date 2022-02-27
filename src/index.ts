import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';

import { ISettingRegistry } from '@jupyterlab/settingregistry';

/**
 * Initialization data for the cigi_notification extension.
 */
const plugin: JupyterFrontEndPlugin<void> = {
  id: 'cigi_notification:plugin',
  autoStart: true,
  optional: [ISettingRegistry],
  activate: (app: JupyterFrontEnd, settingRegistry: ISettingRegistry | null) => {
    console.log('JupyterLab extension cigi_notification is activated!');

    if (settingRegistry) {
      settingRegistry
        .load(plugin.id)
        .then(settings => {
          console.log('cigi_notification settings loaded:', settings.composite);
        })
        .catch(reason => {
          console.error('Failed to load settings for cigi_notification.', reason);
        });
    }
  }
};

export default plugin;
