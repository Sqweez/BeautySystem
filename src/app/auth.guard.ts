import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(private router: Router) {}

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ){

        let loggedIn = !!(localStorage.getItem('user_data'));

        if (!loggedIn) {
            this.router.navigateByUrl('/register');
        }

        return loggedIn;
    }
}
