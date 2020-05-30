import { Component } from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {slider, transformer, fader, stepper } from './route-animations';
import { SwUpdate } from '@angular/service-worker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'LiveCicle';
  update = false;

  constructor(updates: SwUpdate) {
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
