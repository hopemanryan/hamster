import {Injectable} from '@angular/core';
import IpcRendererEvent = Electron.IpcRendererEvent;
import {CommunicatorService} from "./communicator.service";


@Injectable({
  providedIn: 'root'
})
export class UserInfoService {
  public userName: string;

   events: Array<{ eventName: string, callback: any }> = [
    {
      eventName: 'sendUserName',
      callback: this.userNameFetchResponse.bind(this)
    },
     {
       eventName: 'getCliOptionsResp',
       callback: this.saveCliOptions.bind(this)
     }
  ]

  constructor(private communicatorService: CommunicatorService) {
     this.communicatorService.addMultipleListeners(this.events)
    this.communicatorService.sendEvent('getUserName')
    this.communicatorService.sendEvent('getCliOptions')
  }


  userNameFetchResponse(event: IpcRendererEvent, data: string): void {
    this.userName = data
  }

  saveCliOptions(event: IpcRendererEvent, data: any): void {

  }
}
