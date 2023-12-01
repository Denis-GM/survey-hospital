import { Injectable } from '@angular/core';
import {HttpBackend, HttpClient} from "@angular/common/http";
import {Observable, of} from "rxjs";
import { QuestionBase } from '../interfaces/question-base';
import {Surveys} from '../../moks/surveys';

@Injectable({
  providedIn: 'root'
})
export class SurveysService {

  private apiUrl: string = "";
  private apiEditSurvey: string = "";
  private apiDeleteSurvey: string = "";

  constructor(private http: HttpClient) { }

  private surveys: any  = Surveys;

  getSurveys(): Observable<any> {
    // return this.http.get('../../moks/surveys.json');
    return of(this.surveys)
  }

  getSurvey(id: string): Observable<any> {
    return of(this.surveys.find((survey: any) => survey.id == id))
  }

  editSurvey(data: any): Observable<any> {
    console.log('edit');
    return this.http.put(this.apiUrl + this.apiEditSurvey, data,
      // {headers: this.headers}
    );
  }

  deleteSurvey(id: number){
    console.log('delete');
    return this.http.delete(this.apiUrl + this.apiDeleteSurvey + id)
  }
}
