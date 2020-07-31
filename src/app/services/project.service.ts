import {Injectable, NgZone} from '@angular/core';
import {from, Observable, ReplaySubject} from "rxjs";
import {IProject} from '../interfaces/project.interface';
import {nSQL} from "@nano-sql/core";
import {SqlService} from "./sql.service";
import {take, tap} from "rxjs/operators";

const electron = (<any>window).require('electron');

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  $allProjects: ReplaySubject<Array<IProject>> = new ReplaySubject<Array<IProject>>();
  allProjects: Array<IProject> = [];
  $projectSelected: ReplaySubject<IProject> = new ReplaySubject<IProject>();

  constructor(private sqlService: SqlService, private zone: NgZone) {


    electron.ipcRenderer.on('folderPathResponse',  (event, data) => {
      return this.zone.run(async () => {
        await this.sqlService.addOne('projects', data).toPromise();
        this.allProjects.push(data);
        this.$allProjects.next(this.allProjects);
      });

    })

  }

  getAllProjects() {
    this.sqlService.getAll('projects').pipe(
      take(1),
      tap((projects: Array<IProject>) => this.allProjects = projects),
      tap(() => this.$allProjects.next(this.allProjects)),
    ).subscribe();
  }

  userSelectProject() {
    electron.ipcRenderer.send('openFolderSelector')
  }

  selectProject(projectId: string) {
    if (!projectId) {
      return this.$projectSelected.next(null)
    }

    const found = this.allProjects.find(x => x.id === projectId);
    if (found) {
      this.$projectSelected.next(found);
    }
  }


}
