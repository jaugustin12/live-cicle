import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CarouselModule, TooltipModule } from 'ngx-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { HomeComponent } from './home/home.component';
import { BackgroundComponent } from './welcome/background/background.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatMenuModule, MatIconModule, MatCardModule, MatStepperModule, MatFormFieldModule,
         MatInputModule, MatTooltipModule, MatSlideToggleModule, MatSidenavModule,
          MatToolbarModule, MatAutocompleteModule, MatProgressBarModule } from '@angular/material';
/* import { SearchComponent } from './search/search.component'; */
import { HomeCarouselComponent } from './home/home-carousel/home-carousel.component';
import { ProfileComponent } from './profile/profile.component';
/* import { OrganizationsComponent } from './organizations/organizations.component'; */
import { LiveCicleLogoComponent } from './welcome/live-cicle-logo/live-cicle-logo.component';
import {SuiModule} from 'ng2-semantic-ui';
import { AgmCoreModule } from '@agm/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AgmJsMarkerClustererModule } from '@agm/js-marker-clusterer';
import { RouteReuseStrategy } from '@angular/router';
import { TestComponent } from './test/test.component';
import { UserComponent } from './user/user.component';
import { SignUpComponent } from './user/sign-up/sign-up.component';
import { AgmSnazzyInfoWindowModule } from '@agm/snazzy-info-window';
import {environment} from '../environments/environment';
import { UserService } from '../services/userService/user.service';
import { Data2Service } from '../services/data2Service/data2.service';
import { SignIn2Component } from './user/sign-in2/sign-in2.component';
import { AuthGuard } from '../auth/auth.guard';
import { AuthInterceptor} from '../auth/auth.interceptor';
import { NightModeComponent } from './night-mode/night-mode.component';
import { MatSelectModule } from '@angular/material/select';
/* import { FriendsComponent } from './friends/friends.component'; */
// import { FriendsProfileComponent } from './friends-profile/friends-profile.component';
import { ServiceWorkerModule } from '@angular/service-worker';
/* import { TmCarouselComponent } from './tm-carousel/tm-carousel.component'; */
import { SwiperModule } from 'ngx-swiper-wrapper';
import {DataService} from '../services/dataService/data.service';
/* import { ImageComponent } from './image/image.component'; */
import {FileUploadModule} from 'ng2-file-upload';
import {NavbarModule} from './navbar/navbar.module';
import { NgxSpinnerModule } from 'ngx-spinner';


/* import { Angular2UsefulSwiperModule } from 'angular2-useful-swiper'; */


@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    HomeComponent,
    BackgroundComponent,
/*     SearchComponent, */
    HomeCarouselComponent,
    ProfileComponent,
/*     OrganizationsComponent, */
    LiveCicleLogoComponent,
    TestComponent,
    UserComponent,
    SignUpComponent,
    NightModeComponent,
    SignIn2Component,
/*     FriendsComponent,
    FriendsProfileComponent, */
/*     TmCarouselComponent, */
    /* ImageComponent */
  ],
  imports: [
    NgxSpinnerModule,
    NavbarModule,
    SwiperModule,
/*     Angular2UsefulSwiperModule, */
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatMenuModule,
    MatIconModule,
    CarouselModule.forRoot(),
    TooltipModule.forRoot(),
    SuiModule,
    AgmCoreModule.forRoot({
      apiKey: environment.googleMapsAPIkey,
      libraries: ['places']
    }),
    AgmSnazzyInfoWindowModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AgmJsMarkerClustererModule,
    MatButtonModule,
    MatCardModule,
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    MatTooltipModule,
    MatSlideToggleModule,
    MatSidenavModule,
    MatToolbarModule,
    MatAutocompleteModule,
    MatSelectModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    MatProgressBarModule,
    FileUploadModule
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
    Data2Service,
    DataService
  ],
    bootstrap: [AppComponent]
})
export class AppModule { }
