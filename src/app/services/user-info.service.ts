import {Injectable} from '@angular/core';

const electron = (<any>window).require('electron');

@Injectable({
  providedIn: 'root'
})
export class UserInfoService {
  public userName: string;

  constructor() {
    electron.ipcRenderer.on('sendUserName', async (event, data) => {
      console.log(data);
      this.userName = data
    });
    electron.ipcRenderer.send('getUserName')


  }
}
