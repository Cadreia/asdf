import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { config } from 'src/app/configs/app.config';
import { Passwords } from 'src/app/model/passwords';
import { Observable } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { ErrorhandlerService } from '../errorhandlers/errorhandler.service';
import { Tokens } from 'src/app/model/tokens';

@Injectable({
  providedIn: 'root'
})
export class ChangePasswordService {
  private url = config.api_base_url;
  token = new Tokens();
  private errorhandler = new ErrorhandlerService();
  constructor(private http: HttpClient) {}

  changePassword(passords: {
    currentPassword: string;
    newPassword: string;
    confirmNewPassword: string;
  }): Observable<Passwords[]> {
    const httpHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      accept: 'application/json',
      Authorization: 'Bearer ' + this.token.accessToken
    });
    return this.http
      .post<any>(`${this.url}/api/public/change_password`, passords, { headers: httpHeader })
      .pipe(retry(1), catchError(this.errorhandler.handleError));
  }
}
