import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TranslatePipe } from 'src/app/pipes/translate.pipe';
import { TokenInterceptor } from 'src/app/services/registration/token.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthGuard } from '../../authentication/guard/auth.guard';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';



@NgModule({
  declarations: [TranslatePipe],
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  exports: [TranslatePipe, CommonModule, ReactiveFormsModule, FormsModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    {
      provide: AuthGuard,
     useValue: (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => true
    }
  ]
})
export class ShareModule {}
