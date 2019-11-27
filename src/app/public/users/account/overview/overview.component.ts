import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/public/shared/sharedservice/shared.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {
public userInfos: any;
  constructor(private sharedService: SharedService) { }

  ngOnInit() {
    if (localStorage.getItem('accessToken') === this.getAccessToken()) {
    this.userInfos = this.sharedService.getUserinfo();
  }
  }
  getAccessToken() {
    return localStorage.getItem('accessToken');
  }

}
