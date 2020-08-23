import {Injectable} from '@angular/core';
import IpcRendererEvent = Electron.IpcRendererEvent;
import {CommunicatorService} from "./communicator.service";
import {SqlService} from "./sql.service";
import {ReplaySubject, Subject} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class UserInfoService {
  public userName: string;
  public terminalOptions: ReplaySubject<Array<any>> = new ReplaySubject<Array<any>>();

  events: Array<{ eventName: string, callback: any }> = [
    {
      eventName: 'sendUserName',
      callback: this.userNameFetchResponse.bind(this)
    },
    {
      eventName: 'getCliOptionsResp',
      callback: this.saveCliOptions.bind(this)
    }
  ];

  constructor(private communicatorService: CommunicatorService, private sqlService: SqlService) {
    this.communicatorService.addMultipleListeners(this.events);
    this.communicatorService.sendEvent('getUserName');
    this.communicatorService.sendEvent('getCliOptions');
  }


  userNameFetchResponse(event: IpcRendererEvent, data: string): void {
    this.userName = data
  }

  saveCliOptions(event: IpcRendererEvent, data: any): void {
    console.log(data);
    this.terminalOptions.next(data);

  }
}
