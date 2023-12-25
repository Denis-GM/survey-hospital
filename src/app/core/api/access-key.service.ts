import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccessKeyService {
    private apiUrl: string = "https://api.survey-manager.ru";
    private apiGetAccessKey: string = this.apiUrl + '/admin/surveys/access-key';
    private apiAddAccessKey: string = this.apiUrl + '/analyst/surveys/add';

    private headers = new HttpHeaders({ 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*', 
        'Authorization': `Bearer ${localStorage.getItem('auth-token') || ''}`
        // 'Authorization': `Bearer ${this.userValue.token}`
    });
    
    constructor(private http: HttpClient) { }

    getAccessKey(): Observable<any> {
        return this.http.get(this.apiGetAccessKey, {headers: this.headers})
    }

    editAccessKey(accessKey: any): Observable<any> {
        return this.http.put(this.apiGetAccessKey, accessKey, {headers: this.headers})
    }

    addAccessKeyАnalyst(accessKey: any): Observable<any> {
        return this.http.post(this.apiAddAccessKey, accessKey, {headers: this.headers})
    }
}
