import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login/login.service';
import { MessageService } from 'src/app/services/messages/message.service';
import { config } from 'src/app/configs/app.config';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
loginForm: FormGroup;
public forgotPath = config.forgot_password;
public createNewAccount = config.create_new;

  constructor(private fb: FormBuilder,
              private toaster: MessageService,
              private router: Router,
              private loginService: LoginService) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
    localStorage.removeItem('accessToken');
    if (this.loginService.isLoggedIn()) {
      this.router.navigate(['public/home']);
    }
  }

  Login() {
console.log(this.loginForm.value);
this.loginService.login(this.loginForm.value).subscribe(
  (response: any) => {
    // window.location.reload();
    (JSON.stringify(response));
    this.toaster.loginSuccess();
    this.router.navigate(['public/home']);
  },
 ( error: any) => {
    console.log('the error is: ', error);
    if (!(error && Object.keys(error).length === 0)) {
      if (error.errorCode === 422) {
        if (error.code === 'EMAIL_NOT_VERIFY') {
        this.toaster.emailNotVerified();
      }
      } else if (error.errorCode === 404) {
        this.toaster.pageNotFound();
      } else if (error.errorCode === 0) {
        this.toaster.offlineMessage();
      } else if (error.errorCode === 401) {
        if (error.code === 'BAD_CREDENTIALS') {
        this.toaster.badCredentials();
      }
      } else if (error.errorCode === 500) {
        this.toaster.internalError();
      }
    }
  }
);
  }
}
