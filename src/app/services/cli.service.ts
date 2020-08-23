import {Injectable, NgZone} from '@angular/core';
import {ProjectService} from "./project.service";
import {ICurrentlyRunningProcess, IProjectScript} from "../interfaces/project.interface";
import {Observable, ReplaySubject} from "rxjs";
import IpcRendererEvent = Electron.IpcRendererEvent;
import {CommunicatorService} from "./communicator.service";
import {SqlService} from "./sql.service";

@Injectable({
  providedIn: 'root'
})
export class CliService {
  customCli: string
  currentlyRunning: ICurrentlyRunningProcess[] = [];
  $currentlyRunning: ReplaySubject<Array<ICurrentlyRunningProcess>> = new ReplaySubject<Array<ICurrentlyRunningProcess>>();
  listeners: Array<{eventName: string, callback: any}> = [
    {
      eventName: 'processRunning',
      callback: this.processRunningResponse.bind(this)
    },
    {
      eventName: 'processKilled',
      callback: this.processKilledResponse.bind(this)
    }
  ];

  constructor(private projectService: ProjectService, private zone: NgZone, private communicatorService: CommunicatorService, private sqlService: SqlService) {
    this.communicatorService.addMultipleListeners(this.listeners)

  }


  processRunningResponse(event: IpcRendererEvent, data: any): void {
    this.zone.run(() => this.addRunningProcess(data))

  }
  processKilledResponse(event: IpcRendererEvent, data: any): void {
    this.zone.run(() => this.removeProcess(data))

  }



  addRunningProcess ( data: {id: string , key: string}): void {
    const project = this.projectService.allProjects.find(x => x.id === data.id);
    if(!project) return;
    this.currentlyRunning.push({...data, projectName: project.projectName});
    this.$currentlyRunning.next(this.currentlyRunning);
  }


  removeProcess(data: {id: string}): void {
    const indexOf = this.currentlyRunning.findIndex(x => x.id === data.id);
    if(indexOf === -1) return;
    this.currentlyRunning.splice(indexOf, 1);
    this.$currentlyRunning.next(this.currentlyRunning);
  }

  runCmdCommand(path: string, projectId: string, script: IProjectScript): void {
    if(!path || !script) return;
    this.communicatorService.sendEvent('runCmdCommand', {folderPath: path, script: script, id: projectId, cli: this.customCli})
  }
}

