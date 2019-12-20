import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { LoginService } from 'src/app/services/login/login.service';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  public userInfos = this.getUserinfo();
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
        return true;
      }
    }
    return false;
  }

  IsAdminOfficial() {
    if (localStorage.getItem('accessToken') === this.loginService.getAccessToken()) {
      if (this.userInfos.role.includes('ROLE_AGENCY_ADMIN') ||
        this.userInfos.role.includes('ROLE_AGENCY_MANAGER') ||
        this.userInfos.role.includes('ROLE_AGENCY_OPERATOR') ||
        this.userInfos.role.includes('ROLE_AGENCY_BOOKING') ||
        this.userInfos.role.includes('ROLE_AGENCY_CHECKING') ||
        this.userInfos.role.includes('ROLE_GW_ADMIN')
      ) {
        // ROLE_GW_ADMIN, ROLE_USERS
        return true;
      }
    }
    return false;
  }

  IsAdminAgency() {
    if (localStorage.getItem('accessToken') === this.loginService.getAccessToken()) {
      if (this.userInfos.role.includes('ROLE_AGENCY_ADMIN')) {
        // ROLE_AGENCY_ADMIN, ROLE_USERS
        return true;
      }
    }
    return false;
  }

  IsAgencyManager() {
    if (localStorage.getItem('accessToken') === this.loginService.getAccessToken()) {
      if (this.userInfos.role.includes('ROLE_AGENCY_MANAGER')) {
        // ROLE_AGENCY_MANAGER, ROLE_USERS
        return true;
      }
    }
    return false;
  }
}
