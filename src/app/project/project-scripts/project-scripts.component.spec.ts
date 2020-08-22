import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectScriptsComponent } from './project-scripts.component';

describe('ProjectScriptsComponent', () => {
  let component: ProjectScriptsComponent;
  let fixture: ComponentFixture<ProjectScriptsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectScriptsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectScriptsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
