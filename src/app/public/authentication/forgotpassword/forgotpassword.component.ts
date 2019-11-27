import { Component, OnInit } from '@angular/core';
import { config } from 'src/app/configs/app.config';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ResetService } from 'src/app/services/resetpassword/reset.service';
import { MessageService } from 'src/app/services/messages/message.service';
import { Tokens } from 'src/app/model/tokens';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.scss']
})
export class ForgotpasswordComponent implements OnInit {
  resetForm: FormGroup;
  tokens: Tokens;
public loginPath = config.login_dir;
public createNewAccount = config.create_new;
  constructor(private formBuilder: FormBuilder,
              private resetService: ResetService,
              private toaster: MessageService) { }

  ngOnInit() {
    this.resetForm = this.formBuilder.group({
      email: ['', [Validators.email, Validators.required]],
    });
  }

  resetFunction() {
    console.log(this.resetForm.value);
    this.resetService.resetPassword(this.resetForm.value, this.tokens).subscribe(
      (response: any) => {
        this.toaster.successEmailPasswordReset();
        console.log('the code is:', response);
      },
      (error: any) => {
        console.log(error);
        if (!(error && Object.keys(error).length === 422)) {
          if (error.errorCode === 0) {
            this.toaster.offlineMessage();
          } else if (error.errorCode === 422) {
            if (error.code === 'INVALID_USER') {
            this.toaster.invalidemailMessage();
            }
          }
        }
      }
    );
  }

}
