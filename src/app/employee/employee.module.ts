import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { SurveysComponent } from './pages/surveys/surveys.component';
import { CreateSurveysComponent } from './pages/create-survey/create-surveys.component';
import { DetailsSurveyComponent } from './pages/details-survey/details-survey.component';
import { StatisticsComponent } from './pages/statistics/statistics.component';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './main-page/main.component';
import { SurveyBlockComponent } from './components/survey-block/survey-block.component';
import { SurveysService } from '../core/api/surveys.service';

import {FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule} from '@angular/forms';
import {TuiDataListWrapperModule, TuiInputDateModule, TuiInputModule, TuiRadioModule, TuiSelectModule, TuiTextareaModule, TuiToggleModule} from '@taiga-ui/kit';
import { TUI_SANITIZER, TuiDataListModule, TuiLoaderModule, TuiTextfieldControllerModule } from '@taiga-ui/core';
import { QuestionComponent } from './components/question/question.component';
import { OptionComponent } from './components/option/option.component';
import { SurveySolutionModule } from '../survey-solution/survey-solution.module';
import { ProfileComponent } from './pages/profile/profile.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { ModalWindowControlService } from '../core/services/modal-window-control.service';
import { NgDompurifySanitizer } from '@tinkoff/ng-dompurify';
import {TuiLetModule} from '@taiga-ui/cdk';
import {TuiInputDateRangeModule} from '@taiga-ui/kit';

import { BarChartComponent } from './pages/statistics/components/bar-chart/bar-chart.component';
import { PieChartComponent } from './pages/statistics/components/pie-chart/pie-chart.component';
import { StatBlockComponent } from './pages/statistics/components/stat-block/stat-block.component';
import { NgxPermissionsModule } from 'ngx-permissions';
import { EditSurveyComponent } from './pages/edit-survey/edit-survey.component';
import { AverageStatComponent } from './pages/statistics/average-stat/average-stat.component';
import { StatBlockTextComponent } from './pages/statistics/stat-block-text/stat-block-text.component';
import { DynamicStatComponent } from './pages/statistics/dynamic-stat/dynamic-stat.component';

const routes: Routes = [
  { path: '', component: MainPageComponent, 
    children: [
      { path: 'surveys', component: SurveysComponent},
      { path: 'details/:id', component: DetailsSurveyComponent },
      { path: 'create-survey', component: CreateSurveysComponent },
      { path: 'edit-survey/:id', component: EditSurveyComponent },
      { path: 'statistics', component: StatisticsComponent },
      { path: 'statistics/:id', component: StatisticsComponent },
      { path: 'profile', component: ProfileComponent },
      { path: '**', component: SurveysComponent }
    ]
  }
]

@NgModule({
  declarations: [
    NavBarComponent,
    SurveysComponent,
    CreateSurveysComponent,
    DetailsSurveyComponent,
    StatisticsComponent,
    MainPageComponent,
    SurveyBlockComponent,
    QuestionComponent,
    OptionComponent,
    ProfileComponent,
    BarChartComponent,
    PieChartComponent,
    StatBlockComponent,
    EditSurveyComponent,
    AverageStatComponent,
    StatBlockTextComponent,
    DynamicStatComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    SurveySolutionModule,
    TuiLoaderModule,

    TuiInputModule,
    TuiTextareaModule,
    TuiDataListModule,
    TuiDataListWrapperModule,
    TuiSelectModule,
    TuiTextfieldControllerModule,
    TuiRadioModule,
    TuiToggleModule,
    TuiLetModule,
    TuiInputDateModule,
    TuiInputDateRangeModule,
    
    NgxPermissionsModule.forChild()
  ],
  providers: [
    SurveysService,
    ModalWindowControlService,
    {
      provide: TUI_SANITIZER,
      useClass: NgDompurifySanitizer,
    },
  ],
  exports: [RouterModule]
})
export class AdminAnalyticalModule { }
