import { HttpClient, HttpHeaders } from '@angular/common/http';
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

    private apiUrl: string = "https://api.survey-manager.ru";
    private apiGetSurveys: string = this.apiUrl + '/admin/surveys';
    constructor(private http: HttpClient) { }

    getCurrentSurveyId(): Observable<string> {
        const data = of(this.currentSurveyId);
        return data;
    }
}
