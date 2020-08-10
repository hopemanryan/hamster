import { Injectable } from '@angular/core';
import {NotificationService} from "./notification.service";
import {CommunicatorService} from "./communicator.service";
import IpcRendererEvent = Electron.IpcRendererEvent;

@Injectable({
  providedIn: 'root'
})
export class CustomErrorHandlerService {

  events:Array<{ eventName: string, callback: any }>= [
    {
      eventName: 'filePathError',
      callback: this.genericError.bind(this)
    }
  ];

  constructor(private notification: NotificationService, private communicatorService: CommunicatorService) {
    console.log('in const')
    this.communicatorService.addMultipleListeners(this.events)

  }


  genericError($event: IpcRendererEvent, data: any): void {
    console.log('data', data);
    this.notification.sendToaster(data.error, "error");
  }



}
