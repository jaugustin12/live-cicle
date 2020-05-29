import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../services/userService/user.service';
import { AuthService } from '../services/authService/auth.service';
import { Router } from '@angular/router';
import { DataService } from '../services/dataService/data.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {

  loggedIn: boolean;

  constructor(private userService: UserService, private router: Router, private authService: AuthService, private data: DataService) {
    this.data.editLoggedIn(this.userService.isLoggedIn());
    this.data.loggedIn.subscribe(loggedIn => this.loggedIn = loggedIn);
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
/*       console.log('this.loggedIn', this.loggedIn) */
      if (this.loggedIn === false) {
        this.router.navigateByUrl('/login');
        this.authService.removeTokens();
        return false;
      } else {
      return true;
    }
  }
  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
    return true;
  }
}
