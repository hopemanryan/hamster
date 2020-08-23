import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {Location} from "@angular/common";
import {UserInfoService} from "../../services/user-info.service";
import {CliService} from "../../services/cli.service";
import {SqlService} from "../../services/sql.service";
import {map, pluck, switchMap} from "rxjs/operators";
import {Observable} from "rxjs";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  selectedCli = '';
  cliOptions: Array<any> = [];

  constructor(
    public userInfoService: UserInfoService,
    private cliService: CliService,
    private sqlService: SqlService
  ) {
    this.userInfoService.terminalOptions.subscribe(options => {
      this.cliOptions = options
    });

    this.sqlService.getAll('app-settings').subscribe((settings) => {
      if(settings.length && settings[0].customCli) {
        this.selectedCli = settings[0].customCli
      }
    })
  }

  ngOnInit(): void {

  }




  async selectCliOptions(evt): Promise<any> {
    this.selectedCli = evt;
    this.cliService.customCli = evt;
    return this.updateSettingsData().toPromise()
  }


  updateSettingsData(): Observable<any> {
    return this.sqlService.getAll('app-settings').pipe(
      map(settings =>  settings.length ?  settings[0] : null),
      switchMap((existingSettings) => this.sqlService.addOne('app-settings', {...(existingSettings  || {}), 'customCli' : this.selectedCli}))
    )
  }


}
