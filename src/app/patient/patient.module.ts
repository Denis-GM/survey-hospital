import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MainPatientComponent } from './pages/main-patient/main-patient.component';

const routes: Routes = [
  { path: '', component: MainPatientComponent, },
]

@NgModule({
  declarations: [
    MainPatientComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    // MainPatientComponent,
    RouterModule,
  ]
})
export class PatientModule { }
