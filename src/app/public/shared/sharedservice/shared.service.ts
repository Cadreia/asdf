import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { LoginService } from 'src/app/services/login/login.service';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  public userInfos = this.getUserinfo();
  public isAdmin: boolean;
  public isAdminOfficial: boolean;
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
    if (localStorage.getItem('accessToken') === this.loginService.getAccessToken()) {
      if (this.userInfos.role.includes('ROLE_GW_ADMIN')) {
        // ROLE_GW_ADMIN, ROLE_USERS
        this.isAdmin = true;
      }
    }
    return this.isAdmin;
  }
  
  IsAdminOfficial() {
    if (localStorage.getItem('accessToken') === this.loginService.getAccessToken()) {
      if (this.userInfos.role.includes('ROLE_AGENCY_ADMIN') ||
        this.userInfos.role.includes('ROLE_AGENCY_MANAGER') ||
        this.userInfos.role.includes('ROLE_AGENCY_OPERATO') ||
        this.userInfos.role.includes('ROLE_AGENCY_OPERATO') ||
        this.userInfos.role.includes('ROLE_AGENCY_BOOKING') ||
        this.userInfos.role.includes('ROLE_AGENCY_CHECKING') ||
        this.userInfos.role.includes('ROLE_GW_ADMIN')
        ) {
        // ROLE_GW_ADMIN, ROLE_USERS
        this.isAdminOfficial = true;
      }
    }
    return this.isAdminOfficial;
  }
}
