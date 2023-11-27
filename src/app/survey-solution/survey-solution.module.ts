import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SurveySolutionComponent } from './pages/survey-solution/survey-solution.component';
import { SurveysService } from '../core/api/surveys.service';
import { QuestionComponent } from './components/question/question.component';

const routes: Routes = [
  { path: 'survey/:id', component: SurveySolutionComponent, }
]

@NgModule({
  declarations: [
    SurveySolutionComponent,
    QuestionComponent
  ],
  providers: [
    SurveysService
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
