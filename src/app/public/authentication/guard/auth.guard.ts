import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { LoginService } from 'src/app/services/login/login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private loginService: LoginService) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      if (localStorage.getItem('accessToken') === this.loginService.getAccessToken()) {
    return true;
      } else {
        this.router.navigate(['']);
        return false;
      }
  }
  // getAccessToken() {
  // return localStorage.getItem('accessToken');
  // }

}
