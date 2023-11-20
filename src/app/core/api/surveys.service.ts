import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SurveysService {

  private apiUrl: string = "";

  constructor(private http: HttpClient) { }

  surveys = [
    { "id": 1, "name": "Опрос 1"},
    { "id": 2, "name": "Опрос 2"}
  ];

  getSurveys(): Observable<any> {
    return of(this.surveys)
  }
}
