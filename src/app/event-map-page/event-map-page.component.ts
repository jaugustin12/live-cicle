/// <reference types="@types/googlemaps" />
import { Component, OnInit, OnDestroy, NgZone, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { DataService } from '../../services/dataService/data.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormControl } from '@angular/forms';
import { MapsAPILoader } from '@agm/core';
import { Latlong } from '../../models/latlong.model';
declare let google: any;
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, OnChanges, Output } from '@angular/core';
import { environment } from '../../environments/environment';
import { EventService } from '../../services/eventService/event.service';
import { EventCord } from '../../models/event-cord/event-cord.model';
import { Event } from '../../models/event.model';
import { TmEvent } from '../../models/tmEvent/tm-event.model';
declare var MarkerClusterer: any;
import { forkJoin } from 'rxjs';
import { TicketMasterService } from '../../services/tmService/ticket-master.service';
import { async } from 'q';


@Component({
  selector: 'app-event-map-page',
  templateUrl: './event-map-page.component.html',
  styleUrls: ['./event-map-page.component.css']
})

export class EventMapPageComponent implements OnInit, OnDestroy, AfterViewInit {
  showFiller = false;
  showEventForm: boolean;
  @ViewChild('search')
  public searchElementRef: ElementRef;
  public latlongs: any = [];
  public latlong: Latlong;
  public searchControl: FormControl;
  public markerLat: number;
  public markerLng: number;
  public zoom: number;
  mapsLoaded: boolean;
  showMap;
  loggedIn: boolean;
  showEventCard = false;
  refreshed = false;
  clusterClicked;

  private readonly TM_EVENTS = 'TM_EVENTS';
  tmEvents: any = [];
  private apiKey = environment.googleMapsAPIkey;
  // Current Location
  public currentLat: number;
  public currentLng: number;
  public latitude: number;
  public longitude: number;
  events: Event[];
  latitudes: any = [];
  longitudes: any = [];
  coordinate: any = [];
  coordinates: any = [];
  labelOptions = {
    color: '#FFFFFF'
  };
  tsClickedClusters: any = [];
  private readonly CURRENT_LAT = 'CURRENT_LAT';
  private readonly CURRENT_LNG = 'CURRENT_LNG';
  map;
  panorama;
  gmarkers = [];
  progress = 0;

  constructor(
    private tmService: TicketMasterService,
    private eventService: EventService,
    private spinner: NgxSpinnerService,
    private data: DataService,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private router: Router,
    private http: HttpClient) {

    const node = document.createElement('script');
    node.type = 'text/javascript';
    node.async = true;
    node.charset = 'utf-8';
    document.getElementsByTagName('head')[0].appendChild(node);
  }

