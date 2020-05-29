import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NavbarComponent } from './navbar.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { MatButtonModule, MatMenuModule, MatIconModule, MatCardModule, MatStepperModule, MatFormFieldModule,
  MatInputModule, MatTooltipModule, MatSlideToggleModule, MatSidenavModule,
   MatToolbarModule, MatAutocompleteModule, MatProgressBarModule } from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {CounterComponent} from './counter/counter.component';


@NgModule({
  declarations: [SignInComponent, NavbarComponent, CounterComponent],
  imports: [
    CommonModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MatToolbarModule,
    MatButtonModule,
    MatTooltipModule,
    MatInputModule
  ],
  exports: [
    NavbarComponent
  ]
})
export class NavbarModule { }
