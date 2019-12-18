import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from 'src/app/services/admin/admin.service';
import { Router } from '@angular/router';
import { MessageService } from 'src/app/services/messages/message.service';

@Component({
  selector: 'app-add-official-users',
  templateUrl: './add-official-users.component.html',
  styleUrls: ['./add-official-users.component.scss']
})
export class AddOfficialUsersComponent implements OnInit {
addOfficialUser: FormGroup;
loader: boolean;
  constructor(private formBuilder: FormBuilder,
              private adminService: AdminService,
              private router: Router,
              private toaster: MessageService) { }

  ngOnInit() {
    this.addOfficialUser = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  createOfficialUser() {
    this.loader = true;
    console.log(this.addOfficialUser.value);
    this.adminService.addOfficialAgencyUser(this.addOfficialUser.value).subscribe(
      (response: any) => {
        this.loader = false;
        console.log(response);
        this.router.navigate(['public/users/account/officialAgency']);
        this.toaster.successAddOfficialUser();
      },
      error => {
        this.loader = false;
        console.log(error);
        if (!(error && (Object.keys(error).length === 0))) {
          if (error.errorCode === 0) {
            this.toaster.offlineMessage();
          }
          if (error.errorCode === 422) {
            if (error.code === 'RESOURCE_NOT_FOUND') {
              this.toaster.OfficialUserEmailNotExist();
            }
          }
          if (error.errorCode === 422) {
            if (error.code === 'USER_ALREADY_IN_AN_AGENCY') {
              this.toaster.officialUserInUse();
            }
          }
        }
      }
    );
  }

}
