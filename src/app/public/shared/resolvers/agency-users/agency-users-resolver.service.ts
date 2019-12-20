import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { AdminService } from 'src/app/services/admin/admin.service';

@Injectable({
  providedIn: 'root'
})
export class AgencyUsersResolverService implements Resolve<any>{

  constructor(private adminService: AdminService) { }

  resolve() {
    return this.adminService.getOfficialAgencyUsers();
  }
}
