import * as os from "os";
import {IpcMain} from 'electron'
import BrowserWindow = Electron.BrowserWindow;
export const PersonalCtrl = (ipcMain: IpcMain, win: BrowserWindow) => {

  ipcMain.on('getUserName', () => {
    const username = os.userInfo().username;
    win.webContents.send('sendUserName', username);
  });

};
