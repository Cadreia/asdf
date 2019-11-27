import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RegistrationService } from 'src/app/services/registration/registration.service';
import { Router } from '@angular/router';
import { MessageService } from 'src/app/services/messages/message.service';
// import { TranslatePipe } from 'src/app/pipes/translate.pipe';
import { TranslationService } from 'src/app/services/translate/translation.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
   registrationForm: FormGroup;
  constructor(private fb: FormBuilder,
              private registrationservice: RegistrationService,
              private router: Router,
              private toaster: MessageService,
              private translationserv: TranslationService
      ) {}

  ngOnInit() {
    this.registrationForm = this.fb.group({
  fullName: ['', [Validators.required, Validators.minLength(3)]],
  phoneNumber: ['', [Validators.required, Validators.minLength(9)]], // Validators.pattern('^\d{9}$')
  email: ['', [Validators.required, Validators.email]],
  idNumber: [''],
  role: ['User'],
  password: ['', [Validators.required, Validators.minLength(6)]],
  passwordConfirmation: ['', Validators.required],
  });
  }

  submitForm() {
    const passwords = this.registrationForm.get('password').value;
    const passwordconfirmations = this.registrationForm.get('passwordConfirmation').value;
    console.log(this.registrationForm.value);
    if (passwords === passwordconfirmations) {

    console.log(this.registrationForm.value);
    this.registrationservice.userRegister(this.registrationForm.value).subscribe(
      (data: any) => {
        this.router.navigate(['public/authentication/login']);
        this.toaster.successmessage();
      },
     ( error: any) => {
      console.log(error);
      if (!(error && (Object.keys(error).length === 0))) {
        if (error.errorCode === 404) {
           this.toaster.pageNotFound();
        } else if (error.errorCode === 0) {
          this.toaster.offlineMessage();
        } else if (error.errorCode === 422) {
          if (error.code === 'INVALID_EMAIL') {
            this.toaster.invalidemailMessage();
          } else if (error.code === 'USERNAME_EXISTS') {
                this.toaster.emailExists();
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
