import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { QuestionBase } from '../interfaces/question-base';
@Injectable({
  providedIn: 'root'
})
export class SurveysService {
  private headers = new HttpHeaders(
    { 
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*', 
      'Authorization': `Bearer ${localStorage.getItem('auth-token') || ''}`
    }
  );

  private headersNotAuth = new HttpHeaders(
    { 
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*', 
    }
  );
  
  public currentSurveyId: string = '';
  
  private apiUrl: string = "https://api.survey-manager.ru";
  private apiGetSurveysAdmin: string = this.apiUrl + '/admin/surveys';
  private apiGetSurveysAnalyst: string = this.apiUrl + '/analyst/surveys';
  private apiGetSurvey: string = this.apiUrl + '/survey/';

  private apiEditSurvey: string = this.apiUrl + "/survey/";
  private apiDeleteSurvey: string = this.apiUrl + "/survey/";
  private apiPostSurvey: string = this.apiUrl + '/survey';

  // Patient
  private apiGetPatientSurveys: string = this.apiUrl + '/patient/surveys';
  private apiGetPatientSurvey: string = this.apiUrl + '/patient/survey';
  private apiPostPatientSurvey: string = this.apiUrl + '/patient/survey';

  constructor(private http: HttpClient) { }

  getCurrentSurveyId(): Observable<string> {
    const data = of(this.currentSurveyId);
    return data;
  }

  getSurveysAdmin(): Observable<any> {
    const headers = this.headersNotAuth.set('Authorization', `Bearer ${localStorage.getItem('auth-token') || ''}`);
    return this.http.get(this.apiGetSurveysAdmin, {headers: headers});
  }

  getSurveysAnalyst(): Observable<any> {
    const headers = this.headersNotAuth.set('Authorization', `Bearer ${localStorage.getItem('auth-token') || ''}`)
    return this.http.get(this.apiGetSurveysAnalyst, {headers: headers});
  }

  postSurvey(data: any): Observable<any> {
    const headers = this.headersNotAuth.set('Authorization', `Bearer ${localStorage.getItem('auth-token') || ''}`)
    return this.http.post(this.apiPostSurvey, JSON.stringify(data), {headers: headers});
  }

  getSurvey(id: string): Observable<any> {
    const headers = this.headersNotAuth.set('Authorization', `Bearer ${localStorage.getItem('auth-token') || ''}`)
    return this.http.get(this.apiGetSurvey + id, {headers: headers});
  }

  getSurveyPatient(id: string): Observable<any> {
    const headers = this.headersNotAuth.set('Authorization', `Bearer ${localStorage.getItem('auth-token') || ''}`)
    return this.http.get(this.apiGetPatientSurvey + '/' + id, {headers: headers});
  }

  getSurveysPatient(): Observable<any> {
    return this.http.get(this.apiGetPatientSurveys);
  }

  postSurveyPatient(data: any): Observable<any> {
    return this.http.post(this.apiPostPatientSurvey, JSON.stringify(data),
    {headers: {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', }});
  }

  editSurvey(idSurvey: string, data: any): Observable<any> {
    const headers = this.headersNotAuth.set('Authorization', `Bearer ${localStorage.getItem('auth-token') || ''}`)
    return this.http.put(this.apiEditSurvey + idSurvey, data, { headers: headers });
  }

  deleteSurvey(id: string){
    const headers = this.headersNotAuth.set('Authorization', `Bearer ${localStorage.getItem('auth-token') || ''}`)
    return this.http.delete(this.apiDeleteSurvey + id, { headers: headers });
  }
}
