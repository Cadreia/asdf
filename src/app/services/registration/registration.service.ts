import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { of, Observable, throwError } from 'rxjs';
import { catchError, mapTo, tap, retry } from 'rxjs/operators';
import { Tokens } from '../../model/tokens';
import { User } from 'src/app/model/user';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {
  readonly registerurl = 'http://golab.top:8081/api/public/register';
  readonly loginurl = 'http://golab.top:8081/api/public/login';
  private readonly JWT_TOKEN = 'JWT_TOKEN';
  private readonly REFRESH_TOKEN = 'REFRESH_TOKEN';
  private loggedUser: string;
  constructor(private http: HttpClient) { }


  userRegister(userinfo: User): Observable<User[]> {
  const  body: User = {
    id: userinfo.id,
    firstName: userinfo.firstName,
    lastName: userinfo.lastName,
    phoneNumber: userinfo.phoneNumber,
    email: userinfo.email,
    idNumber: userinfo.idNumber,
    password: userinfo.password,
    passwordConfirmation: userinfo.passwordConfirmation
    };
  return this.http.post<User[]>(this.registerurl, body)
      .pipe(retry(1),
       catchError(this.handleError));
  }


  handleError(error: any) {
      let errorResponse = {};
      if (error.error instanceof ErrorEvent) {
        // client-side error
        errorResponse = { error: error.error.message};
        // errorMessage = `Error: ${error.error.message}`;
      } else {
        // server-side error
        errorResponse = { error: error.message, errorCode: error.status };
        // errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
      }
      // window.alert(errorResponse);
      return throwError(errorResponse);
 }


 login(user: { email: string, password: string }): Observable<boolean> {
   const requestheader = new HttpHeaders({'Content-Type': 'application/json'});
   return this.http.post<any>(this.loginurl, user, {headers: requestheader})
      .pipe(
        tap(tokens => this.doLoginUser(user.email, tokens)),
        mapTo(true),
        catchError(this.handleError));
  }

  logout() {
    return this.http.post<any>(`/ logout`, {
      refreshToken: this.getRefreshToken()
    }).pipe(
      tap(() => this.doLogoutUser()),
      mapTo(true),
      catchError(this.handleError));
  }

  isLoggedIn() {
    return !!this.getJwtToken();
  }

  refreshToken() {
    return this.http.post<any>(`/refresh`, {
      refreshToken: this.getRefreshToken()
    }).pipe(tap((tokens: Tokens) => {
      this.storeJwtToken(tokens.jwt);
    }));
  }

  getJwtToken() {
    return localStorage.getItem(this.JWT_TOKEN);
  }

  private doLoginUser(email: string, tokens: Tokens) {
    this.loggedUser = email;
    this.storeTokens(tokens);
  }

  private doLogoutUser() {
    this.loggedUser = null;
    this.removeTokens();
  }

  private getRefreshToken() {
    return localStorage.getItem(this.REFRESH_TOKEN);
  }

  private storeJwtToken(jwt: string) {
    localStorage.setItem(this.JWT_TOKEN, jwt);
  }

  private storeTokens(tokens: Tokens) {
    localStorage.setItem(this.JWT_TOKEN, tokens.jwt);
    localStorage.setItem(this.REFRESH_TOKEN, tokens.refreshToken);
  }

  private removeTokens() {
    localStorage.removeItem(this.JWT_TOKEN);
    localStorage.removeItem(this.REFRESH_TOKEN);
  }
}
