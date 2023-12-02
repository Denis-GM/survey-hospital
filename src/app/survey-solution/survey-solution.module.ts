import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SurveySolutionComponent } from './survey/survey.component';
import { SurveysService } from '../core/api/surveys.service';
import { QuestionComponent } from './question/question.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    SurveySolutionComponent,
    QuestionComponent,
  ],
  providers: [
    SurveysService
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
  ],
  exports: [
    SurveySolutionComponent,
  ]
})
export class SurveySolutionModule { }
