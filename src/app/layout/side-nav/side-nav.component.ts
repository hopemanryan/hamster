import { Component, OnInit } from '@angular/core';
import {IProject} from "../../interfaces/project.interface";
import {ProjectService} from "../../services/project.service";
import {Observable} from "rxjs";
import {tap} from "rxjs/operators";

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {
  constructor(
    public projectService: ProjectService
  ) {

  }

  ngOnInit(): void {

  }
  addProject() {
    this.projectService.userSelectProject();
  }

}
