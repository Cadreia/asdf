import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'src/app/services/messages/message.service';
import { AdminService } from 'src/app/services/admin/admin.service';
import { SharedService } from 'src/app/public/shared/sharedservice/shared.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-transit',
  templateUrl: './add-transit.component.html',
  styleUrls: ['./add-transit.component.scss']
})
export class AddTransitComponent implements OnInit {
public imagepath = '../../../../../assets/template/images/logo/logo.ico';
public addtransitform: FormGroup;
public userInfos: any;
public isAdmin: boolean;
public loader: boolean;
  constructor(private formBuilder: FormBuilder,
              private toaster: MessageService,
              private adminService: AdminService,
              private sharedService: SharedService,
              private router: Router) { }

  ngOnInit() {
    this.addtransitform = this.formBuilder.group({
      country: ['', Validators.required],
      state: ['', Validators.required],
      city: ['', Validators.required],
      address: ['', Validators.required]
    });

    this.userInfos = this.sharedService.getUserinfo();
    if (this.sharedService.IsAdmin()) {
    this.isAdmin = true;
    } else {
      this.isAdmin = false;
      this.router.navigate(['public/users/account/overview']);
    }
  }

  createTransitForm() {
    this.loader = true;
    console.log(this.addtransitform.value);
    this.adminService.addTransitForm(this.addtransitform.value).subscribe(
      (response: any) => {
        this.loader = false;
        console.log('success', response);
        this.router.navigate(['public/users/account/admin']);
        this.toaster.successCreateTransit();
      }, (error: any) => {
        this.loader = false;
        console.log(error);
        if (!(error && Object.keys(error).length === 0)) {
          if (error.errorCode === 0) {
            this.toaster.offlineMessage();
          }
          if (error.errorCode === 500) {
            this.toaster.internalError();
          }
          if (error.errorCode === 401) {
            if (error.code === 'ACCESS_DENIED') {
              this.toaster.accessDenied();
            }
          } else if (error.errorCode === 409) {
            if (error.code === 'TRANSIT_AND_STOP_ALREADY_IN_USE') {
              this.toaster.locationExists();
            }
          }
        }
      }
    );
  }
  getAccessToken() {
    return localStorage.getItem('accessToken');
  }
}
