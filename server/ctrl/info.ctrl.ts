import * as os from "os";
import {IpcMain} from 'electron'
import BrowserWindow = Electron.BrowserWindow;
import {BaseCtrl} from "./base.ctrl";
import {CliFinder} from "../handlers/cli-finder";

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

    this.ipcMain.on('getCliOptions', async () => {
      const cliFinder = new CliFinder(os.platform());
      try {
        const options = await cliFinder.findOptions();
        this.win.webContents.send('getCliOptionsResp', options);
      } catch (e) {
        console.log(e)
      }

    })
  }
}

