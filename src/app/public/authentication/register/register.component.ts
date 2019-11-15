import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { RegistrationService } from 'src/app/services/registration/registration.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

   registrationForm: FormGroup;
  constructor(private fb: FormBuilder,
              private registrationservice: RegistrationService,
              private toastr: ToastrService,
              private router: Router
      ) {}

  ngOnInit() {
    this.registrationForm = this.fb.group({
  firstName: ['', [Validators.required, Validators.minLength(3)]],
  lastName: ['', [Validators.required, Validators.minLength(3)]],
  phoneNumber: ['', [Validators.required, Validators.minLength(9)]], // Validators.pattern('^\d{9}$')
  email: ['', [Validators.required, Validators.email]],
  idNumber: ['', [Validators.required, Validators.minLength(9), Validators.maxLength(9)]],
  role: ['user'],
  password: ['', [Validators.required, Validators.minLength(6)]],
  passwordConfirmation: [''],
  });
  }

  submitForm() {
    const passwords = this.registrationForm.get('password').value;
    const passwordconfirmations = this.registrationForm.get('passwordConfirmation').value;

    if (passwords === passwordconfirmations) {

    console.log(this.registrationForm.value);
    this.registrationservice.userRegister(this.registrationForm.value).subscribe(
      (data: any) => {
        this.router.navigate(['public/home']);
        console.log('successfull');
        this.toastr.success('Registration to Gowaka was successful, please check your email for confirmation',
         'Welcome to Gowaka!');
      },
     ( error: any) => {
      if (!(error && (Object.keys(error).length === 0))) {
        if (error.errorCode === 404) {
           this.toastr.error('Sorrry the site could not be found, try again later',
           'Error Registring to Gowak!');
        } else if (error.errorCode === 0) {
          this.toastr.error('You are Offline, please check your internet connection', 'Error Registring to Gowak!');
        } else if (error.errorCode === 401) {
          this.toastr.error('you have not been authorized to use this credentials', 'Error Registring to Gowak!');
        } else if (error.errorCode === 422) {
          this.toastr.error('the user email exist already, forgot password?', 'Error Registring to Gowak!');
        } else if (error.errorCode === 403) {
          this.toastr.error('you are forbidden to use these credentials', 'Forbidden Registring to Gowak!');
        }
      }
      }
    );
    } else {
      this.toastr.error('Both Passwords do no match, please check', 'Password mismatch!');
    }

  }
}
