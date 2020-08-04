import {dialog, ipcMain, IpcMain} from 'electron'
import BrowserWindow = Electron.BrowserWindow;
import {IProjectScript} from "../interfaces/project.interface";

const platformToOs = {
  "darwin" : 'mac',
  "win32": 'windows'
}

export class CliCtrl {
  os: string

  constructor(os: string, private ipcMain: IpcMain, private win: BrowserWindow) {
    this.os = platformToOs[os] || 'linux';
    this.initListeners();
  }
  initListeners() {
    this.ipcMain.on('runCmdCommand', async (event, data: { folderPath: string, script: IProjectScript, id: string }) => {
      await this.runCliCmd(data);
    });
  }



  runCliCmd(data: { folderPath: string, script: IProjectScript, id: string }) {
    this.win.webContents.send('processRunning', {id: data.id, key: data.script.keyword})

    const proc = this.buildCmdProcCommand(data.script.cmd);
    console.log('proc ', proc)

    var exec = require('child_process').exec;

    const cmdOpts = {
      cwd: data.folderPath
    };


    exec(proc, cmdOpts, () => {
      console.log('done');
      this.win.webContents.send('processKilled', {id: data.id});
    });
  }


  buildCmdProcCommand(cmd: string) {
    switch (this.os) {
      case 'windows':
        return `start cmd.exe /K ${cmd}`
      case 'mac':
        return `osascript -e 'tell application "iTerm2" to do script "${cmd}"' &`
      default:
        break
    }
  }






}
