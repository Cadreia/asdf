import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/public/shared/sharedservice/shared.service';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {
  public userInfos: any;
  constructor(private sharedService: SharedService, private router: Router, private loginService: LoginService) { }

  ngOnInit() {
    if (localStorage.hasOwnProperty('userDetails') && localStorage.getItem('accessToken') === this.loginService.getAccessToken()) {
      this.userInfos = this.sharedService.getUserinfo();
    } else {
      this.router.navigate(['']);
    }
  }
  // getAccessToken() {
  //   return localStorage.getItem('accessToken');
  // }

}
