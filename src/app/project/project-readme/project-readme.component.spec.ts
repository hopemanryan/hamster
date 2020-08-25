import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectReadmeComponent } from './project-readme.component';

describe('ProjectReadmeComponent', () => {
  let component: ProjectReadmeComponent;
  let fixture: ComponentFixture<ProjectReadmeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectReadmeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectReadmeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
