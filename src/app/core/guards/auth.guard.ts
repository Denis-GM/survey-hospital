import { Injectable, inject } from '@angular/core';
// import { CanActivateFn, Router } from '@angular/router';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AccountService } from '../api/account.service';
import { Observable, map } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

interface ICanActivate { 
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean
}

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {
    isAccess: boolean = false;
    
    private apiUrl: string = "https://api.survey-manager.ru";
    private apiGetAccount: string = this.apiUrl + '/account';

    constructor(private router: Router, private authService: AccountService,
        private http: HttpClient) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
        const user = this.authService.userValue;
        if (user) {
            const headers = new HttpHeaders({ 
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*', 
                // 'Authorization': `Bearer ${user.token}`
                'Authorization': `Bearer ${localStorage.getItem('auth-token') || ''}`
            });
            return this.http.get(this.apiGetAccount, {headers: headers}).subscribe(
                (data: any) => {
                    // console.log(user);
                    return true;
                },
                (error: any) => {
                    this.router.navigate(['/account/login']);
                    console.log(error);
                    // console.log(user);
                    return false;
                }
            )
        }
        this.router.navigate(['/account/login']);
        return false;
    }
}