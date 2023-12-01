import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { SurveysService } from 'src/app/core/api/surveys.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit{
  protected items: [] = [];

  constructor(private surveysService: SurveysService) {}

  ngOnInit(): void {
    this.getSurveys();
  }

  getSurveys() {
    this.surveysService.getSurveys().subscribe(
      (data: any) => {
        //Вытащить данные в форме   
        this.items = data.name
        console.log(data)
      },
      (err: any) => {
        console.log(err)
      }
    )
  }

  // items = [
  //   'Luke Skywalker',
  //   'Leia Organa Solo',
  //   'Darth Vader',
  //   'Han Solo',
  //   'Obi-Wan Kenobi',
  //   'Yoda',
  // ];

  testValue = new FormControl();  
}
