import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, CanLoad, Route, UrlSegment, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { PlayfabService } from '../playfab.service';

@Injectable({
  providedIn: 'root'
})
export class GuestGuard implements CanLoad, CanActivate {
  constructor(
    private playfabService: PlayfabService,
    private router: Router
  ) {

  }
  canLoad(route: Route, segments: UrlSegment[]): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if (this.playfabService.userToken === undefined) {
      return true;
    }
    else {
      this.router.navigate(['/usermanager']);
      return false;
    }
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.playfabService.userToken === undefined) {
      return true;
    }
    else {
      this.router.navigate(['/usermanager']);
      return false;
    }
  }

}
