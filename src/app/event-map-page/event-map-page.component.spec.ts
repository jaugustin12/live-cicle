import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventMapPageComponent } from './event-map-page.component';

describe('EventMapComponent', () => {
  let component: EventMapPageComponent;
  let fixture: ComponentFixture<EventMapPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventMapPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventMapPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
