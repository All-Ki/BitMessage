import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UsersService } from '../api/users/users.service';

@Injectable({
  providedIn: 'root'
})
export class LoggedInGuardGuard {

  constructor(private userService: UsersService,private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(!this.userService.isLoggedIn()){
        this.router.navigate(['/login']);
        return false;
      }
      return true;
  }

}
