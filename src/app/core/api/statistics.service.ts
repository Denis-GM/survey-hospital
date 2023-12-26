import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {
    public currentSurveyId: string = '';
    private headers = new HttpHeaders(
        { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*', 
          'Authorization': `Bearer ${localStorage.getItem('auth-token')}`}
    );

    private headersNotAuth = new HttpHeaders(
      { 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*', 
      }
    );

    private apiUrl: string = "https://api.survey-manager.ru";
    private apiGetStat: string = this.apiUrl + '/analyst/survey';
    constructor(private http: HttpClient) { }

    getCurrentSurveyId(): Observable<string> {
        const data = of(this.currentSurveyId);
        return data;
    }

    getStats(from: string, to: string, surveyId: string): Observable<any> {
      let headers = this.headersNotAuth.set('Authorization', `Bearer ${localStorage.getItem('auth-token')}`)
      let params = new HttpParams()
        .set("From", from).set("To", to).set("SurveyId", surveyId);
      return this.http.get(this.apiGetStat, {headers: headers, params: params});
    }
}
