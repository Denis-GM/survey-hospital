import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SurveySolutionComponent } from './pages/survey-solution/survey-solution.component';

const routes: Routes = [
  { path: '', component: SurveySolutionComponent, }
]

@NgModule({
  declarations: [
    SurveySolutionComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule
  ]
})
export class SurveySolutionModule { }
