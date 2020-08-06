import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ElectronService {

  constructor() { }


  addListener(eventName: string, callback:  <T>(arg: T) => T) {
      
  }

  sendEvent(eventName: string, data?: any) {

  }
}
