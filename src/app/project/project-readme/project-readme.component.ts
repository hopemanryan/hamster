import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-project-readme',
  templateUrl: './project-readme.component.html',
  styleUrls: ['./project-readme.component.scss']
})
export class ProjectReadmeComponent implements OnInit {
  @Input()readMe: string;
  constructor() { }

  ngOnInit(): void {
    console.log(this.readMe)
  }

  onReady() {
  }

}
