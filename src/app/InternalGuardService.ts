import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";

@Injectable()
export class InternalGuardService implements CanActivate {
    constructor(
        private router: Router,
    ) {}
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        const isLoggedIn = !!localStorage.getItem('username');
        if(!isLoggedIn) {
            this.router.navigate(['/']);
            return false;
        }
        return true;
    }
}