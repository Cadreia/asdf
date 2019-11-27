import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule, UserRoutingComponent } from './users-routing.module';
import { ShareModule } from '../shared/share/share.module';
import { AccountMenuComponent } from './account/account-menu/account-menu.component';


@NgModule({
  declarations: [
    UserRoutingComponent,
    AccountMenuComponent],
  imports: [
    CommonModule,
    ShareModule,
    UsersRoutingModule
  ]
})
export class UsersModule { }
