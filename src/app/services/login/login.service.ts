import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { tap, mapTo, catchError, retry } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Tokens } from '../../model/tokens';
import { config } from 'src/app/configs/app.config';
import { ErrorhandlerService } from '../errorhandlers/errorhandler.service';
import { User } from 'src/app/model/user';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private readonly Token = 'accessToken';
  private readonly Header = 'header';
  private readonly issuer = 'issuer';
  private readonly type = 'type';
  public id: any;
  public fullName = 'fullName';
  public role = 'role';
  public email = 'email';
  private Tokenn = new Tokens();
  public loggedUser: string;
  private errorhandler = new ErrorhandlerService();
  loginurl = config.api_base_url;
  constructor(private http: HttpClient) {}

  login(user: { email: string; password: string}): Observable<User> {
    const requestheader = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: 'Bearer ' + this.Tokenn.accessToken
    });

    return this.http
      .post<any>(`${this.loginurl}/api/public/login`, user, {
        headers: requestheader
      })
      .pipe(
        retry(1),
        tap(data => this.doLoginUser(data)),
        catchError(this.errorhandler.handleError)
      );
  }
  private doLoginUser(data: Tokens) {
   // this.loggedUser = email;
    localStorage.setItem(this.Token, data.accessToken);
    localStorage.setItem(this.Header, data.header);
    localStorage.setItem(this.issuer, data.issuer);
    localStorage.setItem(this.type, data.type);
  }


  logout() {
     this.loggedUser = null;
     localStorage.removeItem(this.Token);
     localStorage.removeItem(this.Header);
     localStorage.removeItem(this.issuer);
     localStorage.removeItem(this.type);
     localStorage.removeItem('userDetails');
  }

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

  getAccessToken() {
  return localStorage.getItem('accessToken');
  }
  getBearer() {
  return localStorage.getItem('type');
  }
  getIssuer() {
  return localStorage.getItem('issuer');
  }

  isLoggedIn() {
//     const checkTokenExpirationMiddleware = store => next => action => {
//   const token =
//     JSON.parse(localStorage.getItem('userDetails')) &&
//     JSON.parse(localStorage.getItem('userDetails'))[('accessToken')];
//   if (this.getJwtToken(token).exp < Date.now() / 1000) {
//     next(action);
//     localStorage.clear();
//   }
//   next(action);
// };
    if (localStorage.hasOwnProperty('userDetails') &&
        localStorage.getItem('type') === this.getBearer() &&
        localStorage.getItem('issuer') === this.getIssuer() &&
        localStorage.getItem('accessToken') === this.getAccessToken()) {
      return true;
    } else {
      return false;
    }
  }
  getUserData() {

 localStorage.getItem('userDetails');
  }
}
