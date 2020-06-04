import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { DataService } from '../dataService/data.service';
import { Event } from '../../models/event.model';
import {TicketMasterService} from '../tmService/ticket-master.service';
import geohash from 'latlon-geohash';

@Injectable({
  providedIn: 'platform'
})

export class EventService {
  events: Event[];
  private readonly TM_EVENTS = 'TM_EVENTS';
  totalEvents: any = [];

  public currentLat: number;
  public currentLng: number;
  public markerLat: number;
  public markerLng: number;
  private readonly CURRENT_LAT = 'CURRENT_LAT';
  private readonly CURRENT_LNG = 'CURRENT_LNG';
  currentLatLong;
  progress;

  getUserLocation(): any {
    /* locate the User */
    const gettingLocation = async () => {
      const getPosition = () => {
        if (navigator.geolocation) {
          return new Promise((resolve, reject) => {
            navigator.geolocation.watchPosition(position => {
              this.currentLat = position.coords.latitude;
              this.currentLng = position.coords.longitude;
              this.data.addProgress(33);
              resolve();
            }, err => {
              this.data.addProgress(33);
              resolve();
            });
          });
        } else {
          console.log('bad');
        }
      };

      const hashing = () => {
        return new Promise((resolve, reject) => {
          this.data.latitudeSource.next(this.currentLat);
          localStorage.setItem(this.CURRENT_LAT, this.currentLat.toString(10));
          this.data.longitudeSource.next(this.currentLng);
          localStorage.setItem(this.CURRENT_LNG, this.currentLng.toString(10));
          this.currentLatLong = {
            latitude: this.currentLat,
            longitude: this.currentLng,
            hash: geohash.encode(this.currentLat, this.currentLng, 6)
          };
          this.data.addProgress(50);
          resolve();
        });
      };

      const getTmEvents = () => {
        return new Promise((resolve, reject) => {
          this.http.post(environment.apiBaseUrl + '/ticketmaster-events', this.currentLatLong)
            .subscribe(
              res => {
                this.data.addProgress(66);
                resolve(res);
              },
              err => {
                console.log(err);
                reject();
              });
        }
        );
      };

      const getTmEventsBasic = () => {
        return new Promise((resolve, reject) => {
          this.http.get(environment.apiBaseUrl + '/ticketmaster-events-basic')
            .subscribe(
              res => {
                this.data.addProgress(66);
                resolve(res);
              },
              err => {
                reject();
              });
        }
        );
      };

      const a = await getPosition();
      if (this.currentLat == null && this.currentLng == null) {
        const defaultLat = 39;
        const defaultLng = -98;
        this.data.newZoom(5);
        localStorage.setItem(this.CURRENT_LAT, defaultLat.toString(10));
        localStorage.setItem(this.CURRENT_LNG, defaultLng.toString(10));
        const b = await getTmEventsBasic();
        return b;
      } else {
        this.data.newZoom(10);
        const b = await hashing();
        const c = await getTmEvents();
        return c;
      }
    };
    return gettingLocation();
  }

  constructor(private http: HttpClient, private data: DataService, private tmService: TicketMasterService) { }

  async fetchEvents() {
    await this.getEvents();
    await this.getTmEvents();
    this.data.tmEvents.subscribe(tmEvents => {
      this.totalEvents = this.totalEvents.concat(this.events);
      this.totalEvents = this.totalEvents.concat(tmEvents);
      this.shuffle(this.totalEvents);
      this.data.addShuffle(this.totalEvents);
    });
  }

  getEvents() {
    return new Promise((resolve, reject) => {
      this.http.get(environment.apiBaseUrl + '/events').subscribe((data: Event[]) => {
        this.events = data;
        resolve();
      });
    });
  }

  async getTmEvents() {
    const storedTMEvents = JSON.parse(localStorage.getItem(this.TM_EVENTS));
    if (storedTMEvents == null) {
        try {
            const res = await this.getUserLocationServ();
            await this.getTmEventsServ(res);
        } catch (err) {
            console.log(err);
        }
    } else {
        this.data.newTmevents(storedTMEvents);
        this.data.newZoom(10);
    }
}

getUserLocationServ() {
  return new Promise((resolve, reject) => {
    resolve(this.getUserLocation());
  });
}

getTmEventsServ(res) {
  return new Promise((resolve, reject) => {
    resolve(this.tmService.getTheFields(res));
  });
}

shuffle(array) {
  return new Promise((resolve, reject) => {
    {
      let currentIndex = array.length, temporaryValue, randomIndex;

      // While there remain elements to shuffle...
      while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
      }
      this.totalEvents = array;
      resolve();
    }
  });
}

  getEventById(id) {
    return this.http.get(environment.apiBaseUrl + '/events' + id);
  }
  addEvent(eventName, eventLocation, eventLat, eventLng, eventDateFrom, eventDateUntil, eventDescr, price) {
    const event = {
      eventName,
      eventLocation,
      eventLat,
      eventLng,
      eventDateFrom,
      eventDateUntil,
      eventDescr,
      price,
      status
    };
    return this.http.post(environment.apiBaseUrl + '/events/add', event);
  }
  updateEvent(id, eventName, eventLocation, eventLat, eventLng, eventDateFrom, eventDateUntil, eventDescr, price, eventPrivate, status) {
    const issue = {
      eventName,
      eventLocation,
      eventLat,
      eventLng,
      eventDateFrom,
      eventDateUntil,
      eventDescr,
      price,
      eventPrivate,
      status
    };
    return this.http.post(environment.apiBaseUrl + '/events/update/' + id, event);
  }
  deleteEvent(id) {
    return this.http.get(environment.apiBaseUrl + '/events/delete/' + id);
  }

  downloadFile(file: string) {
    const body = { filename: file };

    return this.http.post('http://localhost:8080/file/download', body, {
      responseType: 'blob',
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }

}

