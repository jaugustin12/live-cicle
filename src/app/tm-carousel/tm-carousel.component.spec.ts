import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TmCarouselComponent } from './tm-carousel.component';

describe('TmCarouselComponent', () => {
  let component: TmCarouselComponent;
  let fixture: ComponentFixture<TmCarouselComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TmCarouselComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TmCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
