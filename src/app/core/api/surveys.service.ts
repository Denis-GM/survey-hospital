import { Injectable } from '@angular/core';
import {HttpBackend, HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable, of} from "rxjs";
import { QuestionBase } from '../interfaces/question-base';
@Injectable({
  providedIn: 'root'
})
export class SurveysService {
  private authToken: string = '';

  private headers = new HttpHeaders(
    { 
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*', 
      'Authorization': `Bearer ${localStorage.getItem('auth-token')}`}
  );

  private apiUrl: string = "https://api.survey-manager.ru";
  private apiGetSurveys: string = this.apiUrl + '/admin/surveys';
  private apiGetSurvey: string = this.apiUrl + '/survey/';

  private apiEditSurvey: string = "";
  private apiDeleteSurvey: string = this.apiUrl + "/survey/";
  private apiPostSurvey: string = this.apiUrl + '/survey';

  // Patient
  private apiGetPatientSurveys: string = this.apiUrl + '/patient/surveys';
  private apiPostPatientSurvey: string = this.apiUrl + '/patient/survey';

  constructor(private http: HttpClient) { }

  getSurveys(): Observable<any> {
    return this.http.get(this.apiGetSurveys, {headers: this.headers});
  }

  postSurvey(data: any): Observable<any> {
    return this.http.post(this.apiPostSurvey, JSON.stringify(data), {headers: this.headers});
  }

  getSurvey(id: string): Observable<any> {
    return this.http.get(this.apiGetSurvey + id, {headers: this.headers});
  }

  getSurveysPatient(): Observable<any> {
    return this.http.get(this.apiGetPatientSurveys);
  }

  postSurveyPatient(data: any): Observable<any> {
    return this.http.post(this.apiPostPatientSurvey, JSON.stringify(data),
    {headers: {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', }});
  }

  editSurvey(data: any): Observable<any> {
    console.log('edit');
    return this.http.put(this.apiUrl + this.apiEditSurvey, data,
      {headers: this.headers}
    );
  }

  deleteSurvey(id: number){
    console.log('delete');
    return this.http.delete(this.apiDeleteSurvey + id, 
      {headers: this.headers})
  }
}
