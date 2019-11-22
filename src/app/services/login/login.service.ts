import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { tap, mapTo, catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Tokens } from '../../model/tokens';
import { config } from 'src/app/configs/app.config';
import { ErrorhandlerService } from '../errorhandlers/errorhandler.service';
import { User } from 'src/app/model/user';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private readonly Token = 'accesstToken';
  private readonly Header = 'header';
  private readonly issuer = 'issuer';
  private readonly token = '';
  private readonly refresh_token = '';
  public loggedUser: string;
  private errorhandler = new ErrorhandlerService();
  loginurl = config.api_base_url;
  constructor(private http: HttpClient) {}

  login(user: { email: string; password: string }): Observable<boolean> {
    const requestheader = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: 'Bearer'
    });
    return this.http
      .post<any>(`${this.loginurl}/api/public/login`, user, {
        headers: requestheader
      })
      .pipe(
        tap(tokens => this.doLoginUser(tokens)),
        catchError(this.errorhandler.handleError)
      );
  }
  private doLoginUser(tokens: Tokens) {
   // this.loggedUser = email;
    localStorage.setItem(this.Token, tokens.accessToken);
    localStorage.setItem(this.Header, tokens.header);
    localStorage.setItem(this.issuer, tokens.issuer);
  }
  // private storeTokens(tokens: Tokens) {

  // }

  logout() {
    // return this.http
    //   .post<any>(`${this.loginurl}/api/public/login`, {
    //     refreshToken: localStorage.getItem(this.Token)
    //   })
    //   .pipe(
    //     tap(() => this.doLogoutUser()),
    //     mapTo(true),
    //     catchError(this.errorhandler.handleError)
    //   );
     this.loggedUser = null;
     localStorage.removeItem(this.Token);
     localStorage.removeItem(this.Header);
     localStorage.removeItem(this.issuer);
     localStorage.removeItem(this.token);
     localStorage.removeItem(this.refresh_token);
  }

  // private doLogoutUser() {
  //   this.loggedUser = null;
  //   localStorage.removeItem(this.Token);
  //   localStorage.removeItem(this.Header);
  // }

   refreshToken() {
    return this.http
      .post<any>(``, {
        refreshToken: localStorage.getItem(this.Token)
      })
      .pipe(
        tap((tokens: Tokens) => {
          localStorage.setItem(this.Header, this.Header);
        })
      );
  }

  getJwtToken() {
    return localStorage.getItem(this.Token);
  }
  // private storeJwtToken(jwt: string) {

  // }
  // private getRefreshToken() {
  //   return localStorage.getItem(this.REFRESH_TOKEN);
  // }

  isLoggedIn() {
if (localStorage.hasOwnProperty('accesstToken') && localStorage.getItem('accessToken') !== '') {
      return true;
    } else {
      return false;
    }  }
  getUserData() {

   return this.http.get<User[]>(`${this.loginurl}/public/register`,
    {headers: new HttpHeaders({Authorization: 'bearer' + localStorage.getItem('token'), accessToken: this.Token})});
  }
}
