import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { SurveysComponent } from './pages/surveys/surveys.component';
import { CreateSurveysComponent } from './pages/create-survey/create-surveys.component';
import { DetailsSurveyComponent } from './pages/details-survey/details-survey.component';
import { StatisticsComponent } from './pages/statistics/statistics.component';
import { Route, Router, RouterModule, Routes } from '@angular/router';
import { MainComponent } from './pages/main/main.component';
import { SurveyBlockComponent } from './components/survey-block/survey-block.component';
import { SurveysService } from '../core/api/surveys.service';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TuiInputModule, TuiTextareaModule} from '@taiga-ui/kit';

const routes: Routes = [
  { path: '', component: MainComponent, 
    children: [
      { path: 'surveys', component: SurveysComponent},
      { path: 'details/:id', component: DetailsSurveyComponent },
      { path: 'cteate-survey', component: CreateSurveysComponent },
      { path: 'statistics', component: StatisticsComponent },
      { path: '**', component: SurveysComponent }
    ]
  }
]

@NgModule({
  declarations: [
    SurveysComponent,
    CreateSurveysComponent,
    DetailsSurveyComponent,
    StatisticsComponent,
    MainComponent,
    SurveyBlockComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    ReactiveFormsModule,
    TuiInputModule,
    TuiTextareaModule,
    FormsModule,
  ],
  providers: [SurveysService],
  exports: [RouterModule]
})
export class AdminAnalyticalModule { }
