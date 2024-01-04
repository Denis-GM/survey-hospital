import { Component, HostListener, OnInit } from '@angular/core';
import { TuiMobileDialogService } from '@taiga-ui/addon-mobile';
import { TuiAlertService } from '@taiga-ui/core';
import { ClipboardService } from 'ngx-clipboard';
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
  private html:string ="<p style='color:red'>String with color:red </p><a href='https://google.com'>google.com</a><script>alert('aa')</script>"

  constructor(private surveysService: SurveysService, 
    private readonly dialogs: TuiMobileDialogService,
    private readonly alerts: TuiAlertService, 
    private clipboardService: ClipboardService) {}

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
    const actions = ['Закрыть', 'Скопировать'];

    // if(this.getScreenWidth >= 900) {
      console.log(this.getScreenWidth)
      this.openDialog(id);
    // }
    // else {
    //   const link = this.url + id
    //   this.dialogs
    //     .open(
    //         `${link}`,
    //         {
    //             label: 'Ссылка на опрос',
    //             actions,
    //             data: ''
    //         },
    //     )
    //     .pipe(switchMap(index => (
    //       if(true) this.clipboardService.copyFromContent(link);
    //       // index == 1 ? this.alerts.open(`Ссылка скопирована`) : '' 
    //     )))
    //     .subscribe( 
    //     );
    // }
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
