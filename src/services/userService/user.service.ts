import { Injectable } from '@angular/core';
import { User } from '../../models/user-model/user.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Tokens } from '../../models/Tokens/tokens.model';
import { catchError, mapTo, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService implements Resolve<boolean> {
  private readonly JWT_TOKEN = 'JWT_TOKEN';
  public loggedIn = false;
  selectedUser: User = {
    fullName: '',
    email: '',
    password: '',
    relationships: {
      followers: [],
      following: []
    },
    posts: {
      userPosts: []
    }
  };
  private readonly REFRESH_TOKEN = 'REFRESH_TOKEN';

  noAuthHeader = { headers: new HttpHeaders({ 'NoAuth': 'True'})};

  constructor(private http: HttpClient) { }


  // Http Methods
  postUser(user: User) {
    return this.http.post(environment.apiBaseUrl + '/register' , user, this.noAuthHeader);
  }

  login(form) {
    return this.http.post(environment.apiBaseUrl + '/authenticate', form, this.noAuthHeader);
  }

  follow(email) {
    return this.http.post(environment.apiBaseUrl + '/follow', {email});
  }

  getUserProfile() {
    return this.http.get(environment.apiBaseUrl + '/userProfile', this.noAuthHeader);
  }

  getPosts(email) {
    return this.http.post(environment.apiBaseUrl + '/posts', {email});
  }

  getUserProfiles() {
    return this.http.get(environment.apiBaseUrl + '/users');
  }

  getFriendsProfile(email) {
    return this.http.get(environment.apiBaseUrl + '/profile/' + email);
  }

  refreshToken() {
    return this.http.post<any>(environment.apiBaseUrl + '/refresh', {
      'refreshToken': this.getRefreshToken()
    }).pipe(tap((tokens: Tokens) => {
      this.storeJwtToken(tokens.jwt);
    }));
  }

  private storeJwtToken(jwt: string) {
    localStorage.setItem(this.JWT_TOKEN, jwt);
  }

  private getRefreshToken() {
    return localStorage.getItem(this.REFRESH_TOKEN);
  }


  // Helper Methods
  getToken() {
    return localStorage.getItem(this.JWT_TOKEN);
  }

  setToken(token: string) {
    localStorage.setItem(this.JWT_TOKEN, token);
  }

  deleteToken() {
    localStorage.removeItem(this.JWT_TOKEN);
  }

  getUserPayload() {
    const token = this.getToken();
    if (token) {
      const userPayload = atob(token.split('.')[1]);
      return JSON.parse(userPayload);
    } else {
      return null;
    }
  }

  isLoggedIn() {
    const userPayload = this.getUserPayload();
    if (userPayload) {
      this.refreshToken().subscribe((res) => {
      })
      this.loggedIn = true;
      return true;
    }
    this.loggedIn = false;
    return false;
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return of(this.loggedIn);
  }
}
