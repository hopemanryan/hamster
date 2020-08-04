import * as os from "os";
import {IpcMain} from 'electron'
import BrowserWindow = Electron.BrowserWindow;
import {BaseCtrl} from "./base.ctrl";

export class PersonalCtrl extends BaseCtrl{
  constructor(private ipcMain: IpcMain, private win: BrowserWindow) {
    super(ipcMain, win);
    this.initListeners();
  }

  initListeners() {
    this.ipcMain.on('getUserName', () => {
      const username = os.userInfo().username;
      this.win.webContents.send('sendUserName', username);
    });
  }
}

