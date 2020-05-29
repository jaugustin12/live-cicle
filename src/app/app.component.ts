import { Component } from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {slider, transformer, fader, stepper } from './route-animations';
import { SwUpdate } from '@angular/service-worker';
import { Data2Service } from '../services/data2Service/data2.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'LiveCicle';
  update = false;

  constructor(updates: SwUpdate, private data2: Data2Service) {
    updates.available.subscribe(event => {

    updates.activateUpdate().then(() => document.location.reload());
    });
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }

  ngOninit() {

  }
}
