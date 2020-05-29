import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataService } from '../../../../services/dataService/data.service';

@Component({
  selector: 'app-event-card',
  templateUrl: './event-card.component.html',
  styleUrls: ['./event-card.component.css']
})
export class EventCardComponent implements OnInit, OnDestroy {
  tsClickedClusters: any = [];
  showEventCard = false;


  constructor(private data: DataService) { }

  ngOnInit() {
    this.data.tsClickedClustersSource.subscribe(tsClickedClusters => this.tsClickedClusters = tsClickedClusters);
  }

  ngOnDestroy() {
    this.data.tsClickedClustersSource.subscribe(tsClickedClusters => this.tsClickedClusters = tsClickedClusters).unsubscribe();
  }

  toggleEventCard(): void {
    this.showEventCard = !this.showEventCard;
    this.data.editShowEventCard(this.showEventCard);
  }

}
