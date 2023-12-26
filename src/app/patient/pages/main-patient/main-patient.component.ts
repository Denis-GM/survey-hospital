import { Component, HostListener, OnInit } from '@angular/core';
import { TuiMobileDialogService } from '@taiga-ui/addon-mobile';
import { TuiAlertService } from '@taiga-ui/core';
import { switchMap } from 'rxjs';
import { SurveysService } from 'src/app/core/api/surveys.service';

@Component({
  selector: 'app-main-patient',
  templateUrl: './main-patient.component.html',
  styleUrls: ['./main-patient.component.css']
})
export class MainPatientComponent implements OnInit{
  private url: string = 'https://survey-manager.ru/fill/';
  protected surveys: any[] = [];
  public getScreenWidth!: number;
  public getScreenHeight!: number;
  protected surveyLink: string = '';
  protected stateModal = false;

  constructor(private surveysService: SurveysService, 
    private readonly dialogs: TuiMobileDialogService,
    private readonly alerts: TuiAlertService,) {}

  ngOnInit(): void {
    this.getSurveysPatient();
    this.getScreenWidth = window.innerWidth;
    this.getScreenHeight = window.innerHeight;
    console.log(this.getScreenWidth)
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    this.getScreenWidth = window.innerWidth;
    this.getScreenHeight = window.innerHeight;
  }
  
  showDialog(id: string): void {
    const actions = ['No thanks', 'Remind me later', 'Rate now'];

    if(this.getScreenWidth >= 900) {
      console.log(this.getScreenWidth)
      this.openDialog(id);
    }
    else {
      this.dialogs
        .open(
            'If you like this app, please take a moment to leave a positive rating.',
            {
                label: 'What do you think?',
                actions,
            },
        )
        .pipe(switchMap(index => this.alerts.open(`Selected: ${actions[index]}`)))
        .subscribe();
    }
  }

  protected openDialog(id: string) {
    this.stateModal = true;
    this.surveyLink = this.url + id;
  }

  protected manageDialog(isOpen: boolean) {
    this.stateModal = false;
  }

  getSurveysPatient(): void {
    this.surveysService.getSurveysPatient().subscribe(
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
