import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectComponent } from './project/project.component';
import {ProjectRoutingModule} from "./project/project-routing.module";
import {
  NzButtonModule, NzCollapseModule,
  NzDividerModule, NzListModule,
  NzPageHeaderModule,
  NzStepsModule, NzTabsModule,
  NzTagModule,
  NzWaveModule
} from "ng-zorro-antd";



@NgModule({
  declarations: [ProjectComponent],
  imports: [
    CommonModule,
    ProjectRoutingModule,
    NzPageHeaderModule,
    NzDividerModule,
    NzStepsModule,
    NzWaveModule,
    NzButtonModule,
    NzTagModule,
    NzTabsModule,
    NzCollapseModule,
    NzListModule
  ],

})
export class ProjectModule { }
