import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Latlong } from '../../models/latlong.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private showSideMenu = new BehaviorSubject<boolean>(false);
  currentShowSideMenu = this.showSideMenu.asObservable();

  private showEventForm = new BehaviorSubject<boolean>(false);
  currentShowEventForm = this.showEventForm.asObservable();

  private showEventCard = new BehaviorSubject<boolean>(false);
  currentShowEventCard = this.showEventCard.asObservable();

  private cleared = new BehaviorSubject<boolean>(false);
  clearedStatus = this.cleared.asObservable();

  public tsClickedClustersSource = new BehaviorSubject<any>([]);
  tsClickedClusters = this.tsClickedClustersSource.asObservable();

  private latlongsSource = new BehaviorSubject<any>([]);
  latlongs = this.latlongsSource.asObservable();

  public latlongSource = new BehaviorSubject<Latlong>({latitude: 0, longitude: 0});

  public tmEventsSource = new BehaviorSubject<any>([]);
  tmEvents = this.tmEventsSource.asObservable();

  public totalShuffledEventsSource = new BehaviorSubject<any>([]);
  totalShuffledEvents = this.totalShuffledEventsSource.asObservable();

  latitudeSource = new BehaviorSubject<number>(0);
  currentlatitude = this.latitudeSource.asObservable();

  longitudeSource = new BehaviorSubject<number>(0);
  currentlongitude = this.longitudeSource.asObservable();

  public markerLatSource = new BehaviorSubject<number>(0);
  markerLat = this.markerLatSource.asObservable();

  public markerLngSource = new BehaviorSubject<number>(0);
  markerLng = this.markerLngSource.asObservable();

  private zoomSource = new BehaviorSubject<number>(0);
  zoom = this.zoomSource.asObservable();

  public eventPostSource = new BehaviorSubject<Latlong>({latitude: 0, longitude: 0});

  public eventLatSource = new BehaviorSubject<number>(0);
  eventLat = this.eventLatSource.asObservable();

  public eventLngSource = new BehaviorSubject<number>(0);
  eventLng = this.eventLngSource.asObservable();

  public loggedInSource = new BehaviorSubject<boolean>(false);
  loggedIn = this.loggedInSource.asObservable();

  public mapsLoadedSource = new BehaviorSubject<boolean>(false);
  mapsLoaded = this.mapsLoadedSource.asObservable();

  progressBarSource = new BehaviorSubject<number>(0);
  currentProgress = this.progressBarSource.asObservable();

  constructor() { }

  addShuffle(shuffle) {
    this.totalShuffledEventsSource.next(shuffle);
  }

  addProgress(progress) {
    this.progressBarSource.next(progress);
  }

  editMapsLoaded(isMapLoaded) {
    this.mapsLoadedSource.next(isMapLoaded);
  }

  editLoggedIn(isLoggedIn) {
    this.loggedInSource.next(isLoggedIn);
  }

  editCleared(status) {
    this.cleared.next(status);
  }

  editShowSideMenu(newClick) {
    this.showSideMenu.next(newClick);
  }

  editShowEventForm(newClick) {
    this.showEventForm.next(newClick);
  }

  editShowEventCard(newClick) {
    this.showEventCard.next(newClick);
  }

  newLatLongs(latlongs: Array<number>) {
    this.latlongsSource.next(latlongs);
  }

  newLatLong(latlong: Latlong) {
    this.latlongSource.next(latlong);
  }

  newLatitude(latitude: number) {
    this.latitudeSource.next(latitude);
  }

  newLongitude(longitude: number) {
    this.longitudeSource.next(longitude);
  }

  newmarkerLat(markerLat: number) {
    this.markerLatSource.next(markerLat);
  }

  newmarkerLng(markerLng: number) {
    this.markerLngSource.next(markerLng);
  }

  newZoom(zoom: number) {
    this.zoomSource.next(zoom);
  }
  newEventPost(eventPost: Latlong) {
    this.eventPostSource.next(eventPost);
  }

  newEventLat(eventLat: number) {
    this.eventLatSource.next(eventLat);
  }

  newEventLng(eventLng: number) {
    this.eventLngSource.next(eventLng);
  }

  newTmevents(tmEvents) {
    this.tmEventsSource.next(tmEvents);
  }

  newtsClickedClusters(tsClickedClusters: Array<any>) {
    this.tsClickedClustersSource.next(tsClickedClusters);
  }
}
