import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SurveysService } from 'src/app/core/api/surveys.service';

@Component({
  selector: 'app-surveys',
  templateUrl: './surveys.component.html',
  styleUrls: ['./surveys.component.css']
})
export class SurveysComponent implements OnInit{
  protected searchText: string = '';
  protected surveys: [] = [];

  constructor(private router: Router, private surveysService: SurveysService) {}

  ngOnInit(): void {
    this.getSurveys();
  }

  getSurveys(): void {
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

  contSubstring(survey: any): boolean {
    const name = survey.name.toLowerCase();
    return name.indexOf(this.searchText) >= 0;
  }

  applySearch(value: string): void{
    this.searchText = value.toLowerCase();
    console.log(this.searchText);
  }

  selectSurvey(id: number) {
    this.router.navigate(
      ['/employee/main/details/', id],
    );
  }
}
