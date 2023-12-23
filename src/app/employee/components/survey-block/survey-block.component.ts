import { Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { SurveysService } from 'src/app/core/api/surveys.service';
import { ISurveyGet } from 'src/app/core/interfaces/ISurvey';
import { ModalWindowControlService } from 'src/app/core/services/modal-window-control.service';

@Component({
  selector: 'app-survey-block',
  templateUrl: './survey-block.component.html',
  styleUrls: ['./survey-block.component.css']
})
export class SurveyBlockComponent implements OnInit{
  @Input() survey!: ISurveyGet;
  private url: string = 'http://localhost:4200/patient/fill/'
  @Output() link = new EventEmitter<string>();

  constructor(
    private surveyService: SurveysService, private mwControl: ModalWindowControlService) {}

  ngOnInit(): void {
    console.log(this.survey);
    this.link.emit(this.url + this.survey.id)
  }

  showDialog(id: string) {

  }

  deleteSurvey(): void {
    this.surveyService.deleteSurvey(this.survey.id)
    .subscribe(
      (res: any) => {
        console.log(res)
      },
      (error: any) => {
        console.log(error)
      }
    )
  }
}
