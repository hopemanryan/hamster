import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectGitComponent } from './project-git.component';

describe('ProjectGitComponent', () => {
  let component: ProjectGitComponent;
  let fixture: ComponentFixture<ProjectGitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectGitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectGitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
