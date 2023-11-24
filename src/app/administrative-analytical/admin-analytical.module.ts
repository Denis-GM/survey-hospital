import { NgModule, forwardRef } from '@angular/core';
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

import {FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule} from '@angular/forms';
import {TuiDataListWrapperModule, TuiInputModule, TuiRadioModule, TuiSelectModule, TuiTextareaModule} from '@taiga-ui/kit';
import { TuiDataListModule, TuiTextfieldControllerModule } from '@taiga-ui/core';
import { QuestionComponent } from './components/question/question.component';
import { OptionComponent } from './components/option/option.component';

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
    QuestionComponent,
    OptionComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    ReactiveFormsModule,
    FormsModule,

    TuiInputModule,
    TuiTextareaModule,
    TuiDataListModule,
    TuiDataListWrapperModule,
    TuiSelectModule,
    TuiTextfieldControllerModule,
    TuiRadioModule
  ],
  providers: [SurveysService],
  exports: [RouterModule]
})
export class AdminAnalyticalModule { }
