import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { TuiContextWithImplicit, TuiDay, TuiDayRange, TuiStringHandler, tuiPure } from '@taiga-ui/cdk';
import { StatisticsService } from 'src/app/core/api/statistics.service';
import { SurveysService } from 'src/app/core/api/surveys.service';
import { Subscription } from 'rxjs';

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
export class StatisticsComponent implements OnInit, OnDestroy{
    protected curSurvey: any = {};
    protected surveys: Survey[] = [];
    protected questionsAll: any;
    protected questionsAverageFirst: any;
    protected questionsAverageSecond: any;
    protected types: string[] = ['Средний балл', 'Динамика', 'Ответы участников'];
    protected type!: string;
    protected departments: string[] = ['Поликлиника'];
    protected statForm!: FormGroup;
    protected role: number;

    protected uploadedSuccess: boolean = false;
    protected message: string = '';

    value = this.curSurvey.id;
    private subscriptionFirst!: Subscription;
    private subscriptionSecond!: Subscription;
    
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
        const dateEnd = new Date();
        const dateStart = new Date();
        dateStart.setMonth(dateEnd.getMonth() - 2);
        this.statForm = new FormGroup({
            nameSurvey: new FormControl(),
            type: new FormControl(this.types[2]),
            department: new FormControl(this.departments[0]),
            dateValueStart: new FormControl(
                new TuiDayRange(new TuiDay(2023, dateStart.getMonth(), 1), new TuiDay(dateEnd.getFullYear(), dateEnd.getMonth(), dateEnd.getDate())),
            ),
            dateValueEnd: new FormControl(
                new TuiDayRange(new TuiDay(2023, dateStart.getMonth() + 1, 1), new TuiDay(dateEnd.getFullYear(), dateEnd.getMonth(), dateEnd.getDate())),
            ),
        })
        this.getCurrentSurveyId();
        this.formListener();
    }
    
    ngOnDestroy(): void {
        this.subscriptionFirst.unsubscribe();
        this.subscriptionSecond.unsubscribe()
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
                // this.curSurvey = this.surveys[0];
                this.value = this.curSurvey.id;
                this.cdr.detectChanges();
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
                // this.curSurvey = this.surveys[0];
                this.value = this.curSurvey.id;
                this.cdr.detectChanges();
            },
            (error: any) => {
                console.log(error);
            }
        );
    } 

    getCurrentSurveyId(): void {
        this.subscriptionSecond = this.statisticsService.getCurrentSurveyId().subscribe(
            (data: any) => {
                this.curSurvey.id = data;
                const date: TuiDayRange = this.statForm.get('dateValue')?.value;
                const from = `${date.from.month + 1}.${date.from.day}.${date.from.year % 100}`;
                const to = `${date.to.month + 1}.${date.to.day}.${date.to.year % 100}`;
                this.getStatsSurveyAll(from, to, data);
            },
            (error: any) => {
                console.log(error);
            }
        );
    }

    getStatsSurveyAll(from: string, to: string, surveyId: string) {
        this.statisticsService.getStatsSurveyAll(from, to, surveyId).subscribe(
            (data: any) => {
                if(data) {
                    // this.message = '';
                    // console.log('stats', data);
                    data.questions.sort((a: any, b: any) => a.question.number - b.question.number);
                    this.questionsAll = data.questions;
                    this.uploadedSuccess = true;
                }
                else {
                    this.uploadedSuccess = false;
                    this.message = 'Статистика еще не сформировалась';
                }
                this.cdr.detectChanges();
            },
            (error: any) => {
                console.log(error);
                this.message = 'Статистика еще не сформировалась';
                this.uploadedSuccess = false;
            }
        );
    }

    getStatsSurveyAverage(from: string, to: string, surveyId: string) {
        this.statisticsService.getStatsSurveyAverage(from, to, surveyId).subscribe(
            (data: any) => {
                if(data.questions && data.questions.length > 0) {
                    // console.log(data.questions)
                    data.questions.sort((a: any, b: any) => a.question.number - b.question.number);
                    this.questionsAverageFirst = data.questions;
                    this.uploadedSuccess = true;
                }
                else {
                    this.uploadedSuccess = false;
                    this.message = 'Статистика еще не сформировалась';
                }
                this.cdr.detectChanges();
            },
            (error: any) => {
                console.log(error);
                this.uploadedSuccess = false;
                this.message = 'Статистика еще не сформировалась';
                this.cdr.detectChanges();
            }
        );
    }

    getStatsSurveyDynamic(from: string, to: string, surveyId: string) {
        this.statisticsService.getStatsSurveyAverage(from, to, surveyId).subscribe(
            (data: any) => {
                if(data.questions && data.questions.length > 0) {
                    console.log(data.questions);
                    data.questions.sort((a: any, b: any) => a.question.number - b.question.number);
                    this.questionsAverageSecond = data.questions;
                    this.uploadedSuccess = true;
                }
                else {
                    this.uploadedSuccess = false;
                    this.message = 'Статистика еще не сформировалась';
                }
                this.cdr.detectChanges();
            },
            (error: any) => {
                console.log(error);
                this.uploadedSuccess = false;
                this.message = 'Статистика еще не сформировалась';
                this.cdr.detectChanges();
            }
        );
    }

    formListener(): void {
        this.subscriptionFirst = this.statForm.valueChanges.subscribe((form: any) => {
            const dateFirst: TuiDayRange = form.dateValueStart;
            const from = `${dateFirst.from.month + 1}.${dateFirst.from.day}.${dateFirst.from.year % 100}`;
            const to = `${dateFirst.to.month + 1}.${dateFirst.to.day}.${dateFirst.to.year % 100}`;

            const idSurvey = form.nameSurvey || this.curSurvey.id;
            this.type = form.type;
            switch(form.type) {
                case 'Ответы участников':
                    this.getStatsSurveyAll(from, to, idSurvey);
                    break;
                case 'Средний балл':
                    this.getStatsSurveyAverage(from, to, idSurvey);
                    break;
                case 'Динамика':
                    const dateSecond: TuiDayRange = form.dateValueEnd;
                    const fromSec = `${dateSecond.from.month + 1}.${dateSecond.from.day}.${dateSecond.from.year % 100}`;
                    const toSec = `${dateSecond.to.month + 1}.${dateSecond.to.day}.${dateSecond.to.year % 100}`;

                    this.getStatsSurveyAverage(from, to, idSurvey);
                    this.getStatsSurveyDynamic(fromSec, toSec, idSurvey);
                    break;
            }
        })
    }
}
