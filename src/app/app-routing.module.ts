import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './public/home/home.component';
import { FaqsComponent } from './public/faqs/faqs.component';
import { AboutComponent } from './public/about/about.component';
import { ContactsComponent } from './public/contacts/contacts.component';
import { NotfoundComponent } from './public/notfound/notfound.component';
import { RegisterComponent } from './public/authentication/register/register.component';
import { LoginComponent } from './public/authentication/login/login.component';


const routes: Routes = [
  { path: '', redirectTo: 'public/home', pathMatch: 'full' },

  { path: 'public/authentication/register', component: RegisterComponent },
  { path: 'public/authentication/login', component: LoginComponent },
  { path: 'public/faqs', component: FaqsComponent },
  { path: 'public/about', component: AboutComponent },
  { path: 'public/home', component: HomeComponent },
  { path: 'public/contacts', component: ContactsComponent },

  { path: '**', component: NotfoundComponent }
];


// const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [
  FaqsComponent,
  AboutComponent,
  ContactsComponent,
  NotfoundComponent,
  HomeComponent,
  RegisterComponent,
  LoginComponent
];
