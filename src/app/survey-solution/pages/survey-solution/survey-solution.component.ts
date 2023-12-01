import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SurveysService } from 'src/app/core/api/surveys.service';
import { FormArray, Validators, FormBuilder, FormControl, FormGroup } from '@angular/forms'

@Component({
  selector: 'app-survey-solution',
  templateUrl: './survey-solution.component.html',
  styleUrls: ['./survey-solution.component.css']
})
export class SurveySolutionComponent implements OnInit {
  protected id: number;
  protected survey: any = {};
  protected surveyForm: FormGroup;

  constructor(
    private activateRoute: ActivatedRoute, 
    private surveysService: SurveysService, 
    private fb: FormBuilder) {
    this.id = activateRoute.snapshot.params["id"];
    this.surveyForm = this.fb.group({
      id: [this.id, Validators.required],
      questions: [
        this.fb.array([])
      ]
    });
  }

  ngOnInit() {
    console.log(this.id);
    this.getSurvey(this.id);
  }

  get questions() {
    return this.surveyForm.get('questions') as FormArray;
  }

  get questionGroup() {
    const questionGroup = this.fb.group({
      id: ['', Validators.required],
      textAnswer: [''],
      rangeValue: [0],
      selectedOptions: [ 
        this.fb.array([]) 
      ]
    })
    // this.questions.push(questionGroup);
    return questionGroup;
  }

  submit() {
    console.log(this.surveyForm.value);
  }

  getSurvey(id: number): void {
    this.surveysService.getSurvey(id).subscribe(
      (data: any) => {
        console.log(data);
        this.survey = data;
      },
      (error: any) => {
        console.log(error);
      }
    );
  }
}
