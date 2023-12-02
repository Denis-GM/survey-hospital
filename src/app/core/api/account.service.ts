import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Accounts } from '../moks/account';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private apiUrl: string = "";
  private apiGetAccount: string = "";

  constructor(private http: HttpClient) { }

  private accounts: any  = Accounts;

  getSurvey(id: string): Observable<any> {
    return of(this.accounts.find((account: any) => account.id == id))
  }
}
