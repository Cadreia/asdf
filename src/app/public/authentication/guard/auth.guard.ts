import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { LoginService } from 'src/app/services/login/login.service';
import { SharedService } from '../../shared/sharedservice/shared.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private loginService: LoginService, private sharesService: SharedService) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      if (this.sharesService.isAdmin === true) {
    return true;
      } else {
        this.router.navigate(['']);
        return false;
      }
  }
}
