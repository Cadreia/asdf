import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin/admin.service';
import { MessageService } from 'src/app/services/messages/message.service';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/public/shared/sharedservice/shared.service';
import Swal from 'sweetalert2';

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
offlinelocations = [
  {id: 5, country: 'cameroon', state: 'south west', city: 'Ekona', address: 'Ekona Motto Park'},
  {id: 6, country: 'nigeria', state: 'calabar', city: 'uyo', address: 'cross river'},
];
  constructor(private adminService: AdminService,
              private router: Router,
              private sharedService: SharedService,
              private readonly toaster: MessageService) { }

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

sweetalert(location) {
 const swalWithBootstrapButtons = Swal.mixin({
  customClass: {
    confirmButton: 'btn btn-success',
    cancelButton: 'btn btn-danger'
  },
  buttonsStyling: false
});

 swalWithBootstrapButtons.fire({
  title: 'Are you sure you want to send this delete transit request?',
  text: 'You won\'t be able to revert this!',
  timer: 15000,
  timerProgressBar: true,
  icon: 'warning',
  showCancelButton: true,
  confirmButtonText: 'Yes, send it!',
  cancelButtonText: 'No, cancel!',
  reverseButtons: true
}).then((result) => {
  if (result.value) {
    this.deleteTransit(location),
    swalWithBootstrapButtons.fire(
      'Request sent!',
      'the delete request has been, wait for feedback.',
      'success',
    );
  } else if (
    /* Read more about handling dismissals below */
    result.dismiss === Swal.DismissReason.cancel
  ) {
    swalWithBootstrapButtons.fire(
      'Cancelled',
      'Everything remain unchange!',
      'error'
    );
  }
});
}

deleteTransit(location) {
  this.adminService.DeleteTransitsAndStops(location).subscribe(
    response => {
      console.log(response);
      this.toaster.successDeleteTransit();
      this.router.navigate(['public/users/account/admin']);
    }, error => {
      console.log(error);
      if (!(error && (Object.keys(error).length === 0))) {
        if (error.errorCode === 422) {
          if (error.code === 'VALIDATION_ERROR') {
          this.toaster.noJourney();
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
