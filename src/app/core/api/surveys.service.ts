import { Injectable } from '@angular/core';
import {HttpBackend, HttpClient} from "@angular/common/http";
import {Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SurveysService {

  private apiUrl: string = "";
  private apiEditSurvey: string = "";
  private apiDeleteSurvey: string = "";

  constructor(private http: HttpClient) { }

  surveys = [
    { "id": 1, "name": "Название опроса"},
    { "id": 2, "name": "Опрос 2"},
    { "id": 3, "name": "Опрос 3"},
    { "id": 4, "name": "Опрос 4"}
  ];

  getSurveys(): Observable<any> {
    return of(this.surveys)
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
