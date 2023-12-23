import { Component, EventEmitter, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SurveysService } from 'src/app/core/api/surveys.service';
import { ModalWindowControlService } from 'src/app/core/services/modal-window-control.service';

@Component({
  selector: 'app-surveys',
  templateUrl: './surveys.component.html',
  styleUrls: ['./surveys.component.css']
})
export class SurveysComponent implements OnInit{
  protected searchText: string = '';
  protected surveys: [] = [];
  protected stateModal = false;
  protected isOpen: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(
    private router: Router, private surveysService: SurveysService,
    private mwControl: ModalWindowControlService) {}

  ngOnInit(): void {
    this.getSurveys();
    this.getStateModalWindow();
  }

  protected openDialog() {
    this.stateModal = true;
  }

  protected manageDialog(isOpen: boolean) {
    this.stateModal = false;
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

  getStateModalWindow() {
    this.mwControl.getStateModalWindow().subscribe(
      (data: boolean) => {
        this.isOpen.emit(data);
        console.log(data);
      },
      (err: any) => {
        console.log(err);
      }
    )
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
