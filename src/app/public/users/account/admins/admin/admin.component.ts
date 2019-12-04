import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin/admin.service';
import { MessageService } from 'src/app/services/messages/message.service';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/public/shared/sharedservice/shared.service';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup } from '@angular/forms';

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
searchResult = [];
foundResult: boolean;
NumberOfCity: number;
cityName: string;
searchsomething: boolean;
loader: boolean;
search: FormGroup;

  constructor(private adminService: AdminService,
              private router: Router,
              private sharedService: SharedService,
              private readonly toaster: MessageService,
              private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.search = this.formBuilder.group({
      city: ['']
    });
    this.userInfos = this.sharedService.getUserinfo();
    if (this.sharedService.IsAdmin()) {
    this.isAdmin = true;
    } else {
      this.isAdmin = false;
      this.router.navigate(['public/users/account/overview']);
    }
    this.adminService.getTransitsAndStops().subscribe(
      (data: any) => {
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
      'the delete request has been. Wait for feedback.',
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


  searchMe() {
    this.loader = true;
    console.log('the form builder ', this.search.value);
    this.adminService.SearchCity(this.search.value).subscribe(
       (response: any) => {
        this.loader = false;
        this.cityName = this.search.get('city').value;
        this.searchResult = response;
        this.NumberOfCity = response.length;
        if (response.length === 0) {
          this.searchsomething = true;
          this.foundResult = false;
         } else {
          this.foundResult = true;
         }

        console.log('the response: ', response);
       }, error => {
        this.loader = false;
        console.log('error: ', error);
       }
     );
  }

}
