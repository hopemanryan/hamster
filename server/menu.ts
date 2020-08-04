import {BrowserWindow, IpcMain, Menu, MenuItemConstructorOptions} from 'electron';


export const BuildMenu= (win: BrowserWindow, Menu: any ): void => {
  const menuTemplate :Array<(MenuItemConstructorOptions)> = [
    {
      label: 'Actions',
      submenu: [
        {
          label: 'Refresh All Projects',
          click: () => win.webContents.send('InitRefreshAll')
        }
      ]
    }

  ];

  const template =  Menu.buildFromTemplate(menuTemplate);
  Menu.setApplicationMenu(template);
}

