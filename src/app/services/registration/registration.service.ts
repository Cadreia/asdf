import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { User } from 'src/app/model/user';
import { config} from 'src/app/configs/app.config';
import { ErrorhandlerService } from '../errorhandlers/errorhandler.service';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  readonly baseUrl = config.api_base_url;
  private readonly token = 'accessToken';
  public errorhandler = new ErrorhandlerService();
  constructor(private http: HttpClient) { }


  userRegister(userinfo: User): Observable<User[]> {
  const  body: User = {
    id: userinfo.id,
    fullName: userinfo.fullName,
    phoneNumber: userinfo.phoneNumber,
    email: userinfo.email,
    idNumber: userinfo.idNumber,
    password: userinfo.password,
    passwordConfirmation: userinfo.passwordConfirmation
    };
  const registerUrl = `${this.baseUrl}/api/public/register`;
  return this.http
    .post<User[]>(registerUrl, body)
    .pipe(retry(1), catchError(this.errorhandler.handleError));
  }

  isLoggedIn() {
    return !!this.getJwtToken();
  }

  getJwtToken() {
    return localStorage.getItem(this.token);
  }

}
