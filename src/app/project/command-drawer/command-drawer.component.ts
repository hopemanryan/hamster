import {Component, Input, OnInit} from '@angular/core';
import {NzDrawerRef} from "ng-zorro-antd";
import {NotificationService} from "../../services/notification.service";

@Component({
  selector: 'app-command-drawer',
  templateUrl: './command-drawer.component.html',
  styleUrls: ['./command-drawer.component.scss']
})
export class CommandDrawerComponent implements OnInit {

  @Input() options: {label: string, value: string, checked? : boolean}[];
  groupName: string
  constructor(private drawerRef: NzDrawerRef<string>, private notif: NotificationService) { }

  ngOnInit(): void {
  }

  save(): any {
    if(!this.groupName) {
      return this.notif.sendToaster('Please fill in group name', "error");
    }
    const checkedOptions = this.options.filter(x => x.checked);
    if(!checkedOptions.length) {
      return this.notif.sendToaster('Please Select at least 1 script', "error");
    }

    this.drawerRef.close({ name: this.groupName, group: checkedOptions})
  }

}
