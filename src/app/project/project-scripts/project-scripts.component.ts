import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IProject, IProjectScript} from "../../interfaces/project.interface";

@Component({
  selector: 'app-project-scripts',
  templateUrl: './project-scripts.component.html',
  styleUrls: ['./project-scripts.component.scss']
})
export class ProjectScriptsComponent implements OnInit {
  @Input() scripts: IProjectScript[];
  @Output()  run = new EventEmitter()
  constructor() { }

  ngOnInit(): void {
  }


  activate(script: IProjectScript): any {
    console.log('emit')
    return this.run.emit(script)
  }

}
