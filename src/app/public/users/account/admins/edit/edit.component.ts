import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin/admin.service';
import { Transit } from 'src/app/model/transit';
import { SharedService } from 'src/app/public/shared/sharedservice/shared.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'src/app/services/messages/message.service';
// import { swal } from 'sweetalert2';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  // location: any;
  isAdmin: boolean;
  userInfos: any;
  transitInformations: any;
  EditContent: any;
  updateform: FormGroup;
  public loader: boolean;
  public imagepath = '../../../../../assets/template/images/logo/logo.ico';
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private adminService: AdminService,
    private sharedService: SharedService,
    private formBuilder: FormBuilder,
    private toaster: MessageService
  ) { }

  ngOnInit() {
    if (localStorage.hasOwnProperty('editvalues')) {
      this.EditContent = this.getEditData();
    } else {
      this.router.navigate(['public/users/account/admin']);
    }

    this.adminService.getTransitsAndStops().subscribe((response: any) => {
      this.transitInformations = response;
    });

    this.userInfos = this.sharedService.getUserinfo();
    if (this.sharedService.IsAdmin()) {
      this.isAdmin = true;
    } else {
      this.isAdmin = false;
      this.router.navigate(['public/users/account/overview']);
    }

    this.updateform = this.formBuilder.group({
      id: [this.EditContent.id],
      country: [this.EditContent.country, Validators.required],
      state: [this.EditContent.state, Validators.required],
      city: [this.EditContent.city, Validators.required],
      address: [this.EditContent.address, Validators.required]
    });

  }

  clear() {
    localStorage.removeItem('editvalues');
  }
  getEditData() {
    return JSON.parse(localStorage.getItem('editvalues'));
  }
  getAccessToken() {
    return localStorage.getItem('accessToken');
  }

  sendTransitForm() {
    this.loader = true;
    console.log(this.updateform.value);
    this.adminService.updateTransitForm(this.updateform.value).subscribe(
      (response: any) => {
        this.loader = false;
        console.log(response);
        this.toaster.successupdate();
        this.router.navigate(['public/users/account/admin']);
        localStorage.removeItem('editvalues');
      },
      (error: any) => {
        localStorage.removeItem('editvalues');
        this.router.navigate(['public/users/account/admin']);
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
        }
      }
    );
  }
}
