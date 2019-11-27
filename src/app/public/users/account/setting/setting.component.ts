import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PasswordValidator } from 'src/app/public/shared/password.validator';
import { MessageService } from 'src/app/services/messages/message.service';
import { ChangePasswordService } from 'src/app/services/changepassword/change-password.service';
import { SharedService } from 'src/app/public/shared/sharedservice/shared.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss']
})
export class SettingComponent implements OnInit {
changePassword: FormGroup;
public userInfos: any;
  constructor(private formBuilder: FormBuilder,
              private toaster: MessageService,
              private changePasswordService: ChangePasswordService,
              private sharedService: SharedService,
              private router: Router) { }

  ngOnInit() {
    this.changePassword = this.formBuilder.group({
      oldPassword: ['', [Validators.required, Validators.minLength(6)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      passwordConfirmation: [''],
    }, {validator: PasswordValidator});

    if (localStorage.getItem('userDetails') !== '') {
    this.userInfos = this.sharedService.getUserinfo();
  }
  }

  onSubmit() {
const npassword = this.changePassword.get('password').value;
const cnpassword = this.changePassword.get('passwordConfirmation').value;
if (npassword === cnpassword) {
  console.log(this.changePassword.value);
  this.changePasswordService.changePassword(this.changePassword.value).subscribe(
    (data: any) => {
      console.log(data);
      this.toaster.passwordChangeSuccess();
      this.router.navigate(['public/home']);
    },
    (error: any) => {
      console.log(error);
      if (!(error && Object.keys(error).length === 0)) {
        if (error.errorCode === 0) {
          this.toaster.offlineMessage();
        } else if (error.errorCode === 422) {
          if ( error.code === 'BAD_USER_CREDENTIALS') {
            this.toaster.badOldCredential();
          }

        }
      }
    }
  );
} else {
  this.toaster.passwordMismatch();
 }
  }

}
