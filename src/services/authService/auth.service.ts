import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { of, Observable } from 'rxjs';
import { catchError, mapTo, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Tokens } from '../../models/Tokens/tokens.model';
import { UserService } from '../userService/user.service';
import {DataService} from '../dataService/data.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly JWT_TOKEN = 'JWT_TOKEN';
  private readonly REFRESH_TOKEN = 'REFRESH_TOKEN';
  private loggedUser: string;
  noAuthHeader = { headers: new HttpHeaders({ 'NoAuth': 'True'})};
  loggedIn: boolean;

  constructor(private http: HttpClient, private userService: UserService, private data: DataService) {
    this.data.loggedIn.subscribe(loggedIn => this.loggedIn = loggedIn);
  }

  login(form): Observable<boolean> {
    return this.http.post<any>(environment.apiBaseUrl + '/authenticate', form, this.noAuthHeader)
      .pipe(
        tap(tokens => {
          this.data.editLoggedIn(true);
          this.doLoginUser(form.email, tokens);
        }),
        mapTo(true)/* ,
        catchError(error => {
          return of(false);
        }) */
      );
  }

  logout() {
    this.data.editLoggedIn(false);
    return this.http.post<any>(environment.apiBaseUrl + '/logout', {
      'refreshToken': this.getRefreshToken()
    }).pipe(
      tap(() => this.doLogoutUser()),
      mapTo(true),
      catchError(error => {
        alert(error.error);
        return of(false);
      }));
  }

  isLoggedIn() {
    if (this.getJwtToken()) {
      this.data.editLoggedIn(this.userService.isLoggedIn());
      if (!this.userService.isLoggedIn()) {
        this.userService.refreshToken().subscribe(
          res => {
          this.data.editLoggedIn(true);
          return true;
        },
        err => {
          this.data.editLoggedIn(false);
          return false;
        }
        );
      }
    }
    this.data.editLoggedIn(false);
    return false;
  }

  getJwtToken() {
    return localStorage.getItem(this.JWT_TOKEN);
  }

  private doLoginUser(username: string, tokens: Tokens) {
    this.loggedUser = username;
    this.storeTokens(tokens);
  }

  private doLogoutUser() {
    this.loggedUser = null;
    this.removeTokens();
  }

  private getRefreshToken() {
    return localStorage.getItem(this.REFRESH_TOKEN);
  }

  private storeTokens(tokens: Tokens) {
    localStorage.setItem(this.JWT_TOKEN, tokens.jwt);
    localStorage.setItem(this.REFRESH_TOKEN, tokens.refreshToken);
  }

  removeTokens() {
    localStorage.removeItem(this.JWT_TOKEN);
    localStorage.removeItem(this.REFRESH_TOKEN);
  }
}
