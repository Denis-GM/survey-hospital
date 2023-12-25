import { Component } from '@angular/core';
import {Location} from '@angular/common';

@Component({
  selector: 'app-details-survey',
  templateUrl: './details-survey.component.html',
  styleUrls: ['./details-survey.component.css']
})
export class DetailsSurveyComponent {
  constructor(private location: Location) {}

  comeBack() {
    this.location.back();
  }
}
