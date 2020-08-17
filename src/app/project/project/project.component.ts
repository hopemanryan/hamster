import {Component, NgZone, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {EMPTY, Observable, of} from "rxjs";
import {IProject, IProjectScript} from "../../interfaces/project.interface";
import {ProjectService} from "../../services/project.service";
import {switchMap, tap} from "rxjs/operators";
import {CliService} from "../../services/cli.service";
import { NzDrawerRef, NzDrawerService } from 'ng-zorro-antd/drawer';
import {CommandDrawerComponent} from "../command-drawer/command-drawer.component";

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {
  project: IProject;
  tagMode: 'default' | 'closeable' = 'default';
  commandGroups: any[];
  constructor(
    private route: ActivatedRoute,
    public projectService: ProjectService,
    private router: Router,
    private cliService: CliService,
    private drawerService: NzDrawerService,
    private zone: NgZone
  ) {
    this.projectService.$projectSelected.pipe(
      tap(project => this.project = project),
      switchMap((project) => !project ? this.router.navigate(['/app']) : of(project)),
      switchMap(() =>  this.project  ? this.projectService.getProjectCommandGroups(this.project.id) : EMPTY),
      tap(cmdGroups => this.commandGroups = cmdGroups),
    ).subscribe()

  }

  ngOnInit(): void {
  }

  runScript(script: IProjectScript): void {
    this.cliService.runCmdCommand(this.project.projectPath,this.project.id, script)
  }

  syncProject(): void {
    this.projectService.syncSingleProject(this.project.id)
  }

  removeProject(): any  {
    return this.projectService.removeSingleProject(this.project.id).then(() => {
      return this.router.navigate(['/'], {relativeTo: this.route})
    });
  }

  addNewCommandGroup() {
    this.drawerService.create({
      nzTitle: 'New Command Group',
      nzContent: CommandDrawerComponent,
      nzContentParams: {
        options: this.project.scripts.map(x => {
          return {label: x.keyword, value: x.cmd}
        })
      }
    }).afterClose.subscribe((resp : any) => {
      if(resp) {
        const newCommandGroup = {
          name: resp.name,
          scripts: resp.group.map(x => {
            return {keyword: x.label, cmd: x.value}
          }),
          projectId: this.project.id
        };
        this.projectService.addCommandGroup(newCommandGroup).subscribe(value => {
          this.zone.run(() => {
            this.commandGroups.push(value)

          });
        })
      }
    })
  }

  runGroupScript(scripts: IProjectScript[]): void {
    scripts.forEach(x => this.runScript(x));
  }

  removeGroupScript(groupId: string, index: number): void {
    this.projectService.removeCommandGroup(groupId).subscribe((res) => {
      this.zone.run(() => {
        this.commandGroups.splice(index , 1);

      })
    })
  }

}
