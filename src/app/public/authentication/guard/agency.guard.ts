import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SharedService } from '../../shared/sharedservice/shared.service';

@Injectable({
  providedIn: 'root'
})
export class AgencyGuard implements CanActivate {
  constructor(private shareService: SharedService, private router: Router) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | boolean | UrlTree {
      if (this.shareService.IsAdmin() || this.shareService.IsAdminAgency()) {
        return true;
      } else {
        this.router.navigate(['public/users/account/overview']);
        return false;
      }
  }

}
