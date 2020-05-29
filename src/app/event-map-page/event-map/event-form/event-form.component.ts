import { Component, OnInit, EventEmitter, Output, ElementRef, NgZone, ViewChild, OnDestroy } from '@angular/core';
import { DataService } from '../../../../services/dataService/data.service';
import { EventService } from '../../../../services/eventService/event.service';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { MapsAPILoader } from '@agm/core';
import { Latlong } from '../../../../models/latlong.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.css']
})
export class EventFormComponent implements OnInit, OnDestroy {
  selectedFile = null;
  eventName = '';
  public eventPublic = true;
  eventDateFrom;
  eventDateUntil;
  eventDescr = '';
  isLinear = true;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  lastFormGroup: FormGroup;
  showEventForm: boolean;
  public eventLocation: FormControl;
  @ViewChild('eventLocation') public searchElementRef: ElementRef;
  eventPost: Latlong;
  eventLat: number;
  eventLng: number;
  posts: any = [];
  price: number;

  @Output() eventCreated = new EventEmitter();

  constructor(private mydata: DataService,
              private formBuilder: FormBuilder,
              private http: HttpClient,
              private mapsAPILoader: MapsAPILoader,
              private ngZone: NgZone,
              private eventService: EventService,
              private router: Router) {

    this.firstFormGroup = this.formBuilder.group({
      eventName: ['', Validators.required],
      eventLocation: ['', Validators.required],
      eventPublic: [true, Validators.required]
    });
    this.secondFormGroup = this.formBuilder.group({
      eventDateFrom: ['', Validators.required],
      eventDateUntil: ['', Validators.required]
    });
    this.lastFormGroup = this.formBuilder.group({
      eventDescr: ['', Validators.required],
      price: [0, Validators.required]
      /*     private: [false, Validators.required] */
    });

  }

  addEvent(eventName, eventLocation, eventLat, eventLng, eventDateFrom, eventDateUntil, eventDescr, price) {

    this.eventService.addEvent(eventName, eventLocation, eventLat, eventLng, eventDateFrom, eventDateUntil,
      eventDescr, price).subscribe(() => {
      });

    this.showEventForm = !this.showEventForm;

    this.mydata.editShowEventForm(this.showEventForm);
  }


  toggleEventForm(): void {
    this.showEventForm = !this.showEventForm;
    this.mydata.editShowEventForm(this.showEventForm);
  }

  togglePublic(): void {

  }

  /*   onFileSelected(event) {
      this.selectedFile = <File>event.target.files[0];
    }
    onUpload() {
      const fd = new FormData();
      fd.append('image', this.selectedFile, this.selectedFile.name);
      this.http.post(environment.apiBaseUrl + '/events/upload', fd, {
        reportProgress: true,
        observe: 'events'

      }).subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {
          console.log('Upload Progress: ' + Math.round(event.loaded / event.total * 100) + '%');
        } else if ( event.type === HttpEventType.Response) {
          console.log(event);
        }

      });
    } */

  ngOnInit() {
    this.mydata.currentShowEventForm.subscribe(showEventForm => this.showEventForm = showEventForm);
    this.eventLocation = new FormControl();
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
          this.eventPost = {
            latitude: place.geometry.location.lat(),
            longitude: place.geometry.location.lng()
          };

          this.eventLat = this.eventPost.latitude;

          this.eventLng = this.eventPost.longitude;

        });
      });
    });
  }
  ngOnDestroy() {
    this.mydata.currentShowEventForm.subscribe(showEventForm => this.showEventForm = showEventForm).unsubscribe();
  }

}
