import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectComponent } from './project/project.component';
import {ProjectRoutingModule} from "./project/project-routing.module";
import {
  NzButtonModule, NzCheckboxModule, NzCollapseModule,
  NzDividerModule, NzDrawerModule, NzFormModule, NzIconModule, NzInputModule, NzListModule,
  NzPageHeaderModule,
  NzStepsModule, NzTabsModule,
  NzTagModule,
  NzWaveModule
} from "ng-zorro-antd";
import {LongPress} from "../shared/directives/longpress.directive";
import { CommandDrawerComponent } from './command-drawer/command-drawer.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { ProjectScriptsComponent } from './project-scripts/project-scripts.component';
import { ProjectRequirementsComponent } from './project-requirements/project-requirements.component';
import { ProjectGitComponent } from './project-git/project-git.component';
import { TagFilterPipe } from './project-requirements/tag-filter.pipe';
import { GitSearchPipe } from './project-git/git-search.pipe';



@NgModule({
  declarations: [ProjectComponent, LongPress, CommandDrawerComponent, ProjectScriptsComponent, ProjectRequirementsComponent, ProjectGitComponent, TagFilterPipe, GitSearchPipe],
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
    NzListModule,
    NzDrawerModule,
    NzFormModule,
    NzInputModule,
    NzIconModule,
    ReactiveFormsModule,
    FormsModule,
    NzCheckboxModule
  ],

})
export class ProjectModule { }
