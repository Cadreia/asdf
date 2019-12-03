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
public editValues: any;
isAdmin: boolean;
userInfos: any;
offline: boolean;
  constructor(private adminService: AdminService,
              private router: Router,
              private sharedService: SharedService) { }

  ngOnInit() {
    this.userInfos = this.sharedService.getUserinfo();
    if (this.sharedService.IsAdmin()) {
    this.isAdmin = true;
    } else {
      this.isAdmin = false;
      this.router.navigate(['public/users/account/overview']);
    }
    this.adminService.getTransitsAndStops().subscribe((data: any) => {
      this.locations = data;
    }, (error) => {
      console.log(error);
      if (error.errorCode === 0) {
        this.offline = true;
      }
    });
  }

edit(location) {
// localStorage.removeItem('editvalues');
this.editValues = JSON.stringify({
  id: location.id,
  state: location.state,
  country: location.country,
  city: location.city,
  address: location.address
});
localStorage.setItem('editvalues', this.editValues);
this.router.navigate(['public/users/account/edit']);
  }

}
