import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PasswordValidator } from 'src/app/public/shared/password.validator';
import { MessageService } from 'src/app/services/messages/message.service';
import { ChangePasswordService } from 'src/app/services/changepassword/change-password.service';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss']
})
export class SettingComponent implements OnInit {
changePassword: FormGroup;
  constructor(private formBuilder: FormBuilder, private toaster: MessageService, private changePasswordService: ChangePasswordService) { }

  ngOnInit() {
    this.changePassword = this.formBuilder.group({
      currentPassword: ['', [Validators.required, Validators.minLength(6)]],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmNewPassword: [''],
    }, {validator: PasswordValidator});
  }

  onSubmit() {
const npassword = this.changePassword.get('newPassword').value;
const cnpassword = this.changePassword.get('confirmNewPassword').value;
if (npassword === cnpassword) {
  this.changePasswordService.changePassword(this.changePassword.value).subscribe(
    (data: any) => {
      console.log(data);
      this.toaster.passwordChangeSuccess();
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
