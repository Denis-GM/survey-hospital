import { Component, Input, OnInit } from '@angular/core';
import { SurveysService } from 'src/app/core/api/surveys.service';

@Component({
  selector: 'app-survey-block',
  templateUrl: './survey-block.component.html',
  styleUrls: ['./survey-block.component.css']
})
export class SurveyBlockComponent implements OnInit{
  @Input() survey: any = {};

  constructor(private surveyService: SurveysService) {}

  ngOnInit(): void {
    console.log(this.survey);
  }

  deleteSurvey(): void {
    this.surveyService.deleteSurvey(this.survey.id)
    .subscribe(
      (res: any) => {
        console.log(res)
      },
      (error: any) => {
        console.log(error)
      }
    )
  }
}
