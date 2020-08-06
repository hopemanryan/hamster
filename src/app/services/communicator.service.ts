import { Injectable } from '@angular/core';
const electron = (<any>window).require('electron');

@Injectable({
  providedIn: 'root'
})
export class CommunicatorService {

  constructor() { }


  addListener(eventName: string, callback:  any): void {
    electron.ipcRenderer.on(eventName,  async (event , data) => await callback(event, data))
  }

  addMultipleListeners(listeners: Array<{eventName: string, callback: any}>): void {
    listeners.forEach(x => this.addListener(x.eventName, x.callback))

  }

  sendEvent(eventName: string, data?: any): void {
    electron.ipcRenderer.send(eventName, data)
  }
}
