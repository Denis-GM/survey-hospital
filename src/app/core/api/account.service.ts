import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Accounts } from '../moks/account';
import { Observable, of } from 'rxjs';
import { IRegisterAccount, ILoginAccount } from '../interfaces/account-interfaces';

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

  private apiUrl: string = "http://194.169.160.79:8080";
  private apiGetAccount: string = this.apiUrl + '/account';
  private apigetAccessKey: string = this.apiUrl + '/surveys/access-key'
  private apiRegister: string = this.apiUrl + '/account/register';
  private apiLogin: string = this.apiUrl + "/account/login";

  constructor(private http: HttpClient) { }

  getAccount(): Observable<any> {
    return this.http.get(this.apiGetAccount, {headers: this.headers})
  }

  getAccessKey(): Observable<any> {
    return this.http.get(this.apiGetAccount, {headers: this.headers})
  }

  registerAccount(newAccount: IRegisterAccount): Observable<any> {
    return this.http.post(this.apiRegister, newAccount, { headers: this.headers });
  }

  loginAccount(account: ILoginAccount): Observable<any> {
    return this.http.post(this.apiLogin, account, { headers: this.headers });
  }
}
