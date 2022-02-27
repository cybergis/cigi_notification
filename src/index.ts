import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';
import { INotification } from 'jupyterlab_toastify';
import { ISettingRegistry } from '@jupyterlab/settingregistry';

/**
 * Initialization data for the cigi_notification extension.
 */
const plugin: JupyterFrontEndPlugin<void> = {
  id: 'cigi_notification:plugin',
  autoStart: true,
  optional: [ISettingRegistry],
  activate: async (
    app: JupyterFrontEnd,
    settingRegistry: ISettingRegistry | null
  ) => {
    const url =
      'https://cybergisxhub.cgwebdev.cigi.illinois.edu/wp-json/cigi-announcement/v1/announcement-message/';

    const obj = await (await fetch(url)).json();
    console.log(obj);
    // eslint-disable-next-line eqeqeq
    const show_button = obj.show_button;
    console.log(show_button);
    const end_date = new Date(obj.end_date);
    const today = new Date();

    if (end_date >= today) {
      // Notification with a button
      INotification.info(obj.message, {
        buttons: show_button
          ? [
              {
                label: 'Learn More',
                callback: () => window.open(obj.url, '_blank')
              }
            ]
          : [],
        autoClose: false
      });
    }

    if (settingRegistry) {
      settingRegistry
        .load(plugin.id)
        .then(settings => {
          console.log('cigi_notification settings loaded:', settings.composite);
        })
        .catch(reason => {
          console.error(
            'Failed to load settings for cigi_notification.',
            reason
          );
        });
    }
  }
};

export default plugin;
