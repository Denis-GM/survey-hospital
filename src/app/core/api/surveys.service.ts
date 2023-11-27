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
    { "id": 1, "name": "Название опроса №1", "descriptions": "Описание",
      "questions": [
        { 
          "type": "Один ответ", "questionText": "Вопрос №1", "isRequired": true,  
          "options": [1, 2, 3, 4, 5 ]    
        },
        { 
          "type": "Множественный ответ", "questionText": "Вопрос №2", "isRequired": true,  
          "options": [1, 2, 3, 4, 5 ]    
        },
        { 
          "type": "Один ответ", "questionText": "Вопрос №3", "isRequired": true,  
          "options": [3, 4, 5 ]    
        },
        {
          "type": "Вписать ответ", "questionText": "Вопрос №3", "isRequired": true,  
          "options": []
        }
      ]
    },
    { "id": 2, "name": "Название опроса №2", "descriptions": "Описание",
      "questions": [
        { "type": "Один ответ", "questionText": "Вопрос №2", "isRequired": true,  
          "options": [1, 2, 3, 4, 5 ]    
        }
      ]
    },
    { "id": 3, "name": "Название опроса №3", "descriptions": "Описание",
      "questions": [
        { "type": "Один ответ", "questionText": "Вопрос №3", "isRequired": true,  
          "options": [1, 2, 3, 4, 5 ]    
        }
      ]
    },
    { "id": 4, "name": "Название опроса №4", "descriptions": "Описание",
      "questions": [
        { "type": "Один ответ", "questionText": "Вопрос №4", "isRequired": true,  
          "options": [1, 2, 3, 4, 5 ]    
        }
      ]
    },
  ];

  getSurveys(): Observable<any> {
    return of(this.surveys)
  }

  getSurvey(id: number): Observable<any> {
    return of(this.surveys.find(survey => survey.id == id))
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
