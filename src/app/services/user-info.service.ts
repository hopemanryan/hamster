import {Injectable} from '@angular/core';
import IpcRendererEvent = Electron.IpcRendererEvent;
import {CommunicatorService} from "./communicator.service";

const electron = (<any>window).require('electron');

@Injectable({
  providedIn: 'root'
})
export class UserInfoService {
  public userName: string;

  constructor(private communicatorService: CommunicatorService) {
    this.communicatorService.addListener('sendUserName', this.userNameFetchResponse.bind(this));
    this.communicatorService.sendEvent('getUserName')
  }

   userNameFetchResponse(event: IpcRendererEvent, data: string): void {
    this.userName = data
  }
}
