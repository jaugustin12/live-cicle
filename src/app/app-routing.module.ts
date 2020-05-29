import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { HomeComponent } from './home/home.component';
import { OrganizationsComponent } from './organizations/organizations.component';
import { SignInComponent } from './navbar/sign-in/sign-in.component';
import { ProfileComponent } from './profile/profile.component';
import { EventsComponent } from './events/events.component';
import { TestComponent } from './test/test.component';
import { UserComponent } from './user/user.component';
import { SignIn2Component } from './user/sign-in2/sign-in2.component';
import { SignUpComponent } from './user/sign-up/sign-up.component';
import { AuthGuard } from '../auth/auth.guard';
import { UserService } from '../services/userService/user.service';

/* import { FriendsComponent } from '../app/friends/friends.component';
import {FriendsProfileComponent} from './friends-profile/friends-profile.component';
import { TmCarouselComponent } from './tm-carousel/tm-carousel.component'; */
/* import { ImageComponent } from './image/image.component'; */

const routes: Routes = [
  {path: '', component: WelcomeComponent},
  {path: 'home', component: HomeComponent},
  {path: 'map',   loadChildren: () => import('./event-map-page/event-map-page.module').then(m => m.EventMapPageModule)},
  {path: 'events', loadChildren: () => import('./events/events.module').then(m => m.EventsModule)},
  {path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},

  {
    path: 'navbar',
    component: SignInComponent,
  resolve: {signedIn: UserService}
  },
  // {path: 'organizations', component: OrganizationsComponent},
  {
    path: 'signup', component: UserComponent,
    children: [{ path: '', component: SignUpComponent }]
},
{
    path: 'login', component: UserComponent,
    children: [{ path: '', component: SignIn2Component }]
},
  {path: '**', redirectTo: '', pathMatch: 'full'},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
