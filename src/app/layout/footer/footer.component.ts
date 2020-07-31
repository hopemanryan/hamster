import { Component, OnInit } from '@angular/core';
import {CliService} from "../../services/cli.service";
import {ICurrentlyRunningProcess} from "../../interfaces/project.interface";
import {Observable} from "rxjs";
const tagColor = ['magenta', 'red', 'volcano', 'orange', 'gold', 'lime', 'green', 'cyan', 'blue', 'geekblue', 'purple'];
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  runningProcess: Observable<ICurrentlyRunningProcess[]>;
  constructor(private cliService: CliService) {
    this.runningProcess = this.cliService.$currentlyRunning;
  }

  ngOnInit(): void {

  }

  getTagColor() {
    return  tagColor[Math.floor(Math.random() * tagColor.length)];
  }

}
