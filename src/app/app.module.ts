import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { TranslatePipe } from './pipes/translate.pipe';
import { HeaderComponent } from './public/header/header.component';
import { FooterComponent } from './public/footer/footer.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TranslationService } from './services/translate/translation.service';
import { ToastrModule } from 'ngx-toastr';
import { TokenInterceptor } from './services/registration/token.interceptor';
import { ShareModule } from './public/shared/share/share.module';

const setTranslationFactory = (translationService: TranslationService) => {
      return () => translationService.getTranslationMessages('en');
  };
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    routingComponents
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    ShareModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 15000,
      positionClass: 'toast-top-right',
      preventDuplicates: true
    })
  ],
  providers: [
    TranslationService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    {
      provide: APP_INITIALIZER,
      useFactory: setTranslationFactory,
      deps: [TranslationService],
      multi: true
    },
  ],
  bootstrap: [AppComponent, FooterComponent, HeaderComponent]

})
export class AppModule {}
