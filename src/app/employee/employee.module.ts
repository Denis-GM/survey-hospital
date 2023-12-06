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
import {TuiDataListWrapperModule, TuiInputModule, TuiRadioModule, TuiSelectModule, TuiTextareaModule, TuiToggleModule} from '@taiga-ui/kit';
import { TUI_SANITIZER, TuiDataListModule, TuiTextfieldControllerModule } from '@taiga-ui/core';
import { QuestionComponent } from './components/question/question.component';
import { OptionComponent } from './components/option/option.component';
import { SurveySolutionModule } from '../survey-solution/survey-solution.module';
import { ProfileComponent } from './pages/profile/profile.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { ModalWindowControlService } from '../core/services/modal-window-control.service';
import { NgDompurifySanitizer } from '@tinkoff/ng-dompurify';
import {TuiLetModule} from '@taiga-ui/cdk';

const routes: Routes = [
  { path: '', component: MainPageComponent, 
    children: [
      { path: 'surveys', component: SurveysComponent},
      { path: 'details/:id', component: DetailsSurveyComponent },
      { path: 'cteate-survey', component: CreateSurveysComponent },
      { path: 'statistics', component: StatisticsComponent },
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
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    SurveySolutionModule,

    TuiInputModule,
    TuiTextareaModule,
    TuiDataListModule,
    TuiDataListWrapperModule,
    TuiSelectModule,
    TuiTextfieldControllerModule,
    TuiRadioModule,
    TuiToggleModule,
    TuiLetModule
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
