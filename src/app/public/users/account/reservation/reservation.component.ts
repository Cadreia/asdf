import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/public/shared/sharedservice/shared.service';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.scss']
})
export class ReservationComponent implements OnInit {
public userInfos: any;
  constructor(private router: Router,
              private sharedService: SharedService,
              private loginService: LoginService) { }

  ngOnInit() {
    if (localStorage.hasOwnProperty('userDetails') && localStorage.getItem('accessToken') === this.loginService.getAccessToken()) {
    this.userInfos = this.sharedService.getUserinfo();
    } else {
    this.router.navigate(['']);
    }
  }

}
