import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { config } from 'src/app/configs/app.config';
import { LoginService } from '../login/login.service';
import { retry, catchError, tap } from 'rxjs/operators';
import { ErrorhandlerService } from '../errorhandlers/errorhandler.service';
import { Observable, Subject } from 'rxjs';
import { Transit } from 'src/app/model/transit';
import { SharedService } from 'src/app/public/shared/sharedservice/shared.service';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  baseUrl = config.api_base_url;
  public errorhandler = new ErrorhandlerService();
  // location = new Subject<number>();
  constructor(
    private http: HttpClient,
    private loginService: LoginService,
    private errorHandlerService: ErrorhandlerService,
    private shareService: SharedService
    ) { }

  getTransitsAndStops(): Observable<Transit> {
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
  // getOneTransitAndStop(id: number) {
  //   return this.locations[id];
  // }

  // updateTransitForms(editData: Transit): Observable<any> {
  //   const Requestheader = this.shareService.requestheader;
  //   return this.http
  //     .get<any>(`${this.baseUrl}/api/protected/location/${editData.id}`, {headers: Requestheader})
  //     .pipe(
  //       retry(1),
  //       tap(
  //         data => this.updateTransitForm(editData),
  //         catchError(this.errorhandler.handleError)
  //       )
  //     );
  // }

  updateTransitForm(editData: Transit): Observable<Transit[]> {
    const Requestheader = this.shareService.requestheader;
    return this.http.post<any>(`${this.baseUrl}/api/protected/location/${editData.id}`,  editData, {headers: Requestheader})
    .pipe(retry(1), catchError(this.errorhandler.handleError));
  }

  addTransitForm(addData: Transit): Observable<Transit[]> {
    const Requestheader = this.shareService.requestheader;
    return this.http
      .post<any>(
        `${this.baseUrl}/api/protected/location`,
        addData,
        { headers: Requestheader }
      )
      .pipe(retry(1), catchError(this.errorhandler.handleError));
  }
}
