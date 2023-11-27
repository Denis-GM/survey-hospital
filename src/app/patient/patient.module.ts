import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterModule, Routes } from '@angular/router';
import { MainPatientComponent } from './pages/main-patient/main-patient.component';
import { SurveysService } from '../core/api/surveys.service';

const routes: Routes = [
  { path: '', component: MainPatientComponent },
]

@NgModule({
  declarations: [
    MainPatientComponent
  ],
  providers: [
    SurveysService,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule,
  ]
})
export class PatientModule { }
