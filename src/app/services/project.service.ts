import { Injectable } from '@angular/core';
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
  constructor(private sqlService: SqlService) {


    electron.ipcRenderer.on('folderPathResponse', async (event, data) => {
      await this.sqlService.addOne('projects', data).toPromise();

      this.allProjects.push(data);
      this.$allProjects.next(this.allProjects);
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




}
