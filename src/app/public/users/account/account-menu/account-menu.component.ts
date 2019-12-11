import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/public/shared/sharedservice/shared.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account-menu',
  templateUrl: './account-menu.component.html',
  styleUrls: ['./account-menu.component.scss']
})
export class AccountMenuComponent implements OnInit {
  public userInfos: any;
  public isAdmin: boolean;
  public isAdminOfficial: boolean;
  public isAdminAgency: boolean;
  public addTransitLink: boolean;
  public officialAgencyLink: boolean;
  public uniqueAgencyLink: boolean;
  public imagepath = '../../../../../assets/template/images/logo/logo.ico';
  constructor(private sharedService: SharedService,
    private router: Router) { }

  ngOnInit() {
    this.userInfos = this.sharedService.getUserinfo();
    if (this.sharedService.IsAdmin()) {
      this.isAdmin = true;
    } else {
      this.isAdmin = false;
    }
    if (this.sharedService.IsAdminOfficial()) {
      this.isAdminOfficial = true;
    } else {
      this.isAdminOfficial = false;
    }
    if (this.sharedService.IsAdminAgency()) {
      this.isAdminAgency = true;
    } else {
      this.isAdminAgency = false;
    }

    if (window.location.href === 'http://localhost:4200/public/users/account/add' ||
      window.location.href === 'http://localhost:4200/public/users/account/officialAgency') {
      this.officialAgencyLink = true;
    }

    if (
      window.location.href ===
      'http://localhost:4200/public/users/account/create' ||
      window.location.href ===
      'http://localhost:4200/public/users/account/admin' ||
      window.location.href ===
      'http://localhost:4200/public/users/account/edit'
    ) {
      this.addTransitLink = true;
    }

    if (window.location.href === 'http://localhost:4200/public/users/account/unique-agency') {
      this.uniqueAgencyLink = true;
    }
  }
  getAccessToken() {
    return localStorage.getItem('accessToken');
  }

}
