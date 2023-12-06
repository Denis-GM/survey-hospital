import { Component, OnInit } from '@angular/core';
import { SurveysService } from 'src/app/core/api/surveys.service';

@Component({
  selector: 'app-main-patient',
  templateUrl: './main-patient.component.html',
  styleUrls: ['./main-patient.component.css']
})
export class MainPatientComponent implements OnInit{
  protected surveys: any[] = [];

  constructor(private surveysService: SurveysService) {}

  ngOnInit(): void {
    this.getSurveysPatient();
  }

  getSurveysPatient(): void {
    this.surveysService.getSurveys().subscribe(
      (data: any) => {
        console.log(data);
        this.surveys = data;
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

}
