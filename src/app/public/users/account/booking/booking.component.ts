import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/public/shared/sharedservice/shared.service';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss']
})
export class BookingComponent implements OnInit {
  public userInfos: any;
  constructor(private sharedService: SharedService, private router: Router, private loginService: LoginService) { }

  ngOnInit() {
    if (localStorage.hasOwnProperty('userDetails') && localStorage.getItem('accessToken') === this.loginService.getAccessToken()) {
      this.userInfos = this.sharedService.getUserinfo();
    } else {
      this.router.navigate(['']);
    }
  }

}
