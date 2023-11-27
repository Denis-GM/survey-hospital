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

  constructor(
    private activateRoute: ActivatedRoute, 
    private surveysService: SurveysService,
    private fb: FormBuilder) {
    this.id = activateRoute.snapshot.params["id"];
  }

  ngOnInit() {
    console.log(this.id);
    this.getSurvey(this.id);
  }

  get answers() {
    return this.fb.group({
      idQuestion: ['', Validators.required],
      options: [ 
        this.fb.array([]) 
      ]
    });
  }
  
  surveyForm = this.fb.group({
    id: ['', Validators.required],
    answers: [
      this.fb.array([this.answers])
    ]
  });

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
