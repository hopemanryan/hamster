import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Observable, of} from "rxjs";
import {IProject, IProjectScript} from "../../interfaces/project.interface";
import {ProjectService} from "../../services/project.service";
import {switchMap, tap} from "rxjs/operators";
import {CliService} from "../../services/cli.service";

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {
  project: IProject
  constructor(
    private route: ActivatedRoute,
    public projectService: ProjectService,
    private router: Router,
    private cliService: CliService
  ) {
    this.projectService.$projectSelected.pipe(
      tap(project => this.project = project),
      switchMap((project) => !project ? this.router.navigate(['/app']) : of(project))
    ).subscribe()
  }

  ngOnInit(): void {
  }

  runScript(script: IProjectScript) {
    this.cliService.runCmdCommand(this.project.projectPath,this.project.id, script)
  }

}
