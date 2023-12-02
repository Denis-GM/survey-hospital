import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterModule, Routes } from '@angular/router';
import { MainPatientComponent } from './pages/main-patient/main-patient.component';
import { SurveysService } from '../core/api/surveys.service';
import { PassingSurveyComponent } from './pages/passing-survey/passing-survey.component';
import { SurveySolutionModule } from '../survey-solution/survey-solution.module';
import { SurveySolutionComponent } from '../survey-solution/pages/survey-solution/survey-solution.component';

const routes: Routes = [
  { path: '', component: MainPatientComponent },
  { path: 'fill/survey/:id', component: PassingSurveyComponent, }
]

@NgModule({
  declarations: [
    MainPatientComponent,
    PassingSurveyComponent,
  ],
  providers: [
    SurveysService,
  ],
  imports: [
    CommonModule,
    SurveySolutionModule,
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule,
  ]
})
export class PatientModule { }
