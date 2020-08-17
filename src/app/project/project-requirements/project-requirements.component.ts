import {Component, Input, OnInit} from '@angular/core';
import {Subject} from "rxjs";
import {debounceTime, distinctUntilChanged, tap} from "rxjs/operators";

@Component({
  selector: 'app-project-requirements',
  templateUrl: './project-requirements.component.html',
  styleUrls: ['./project-requirements.component.scss']
})
export class ProjectRequirementsComponent implements OnInit {


  @Input() appRequirements: any[];

  seacrh$: Subject<string> = new Subject();
  search: string;
  constructor() {
    this.seacrh$.pipe(
      debounceTime(150),
      distinctUntilChanged(),
      tap(val => this.search = val),
    ).subscribe();
  }


  ngOnInit(): void {
  }

  onInputChange(val: string): void {
    this.seacrh$.next(val)
  }

}
