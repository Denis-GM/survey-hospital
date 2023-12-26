import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterModule, Routes } from '@angular/router';
import { MainPatientComponent } from './pages/main-patient/main-patient.component';
import { SurveysService } from '../core/api/surveys.service';
import { PassingSurveyComponent } from './pages/passing-survey/passing-survey.component';
import { SurveySolutionModule } from '../survey-solution/survey-solution.module';
import {TuiMobileDialogModule} from '@taiga-ui/addon-mobile';
import { SharedModule } from '../shared/shared.module';
import { QRCodeModule } from 'angularx-qrcode';

const routes: Routes = [
  { path: '', component: MainPatientComponent },
  { path: 'fill/:id', component: PassingSurveyComponent, }
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
    TuiMobileDialogModule,
    SharedModule,
    QRCodeModule,
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule,
  ]
})
export class PatientModule { }
