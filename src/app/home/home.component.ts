import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ProjectService} from "../services/project.service";
import {of} from "rxjs";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router, private projectService: ProjectService) {

  this.projectService.$allProjects.subscribe(res => console.log(res))
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.projectService.getAllProjects();

    },1000)
  }



}