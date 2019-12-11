import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/public/shared/sharedservice/shared.service';

@Component({
  selector: 'app-agency',
  templateUrl: './agency.component.html',
  styleUrls: ['./agency.component.scss']
})
export class AgencyComponent implements OnInit {
isAdmin: boolean;
isAgencyAdmin: boolean;
users: any[];
  constructor(private sharedSevice: SharedService) { }

  ngOnInit() {
    this.users = [
      {
        id: 1,
        fullName: "Indiana Poli",
        roles: [
          "ROLE_USERS", "ROLE_AGENCY_MANAGER"
        ]      
      },
      {
        id: 2,
        fullName: "Mary Kay",
        roles: [
          "ROLE_USERS", "ROLE_AGENCY_OPERATOR"
        ]      
      }
    ]
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
