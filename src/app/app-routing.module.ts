import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './public/home/home.component';
import { FaqsComponent } from './public/faqs/faqs.component';
import { AboutComponent } from './public/about/about.component';
import { ContactsComponent } from './public/contacts/contacts.component';
import { NotfoundComponent } from './public/notfound/notfound.component';
// import { AuthGuard } from './public/authentication/guard/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'public/home', pathMatch: 'full' },

  {
    path: 'public/authentication',
    loadChildren: () =>
      import('./public/authentication/authentication.module').then(
        mod => mod.AuthenticationModule
      )
  },
  // { path: 'public/authentication/login', component: LoginComponent },
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
export class AppRoutingModule {}
export const routingComponents = [
  FaqsComponent,
  AboutComponent,
  ContactsComponent,
  NotfoundComponent,
  HomeComponent
];
