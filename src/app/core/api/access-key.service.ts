import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccessKeyService {
    private apiUrl: string = "https://api.survey-manager.ru";
    private apigetAccessKey: string = this.apiUrl + '/surveys/access-key'

    private headers = new HttpHeaders({ 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*', 
        'Authorization': `Bearer ${localStorage.getItem('auth-token') || ''}`
        // 'Authorization': `Bearer ${this.userValue.token}`
    });
    
    constructor(private http: HttpClient) { }

    getAccessKey(): Observable<any> {
        return this.http.get(this.apigetAccessKey, {headers: this.headers})
    }

    editAccessKey(accessKey: string): Observable<any> {
        return this.http.put(this.apigetAccessKey, accessKey, {headers: this.headers})
    }

    addAccessKeyАnalyst(accessKey: string): Observable<any> {
        return this.http.post(this.apigetAccessKey, accessKey, {headers: this.headers})
    }
}
