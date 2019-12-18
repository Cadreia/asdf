import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule, UserRoutingComponent } from './users-routing.module';
import { ShareModule } from '../shared/share/share.module';
import { AccountMenuComponent } from './account/account-menu/account-menu.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';


@NgModule({
  declarations: [UserRoutingComponent, AccountMenuComponent],
  imports: [CommonModule, ShareModule, UsersRoutingModule, SweetAlert2Module.forRoot()]
})
export class UsersModule {}
