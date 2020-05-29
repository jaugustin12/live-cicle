import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventsComponent } from './events.component';
import { MatButtonModule, MatMenuModule, MatIconModule, MatCardModule, MatStepperModule, MatFormFieldModule,
  MatInputModule, MatTooltipModule, MatSlideToggleModule, MatSidenavModule,
   MatToolbarModule, MatAutocompleteModule, MatProgressBarModule } from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import { NgxSpinnerModule } from 'ngx-spinner';
import {NavbarModule} from '../navbar/navbar.module';
import {EventsRoutingModule} from './events-routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';

import { SwiperModule, SwiperConfigInterface,
  SWIPER_CONFIG } from 'ngx-swiper-wrapper';

@NgModule({
  declarations: [EventsComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MatToolbarModule,
    MatButtonModule,
    MatTooltipModule,
    MatInputModule,
    MatProgressBarModule,
    NgxSpinnerModule,
    NavbarModule,
    SwiperModule,
    MatCardModule,
    EventsRoutingModule
  ]
})
export class EventsModule { }
