import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommandDrawerComponent } from './command-drawer.component';

describe('CommandDrawerComponent', () => {
  let component: CommandDrawerComponent;
  let fixture: ComponentFixture<CommandDrawerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommandDrawerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommandDrawerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
