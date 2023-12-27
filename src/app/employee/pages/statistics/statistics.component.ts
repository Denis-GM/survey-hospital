import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { TuiContextWithImplicit, TuiDay, TuiDayRange, TuiStringHandler, tuiPure } from '@taiga-ui/cdk';
import { StatisticsService } from 'src/app/core/api/statistics.service';
import { SurveysService } from 'src/app/core/api/surveys.service';

interface Survey {
    id: string,
    name: string,
    description: string,
}

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatisticsComponent implements OnInit{
    protected curSurvey: any = {};
    protected surveys: Survey[] = [];
    protected questions: any;
    protected types: string[] = ['Средний балл', 'Динамика', 'Ответы участников'];
    protected departments: string[] = ['1', '2', '3'];
    protected statForm!: FormGroup;
    protected role: number;
    protected message: string = '';
    
    constructor(private surveysService: SurveysService, 
        private statisticsService: StatisticsService, private cdr: ChangeDetectorRef) {
        this.role = (localStorage.getItem('role') || 3) as number;
    }

    ngOnInit(): void {
        if(this.role != 3) {
            this.getSurveysAdmin();
        }
        else {
            this.getSurveysAnalyst();
        }
        this.statForm = new FormGroup({
            nameSurvey: new FormControl(this.surveys[0]),
            type: new FormControl(this.types[0]),
            department: new FormControl(),
            dateValue: new FormControl(
                new TuiDayRange(new TuiDay(2023, 11, 1), new TuiDay(2023, 11, 18)),
            ),
        })
        this.formListener();
        this.getCurrentSurveyId();
        // this.getSurvey(this.curSurvey.id)
    }

    readonly min = new TuiDay(2000, 2, 20);
    readonly max = new TuiDay(2060, 2, 20);

    stringify(items: readonly Survey[]): TuiStringHandler<TuiContextWithImplicit<string>> {
        const map = new Map(items.map(({id, name, description}) => [id, name] as [string, string]));
        return ({$implicit}: TuiContextWithImplicit<string>) => map.get($implicit) || '';
    }

    getSurveysAdmin(): void {
        this.surveysService.getSurveysAdmin().subscribe(
            (data: any) => {
                this.surveys = data;
                this.curSurvey = this.surveys[0];
                console.log(data);
            },
            (error: any) => {
                console.log(error);
            }
        );
    } 

    getSurveysAnalyst(): void {
        this.surveysService.getSurveysAnalyst().subscribe(
            (data: any) => {
                this.surveys = data;
                this.curSurvey = this.surveys[0];
                console.log(data);
            },
            (error: any) => {
                console.log(error);
            }
        );
    } 

    getSurvey(id: string): void {
        this.surveysService.getSurvey(id).subscribe(
            (data: any) => {
                console.log(data);
                // this.statForm.setValue(data.name);
                this.questions = data.questions;
            },
            (error: any) => {
                console.log(error);
            }
        );
    }

    getCurrentSurveyId(): void {
        this.statisticsService.getCurrentSurveyId().subscribe(
            (data: any) => {
                this.curSurvey.id = data;
                const date: TuiDayRange = this.statForm.get('dateValue')?.value;
                const from = `${date.from.month + 1}.${date.from.day}.${date.from.year % 100}`;
                const to = `${date.to.month + 1}.${date.to.day}.${date.to.year % 100}`;
                this.getStats(from, to, data);
            },
            (error: any) => {
                console.log(error);
            }
        );
    }

    getStats(from: string, to: string, surveyId: string) {
        this.statisticsService.getStats(from, to, surveyId).subscribe(
            (data: any) => {
                if(data) {
                    this.message = '';
                    this.questions = data.questions;
                    console.log('stats', data);
                    console.log('questions', this.questions);
                    this.cdr.detectChanges();
                }
                else
                    this.message = 'Статистика еще не сформировалась'
            },
            (error: any) => {
                console.log(error);
            }
        );
    }

    formListener(): void {
        this.statForm.valueChanges.subscribe((form: any) => {
            // this.curSurvey = this.surveys.find((survey: any) => survey.name == form.nameSurvey);
            const date: TuiDayRange = form.dateValue;
            const from = `${date.from.month + 1}.${date.from.day}.${date.from.year % 100}`;
            const to = `${date.to.month + 1}.${date.to.day}.${date.to.year % 100}`;

            const idSurvey = form.nameSurvey || this.curSurvey.id;
            this.getStats(from, to, idSurvey);
        })
    }
}
