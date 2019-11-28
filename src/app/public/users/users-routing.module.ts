import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OverviewComponent } from './account/overview/overview.component';
import { BookingComponent } from './account/booking/booking.component';
import { SettingComponent } from './account/setting/setting.component';
import { ReservationComponent } from './account/reservation/reservation.component';
import { AuthGuard } from '../authentication/guard/auth.guard';


const routes: Routes = [
  {
    path: 'account/overview',
    component: OverviewComponent
  },
  {
    path: 'account/booking',
    component: BookingComponent
  },
  {
    path: 'account/setting',
    component: SettingComponent
  },
  {
    path: 'account/reservation',
    component: ReservationComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
export const UserRoutingComponent = [
OverviewComponent,
BookingComponent,
SettingComponent,
ReservationComponent
];
