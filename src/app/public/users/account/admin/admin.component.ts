import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin/admin.service';
import { MessageService } from 'src/app/services/messages/message.service';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/public/shared/sharedservice/shared.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
locations: any[];
offline: boolean;
userInfos: any;
  constructor(private adminService: AdminService,
              private toaster: MessageService,
              private router: Router,
              private sharedService: SharedService) { }

  ngOnInit() {
    this.adminService.getTransitsAndStops().subscribe((data: any) => {
      this.locations = data;
    }, error => {
      if (error.errorCode === 0) {
        this.offline = true;
        this.toaster.offlineMessage();
      }
    });
    this.userInfos = this.sharedService.getUserinfo();
    if (this.userInfos.role.toString() !== 'ROLE_GW_ADMIN') { // ROLE_USERS, ROLE_GW_ADMIN
       this.router.navigate(['public/users/account/overview']);
    }
  }

}
