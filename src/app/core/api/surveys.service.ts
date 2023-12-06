import { Injectable } from '@angular/core';
import {HttpBackend, HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable, of} from "rxjs";
import { QuestionBase } from '../interfaces/question-base';
import {Surveys} from '../moks/surveys';

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

  private apiUrl: string = "http://194.169.160.79:8080";
  private apiGetSurveys: string = this.apiUrl + '/surveys';
  private apiEditSurvey: string = "";
  private apiDeleteSurvey: string = this.apiUrl + "/survey";
  private apiPostSurvey: string = this.apiUrl + '/survey';

  // Patient
  private apiGetPatientSurveys: string = this.apiUrl + '/patient/surveys';

  constructor(private http: HttpClient) { }

  private surveys: any  = Surveys;

  getSurveys(): Observable<any> {
    return this.http.get(this.apiGetSurveys, {headers: this.headers});
  }

  postSurvey(data: any): Observable<any> {
    return this.http.post(this.apiPostSurvey, data, {headers: this.headers});
  }

  getSurvey(id: string): Observable<any> {
    return of(this.surveys.find((survey: any) => survey.id == id))
  }

  getSurveysPatient(): Observable<any> {
    return this.http.get(this.apiGetPatientSurveys);
  }

  editSurvey(data: any): Observable<any> {
    console.log('edit');
    return this.http.put(this.apiUrl + this.apiEditSurvey, data,
      {headers: this.headers}
    );
  }

  deleteSurvey(id: number){
    console.log('delete');
    return this.http.delete(this.apiUrl + this.apiDeleteSurvey + id, 
      {headers: this.headers})
  }
}
