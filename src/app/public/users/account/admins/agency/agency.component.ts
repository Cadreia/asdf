import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/public/shared/sharedservice/shared.service';
import { AdminService } from 'src/app/services/admin/admin.service';
import { MessageService } from 'src/app/services/messages/message.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

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

  constructor(private sharedSevice: SharedService,
    private adminService: AdminService,
    private toaster: MessageService,
    private router: Router
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
      title: 'Are you sure you want to send this delete user request?',
      text: 'You won\'t be able to revert this!',
      timer: 15000,
      timerProgressBar: true,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, send it!',
      cancelButtonText: 'No, cancel!',
    }).then((result) => {
      if (result.value) {
        this.deleteAgencyUser(user),
          swalWithBootstrapButtons.fire(
            'Request sent!',
            'The delete request has been sent. Wait for feedback.',
            'success',
          );
      } else if (
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelled',
          'Everything remains unchanged',
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
        } else if (error.errorCode === 422) {
          if (error.code === 'RESOURCE_NOT_FOUND') {
            this.toaster.unAuthorized();
          }
        }
      }
    });
  }
}
