import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { AuthenticationRoutingModule } from './authentication.routing';
import { ShareModule } from '../shared/share/share.module';
import { RegistrationService } from 'src/app/services/registration/registration.service';
// import { TranslationService } from 'src/app/services/translate/translation.service';
import { TranslatePipe } from 'src/app/pipes/translate.pipe';



@NgModule({
  declarations: [RegisterComponent, LoginComponent],
  imports: [
    CommonModule,
    ShareModule,
    AuthenticationRoutingModule
  ],
  providers: [RegistrationService]
})
export class AuthenticationModule {}
