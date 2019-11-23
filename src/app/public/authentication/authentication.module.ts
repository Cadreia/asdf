import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { AuthenticationRoutingModule } from './authentication.routing';
import { ShareModule } from '../shared/share/share.module';
import { RegistrationService } from 'src/app/services/registration/registration.service';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { ResetService } from 'src/app/services/resetpassword/reset.service';
import { LoginService } from 'src/app/services/login/login.service';



@NgModule({
  declarations: [RegisterComponent, LoginComponent, ForgotpasswordComponent],
  imports: [
    CommonModule,
    ShareModule,
    AuthenticationRoutingModule
  ],
  providers: [RegistrationService, LoginService, ResetService]
})
export class AuthenticationModule {}
