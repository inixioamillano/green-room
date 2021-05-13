import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { UserService } from "../services/user.service";

@Injectable({
    providedIn: 'root'
})
export class UserGuard implements CanActivate {
    constructor(private userService: UserService, private router: Router) {}
  
    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const nextRoute = next.url[0].path;
        console.log(nextRoute);
        if (!this.userService.isLoggedIn()) {
            if (nextRoute === 'newuser'){
                return true;
            }
            this.router.navigate(['/newuser'])
            return false;
        } else {
            if (nextRoute === 'newuser') {
                this.router.navigate(['/myvotes'])
                return false;
            }
            return true;
        }
    }
  }