  ngOnInit() {
    this.spinner.show().then( async () => {
    await this.eventService.fetchEvents();
          /* for the map */
    this.data.tmEvents.subscribe(tmEvents => (this.tmEvents = tmEvents));

    this.data.currentlatitude.subscribe(latitude => this.currentLat = latitude);
    this.data.currentlongitude.subscribe(longitude => this.currentLng = longitude);

    const storedLat = parseFloat(localStorage.getItem(this.CURRENT_LAT));
    this.markerLat = storedLat;
    this.data.newmarkerLat(this.markerLat);

    const storedLng = parseFloat(localStorage.getItem(this.CURRENT_LNG));

    this.markerLng = storedLng;
    this.data.newmarkerLng(this.markerLng);

    if (this.currentLat !== storedLat) {
      this.data.newLatitude(storedLat);
    }
    if (this.currentLng !== storedLng) {
      this.data.newLongitude(storedLng);
    }
    this.data.latlongs.subscribe(latlongs => this.latlongs = latlongs);
    this.data.latlongSource.subscribe(latlong => { this.latlong = latlong; });
    this.data.markerLat.subscribe(markerLat => this.markerLat = markerLat);
    this.data.markerLng.subscribe(markerLng => this.markerLng = markerLng);
    this.data.zoom.subscribe(zoom => this.zoom = zoom);
      this.data.markerLatSource.complete();
      this.data.markerLngSource.complete();
    }).then(async () => {
      await this.initMap();
    }).then(() => {
      this.spinner.hide();
    });
    /* map ends */



    this.data.currentShowEventCard.subscribe(showEventCard => this.showEventCard = showEventCard);
    this.data.loggedIn.subscribe(loggedIn => this.loggedIn = loggedIn);
    this.data.currentShowEventForm.subscribe(showEventForm => this.showEventForm = showEventForm);
    this.data.mapsLoaded.subscribe(mapsLoaded => this.mapsLoaded = mapsLoaded);
    setTimeout(() => {
      if (this.mapsLoaded === false) {
        this.showMap = false;
      } else {
        this.showMap = true;
      }
    }, 10000);
    this.searchControl = new FormControl();

    this.mapsAPILoader.load().then(() => {
      const autocomplete = new google.maps.places.Autocomplete(
        this.searchElementRef.nativeElement, {
          types: []
        });
      autocomplete.addListener('place_changed', () => {
        this.ngZone.run(() => {
          const place: google.maps.places.PlaceResult = autocomplete.getPlace();
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }
          this.latlong = {
            latitude: place.geometry.location.lat(),
            longitude: place.geometry.location.lng()
          };
          this.zoom = 12;
          this.data.latlongSource.next({ ...this.latlong });
          this.markerLat = this.latlong.latitude;
          this.data.markerLatSource.next(this.markerLat);
          this.markerLng = this.latlong.longitude;
          this.data.markerLngSource.next(this.markerLng);

          this.latlongs.push(this.latlong);
          this.searchControl.reset();
          if (this.panorama.getVisible() === false) {
            this.changeCenter(this.markerLat, this.markerLng);
          } else {
            this.panorama.setPosition({ lat: this.markerLat, lng: this.markerLng }, 10);
          }
        });
      });
    });
    this.data.currentProgress.subscribe(progress => this.progress = progress);
  }


  ngOnDestroy() {
    this.data.tmEvents.subscribe(tmEvents => (this.tmEvents = tmEvents)).unsubscribe();
    this.data.currentlatitude.subscribe(latitude => this.currentLat = latitude).unsubscribe();
    this.data.currentlongitude.subscribe(longitude => this.currentLng = longitude).unsubscribe();
    this.data.latlongs.subscribe(latlongs => this.latlongs = latlongs).unsubscribe();
    this.data.latlongSource.subscribe(latlong => { this.latlong = latlong; }).unsubscribe();
    this.data.markerLat.subscribe(markerLat => this.markerLat = markerLat).unsubscribe();
    this.data.markerLng.subscribe(markerLng => this.markerLng = markerLng).unsubscribe();
    this.data.zoom.subscribe(zoom => this.zoom = zoom).unsubscribe();
    this.data.loggedIn.subscribe(loggedIn => this.loggedIn = loggedIn).unsubscribe();
    this.data.currentShowEventForm.subscribe(showEventForm => this.showEventForm = showEventForm).unsubscribe();
    this.data.mapsLoaded.subscribe(mapsLoaded => this.mapsLoaded = mapsLoaded).unsubscribe();
  }

  initMap() {
    this.mapsAPILoader.load().then(() => {
      const uluru = { lat: this.currentLat, lng: this.currentLng };
      const mapCenter = { lat: this.markerLat, lng: this.markerLng };
      this.map = new google.maps.Map(document.getElementById('map'), {
        zoom: this.zoom,
        center: mapCenter
      });
      this.panorama = this.map.getStreetView();
      this.panorama.setPov({
        heading: 100,
        pitch: 0
      });
      this.panorama.setPosition({ lat: this.markerLat, lng: this.markerLng });
      const iconBase = 'https://developers.google.com/maps/documentation/javascript/examples/full/images/';
      const icons = {
        aim: {
          icon: iconBase + '../../assets/icons/aim.svg'
        },
        bluePin: {
          icon: {
            url: '../../assets/icons/bluePin.svg',
            scaledSize: new google.maps.Size(50, 50)
          }
        },
        /*         blueColumn: {
                  icon: {
                    url: '../../assets/icons/blue-column.svg',
                    //size: new google.maps.Size(50, 50),
                    scaledSize: new google.maps.Size(80, 1000)
                  }
                }, */
        person: {
          icon: '../../assets/icons/userLocation.svg'
        },
        info: {
          icon: iconBase + 'info-i_maps.png'
        }
      };
      const personIcon = {
        url: '../../assets/icons/userLocation.svg',
        scaledSize: new google.maps.Size(50, 50)
      };
      const marker = new google.maps.Marker({ position: uluru, map: this.map, icon: personIcon });

      /* Users' events info */
      const features = [];
      let event: Event;

      if (this.events != null) {

      event = this.events[0];

      for (event of this.events) {


        const contentString = '<div id="content">' +
          '<div id="siteNotice">' +
          '</div>' +
          '<h1 id="firstHeading">' + event.eventName + '</h1>' +
          '<div id="bodyContent">' +
          '<p>' + event.info + '</p>' +
          '<p>' + event.startDate + '</p>' +
          '<p>' + event.promoter + '</p>' +
          '</div>' +
          '</div>';


        const eventCord = new EventCord();

        eventCord.position = new google.maps.LatLng(event.lat, event.long);
        eventCord.type = 'bluePin';
        eventCord.event = event;
        eventCord.content = contentString;
        features.push(eventCord);
      }

  }
      /* Users events ends */


      /* TMEvents' info */
      const tmfeatures = [];
      let tmEvent: TmEvent;
      for (tmEvent of this.tmEvents) {
        const tmImage = tmEvent.image;
        const contentString = '<div id="content">' +
          '<div id="siteNotice">' +
          '</div>' +
/*           '% if ' + tmEvent.image + '%' + */
          '<img src="' + tmImage + '"style="max-width:250px; max-height:250px;">' +
/*           '{% endif %}' + */
          '<h1 id="firstHeading">' + tmEvent.eventName + '</h1>' +
          '<div id="bodyContent">' +
          '<p>' + tmEvent.startDate + '</p>' +
          '<p>' + tmEvent.location + '</p>' +
/*           '% if ' + tmEvent.info + '%' + */
          '<p>' + tmEvent.info + '</p>' +
/*           '{% endif %}' + */
/*           '% if ' + tmEvent.price + '%' + */
            '<p>' + tmEvent.price + '</p>' +
/*           '{% endif %}' + */
/*           '% if ' + tmEvent.promoter + '%' + */
            '<p>' + tmEvent.promoter + '</p>' +
/*           '{% endif %}' + */
          '</div>' +
          '</div>';


        const tmeventCord = new EventCord();
        tmeventCord.position = new google.maps.LatLng(tmEvent.lat, tmEvent.long);
        tmeventCord.type = 'info';
        tmeventCord.event = tmEvent;
        tmeventCord.content = contentString;
        tmfeatures.push(tmeventCord);
      }
      /* TMEvents ends */

      let clickedClusters = [];
      const markerCluster = new MarkerClusterer(this.map, [],
        { imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m',
          maxZoom: 14,
          gridSize: 20, });
      const hideMe = document.getElementById('hideMe');
      /* document.onclick = (e) => {
        const target = e.target as HTMLTextAreaElement;
        let id = target.getAttribute('id');
        console.log(target.className);
        console.log('target:', target);
        console.log('id:', id);
        if (id === "event-card") {
          this.showEventCard = true;
        } else {
          this.showEventCard = false;
        }
      }; */
      google.maps.event.addListener(markerCluster, 'clusterclick', function (c) {
        sendClick();
        var m = c.getMarkers();
        this.showEventCard = true;
        clickedClusters = [];
        for (var i = 0; i < m.length; i++) {
          clickedClusters.push(m[i].customInfo);
          this.tsClickedClusters = clickedClusters;
        }
        getData(this.tsClickedClusters);
      });

      const sendClick = () => {
        this.data.editShowEventCard(true);
        this.clickedOnClusters();
      };

      const getData = (cluster) => {
        this.getDataService(cluster);
      };

      // User Markers.
      for (var i = 0; i < features.length; i++) {

        const infowindow = new google.maps.InfoWindow({
          content: features[i].content
        });

        const marker2 = new google.maps.Marker({
          position: features[i].position,
          icon: icons[features[i].type].icon,
          animation: google.maps.Animation.DROP,
          map: this.map
        });
        marker2.set('customInfo', features[i].event);

        marker2.addListener('click', () => {
          marker2.setAnimation(google.maps.Animation.BOUNCE);
          setTimeout(() => {
            marker2.setAnimation(null);
          }, 1000);
          infowindow.open(this.map, marker2);
        });
        markerCluster.addMarker(marker2);
      }

      // TMEvent Markers.
      for (var i = 0; i < tmfeatures.length; i++) {

        const infowindow = new google.maps.InfoWindow({
          content: tmfeatures[i].content
        });

        const tmMarker = new google.maps.Marker({
          position: tmfeatures[i].position,
          icon: icons[tmfeatures[i].type].icon,
          animation: google.maps.Animation.DROP,
          map: this.map
        });
        tmMarker.set('customInfo', tmfeatures[i].event);

        tmMarker.addListener('click', () => {
          tmMarker.setAnimation(google.maps.Animation.BOUNCE);
          setTimeout(() => {
            tmMarker.setAnimation(null);
          }, 1000);
          infowindow.open(this.map, tmMarker);
        });
        markerCluster.addMarker(tmMarker);
      }
      this.data.editMapsLoaded(true);
    });
  }


  getDataService(cluster) {

    this.data.newtsClickedClusters(cluster);

  }

  changeCenter(lat, lng) {
    this.removeMarkers();
    this.data.newmarkerLat(lat);
    this.data.newmarkerLng(lng);
    this.map.setCenter(new google.maps.LatLng(lat, lng));
    const aim = {
      url: '../../assets/icons/aim.svg',
      scaledSize: new google.maps.Size(20, 20)
    };
    var newPos = { lat: lat, lng: lng };
    const marker2 = new google.maps.Marker({ position: newPos, map: this.map, icon: aim });
    this.gmarkers.push(marker2);
  }

  removeMarkers() {
    let i;
    for (i = 0; i < this.gmarkers.length; i++) {
      this.gmarkers[i].setMap(null);
    }
  }

  refresh() {
    this.ngOnInit();
  }

  ngAfterViewInit() {
  }

  retry() {
    location.reload();
  }


  toggleEventForm(): void {
    this.showEventForm = !this.showEventForm;
    this.data.editShowEventForm(this.showEventForm);
  }

  login() {
    this.router.navigate(['/login']);
  }


  getUserLocation() {
    /* locate the User */
    if ('geolocation' in navigator) {
      navigator.geolocation.watchPosition((position) => {
        this.markerLat = position.coords.latitude;
        this.data.markerLatSource.next(this.markerLat);
        this.data.newLatitude(this.markerLat);
        this.markerLng = position.coords.longitude;
        this.data.markerLngSource.next(this.markerLng);
        this.data.newLongitude(this.markerLng);
        this.zoom = 25;
        this.changeCenter(this.markerLat, this.markerLng);
      });
    }
  }

  currentLocation() {
    const storedLat = parseFloat(localStorage.getItem(this.CURRENT_LAT));
    const storedLng = parseFloat(localStorage.getItem(this.CURRENT_LNG));
    if (storedLat && storedLng) {
      if (this.panorama.getVisible() === false) {
        this.changeCenter(storedLat, storedLng);
      } else {
        this.panorama.setPosition({ lat: storedLat, lng: storedLng });
      }
    }
    this.getUserLocation();
  }

  testPost() {
    const test = 'test';
    this.http.post(environment.apiBaseUrl + '/test', { test })
      .subscribe(
        res => {
          console.log(res);
        },
        err => {
          console.log(err);
        });
  }

  toggleStreetView() {
    const toggle = this.panorama.getVisible();
    if (toggle === false) {
      this.panorama.setVisible(true);
    } else {
      this.panorama.setVisible(false);
    }
  }

  clickedOnClusters() {
    this.clusterClicked = true;
  }
}

