import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { LoginService } from 'src/app/services/login/login.service';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  public userInfos: any;
  public isAdmin: boolean;
public requestheader = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: 'Bearer ' + this.loginService.getAccessToken()
    });
  constructor(private loginService: LoginService) { }
  getUserinfo() {

 return JSON.parse(localStorage.getItem('userDetails'));
  }

  IsAdmin() {
    this.userInfos = this.getUserinfo();
    if (localStorage.getItem('accessToken') === this.loginService.getAccessToken()) {
      if (this.userInfos.role.includes('ROLE_GW_ADMIN')) {
        // ROLE_GW_ADMIN, ROLE_USERS
        this.isAdmin = true;
      }
    }
    return this.isAdmin;
  }
}
