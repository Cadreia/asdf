import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PasswordValidator } from 'src/app/public/shared/password.validator';
import { MessageService } from 'src/app/services/messages/message.service';
import { ChangePasswordService } from 'src/app/services/changepassword/change-password.service';
import { SharedService } from 'src/app/public/shared/sharedservice/shared.service';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss']
})
export class SettingComponent implements OnInit {
  changePassword: FormGroup;
  public loader: boolean;
  public userInfos: any;
  constructor(private formBuilder: FormBuilder,
    private toaster: MessageService,
    private changePasswordService: ChangePasswordService,
    private sharedService: SharedService,
    private router: Router,
    private loginService: LoginService) { }

  ngOnInit() {
    if (
      localStorage.hasOwnProperty('userDetails') &&
      localStorage.getItem('accessToken') ===
      this.loginService.getAccessToken()
    ) {
      this.userInfos = this.sharedService.getUserinfo();
    } else {
      this.router.navigate(['']);
    }
    this.changePassword = this.formBuilder.group({
      email: [this.userInfos.email, Validators.required],
      oldPassword: ['', [Validators.required, Validators.minLength(6)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      passwordConfirmation: [''],
    }, { validator: PasswordValidator });

  }

  onSubmit() {
    this.loader = true;
    const npassword = this.changePassword.get('password').value;
    const cnpassword = this.changePassword.get('passwordConfirmation').value;
    if (npassword === cnpassword) {
      console.log(this.changePassword.value);
      this.changePasswordService.changePassword(this.changePassword.value).subscribe(
        (data: any) => {
          this.loader = false;
          console.log(data);
          this.toaster.passwordChangeSuccess();
          this.router.navigate(['public/home']);
        },
        (error: any) => {
          this.loader = false;
          console.log(error);
          if (!(error && Object.keys(error).length === 0)) {
            if (error.errorCode === 0) {
              this.toaster.offlineMessage();
            } else if (error.errorCode === 422) {
              if (error.code === 'BAD_USER_CREDENTIALS') {
                this.toaster.badOldCredential();
              }
            }
          }
        }
      );
    } else {
      this.loader = false;
      this.toaster.passwordMismatch();
    }
  }

}
