import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { RegistrationService } from 'src/app/services/registration/registration.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

loginForm: FormGroup;
  constructor(private fb: FormBuilder,
              private toastr: ToastrService,
              private router: Router,
              private registrationService: RegistrationService) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  Login() {
console.log(this.loginForm.value);
this.registrationService.login(this.loginForm.value).subscribe(
          (data) => {
            this.toastr.success('You Successfully login into Gowaka', 'Login Successfully');
            this.router.navigate(['public/home']);
          },
          error => {
           console.log('there was some error ' + error.errorCode);
          //  if (!(error && (Object.keys(error).length === 0))) {
          //     if (error.errorCode === 422) {
          //       this.toastr.error('email address has not been verified', 'email not verified!');
          //     } else if ( error.errorCode === 401) {
          //       this.toastr.error('wrong user email or password', 'Bad Credential!');
          //     } else if ( error.errorCode === 404) {
          //       this.toastr.error('please the server encounter an error, try later', 'server page error!');
          //     } else if ( error.errorCode === 0) {
          //       this.toastr.error('check your internet connection, you are offline', 'No Internet!');
          //     } else {
          //       this.toastr.error('error with code ' + error.errorCode + ' ', 'No!');
          //     }
          // }
          }
        );
  }
}
