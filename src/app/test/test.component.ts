import { Component } from '@angular/core';
import { SWIPER_CONFIG } from 'ngx-swiper-wrapper';
import { SwiperModule, SwiperConfigInterface } from 'ngx-swiper-wrapper';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent {
  showFiller = false;
  public now: Date = new Date();
  something = [{
    name: 'Test1'
  },
  {
    name: 'Test2'
  }
];
  config: SwiperConfigInterface = {
    a11y: true,
    direction: 'horizontal',
    slidesPerView: 3,
    slideToClickedSlide: true,
    mousewheel: true,
    scrollbar: false,
    watchSlidesProgress: true,
    navigation: true,
    keyboard: true,
    pagination: false,
    centeredSlides: true,
    loop: true,
    roundLengths: true,
    slidesOffsetBefore: 100,
    slidesOffsetAfter: 100,
    spaceBetween: 50,
    breakpoints: {
        // when window width is >= 320px
        320: {
            slidesPerView: 1
        }
    }
};

  dateTest() {
    if (this.now.getHours() >= 20) {
      console.log('easy');
    }
  }

  go() {
  }
}
