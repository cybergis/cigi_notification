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
    // setting: ISettingRegistry.ISettings
  ) => {
    // const url =
    //   'https://js-168-248.jetstream-cloud.org/announcement/content.json'; // Development CJW';
    const url =
      'https://js-156-216.jetstream-cloud.org/announcement/content.json'; // Production CJW';
    // const url =
    //   'https://cybergisxhub.cgwebdev.cigi.illinois.edu/wp-json/cigi-announcement/v1/announcement-message/'; // Development
    // const url = 'https://cybergisxhub.cigi.illinois.edu/wp-json/cigi-announcement/v1/announcement-message/'; // Production

    const obj = await (await fetch(url)).json();
    console.log(obj);
    // eslint-disable-next-line eqeqeq
    const show_button = obj.show_button;
    console.log(show_button);
    const end_date = obj.end_date
      ? new Date(obj.end_date)
      : new Date('March 1, 2099');
    console.log(end_date);
    const today = new Date();
    // const endpoint = setting.get('limit').composite as string;
    if (obj.show_announcement && today < end_date) {
      // Notification with a button
      INotification.info(obj.message, {
        autoClose: 180000,
        buttons: show_button
          ? [
              {
                label: 'Learn More',
                callback: () => window.open(obj.url, '_blank')
              }
            ]
          : []
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
