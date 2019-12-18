/*
@created by bimeri
@go-groups lmt
on the 27 november 2019
*/
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { config } from 'src/app/configs/app.config';
import { retry, catchError, tap } from 'rxjs/operators';
import { ErrorhandlerService } from '../errorhandlers/errorhandler.service';
import { Observable } from 'rxjs';
import { Transit } from 'src/app/model/transit';
import { SharedService } from 'src/app/public/shared/sharedservice/shared.service';
import { OfficialAgency } from 'src/app/model/official-agency';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  baseUrl = config.api_base_url;
  public errorhandler = new ErrorhandlerService();
  Requestheader = this.shareService.requestheader;
  editMode: boolean;
  constructor(
    private http: HttpClient,
    private shareService: SharedService
  ) {}

  getTransitsAndStops(): Observable<Transit> {
    return this.http
      .get<any>(`${this.baseUrl}/api/public/location`, {
        headers: this.Requestheader
      })
      .pipe(retry(1), catchError(this.errorhandler.handleError));
  }

  updateTransitForm(editData: Transit): Observable<Transit> {
    return this.http
      .post<any>(
        `${this.baseUrl}/api/protected/location/${editData.id}`,
        editData,
        { headers: this.Requestheader }
      )
      .pipe(retry(1), catchError(this.errorhandler.handleError));
  }

  addTransitForm(addData: Transit): Observable<Transit[]> {
    console.log('the header is: ', this.Requestheader);
    return this.http
      .post<Transit[]>(`${this.baseUrl}/api/protected/location`, addData, {
        headers: this.Requestheader
      })
      .pipe(retry(1), catchError(this.errorhandler.handleError));
  }

  DeleteTransitsAndStops(location): Observable<void> {
    return this.http
      .delete<void>(`${this.baseUrl}/api/protected/location/${location.id}`, {
        headers: this.Requestheader
      })
      .pipe(retry(1), catchError(this.errorhandler.handleError));
  }

  SearchCity(search): Observable<Transit> {
    return this.http
      .get<Transit>(
        `${this.baseUrl}/api/public/location/search?city=${search.city}`,
        {
          headers: this.Requestheader
        }
      )
      .pipe(retry(1), catchError(this.errorhandler.handleError));
  }

  addOfficialAgency(addData: OfficialAgency): Observable<OfficialAgency> {
    return this.http
      .post<any>(`${this.baseUrl}/api/protected/agency`, addData, {
        headers: this.Requestheader
      })
      .pipe(retry(1), catchError(this.errorhandler.handleError));
  }

  addOfficialAgencyUser(addUser: any): Observable<any> {
    return this.http
      .post<any>(`${this.baseUrl}/api/protected/agency/user`, addUser, {
        headers: this.Requestheader
      })
      .pipe(retry(1), catchError(this.errorhandler.handleError));
  }

  getOfficialAgencyUsers() {
    return this.http
      .get<any>(`${this.baseUrl}/api/protected/agency/user`, {
        headers: this.Requestheader
      })
      .pipe(retry(1), catchError(this.errorhandler.handleError));
  }

  deleteOfficialAgencyUser(user): Observable<void> {
    return this.http
      .delete<void>(`${this.baseUrl}/api/protected/agency/user/${user.id}`, {
        headers: this.Requestheader
      })
      .pipe(retry(1), catchError(this.errorhandler.handleError));
  }

  updateRoles(roles) {
    return this.http
      .post<any>(`${this.baseUrl}/api/protected/agency/user/role`, roles, {
        headers: this.Requestheader
      })
      .pipe(retry(1), catchError(this.errorhandler.handleError));
  }
}
