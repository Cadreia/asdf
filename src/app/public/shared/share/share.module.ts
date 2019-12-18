import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TranslatePipe } from 'src/app/pipes/translate.pipe';
import { TokenInterceptor } from 'src/app/services/registration/token.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthGuard } from '../../authentication/guard/auth.guard';
import { AgencyGuard } from '../../authentication/guard/agency.guard';
import { LoaderComponent } from '../../users/account/loader/loader.component';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  declarations: [TranslatePipe, LoaderComponent],
  imports: [CommonModule, ReactiveFormsModule, FormsModule, NgSelectModule
  ],
  exports: [TranslatePipe, LoaderComponent, CommonModule, ReactiveFormsModule, FormsModule, NgSelectModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    AuthGuard,
    AgencyGuard
  ]
})
export class ShareModule {}
