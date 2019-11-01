import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TranslatePipe } from './pipes/translate.pipe';
import { HeaderComponent } from './public/header/header.component';
import { FooterComponent } from './public/footer/footer.component';
import { HomeComponent } from './public/home/home.component';
import { AboutComponent } from './public/about/about.component';
import { NotfoundComponent } from './public/notfound/notfound.component';
import { FaqsComponent } from './public/faqs/faqs.component';
import { ContactsComponent } from './public/contacts/contacts.component';
import { HttpClientModule } from '@angular/common/http';
import { TranslationService } from './services/translate/translation.service';

const setTranslationFactory = (translationService: TranslationService) => {
      return () => translationService.getTranslationMessages('en');
  };
@NgModule({
  declarations: [
    AppComponent,
    TranslatePipe,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    AboutComponent,
    NotfoundComponent,
    FaqsComponent,
    ContactsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    TranslationService,
    {
      provide: APP_INITIALIZER,
      useFactory: setTranslationFactory,
      deps: [TranslationService],
      multi: true
    }
  ],
  bootstrap: [AppComponent, FooterComponent, HeaderComponent]
})
export class AppModule {}
