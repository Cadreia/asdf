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
  private errorGeneral = this.translation.messages[('error_general_title')];

  successmessage() {
    const successRegistrationBody = this.translation.messages[
      ('register_successfull_message')
    ];
    const successRegistrationTitle = this.translation.messages[
      ('register_successfull_title')
    ];
    this.toastr.success(successRegistrationBody, successRegistrationTitle);
  }

  successupdate() {
    const updatemesage = this.translation.messages[
      ('update_successfull_message')
    ];
    this.toastr.success(updatemesage);
  }

  successUpdateRole() {
    const updatemesage = this.translation.messages[
      ('update_role_successfull_message')
    ];
    this.toastr.success(updatemesage);
  }

  successCreateTransit() {
    const updatemesage = this.translation.messages[
      ('create_successfull_message')
    ];
    this.toastr.success(updatemesage);
  }

  successDeleteTransit() {
    const deletesuccessmesage = this.translation.messages[
      ('delete_successfull_message')
    ];
    this.toastr.success(deletesuccessmesage);
  }

  successAddOfficialUser() {
    const addOfficialUser = this.translation.messages[
      ('addOfficialUser_successfull_message')
    ];
    this.toastr.success(addOfficialUser);
  }

  successDeleteAgencyUser() {
    const deletesuccessmesage = this.translation.messages[
      ('delete_agency_user_successful_message')
    ];
    this.toastr.success(deletesuccessmesage);
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

  accessDenied() {
    const accessdeny = this.translation.messages[
      ('update_access_denied_error')
    ];
    this.toastr.error(accessdeny, this.errorTitle);
  }

  locationExists() {
    const locationexist = this.translation.messages[
      ('update_location_exists_error')
    ];
    this.toastr.error(locationexist, this.errorTitle);
  }

  noJourney() {
    const deletedeny = this.translation.messages[
      ('delete_no_journey_error')
    ];
    this.toastr.error(deletedeny, this.errorTitle);
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

  successAddAgency() {
    const addAgencySuccessMessage = this.translation.messages[
      ('success_message_create_agency')
    ];
    this.toastr.success(addAgencySuccessMessage);
  }

  adminEmailNotExist() {
    const invalidAdminEmailMessage = this.translation.messages[
      ('error_message_admin_email_invalid')
    ];
    this.toastr.error(invalidAdminEmailMessage, this.errorTitle);
  }

  OfficialUserEmailNotExist() {
    const invalidAdminEmailMessage = this.translation.messages[
      ('error_invalid_user_email')
    ];
    this.toastr.error(invalidAdminEmailMessage, this.errorTitle);
  }

  adminEmailInUse() {
    const inUseAdminEmailMessage = this.translation.messages[
      ('error_message_admin_email_in_use')
    ];
    this.toastr.error(inUseAdminEmailMessage, this.errorTitle);
  }

  officialUserInUse() {
    const inUseAdminEmailMessage = this.translation.messages[
      ('error_adding_afficial_agency_user')
    ];
    this.toastr.error(inUseAdminEmailMessage, this.errorTitle);
  }

  unAuthorized() {
    const message = this.translation.messages[
      ('error_message_unauthorized_action')
    ];
    this.toastr.error(message, this.errorTitle);
  }

  agencyUserNotFound() {
    const invalidAgencyUser = this.translation.messages[
      ('error_invalid_agency_user')
    ];
    this.toastr.error(invalidAgencyUser, this.errorTitle);
  }

  userNotAgencyMember() {
    const message = this.translation.messages[
      ('error_user_not_in_agency')
    ];
    this.toastr.error(message, this.errorTitle);
  }

  userNotExist() {
    const message = this.translation.messages[
      ('error_user_not_exist')
    ];
    this.toastr.error(message, this.errorTitle);
  }

  successAddBus() {
    const message = this.translation.messages[
      ('success_message_create_bus')
    ];
    this.toastr.success(message);
  }

  validationError() {
    const message = this.translation.messages[
      ('error_invalid_input_fields')
    ];
    this.toastr.error(message, this.errorGeneral);
  }

  licensePlateNumberInUse() {
    const message = this.translation.messages[
      ('error_license_plate_num_in_use')
    ];
    this.toastr.error(message, this.errorGeneral);
  }
}
