import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SurveysService } from 'src/app/core/api/surveys.service';
import { FormArray, Validators, FormBuilder, FormControl, FormGroup } from '@angular/forms'
import { QuestionControlService } from 'src/app/core/api/survey-solution/question-control.service';
import { QuestionBase, SurveyBase } from 'src/app/core/interfaces/question-base';

@Component({
  selector: 'app-survey-solution',
  templateUrl: './survey-solution.component.html',
  styleUrls: ['./survey-solution.component.css']
})
export class SurveySolutionComponent implements OnInit {
  protected id!: number;
  protected survey: any = {};
  protected surveyForm!: FormGroup;
  protected questionForm!: FormArray<any>;
  protected questions!: QuestionBase<string>[] | null;

  constructor(
    private activateRoute: ActivatedRoute, private surveysService: SurveysService, 
    private fb: FormBuilder, private qcs: QuestionControlService
  ) { }

  ngOnInit() {
    this.id = this.activateRoute.snapshot.params["id"];
    this.getSurvey(this.id + '');
    this.questionForm = this.qcs.toFormArray(this.questions as QuestionBase<string>[]);
    this.surveyForm = this.fb.group({
      id: [this.id, Validators.required],
      questions: this.qcs.toFormArray(this.questions as QuestionBase<string>[]) 
    });
    // console.log(this.questions);
    console.log(this.surveyForm);
  }

  get questionsFroms(): FormArray {
    return <FormArray> this.surveyForm.get('questions') as FormArray;
  }
  
  submit() {
    console.log(this.surveyForm.value);
  }

  getSurvey(id: string): void {
    this.surveysService.getSurvey(id).subscribe(
      (data: any) => {
        // console.log(data);
        this.survey = data;
        // this.surveyForm.get('id')!.setValue(this.id);
        this.questions = data.questions;
      },
      (error: any) => {
        console.log(error);
      }
    );
  }
}
