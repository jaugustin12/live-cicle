import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveCicleLogoComponent } from './live-cicle-logo.component';

describe('LiveCicleLogoComponent', () => {
  let component: LiveCicleLogoComponent;
  let fixture: ComponentFixture<LiveCicleLogoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LiveCicleLogoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LiveCicleLogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
