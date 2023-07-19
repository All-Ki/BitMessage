import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UsersService } from '../api/users/users.service';

@Injectable({
  providedIn: 'root'
})
export class LoggedInGuardGuard {

  constructor(private userService: UsersService,private router: Router) {}

  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean | UrlTree | Observable<boolean | UrlTree>> {
      if(!await this.userService.isLoggedIn()){
        console.log("not logged in")
        this.router.navigate(['/login']);
        return false;
      }
      return true;
  }

}
