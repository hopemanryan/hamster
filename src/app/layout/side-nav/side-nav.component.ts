import {Component, OnInit} from '@angular/core';
import {IProject} from "../../interfaces/project.interface";
import {ProjectService} from "../../services/project.service";
import {Observable} from "rxjs";
import {tap} from "rxjs/operators";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {
  constructor(
    public projectService: ProjectService,
    private router: Router,
    private route: ActivatedRoute
  ) {


  }

  ngOnInit(): void {

  }

  addProject() {
    this.projectService.userSelectProject();
  }

  selectProject(project:IProject) {
    this.projectService.selectProject(project);
    return this.router.navigate(['/app/project/' + project.id], {relativeTo: this.route})
  }
  goHome() {
    this.projectService.selectProject(null);
    console.log('here')
    return this.router.navigate(['/app'])
  }

}
