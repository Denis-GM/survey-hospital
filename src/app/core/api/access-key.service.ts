import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccessKeyService {
    private apiUrl: string = "https://api.survey-manager.ru";
    private apiGetAccessKeyAdmin: string = this.apiUrl + '/admin/surveys/access-key';
    private apiAddAccessKeyAnalyst: string = this.apiUrl + '/analyst/surveys/add';

    private headersNotAuth = new HttpHeaders({ 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*', 
    });
    
    constructor(private http: HttpClient) { }

    getAccessKey(): Observable<any> {
        const headers = this.headersNotAuth.set('Authorization', `Bearer ${localStorage.getItem('auth-token')}`)
        return this.http.get(this.apiGetAccessKeyAdmin, {headers: headers})
    }

    editAccessKey(accessKey: any): Observable<any> {
        const headers = this.headersNotAuth.set('Authorization', `Bearer ${localStorage.getItem('auth-token')}`)
        return this.http.put(this.apiGetAccessKeyAdmin, {}, {headers: headers})
    }

    addAccessKeyАnalyst(accessKey: string): Observable<any> {
        // const params = new HttpParams().set("accessKey", accessKey);
        const headers = this.headersNotAuth.set('Authorization', `Bearer ${localStorage.getItem('auth-token')}`)
        return this.http.post(this.apiAddAccessKeyAnalyst + `?accessKey=${accessKey}`, {}, {headers: headers})
        // return this.http.post(this.apiAddAccessKeyAnalyst, {headers: headers, params: params})
    }
}
