import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { StatisticsService } from 'src/app/core/api/statistics.service';
import { SurveysService } from 'src/app/core/api/surveys.service';
import { ISurveyGet } from 'src/app/core/interfaces/ISurvey';
import { ModalWindowControlService } from 'src/app/core/services/modal-window-control.service';

@Component({
  selector: 'app-surveys',
  templateUrl: './surveys.component.html',
  styleUrls: ['./surveys.component.css', './survey-block.component.css']
})
export class SurveysComponent implements OnInit, OnDestroy {
  // private url: string = 'http://localhost:4200/fill/';
  private url: string = 'https://survey-manager.ru/fill/';
  protected searchText: string = '';
  protected surveyLink: string = '';
  protected surveys: ISurveyGet[] = [];
  protected stateModal = false;
  protected role: number;
  
  constructor(
    private router: Router, private surveysService: SurveysService,
    private mwControl: ModalWindowControlService, private surveyService: SurveysService,
    private statisticsService: StatisticsService) {
      this.role = (localStorage.getItem('role') || 3) as number;
    }

  ngOnInit(): void {
    if(this.role != 3){
      this.getSurveysAdmin();
    }
    else {
      this.getSurveysAnalyst();
    }
  }
  
  ngOnDestroy(): void {
    this.surveys = [];
  }

  protected openDialog(id: string) {
    this.stateModal = true;
    this.surveyLink = this.url + id;
  }

  protected manageDialog(isOpen: boolean) {
    this.stateModal = false;
  }

  getSurveysAdmin(): void {
    this.surveysService.getSurveysAdmin().subscribe(
      (data: any) => {
        console.log(data);
        this.surveys = data;
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  getSurveysAnalyst(): void {
    this.surveysService.getSurveysAnalyst().subscribe(
      (data: any) => {
        console.log(data);
        this.surveys = data;
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  openStatsSurvey(id: string) {
    this.statisticsService.currentSurveyId = id;
    this.router.navigate(['/main/statistics'])
  }

  deleteSurvey(id: string): void {
    if(confirm("Удалить данный опрос?")){
      this.surveyService.deleteSurvey(id)
        .subscribe(
          (res: any) => {
            console.log(res);
            this.getSurveysAdmin();
          },
          (error: any) => {
            console.log(error);
          }
        )
    }
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
