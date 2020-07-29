import { Injectable } from '@angular/core';
const electron = (<any>window).require('electron');

@Injectable({
  providedIn: 'root'
})
export class CliService {

  constructor() { }



  runCmdCommand(path: string, command: string) {
    if(!path || !command) return;
    electron.ipcRenderer.send('runCmdCommand', {folderPath: path, command: command})
  }
}
