import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OverviewComponent } from './account/overview/overview.component';
import { BookingComponent } from './account/booking/booking.component';
import { SettingComponent } from './account/setting/setting.component';
import { ReservationComponent } from './account/reservation/reservation.component';
import { AuthGuard } from '../authentication/guard/auth.guard';
import { AdminComponent } from './account/admins/admin/admin.component';
import { EditComponent } from './account/admins/edit/edit.component';
import { AddTransitComponent } from './account/admins/add-transit/add-transit.component';
import { AgencyComponent } from './account/admins/agency/agency.component';
import { AgencyGuard } from '../authentication/guard/agency.guard';
import { AddOfficialAgencyComponent } from './account/admins/add-official-agency/add-official-agency.component';
import { AddOfficialUsersComponent } from './account/admins/add-official-users/add-official-users.component';
import { AgencyUsersResolverService } from '../shared/resolvers/agency-users/agency-users-resolver.service';
import { ManageCarComponent } from './account/admins/manage-car/manage-car.component';
import { AddBusComponent } from './account/admins/add-bus/add-bus.component';



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
  {
    path: 'account/admin',
    component: AdminComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'account/edit',
    component: EditComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'account/create',
    component: AddTransitComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'account/officialAgency',
    component: AgencyComponent,
    // resolve: { users: AgencyUsersResolverService },
    canActivate: [AgencyGuard]
  },
  {
    path: 'account/add',
    component: AddOfficialAgencyComponent,
    canActivate: [AgencyGuard]
  },
  {
    path: 'account/addOfficialUser',
    component: AddOfficialUsersComponent,
    canActivate: [AgencyGuard]
  },
  {
    path: 'account/manage-car',
    component: ManageCarComponent,
    canActivate: [AgencyGuard]
  },
  {
    path: 'account/add-bus',
    component: AddBusComponent,
    canActivate: [AgencyGuard]
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
ReservationComponent,
AdminComponent,
EditComponent,
AddTransitComponent,
AgencyComponent,
AddOfficialAgencyComponent,
AddOfficialUsersComponent,
ManageCarComponent,
AddBusComponent
];
