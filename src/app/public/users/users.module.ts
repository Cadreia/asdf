import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule, UserRoutingComponent } from './users-routing.module';
import { ShareModule } from '../shared/share/share.module';
import { AccountMenuComponent } from './account/account-menu/account-menu.component';
import { AdminComponent } from './account/admin/admin.component';


@NgModule({
  declarations: [
    UserRoutingComponent,
    AccountMenuComponent,
    AdminComponent],
  imports: [
    CommonModule,
    ShareModule,
    UsersRoutingModule
  ]
})
export class UsersModule { }
