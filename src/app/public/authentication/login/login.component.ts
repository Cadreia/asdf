import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login/login.service';
import { MessageService } from 'src/app/services/messages/message.service';
import { config } from 'src/app/configs/app.config';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
loginForm: FormGroup;
public loader: boolean;
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
    if (this.loginService.isLoggedIn()) {
      this.router.navigate(['public/home']);
    }
  }

  Login() {
this.loader = true;
console.log(this.loginForm.value);
this.loginService.login(this.loginForm.value).subscribe(
  (response: any) => {
    this.loader = false;
    localStorage.setItem('userDetails',
                  JSON.stringify({id: response.userDetails.id,
                    fullName: response.userDetails.fullName,
                    email: response.userDetails.email,
                    role: response.userDetails.roles})
                  );
    console.log(this.getPayload());
    window.location.reload();
    this.router.navigate(['public/home']);
    this.toaster.loginSuccess();
  },
 ( error: any) => {
    this.loader = false;
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

  getPayload() {
    const token = this.loginService.getAccessToken();
    let payload = token.split('.')[1];
    payload = window.atob(payload);
    return JSON.parse(payload);
  }
}
