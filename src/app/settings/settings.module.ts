import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsComponent } from './settings/settings.component';
import {SettingsRoutingModule} from "./settings-routing.module";
import {NZ_ICONS, NzGridModule, NzIconModule, NzPageHeaderModule, NzSelectModule} from "ng-zorro-antd";



@NgModule({
  declarations: [SettingsComponent],
  imports: [
    CommonModule,
    SettingsRoutingModule,
    NzPageHeaderModule,
    NzIconModule,
    NzGridModule,
    NzSelectModule
  ],
})
export class SettingsModule { }
