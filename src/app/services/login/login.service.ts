import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { tap, mapTo, catchError, first } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Tokens } from '../../model/tokens';
import { config } from 'src/app/configs/app.config';
import { ErrorhandlerService } from '../errorhandlers/errorhandler.service';
import { User } from 'src/app/model/user';



@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private readonly JWT_TOKEN = 'token';
  private readonly REFRESH_TOKEN = 'refresh_token';
  public loggedUser: string;
  private errorhandler = new ErrorhandlerService();
  loginurl = config.api_base_url;
  afAuth: any;
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
        tap(tokens => this.doLoginUser(user.email, tokens)),
        mapTo(true),
        catchError(this.errorhandler.handleError)
      );
  }
  private doLoginUser(email: string, tokens: Tokens) {
    this.loggedUser = email;
    this.storeTokens(tokens);
  }
  private storeTokens(tokens: Tokens) {
    localStorage.setItem(this.JWT_TOKEN, tokens.token);
    localStorage.setItem(this.REFRESH_TOKEN, tokens.refreshToken);
  }

  logout() {
    return this.http
      .post<any>(`${this.loginurl}/api/public/login`, {
        refreshToken: this.getRefreshToken()
      })
      .pipe(
        tap(() => this.doLogoutUser()),
        mapTo(true),
        catchError(this.errorhandler.handleError)
      );
  }

  private doLogoutUser() {
    this.loggedUser = null;
    localStorage.removeItem(this.JWT_TOKEN);
    localStorage.removeItem(this.REFRESH_TOKEN);
  }

  refreshToken() {
    return this.http
      .post<any>(``, {
        refreshToken: this.getRefreshToken()
      })
      .pipe(
        tap((tokens: Tokens) => {
          this.storeJwtToken(tokens.token);
        })
      );
  }

  getJwtToken() {
    return localStorage.getItem(this.JWT_TOKEN);
  }
  private storeJwtToken(jwt: string) {
    localStorage.setItem(this.JWT_TOKEN, jwt);
  }
  private getRefreshToken() {
    return localStorage.getItem(this.REFRESH_TOKEN);
  }

  // isLoggedIn() {
  //   if (localStorage.getItem('token').length < 1) {
  //     return false;
  //   }
  //   if (localStorage.getItem('token') !== '') {}
  //   return true; // this.getJwtToken();
  // }
  isLoggedIn() {
    return this.afAuth.authState.pipe(first());
  }

  doSomething() {
    this.isLoggedIn()
      .pipe(
        tap(user => {
          if (user) {
            // do something
          } else {
            // do something else
          }
        })
      )
      .subscribe();
  }
  getUserData() {
    return this.http.get<User[]>(`${this.loginurl}/public/login`, {
      headers: new HttpHeaders({
        Authorization: 'bearer' + localStorage.getItem('token')
      })
    });
  }
}
