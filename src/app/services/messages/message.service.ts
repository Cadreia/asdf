import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { TranslationService } from '../translate/translation.service';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  constructor(
    private toastr: ToastrService,
    private translation: TranslationService
  ) {}

  private errorTitle = this.translation.messages[('register_error_title')];

  successmessage() {
    const successRegistrationBody = this.translation.messages[
      ('register_successfull_message')
    ];
    const successRegistrationTitle = this.translation.messages[
      ('register_successfull_title')
    ];
    this.toastr.success(successRegistrationBody, successRegistrationTitle);
  }

  successEmailPasswordReset() {
    const successResetBody = this.translation.messages[
      ('passsword_reset_link_body')
    ];
    const successResetTitle = this.translation.messages[
      ('password_reset_link_title')
    ];
    this.toastr.info(successResetBody, successResetTitle);
  }

  invalidemailMessage() {
    const invalidEmail = this.translation.messages[
      ('register_422_error_invalid_email')
    ];
    this.toastr.error(invalidEmail, this.errorTitle);
  }

  internalError() {
    const internal = this.translation.messages[
      ('login_internal_error')
    ];
    this.toastr.error(internal, this.errorTitle);
  }

  emailExists() {
    const emailexists = this.translation.messages[
      ('register_422_error_email_exist')
  ];
    this.toastr.error(emailexists, this.errorTitle);
  }

  offlineMessage() {
    const emailexists = this.translation.messages[
      ('register_error_offline')
    ];
    this.toastr.warning(emailexists, this.errorTitle);
  }
  pageNotFound() {
    const emailexists = this.translation.messages[
      ('register_404_error')
    ];
    this.toastr.error(emailexists, this.errorTitle);
  }

  loginSuccess() {
    const loginsuccess = this.translation.messages[('login_successfull_message')];
    const loginsuccesstitle = this.translation.messages[('login_successfull_title')];
    this.toastr.success(loginsuccess, loginsuccesstitle);
  }

  passwordChangeSuccess() {
    const passwordsuccess = this.translation.messages[('changepassword_successfull_message')];
    this.toastr.success(passwordsuccess);
  }

  emailNotVerified() {
    const emailNotVerified = this.translation.messages[('login_notverified_email_error')];
    const emailNotVerifiedtitle = this.translation.messages[('login_notverified_email_error_title')];
    this.toastr.warning(emailNotVerified, emailNotVerifiedtitle);
  }

  badCredentials() {
    const emailNotVerified = this.translation.messages[('login_wrongCredential_error')];
    this.toastr.error(emailNotVerified, this.errorTitle);
  }

  badOldCredential() {
    const resetPasswordError = this.translation.messages[('reset_wrongCredential_error')];
    this.toastr.error(resetPasswordError, this.errorTitle);
  }

  logoutMessage() {
    const logout = this.translation.messages[('user_logout_message')];
    this.toastr.warning(logout);
  }

  passwordMismatch() {
    const passwordMismatchBody = this.translation.messages[
      ('password_mismatch_messsage')
    ];
    const passwordMismatchTitle = this.translation.messages[
     ( 'password_mismatch_title')
    ];
    this.toastr.error(
      passwordMismatchBody,
      passwordMismatchTitle
    );
  }
}
