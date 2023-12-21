import { Injectable, inject } from '@angular/core';
// import { CanActivateFn, Router } from '@angular/router';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AccountService } from '../api/account.service';
import { Observable } from 'rxjs';

interface ICanActivate { 
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean
}

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {
  isLoggedIn: boolean = false;
  constructor(private router: Router, private authService: AccountService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
    const user = this.authService.userValue;
    if (user) {
      // check if route is restricted by role
      const data: any = route.data;
      if (data.roles && data.roles.indexOf(user.role) === -1) {
        this.router.navigate(['/emp/account/login']);
        return false;
      }
      return true;
    }
    this.router.navigate(['/emp/account/login'], { queryParams: { returnUrl: state.url } });
    return false;
    // this.authService.getAccount().subscribe(
    //   (data: any) => {
    //       this.isLoggedIn = true;
    //       this.router.navigate(['/employee/main/surveys']);
    //   },
    //   (err: any) => {
    //       this.isLoggedIn = false;
    //       this.router.navigate(['/employee/account/login']);
    //   }
    // )
    // return this.isLoggedIn;
  }
}

// export const authGuard: CanActivateFn = (route, state) => {
//   let isLoggedIn: boolean = false;
//   const authService = inject(AccountService);
//   const router = inject(Router);

//   return authService.getAccount().map(
//     (data: any) => {
//         isLoggedIn = true;
//         return true;
//     },
//     (err: any) => {
//         isLoggedIn = false;
//         router.navigate(['/employee/account/login']);
//         return true;
//     }
//   )
//   if(!isLoggedIn) 
//     router.navigate(['/employee/account/login']);
//   return isLoggedIn;
// };
