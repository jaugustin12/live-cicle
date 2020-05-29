import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EventMapPageComponent } from './event-map-page.component';

const routes: Routes = [{ path: '', component: EventMapPageComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventMapPageRoutingModule { }
