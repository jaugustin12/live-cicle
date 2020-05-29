import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventMapPageRoutingModule } from './event-map-page-routing.module';
import { EventMapPageComponent } from './event-map-page.component';
import { EventCardComponent } from './event-map/event-card/event-card.component';
import { EventFormComponent } from './event-map/event-form/event-form.component';
import { NavbarModule } from '../navbar/navbar.module';
import { MatButtonModule, MatMenuModule, MatIconModule, MatCardModule, MatStepperModule, MatFormFieldModule,
  MatInputModule, MatTooltipModule, MatSlideToggleModule, MatSidenavModule,
   MatToolbarModule, MatAutocompleteModule, MatProgressBarModule } from '@angular/material';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [EventMapPageComponent, EventCardComponent, EventFormComponent],
  imports: [
    CommonModule,
    EventMapPageRoutingModule,
    NavbarModule,
    MatProgressBarModule,
    MatSidenavModule,
    NgxSpinnerModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatStepperModule,
    MatButtonModule,
    MatInputModule
  ]
})
export class EventMapPageModule { }
