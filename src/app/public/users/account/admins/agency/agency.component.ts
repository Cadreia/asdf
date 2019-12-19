import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/public/shared/sharedservice/shared.service';
import { AdminService } from 'src/app/services/admin/admin.service';
import { MessageService } from 'src/app/services/messages/message.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import Swal from 'sweetalert2';
import { TranslationService } from 'src/app/services/translate/translation.service';
import { AgencyUser } from 'src/app/model/agency-user';

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

  constructor(private sharedSevice: SharedService,
    private adminService: AdminService,
    private toaster: MessageService,
    private router: Router,
    private translationService: TranslationService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.loading = true;
    this.getAgencyUsers();
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
        this.getAgencyUsers();
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

  getAgencyUsers() {
    this.adminService.getOfficialAgencyUsers().subscribe((users: any[]) => {
      // this.route.data.subscribe((data: { users: any[]} ) => {
      this.loading = false;
      this.users = users;
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
        } else if (error.errorCode === 422) {
          if (error.code === 'RESOURCE_NOT_FOUND') {
            this.toaster.unAuthorized();
          }
        }
      }
    });
  }

  edit(officialUser: AgencyUser) {
    this.adminService.editMode = true;
    this.route.params.subscribe((params: Params) => {
      this.router.navigateByUrl('public/users/account/edit-user', { state: officialUser })
    })
  }

}
