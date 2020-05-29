import { Injectable } from '@angular/core';
import { DataService } from '../dataService/data.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import geohash from 'latlon-geohash';

@Injectable({
  providedIn: 'root'
})
export class GoogleService {
  public currentLat: number;
  public currentLng: number;
  public markerLat: number;
  public markerLng: number;
  private readonly CURRENT_LAT = 'CURRENT_LAT';
  private readonly CURRENT_LNG = 'CURRENT_LNG';
  currentLatLong;
  progress;

  constructor(private data: DataService, private http: HttpClient) {
  }

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
}
