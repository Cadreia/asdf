import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/public/shared/sharedservice/shared.service';
import { AdminService } from 'src/app/services/admin/admin.service';
import { MessageService } from 'src/app/services/messages/message.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import Swal from 'sweetalert2';
import { TranslationService } from 'src/app/services/translate/translation.service';
import { AgencyUser } from 'src/app/model/agency-user';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Location } from '@angular/common';

@Component({
  selector: 'app-agency',
  templateUrl: './agency.component.html',
  styleUrls: ['./agency.component.scss']
})
export class AgencyComponent implements OnInit {
  isAdmin: boolean;
  isAgencyAdmin: boolean;
  users: AgencyUser[] = [];
  loading: boolean;
  toppings = new FormControl();
user: any;
  allRoles = [
    'AGENCY_MANAGER',
    'AGENCY_OPERATOR',
    'AGENCY_BOOKING',
    'AGENCY_CHECKING'
  ];
  updateRolesForm: FormGroup;
  public loader: boolean;

  constructor(private sharedService: SharedService,
              private adminService: AdminService,
              private toaster: MessageService,
              private router: Router,
              private location: Location,
              private translationService: TranslationService,
              private route: ActivatedRoute,
              private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    console.log(this.location.getState());
    this.user = this.location.getState();

    if (!this.adminService.editMode) {
      this.router.navigate(['public/users/account/officialAgency']);
    }

    this.updateRolesForm = this.formBuilder.group({
      userId: [''],
      roles: [this.user.roles, Validators.required]
    });

    this.loading = true;
    if (!this.adminService.editMode) {
      this.router.navigate(['public/users/account/officialAgency']);
    }
    if (!this.sharedService.IsAdminAgency()) {
      this.router.navigate(['public/users/account/overview']);
    }


    this.adminService.getOfficialAgencyUsers().subscribe(
      (allusers: any[]) => {
        this.loading = false;
        this.users = allusers;
        console.log('the users are: ', allusers);
      },
      error => {
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
          } else if (error.errorCode === 422) {
            if (error.code === 'RESOURCE_NOT_FOUND') {
              this.toaster.unAuthorized();
            }
          }
        }
      }
    );

    if (this.sharedService.IsAdmin()) {
      this.isAdmin = true;
    } else {
      this.isAdmin = false;
    }
    if (this.sharedService.IsAdminAgency()) {
      this.isAgencyAdmin = true;
    } else {
      this.isAgencyAdmin = false;
    }
  }

  get roles() {
    return this.updateRolesForm.get('roles');
  }
  getUserid(userid) {
    this.updateRolesForm.patchValue({
      userId: userid
    });
  }
  updateRoles() {
    this.loader = true;
    console.log(this.updateRolesForm.value);
    this.adminService.updateRoles(this.updateRolesForm.value).subscribe(
      (response: any) => {
        this.loader = false;
        this.toaster.successUpdateRole();
        this.router.navigate(['public/users/account/officialAgency']);
        // tslint:disable-next-line: only-arrow-functions
        setTimeout( function() {
          window.location.reload();
        }, 2000);
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

  changeRoles(event) {
    console.log(event);
    this.roles.setValue(['ROLE_USERS', event.target.value], {
      }
      );
    }
  sweetalert(user) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    });

    swalWithBootstrapButtons.fire({
      title: this.translationService.messages[('swal_delete_agency_user')],
      text: this.translationService.messages[('swal_text')],
      timer: 15000,
      timerProgressBar: true,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: this.translationService.messages[('swal_accept')],
      cancelButtonText: this.translationService.messages[('swal_deny')],
    }).then((result) => {
      if (result.value) {
        this.deleteAgencyUser(user),
          swalWithBootstrapButtons.fire(
            this.translationService.messages[('swal_request_sent')],
            this.translationService.messages[('swal_request_sent_second')],
            'success',
          );
      } else if (
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          this.translationService.messages[('swal_cancelled')],
          this.translationService.messages[('swal_everything_unchanged')],
          'error'
        );
      }
    });
  }


  deleteAgencyUser(user) {
    this.adminService.deleteOfficialAgencyUser(user).subscribe(
      response => {
        console.log(response);
        this.toaster.successDeleteAgencyUser();
        this.router.navigate(['public/users/account/officialAgency']);
      }, error => {
        console.log(error);
        if (!(error && (Object.keys(error).length === 0))) {
          if (error.errorCode === 422) {
            if (error.code === 'VALIDATION_ERROR') {
              this.toaster.unAuthorized();
            }
            if (error.code === 'RESOURCE_NOT_FOUND') {
              this.toaster.agencyUserNotFound();
            }
            if (error.code === 'USER_NOT_IN_AGENCY') {
              this.toaster.userNotAgencyMember();
            }
          } else if (error.errorCode === 401) {
            if (error.code === 'ACCESS_DENIED') {
              this.toaster.accessDenied();
            }
          }
        }
      }
    );
  }

  // edit(officialUser: AgencyUser) {
  //   this.adminService.editMode = true;
  //   this.route.params.subscribe((params: Params) => {
  //     this.router.navigateByUrl('public/users/account/edit-user', { state: officialUser });
  //   });
  // }

}
