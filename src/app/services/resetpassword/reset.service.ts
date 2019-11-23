import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { config } from 'src/app/configs/app.config';
import { Observable } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { ErrorhandlerService } from '../errorhandlers/errorhandler.service';
import { Tokens } from 'src/app/model/tokens';

@Injectable({
  providedIn: 'root'
})
export class ResetService {
  private baseurl = config.api_base_url;
  tokens: Tokens;
  private readonly Token = 'accesstToken';
  constructor(
    private http: HttpClient,
    private errorhander: ErrorhandlerService
  ) {}

  resetPassword(email: string, tokens: Tokens): Observable<any> {
    const reseturl = `${this.baseurl}/api/public/forgot_password`;
    const requestheader = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.getJwtToken()}`
    });
    return this.http
      .post<any>(reseturl, email, { headers: requestheader })
      .pipe(retry(1), catchError(this.errorhander.handleError));
  }
  getJwtToken() {
    return localStorage.getItem(this.Token);
  }
}
