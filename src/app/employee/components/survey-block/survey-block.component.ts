import { Component, Input, OnInit} from '@angular/core';
import { SurveysService } from 'src/app/core/api/surveys.service';
import { ModalWindowControlService } from 'src/app/core/services/modal-window-control.service';

@Component({
  selector: 'app-survey-block',
  templateUrl: './survey-block.component.html',
  styleUrls: ['./survey-block.component.css']
})
export class SurveyBlockComponent implements OnInit{
  @Input() survey: any = {};

  constructor(
    private surveyService: SurveysService, private mwControl: ModalWindowControlService) {}

  ngOnInit(): void {
    console.log(this.survey);
  }

  showDialog(id: string) {
    this.mwControl.emitStateModalWindowLink(true, id)
    console.log(this.mwControl.emitStateModalWindowLink);
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
