import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SurveysService } from 'src/app/core/api/surveys.service';
import { FormArray, Validators, FormBuilder, FormControl, FormGroup } from '@angular/forms'
import { QuestionControlService } from 'src/app/core/services/question-control.service';
import { QuestionBase, SurveyBase } from 'src/app/core/interfaces/question-base';

@Component({
  selector: 'app-survey-solution',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.css']
})
export class SurveySolutionComponent implements OnInit {
  protected id!: number;
  @Input() takePartSurvey?: boolean = true;
  protected survey: any = {};
  protected surveyForm!: FormGroup;
  protected questions!: QuestionBase<string>[] | null;

  constructor(
    private activateRoute: ActivatedRoute, private surveysService: SurveysService, 
    private fb: FormBuilder, private qcs: QuestionControlService
  ) { }

  ngOnInit() {
    this.id = this.activateRoute.snapshot.params["id"];
    this.getSurvey(this.id + '');
    console.log(this.questions);
    this.surveyForm = this.fb.group({
      id: [this.id, Validators.required],
      questions: this.qcs.toFormArray(this.questions as QuestionBase<string>[]) 
    });
  }

  get questionsFroms(): FormArray {
    return <FormArray> this.surveyForm.get('questions') as FormArray;
  }

  submit() {
    if(this.surveyForm.valid)
      console.log(this.surveyForm.value);
    else
      console.log(this.surveyForm.valid)
  }

  getSurvey(id: string): void {
    this.surveysService.getSurvey(id).subscribe(
      (data: any) => {
        this.survey = data;
        this.questions = data.questions;
      },
      (error: any) => {
        console.log(error);
      }
    );
  }
}
