import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { DataService } from '../dataService/data.service';
import { Event } from '../../models/event.model';
import {GoogleService} from '../googleService/google.service';
import {TicketMasterService} from '../tmService/ticket-master.service';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  events: Event[];
  private readonly TM_EVENTS = 'TM_EVENTS';
  totalEvents: any = [];

  constructor(private http: HttpClient, private data: DataService, private googleService: GoogleService, private tmService: TicketMasterService) { }

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
    resolve(this.googleService.getUserLocation());
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

