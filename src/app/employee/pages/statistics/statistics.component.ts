import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { SurveysService } from 'src/app/core/api/surveys.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit{
  protected curSurvey: any;
  protected surveys: any[] = [{questions: []}];
  protected questions: any;
  protected nameSurveys: [] = [];
  protected types: string[] = ['Средний балл', 'Динамика', 'Ответы участников'];
  protected departments: string[] = ['1', '2', '3'];
  protected statForm!: FormGroup;

  constructor(private surveysService: SurveysService) {}

  ngOnInit(): void {
    this.getSurveys();
    this.statForm = new FormGroup({
      nameSurvey: new FormControl(),
      type: new FormControl(this.types[0]),
      department: new FormControl(),
      dateStart: new FormControl(),
      dateFinish: new FormControl(),
    })
    this.formListener();
  }

  getSurveys(): void {
    this.surveysService.getSurveys().subscribe(
      (data: any) => {
        this.surveys = data;
        this.nameSurveys = data.map((survey: any) => survey.name);
        this.curSurvey = this.surveys[0];
      },
      (error: any) => {
        console.log(error);
      }
    );
  } 

  getSurvey(id: string): void {
    this.surveysService.getSurvey(id).subscribe(
      (data: any) => {
        this.questions = data.questions;
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  formListener(): void {
    this.statForm.valueChanges.subscribe((form: any) => {
      this.curSurvey = this.surveys.find((survey: any) => survey.name == form.nameSurvey);
      this.getSurvey(this.curSurvey.id)
    })
  }
}
