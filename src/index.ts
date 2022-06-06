import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';

import { MainAreaWidget } from '@jupyterlab/apputils';
import { IFileBrowserFactory } from '@jupyterlab/filebrowser';

import { ILauncher } from '@jupyterlab/launcher';

import { reactIcon } from '@jupyterlab/ui-components';

import { CounterWidget } from './widget';

/**
 * The command IDs used by the react-widget plugin.
 */
namespace CommandIDs {
  export const create = 'create-react-widget';
}

/**
 * Initialization data for the react-widget extension.
 */
const extension: JupyterFrontEndPlugin<void> = {
  id: 'react-widget',
  autoStart: true,
  optional: [ILauncher],
  requires: [IFileBrowserFactory],
  activate: (
    app: JupyterFrontEnd,
    browser: IFileBrowserFactory,
    launcher: ILauncher
  ) => {
    const { commands } = app;

    const command = CommandIDs.create;
    commands.addCommand(command, {
      caption: 'Create a Jupyter Notebook Template',
      label: 'Templatify',
      icon: args => (args['isPalette'] ? undefined : reactIcon),
      execute: () => {
        const content = new CounterWidget(app, browser);
        const widget = new MainAreaWidget<CounterWidget>({ content });
        widget.title.label = 'Templatify';
        widget.title.icon = reactIcon;
        app.shell.add(widget, 'main');
      }
    });

    if (launcher) {
      launcher.add({
        command
      });
    }
  }
};

export default extension;
