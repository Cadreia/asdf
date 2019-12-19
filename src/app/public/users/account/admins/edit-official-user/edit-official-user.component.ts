import { Component, OnInit, ɵConsole } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin/admin.service';
import { SharedService } from 'src/app/public/shared/sharedservice/shared.service';
import { MessageService } from 'src/app/services/messages/message.service';
import { AgencyUser } from 'src/app/model/agency-user';
import { Location } from '@angular/common';

@Component({
  selector: 'app-edit-official-user',
  templateUrl: './edit-official-user.component.html',
  styleUrls: ['./edit-official-user.component.scss']
})
export class EditOfficialUserComponent implements OnInit {
  user: any;
  allRoles: any[] = [
    'AGENCY_MANAGER',
    'AGENCY_OPERATOR',
    'AGENCY_BOOKING',
    'AGENCY_CHECKING'
  ]
  updateRolesForm: FormGroup;
  public loader: boolean;
  public imagepath = '../../../../../assets/template/images/logo/logo.ico';
  constructor(
    private location: Location,
    private router: Router,
    private adminService: AdminService,
    private sharedService: SharedService,
    private formBuilder: FormBuilder,
    private toaster: MessageService
  ) {
    // this.user = this.router.getCurrentNavigation().extras.state;
  }

  ngOnInit() {
    this.user = this.location.getState();

    if (!this.adminService.editMode) {
      this.router.navigate(['public/users/account/officialAgency']);
    }

    if (!this.sharedService.IsAdminAgency()) {
      this.router.navigate(['public/users/account/overview']);
    }
    this.updateRolesForm = this.formBuilder.group({
      userId: [this.user.id, Validators.required],
      fullName: [{ value: this.user.fullName, disabled: true }, Validators.required],
      roles: [this.user.roles, Validators.required]
    });

  }

  updateRoles() {
    this.loader = true;
    this.adminService.updateRoles(this.updateRolesForm.value).subscribe(
      (response: any) => {
        this.loader = false;
        this.toaster.successUpdateRole();
        this.router.navigate(['public/users/account/officialAgency']);
      },
      (error: any) => {
        this.router.navigate(['public/users/account/officialAgency']);
        this.loader = false;
        if (!(error && Object.keys(error).length === 0)) {
          if (error.errorCode === 0) {
            this.toaster.offlineMessage();
          }
          if (error.errorCode === 401) {
            if (error.code === 'ACCESS_DENIED') {
              this.toaster.accessDenied();
            }
          }
          if (error.errorCode === 422) {
            if (error.code === 'RESOURCE_NOT_FOUND') {
              this.toaster.userNotExist();
            }
            if (error.code === 'USER_NOT_IN_AGENCY') {
              this.toaster.userNotAgencyMember();
            }
          }
        }
      }
    );
  }

  get roles() {
    return this.updateRolesForm.get('roles');
  }
}