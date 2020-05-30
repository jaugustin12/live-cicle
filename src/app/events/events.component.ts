import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';

import {
  SwiperComponent, SwiperDirective, SwiperConfigInterface,
  SwiperScrollbarInterface, SwiperPaginationInterface
} from 'ngx-swiper-wrapper';

import { NgxSpinnerService } from 'ngx-spinner';
import { DataService } from '../../services/dataService/data.service';
import { EventService } from '../../services/eventService/event.service';


@Component({
  selector: 'app-events',
  moduleId: './events.component.ts',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit, OnDestroy {
  tmEvents: any = [];
  tmEventNames: any = [];
  tmStartDates: any = [];
  tmPromoters: any = [];
  tmLocations: any = [];
  tmPrices: any = [];
  tmVenues: any = [];
  events: Event[];
  totalEvents: any = [];
  progress = 0;
  index = 0;

  public show = true;
  public slides = [
    'First slide',
    'Second slide',
    'Third slide',
    'Fourth slide',
    'Fifth slide',
    'Sixth slide'
  ];

  public type = 'component';

  public disabled = false;

  public config: SwiperConfigInterface = {
    a11y: true,
    direction: 'horizontal',
    slidesPerView: 1,
    keyboard: true,
    mousewheel: true,
    scrollbar: true,
    navigation: true,
    pagination: false
  };
  showNav = false;

  private scrollbar: SwiperScrollbarInterface = {
    el: '.swiper-scrollbar',
    hide: false,
    draggable: true
  };

  private pagination: SwiperPaginationInterface = {
    el: '.swiper-pagination',
    clickable: true,
    hideOnClick: false
  };


  constructor(
    private spinner: NgxSpinnerService,
    private data: DataService,
    private eventService: EventService,
  ) {
  }
  @ViewChild(SwiperComponent) componentRef?: SwiperComponent;
  @ViewChild(SwiperDirective) directiveRef?: SwiperDirective;

  ngOnInit() {
    this.spinner.show().then(async () => {
      this.data.currentProgress.subscribe(progress => this.progress = progress);
      await this.eventService.fetchEvents();
    }).then(async () => {
      this.directiveRef.update();
      this.data.totalShuffledEvents.subscribe(shuffle => this.totalEvents = shuffle);
    }).then(() => {
      this.spinner.hide();
      window.resizeBy(0.1, 0.1);
    });
  }


  ngOnDestroy() {
    this.data.tmEvents.subscribe(tmEvents => (this.tmEvents = tmEvents)).unsubscribe();
  }

  toggleNav() {
    this.showNav = !this.showNav;
  }

  public toggleKeyboardControl(): void {
    this.config.keyboard = !this.config.keyboard;
  }

  public toggleMouseWheelControl(): void {
    this.config.mousewheel = !this.config.mousewheel;
  }
}
