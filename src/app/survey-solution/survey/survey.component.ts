import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  protected id!: string;
  @Input() takePartSurvey?: boolean = true;
  protected surveyForm!: FormGroup;
  protected survey: any = {};
  protected questions!: QuestionBase<string>[] | null;

  constructor(
    private activateRoute: ActivatedRoute, private surveysService: SurveysService, 
    private fb: FormBuilder, private qcs: QuestionControlService,
    private router: Router
  ) { }

  ngOnInit() {
    this.id = this.activateRoute.snapshot.params["id"];
    this.getSurvey();
    console.log(this.surveyForm.getRawValue())
  }

  get questionsFroms(): FormArray {
    return <FormArray> this.surveyForm.get('questions') as FormArray;
  }

  submit() {
    if(this.surveyForm.valid) {
      const data = this.surveyForm.getRawValue();
      console.log(data);
      this.postSurvey(data);
    }
    else
      console.log(this.surveyForm.valid)
  }

  getSurvey(): void {
    this.surveysService.getSurvey(this.id).subscribe(
      (data: any) => {
        this.survey = data;
        this.questions = data.questions;
        this.surveyForm = this.fb.group({
          id: [this.id, Validators.required],
          questions: this.qcs.toFormArray(this.questions as QuestionBase<string>[]) 
        });
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  postSurvey(data: any): void {
    this.surveysService.postSurveyPatient(data).subscribe(
      (data: any) => {
        console.log(data);
        this.router.navigate(['/']);
      },
      (err: any) => {
        console.log(err);
      }
    )
  }
}
