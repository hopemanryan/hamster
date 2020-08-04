import {Injectable, NgZone} from '@angular/core';
import {ReplaySubject} from "rxjs";
import {IProject} from '../interfaces/project.interface';
import {SqlService} from "./sql.service";
import {take, tap} from "rxjs/operators";

const electron = (<any>window).require('electron');
const ProjectTable = 'projects'

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  $allProjects: ReplaySubject<Array<IProject>> = new ReplaySubject<Array<IProject>>();
  allProjects: Array<IProject> = [];
  $projectSelected: ReplaySubject<IProject> = new ReplaySubject<IProject>();
  projectSelectedId:string;

  constructor(private sqlService: SqlService, private zone: NgZone) {


    electron.ipcRenderer.on('folderPathResponse', (event, data) => {
      return this.zone.run(async () => {
        await this.sqlService.addOne(ProjectTable, data).toPromise();
        this.allProjects.push(data);
        this.$allProjects.next(this.allProjects);
      });
    });


    electron.ipcRenderer.on('syncSingleDone', async (event, response: { data: IProject }) => {

      await this.sqlService.addOne('projects', response.data).toPromise();
      const  foundIndex = this.allProjects.findIndex(x => x.id === response.data.id);
      if(foundIndex > -1) {
        this.allProjects[foundIndex] = response.data;
      }
      this.$allProjects.next(this.allProjects);
      if(this.projectSelectedId && this.projectSelectedId === response.data.id) {
        this.zone.run(() => this.$projectSelected.next(this.allProjects[foundIndex])
        )
      }
    });


    electron.ipcRenderer.on('InitRefreshAll', () => {
      return this.zone.run(() => {
        this.allProjects.forEach(x => electron.ipcRenderer.send('syncSingleProject', x))
      })

    });

  }

  getAllProjects() {
    this.sqlService.getAll(ProjectTable).pipe(
      take(1),
      tap((projects: Array<IProject>) => this.allProjects = projects),
      tap(() => this.$allProjects.next(this.allProjects)),
    ).subscribe();
  }

  userSelectProject() {
    electron.ipcRenderer.send('openFolderSelector')
  }

  selectProject(project: IProject) {
    if (!project) {
      return this.$projectSelected.next(null)
    }
    this.projectSelectedId = project.id;
    this.$projectSelected.next(project);

  }


  syncSingleProject(projectId?: string ) {
    const found = this.allProjects.find(x => x.id === projectId);
    if (found) {
      electron.ipcRenderer.send('syncSingleProject', found);
    }

  }


  async removeSingleProject(projectId: string) {
    await this.sqlService.removeSingleById(ProjectTable, projectId).pipe(
      tap(() => {
        const foundIndex = this.allProjects.findIndex(x => x.id === projectId);
        if (foundIndex > -1) {
          this.allProjects.splice(foundIndex, 1);
          this.$allProjects.next(this.allProjects);
        }
      })
    ).toPromise()
  }
}
