import {dialog, ipcMain, IpcMain} from 'electron'
import BrowserWindow = Electron.BrowserWindow;
import {IProjectScript} from "../interfaces/project.interface";

export const CliCtrl  =   (ipcMain: IpcMain, win: BrowserWindow) =>  {

  ipcMain.on('runCmdCommand', async (event, data: { folderPath: string,  script: IProjectScript, id: string }) => {
    win.webContents.send('processRunning', {id: data.id, key: data.script.keyword})

    const proc = `start cmd.exe /K ${data.script.cmd}`;
    var exec = require('child_process').exec;

    const cmdOpts = {
      cwd: data.folderPath
    };


    exec(proc, cmdOpts, () => {
      console.log('done');
      win.webContents.send('processKilled', {id: data.id});
    });

  })



};

