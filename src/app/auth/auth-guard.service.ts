import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';

import { AppService } from '../app.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private appService : AppService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    console.log('username', localStorage.getItem('username'));
    // We might want to use something like user service to pull user's information.
    if (localStorage.getItem('username') != null) {
      return true;
    } else {
      this.appService.username = null;
      this.router.navigate(['']);
    }
  }
}
