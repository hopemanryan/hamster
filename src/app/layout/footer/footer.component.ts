import { Component, OnInit } from '@angular/core';
import {CliService} from "../../services/cli.service";
import {ICurrentlyRunningProcess} from "../../interfaces/project.interface";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
const tagColor = ['#CAD2C5', '#84a98c', '#52796F', '#354F52', '#2F3E46'];
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})

export class FooterComponent implements OnInit {
  runningProcess: Observable<ICurrentlyRunningProcess[]>;
  constructor(private cliService: CliService) {
    this.runningProcess = this.cliService.$currentlyRunning.pipe(
      map(x => {
        x.forEach(y => y.tagColor = this.tagColor)
        return x;
      })
    );
  }

  ngOnInit(): void {

  }

 get tagColor() {
    return  tagColor[Math.floor(Math.random() * tagColor.length)];
  }

}
