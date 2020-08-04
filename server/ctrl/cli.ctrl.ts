import {IpcMain} from 'electron'
import {IProjectScript} from "../interfaces/project.interface";
import {OsEnum} from "../enums/os.enum";
import BrowserWindow = Electron.BrowserWindow;
import {BaseCtrl} from "./base.ctrl";

const platformToOs = {
  "darwin" : 'mac',
  "win32": 'windows'
};

export class CliCtrl extends BaseCtrl{
  os: OsEnum;

  constructor(os: string, private ipcMain: IpcMain, private win: BrowserWindow) {
    super(ipcMain, win);
    this.os = platformToOs[os] || 'linux';
    this.initListeners();
  }
  initListeners() {
    this.ipcMain.on('runCmdCommand', async (event, data: { folderPath: string, script: IProjectScript, id: string }) => {
      await this.runCliCmd(data);
    });
  }



  runCliCmd(data: { folderPath: string, script: IProjectScript, id: string }) {
    this.win.webContents.send('processRunning', {id: data.id, key: data.script.keyword});

    const proc = this.buildCmdProcCommand(data.script.cmd, data.folderPath);



      const  exec = require('child_process').exec;

      const cmdOpts = {
        cwd: data.folderPath
      };

      exec(proc, cmdOpts,
        () => {
          console.log('done');
          this.win.webContents.send('processKilled', {id: data.id});
        },
        (e) => {
          console.log('error', e);
          this.win.webContents.send('processKilled', {id: data.id});

        }

      );

  }


  buildCmdProcCommand(cmd: string, path: string) {
    switch (this.os) {
      case 'windows':
        return `start cmd.exe /K ${cmd}`;
      case 'mac':
        return `osascript -e 'tell application "Terminal"
    do script "cd ${path} && ${cmd} "
    activate
end tell'`;
      default:
        break
    }
  }







}
