import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/public/shared/sharedservice/shared.service';

@Component({
  selector: 'app-account-menu',
  templateUrl: './account-menu.component.html',
  styleUrls: ['./account-menu.component.scss']
})
export class AccountMenuComponent implements OnInit {
  public userInfos: any;
  public isAdmin: boolean;
  public imagepath = '../../../../../assets/template/images/logo/logo.ico';
  constructor(private sharedService: SharedService) { }

  ngOnInit() {
    if (localStorage.getItem('accessToken') === this.getAccessToken()) {
    this.userInfos = this.sharedService.getUserinfo();
    if (this.userInfos.role.toString() === 'ROLE_USERS') { // ROLE_GW_ADMIN, ROLE_USERS
           this.isAdmin = true;
        } else {
          this.isAdmin = false;
               }
    } else {
  }
  }
  getAccessToken() {
    return localStorage.getItem('accessToken');
  }

}
