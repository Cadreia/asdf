import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { config } from 'src/app/configs/app.config';
import { LoginService } from '../login/login.service';
import { retry, catchError } from 'rxjs/operators';
import { ErrorhandlerService } from '../errorhandlers/errorhandler.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  baseUrl = config.api_base_url;
  constructor(
    private http: HttpClient,
    private loginService: LoginService,
    private errorHandlerService: ErrorhandlerService
    ) { }

  getTransitsAndStops(): Observable<any> {
    const requestheader = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: 'Bearer ' + this.loginService.getAccessToken()
    });
    return this.http.get<any>(`${this.baseUrl}/api/public/location`, {headers: requestheader}).pipe(
      retry(1),
      catchError(this.errorHandlerService.handleError)
    );
  }
}
