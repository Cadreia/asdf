import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'src/app/services/messages/message.service';
import { AdminService } from 'src/app/services/admin/admin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-bus',
  templateUrl: './add-bus.component.html',
  styleUrls: ['./add-bus.component.scss']
})
export class AddBusComponent implements OnInit {
  public addBusForm: FormGroup;
  public loader: boolean;

  constructor(
    private toaster: MessageService,
    private formBuilder: FormBuilder,
    private adminService: AdminService,
    private router: Router
  ) { 
    
  }

  ngOnInit() {
    this.addBusForm = this.formBuilder.group({
      name: ['', Validators.required],
      licensePlateNumber: ['', Validators.required],
      numberOfSeats: ['', [Validators.required, Validators.min(1)]]
    });

  }

  onSubmit() {
    this.loader = true;
    console.log(this.addBusForm.value);
    this.adminService.addAgencyBus(this.addBusForm.value).subscribe(
      (response: any) => {
        this.loader = false;
        console.log('success', response);
        this.router.navigate(['public/users/account/manage-car']);
        this.toaster.successAddBus();
      }, (error: any) => {
        this.loader = false;
        console.log('error at:', error);
        if (!(error && (Object.keys(error).length === 0))) {
          if (error.errorCode === 0) {
            this.toaster.offlineMessage();
          } else if (error.errorCode === 500) {
            this.toaster.internalError();
          } else if (error.errorCode === 401) {
            if (error.code === 'ACCESS_DENIED') {
              this.toaster.accessDenied();
            }
          } else if (error.errorCode === 409) {
            if (error.code === 'LICENSE_PLATE_NUMBER_ALREADY_IN_USE') {
              this.toaster.licensePlateNumberInUse();
            }
          } else if (error.errorCode === 400) {
            if (error.code === 'VALIDATION_ERROR') {
              this.toaster.validationError();
            }
          }
        }
      }
    );
  }
}
