import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { DataService } from '../../services/dataService/data.service';
import { TmEvent } from '../../models/tmEvent/tm-event.model';
@Injectable({
  providedIn: 'platform'
})
export class TicketMasterService {
  noAuthHeader = { headers: new HttpHeaders({ 'NoAuth': 'True'})};
  private readonly TM_EVENTS = 'TM_EVENTS';
  tmEvents: any = [];
  constructor(private http: HttpClient, private data: DataService) {
  }

  fetchTmData() {
    this.http.get(environment.apiBaseUrl + '/ticketmaster-events', this.noAuthHeader).subscribe(res => {
      this.getTheFields(res);
    });
  }


  getTheFields(response) {
    const gettingFields = async () => {
      const getFields = () => {
        return new Promise((resolve, reject) => {
          const tmevent = {};
          let eventName: string;
          let startDate: string;
          let promoter: string;
          let location: string;
          let price: number;
          let venue: string;
          let info: string;
          let lat: number;
          let long: number;
          let image: string;
          let url: string;
          let i = 0;
          for (const event of response) {
            try {
              eventName = event.name;
            } catch (err) {
              eventName = '';
            }
            try {
              startDate = event.dates.start.localDate;
            } catch (err) {
              startDate = null;
            }
            try {
              promoter = event.promoter.name;
            } catch (err) {
              promoter = '';
            }
            try {
              location =
                event._embedded.venues[0].address.line1 +
                ' ' +
                event._embedded.venues[0].city.name +
                ' ' +
                event._embedded.venues[0].state.name;
            } catch (err) {
              location = '';
            }
            try {
              price = event.priceRanges[0].min;
            } catch (err) {
              price = 0;
            }
            try {
              venue =
                event._embedded.venues[0].name +
                ' in ' +
                event._embedded.venues[0].city.name;
            } catch (err) {
              venue = '';
            }
            try {
              info = event.info;
            } catch (err) {
              info = '';
            }
            try {
              lat = event._embedded.venues[0].location.latitude;
            } catch (err) {
              lat = null;
            }
            try {
              long = event._embedded.venues[0].location.longitude;
            } catch (err) {
              long = null;
            }
            try {
              image = event.images[0].url;
            } catch (err) {
              image = null;
            }
            try {
              url = event.url;
            } catch (err) {
              url = null;
            }
            tmevent[0] = eventName;
            tmevent[1] = startDate;
            tmevent[2] = promoter;
            tmevent[3] = location;
            tmevent[4] = price;
            tmevent[5] = venue;
            tmevent[6] = info;
            tmevent[7] = lat;
            tmevent[8] = long;
            tmevent[9] = image;
            tmevent [10] = url;
            const tmEventsPage = new TmEvent(
              eventName,
              startDate,
              promoter,
              location,
              price,
              venue,
              info,
              lat,
              long,
              image,
              url
            );
            this.tmEvents[i] = tmEventsPage;
            i++;
          }
          this.data.addProgress(99);
          this.data.tmEventsSource.next(this.tmEvents);
          localStorage.setItem(this.TM_EVENTS, JSON.stringify(this.tmEvents));
          this.data.addProgress(100);
          this.data.editCleared(true);
          resolve();
        });
      };
      const a = await getFields();
    };
    return gettingFields();
  }

}
