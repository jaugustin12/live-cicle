import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataService } from '../../services/dataService/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  private readonly TM_EVENTS = 'TM_EVENTS';
  tmEvents: any = [];

  constructor(private data: DataService) {
    this.data.tmEvents.subscribe(tmEvents => (this.tmEvents = tmEvents));
    const storedTMEvents = JSON.parse(localStorage.getItem(this.TM_EVENTS));
    if (this.tmEvents !== storedTMEvents) {
      this.data.newTmevents(storedTMEvents);
    }
   }
  ngOnInit() {
  }

  ngOnDestroy() {
    this.data.tmEvents.subscribe(tmEvents => (this.tmEvents = tmEvents)).unsubscribe();
  }


}
