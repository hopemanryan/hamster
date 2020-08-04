import {Injectable, NgZone} from '@angular/core';
import {ProjectService} from "./project.service";
import {ICurrentlyRunningProcess, IProjectScript} from "../interfaces/project.interface";
import {Observable, ReplaySubject} from "rxjs";
const electron = (<any>window).require('electron');

@Injectable({
  providedIn: 'root'
})
export class CliService {
  currentlyRunning: ICurrentlyRunningProcess[] = [];
  $currentlyRunning: ReplaySubject<Array<ICurrentlyRunningProcess>> = new ReplaySubject<Array<ICurrentlyRunningProcess>>();
  constructor(private projectService: ProjectService, private zone: NgZone) {
    electron.ipcRenderer.on('processRunning', (event,  data: {id: string , key: string}) => {
      this.zone.run(() => this.addRunningProcess(data))
    });

    electron.ipcRenderer.on('processKilled', (event, data: {id: string}) => {
      this.zone.run(() => this.removeProcess(data))
    })

  }



  addRunningProcess ( data: {id: string , key: string}) {
    const project = this.projectService.allProjects.find(x => x.id === data.id);
    if(!project) return;
    this.currentlyRunning.push({...data, projectName: project.projectName});
    this.$currentlyRunning.next(this.currentlyRunning);
  }


  removeProcess(data: {id: string}) {
    const indexOf = this.currentlyRunning.findIndex(x => x.id === data.id);
    if(indexOf === -1) return;
    this.currentlyRunning.splice(indexOf, 1);
    this.$currentlyRunning.next(this.currentlyRunning);
  }

  runCmdCommand(path: string, projectId: string, script: IProjectScript) {
    console.log(projectId)
    if(!path || !script) return;
    electron.ipcRenderer.send('runCmdCommand', {folderPath: path, script: script, id: projectId})
  }
}
