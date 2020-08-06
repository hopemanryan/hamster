import { Injectable } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private notification: NzNotificationService) { }

  sendBasicNotification(title: string, msg: string) {
    this.notification
    .blank(
      title,
      msg
    )
  }
}
