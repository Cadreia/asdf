import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      if (localStorage.getItem('accessToken') === this.getAccessToken()) {
    return true;
      } else {
        this.router.navigate(['']);
        return false;
      }
  }
  getAccessToken() {
  return localStorage.getItem('accessToken');
  }

}
