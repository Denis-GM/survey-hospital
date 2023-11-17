import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { SurveysComponent } from './pages/surveys/surveys.component';
import { CreateSurveysComponent } from './pages/create-survey/create-surveys.component';
import { DetailsSurveyComponent } from './pages/details-survey/details-survey.component';
import { StatisticsComponent } from './pages/statistics/statistics.component';



@NgModule({
  declarations: [
    SurveysComponent,
    CreateSurveysComponent,
    DetailsSurveyComponent,
    StatisticsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
  ]
})
export class AdminAnalyticalModule { }
