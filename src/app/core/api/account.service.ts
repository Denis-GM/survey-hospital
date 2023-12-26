import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, of, tap } from 'rxjs';
import { IRegisterAccount, ILoginAccount } from '../interfaces/account-interfaces';
import { IUser } from '../interfaces/IUser';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
    private apiUrl: string = "https://api.survey-manager.ru";
    private apiGetAccount: string = this.apiUrl + '/account';
    private apiRegister: string = this.apiUrl + '/account/register';
    private apiLogin: string = this.apiUrl + "/account/login";

    private userSubject: BehaviorSubject<IUser>;
    public user: Observable<IUser>;
    
    private headers = new HttpHeaders({ 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*', 
        'Authorization': `Bearer ${localStorage.getItem('auth-token') || ''}`
        // 'Authorization': `Bearer ${this.userValue.token}`
    });

    private headersLogReg = new HttpHeaders({ 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*', 
    });

    constructor(private http: HttpClient, private router: Router) { 
        this.userSubject = new BehaviorSubject<IUser>(localStorage.getItem('user') as IUser | {} as IUser);
        this.user = this.userSubject.asObservable();
    }

    public get userValue(): IUser {
        return this.userSubject.value;
    }

    getAccount(): Observable<any> {
        return this.http.get(this.apiGetAccount, {headers: this.headers})
    }

    getAccountGuard(headers: HttpHeaders): Observable<any> {
        return this.http.get(this.apiGetAccount, {headers: headers})
    }

    getAccessKey(): Observable<any> {
        return this.http.get(this.apiGetAccount, {headers: this.headers})
    }

    register(newAccount: IRegisterAccount): Observable<any> {
        return this.http.post(this.apiRegister, newAccount, { headers: this.headersLogReg });
    }

    deleteAccount(): Observable<any> {
        const headers = this.headersLogReg.set('Authorization', `Bearer ${localStorage.getItem('auth-token') || ''}`);
        return this.http.delete(this.apiGetAccount, { headers: this.headers });
    }

    createKeyAccess(key: string): Observable<any> {
        const headers = this.headersLogReg.set('Authorization', `Bearer ${localStorage.getItem('auth-token') || ''}`);
        return this.http.post(this.apiGetAccount, { headers: headers });
    }

    login(account: ILoginAccount): Observable<any> {
        return this.http.post<any>(this.apiLogin, account, { headers: this.headersLogReg })
            .pipe(map(user => {
                localStorage.setItem('user', JSON.stringify(user));
                localStorage.setItem('auth-token', user.token);
                localStorage.setItem('role', user.role);
                this.userSubject.next(user as IUser);
                return user;
            }));
    }

    logout() {
        localStorage.removeItem('user');
        localStorage.removeItem('auth-token');
        localStorage.removeItem('role');
        this.userSubject.next({} as IUser);
        this.router.navigate(['/account/login']);
    }

    
}
