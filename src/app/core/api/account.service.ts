import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, of, tap } from 'rxjs';
import { IRegisterAccount, ILoginAccount } from '../interfaces/account-interfaces';
import { IUser } from '../interfaces/IUser';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
    private headers = new HttpHeaders(
        { 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*', 
        'Authorization': `Bearer ${localStorage.getItem('auth-token')}`}
    );

    private apiUrl: string = "https://api.survey-manager.ru";
    private apiGetAccount: string = this.apiUrl + '/account';
    private apigetAccessKey: string = this.apiUrl + '/surveys/access-key'
    private apiRegister: string = this.apiUrl + '/account/register';
    private apiLogin: string = this.apiUrl + "/account/login";

    private userSubject: BehaviorSubject<IUser>;
    public user: Observable<IUser>;
    router: any;

    constructor(private http: HttpClient) { 
        this.userSubject = new BehaviorSubject<IUser>(localStorage.getItem('user') as IUser | {} as IUser);
        this.user = this.userSubject.asObservable();
    }

    public get userValue(): IUser {
        return this.userSubject.value;
    }

    getAccount(): Observable<any> {
        return this.http.get(this.apiGetAccount, {headers: this.headers})
    }

    getAccessKey(): Observable<any> {
        return this.http.get(this.apiGetAccount, {headers: this.headers})
    }

    register(newAccount: IRegisterAccount): Observable<any> {
        return this.http.post(this.apiRegister, newAccount, { headers: this.headers });
    }

    login(account: ILoginAccount): Observable<any> {
        return this.http.post<any>(this.apiLogin, account, { headers: this.headers })
            // .pipe(map(user => {
            //     tap(user => localStorage.setItem('user', JSON.stringify(user)));
            //     this.userSubject.next(user as IUser);
            //     return user;
            // }));
    }

    logout() {
        localStorage.removeItem('user');
        this.userSubject.next({} as IUser);
        this.router.navigate(['/emp/account/login']);
    }
}
