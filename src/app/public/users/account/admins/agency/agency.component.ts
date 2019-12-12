import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/public/shared/sharedservice/shared.service';
import { AdminService } from 'src/app/services/admin/admin.service';
import { MessageService } from 'src/app/services/messages/message.service';

@Component({
  selector: 'app-agency',
  templateUrl: './agency.component.html',
  styleUrls: ['./agency.component.scss']
})
export class AgencyComponent implements OnInit {
isAdmin: boolean;
isAgencyAdmin: boolean;
users: any[] = [];
loading: boolean;
  constructor(
    private sharedSevice: SharedService, 
    private adminService: AdminService,
    private toaster: MessageService
    ) { }

  ngOnInit() {
    this.loading = true;
    this.adminService.getOfficialAgencyUsers().subscribe((users: any[]) => {
      this.loading = false;
      this.users = users;
      console.log("Agency Users" + this.users);
    }, error => {
      this.loading = false;
      console.log(error);
      if (!(error && Object.keys(error).length === 0)) {
        if (error.errorCode === 0) {
          this.toaster.offlineMessage();
        }
        if (error.errorCode === 500) {
          this.toaster.internalError();
        } else if (error.errorCode === 403) {
            this.toaster.unAuthorized();
        }
      }
    });

    if (this.sharedSevice.IsAdmin()) {
      this.isAdmin = true;
    } else {
      this.isAdmin = false;
    }
    if (this.sharedSevice.IsAdminAgency()) {
      this.isAgencyAdmin = true;
    } else {
      this.isAgencyAdmin = false;
    }
  }

}
