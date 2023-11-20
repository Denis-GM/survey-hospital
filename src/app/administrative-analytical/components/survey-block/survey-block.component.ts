import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-survey-block',
  templateUrl: './survey-block.component.html',
  styleUrls: ['./survey-block.component.css']
})
export class SurveyBlockComponent implements OnInit{
  @Input() survey: any = {};

  ngOnInit(): void {
    console.log(this.survey);
  }
}
