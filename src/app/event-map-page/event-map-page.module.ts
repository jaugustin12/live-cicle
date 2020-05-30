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
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor} from '../../auth/auth.interceptor';
import { AuthGuard } from '../../auth/auth.guard';
import { UserService } from '../../services/userService/user.service';
import {DataService} from '../../services/dataService/data.service';
import { EventService } from '../../services/eventService/event.service';
import { TicketMasterService } from '../../services/tmService/ticket-master.service';

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
  ],
  providers: [
    {
      provide:
        HTTP_INTERCEPTORS
      ,

      useClass: AuthInterceptor,
      multi: true
    },
    AuthGuard,
    UserService,
    DataService,
    EventService,
    TicketMasterService
  ],
})
export class EventMapPageModule { }
