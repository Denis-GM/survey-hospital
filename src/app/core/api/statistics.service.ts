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
    // private apiGetStat: string = this.apiUrl + '/analyst/survey';
    private apigetStatsSurveyAverage: string = this.apiUrl + '/analyst/survey/average';
    private apiGetStatsSurveyAll: string = this.apiUrl + '/analyst/survey/all';
    private apiGetDepartment: string = this.apiUrl + '/analyst/department';

    constructor(private http: HttpClient) { }

    getCurrentSurveyId(): Observable<string> {
        const data = of(this.currentSurveyId);
        return data;
    }

    getStatsSurveyAll(from: string, to: string, surveyId: string, department: string): Observable<any> {
      let headers = this.headersNotAuth.set('Authorization', `Bearer ${localStorage.getItem('auth-token')}`)
      let params = new HttpParams()
        .set("From", from).set("To", to).set("SurveyId", surveyId).set("Department", department);
      return this.http.get(this.apiGetStatsSurveyAll, {headers: headers, params: params});
    }

    getStatsSurveyAverage(from: string, to: string, surveyId: string, department: string): Observable<any> {
      let headers = this.headersNotAuth.set('Authorization', `Bearer ${localStorage.getItem('auth-token')}`)
      let params = new HttpParams()
        .set("From", from).set("To", to).set("SurveyId", surveyId).set("Department", department);
      return this.http.get(this.apigetStatsSurveyAverage, {headers: headers, params: params});
    }

    getDepartment(): Observable<any> {
      let headers = this.headersNotAuth.set('Authorization', `Bearer ${localStorage.getItem('auth-token')}`)
      return this.http.get(this.apiGetDepartment, {headers: headers});
    }
}
