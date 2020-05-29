import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from '../user/user.component';
import { WelcomeComponent } from '../welcome/welcome.component';
import {HomeComponent} from '../home/home.component';
import { EventsComponent} from '../events/events.component';
import {ProfileComponent} from '../profile/profile.component';
import {SignInComponent} from './sign-in/sign-in.component';
import {UserService} from '../../services/userService/user.service';
import { SignUpComponent } from '../user/sign-up/sign-up.component';
import { SignIn2Component } from '../user/sign-in2/sign-in2.component';
import { AuthGuard } from '../../auth/auth.guard';

const routes: Routes = [
  {path: '', component: WelcomeComponent},
  {path: 'home', component: HomeComponent},
  {path: 'map',   loadChildren: () => import('../event-map-page/event-map-page.module').then(m => m.EventMapPageModule)},
  {path: 'events', loadChildren: () => import('../events/events.module').then(m => m.EventsModule)},
  {path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},

  {
    path: 'navbar',
    component: SignInComponent,
  resolve: {signedIn: UserService}
  },
  {path: 'user', component: UserComponent},
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
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventMapPageRoutingModule { }
