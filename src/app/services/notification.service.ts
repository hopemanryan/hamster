import { Injectable } from '@angular/core';
import {NzMessageService, NzNotificationDataOptions, NzNotificationService} from 'ng-zorro-antd';



@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private notification: NzNotificationService, private messages: NzMessageService) { }

  sendBasicNotification(title: string, msg: string): void {
    this.notification.blank(title, msg)
  }

  sendNotificationTypeBased(title: string, msg: string, type: 'success' | 'info' | 'warning' | 'error' | 'blank' ): void {
    this.notification.create(type, title, msg)

  }

  sendToaster(msg: string, type: 'success' | 'info' | 'warning' | 'error' | 'loading' ): void {
    this.messages.create(type, msg)
  }
}
