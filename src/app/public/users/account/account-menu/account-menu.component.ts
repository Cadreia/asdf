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
  }
  getAccessToken() {
    return localStorage.getItem('accessToken');
  }

}
