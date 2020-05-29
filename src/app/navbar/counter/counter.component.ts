import { Component, ViewChild  } from '@angular/core';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.css']
})

export class CounterComponent {
  public count: number;

  @ViewChild('counter')
  public now: Date = new Date();

  constructor() {

      setInterval(() => {
        this.now = new Date();
      }, 1);
  }
}
