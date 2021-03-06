import {Injectable, NgZone} from '@angular/core';
import {Observable, of, ReplaySubject} from "rxjs";
import {IProject} from '../interfaces/project.interface';
import {SqlService} from "./sql.service";
import {switchMap, take, tap} from "rxjs/operators";
import IpcRendererEvent = Electron.IpcRendererEvent;
import {CommunicatorService} from "./communicator.service";
import {ActivatedRoute, Router} from "@angular/router";

const ProjectTable = 'projects';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  $allProjects: ReplaySubject<Array<IProject>> = new ReplaySubject<Array<IProject>>();
  allProjects: Array<IProject> = [];


  $projectSelected: ReplaySubject<IProject> = new ReplaySubject<IProject>();
  projectSelectedId: string;


  listeners: Array<{ eventName: string, callback: any }> = [
    {
      eventName: 'folderPathResponse',
      callback: this.folderPathResponse.bind(this)
    },
    {
      eventName: 'syncSingleDone',
      callback: this.syncSingleProjectResponse.bind(this)
    },
    {
      eventName: 'InitRefreshAll',
      callback: this.refreshAllProjects.bind(this)
    },
  ];

  constructor(
    private sqlService: SqlService,
    private zone: NgZone,
    private communicatorService: CommunicatorService,
    private router: Router,
    private route: ActivatedRoute
  ) {

    this.communicatorService.addMultipleListeners(this.listeners)
  }

  refreshAllProjects(): void {
    return this.zone.run(() => {
      this.allProjects.forEach(x => this.communicatorService.sendEvent('syncSingleProject', x))
    })
  }

  async syncSingleProjectResponse(event: IpcRendererEvent, response: any): Promise<void> {
    await this.sqlService.addOne('projects', response.data).toPromise();
    const foundIndex = this.allProjects.findIndex(x => x.id === response.data.id);
    if (foundIndex > -1) {
      this.allProjects[foundIndex] = response.data;
    }
    this.$allProjects.next(this.allProjects);
    if (this.projectSelectedId && this.projectSelectedId === response.data.id) {
      this.zone.run(() => this.$projectSelected.next(this.allProjects[foundIndex])
      )
    }
  }

  folderPathResponse(event: IpcRendererEvent, data: any): any {
    return this.zone.run(async () => {
      await this.sqlService.addOne(ProjectTable, data).toPromise();
      this.allProjects.push(data);
      this.$allProjects.next(this.allProjects);

    });
  }

  getAllProjects(): void {
    this.sqlService.getAll(ProjectTable).pipe(
      take(1),
      tap((projects: Array<IProject>) => this.allProjects = projects),
      tap(() => this.$allProjects.next(this.allProjects)),
      tap(() => this.refreshAllProjects()),
    ).subscribe();
  }

  userSelectProject(): void {
    this.communicatorService.sendEvent('openFolderSelector')
  }

  syncSingleProject(projectId?: string): void {
    const found = this.allProjects.find(x => x.id === projectId);
    if (found) {
      this.communicatorService.sendEvent('syncSingleProject', found)
    }

  }

  selectProject(project: IProject): void {
    if (!project) {
      return this.$projectSelected.next(null)
    }
    this.projectSelectedId = project.id;
    this.$projectSelected.next(project);

  }


  async removeSingleProject(projectId: string): Promise<void> {
    await this.sqlService.removeSingleById(ProjectTable, projectId).pipe(
      tap(() => {
        const foundIndex = this.allProjects.findIndex(x => x.id === projectId);
        if (foundIndex > -1) {
          this.allProjects.splice(foundIndex, 1);
          this.$allProjects.next(this.allProjects);
        }
      })
    ).toPromise();
  }


  addCommandGroup(newCmdGroup: any): Observable<any> {
    const obj  = {...newCmdGroup, id: uuidv4()};
    return this.sqlService.addOne('command-group', obj).pipe(switchMap(() => of(obj)))

  }

  getProjectCommandGroups(projectId: string): Observable<any> {
    return this.sqlService.find('command-group', ['projectId', '=', projectId])
  }

  removeCommandGroup(groupId: string): Observable<any> {
    return this.sqlService.removeSingleById('command-group', groupId)
  }



}

function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}
