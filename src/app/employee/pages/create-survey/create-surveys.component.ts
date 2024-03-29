import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormArray, Validators, FormBuilder, FormControl, FormGroup } from '@angular/forms'
import { Observable, of } from 'rxjs';
import { ActivatedRoute, Router, RouterLink, RouterModule } from '@angular/router';
import { SurveysService } from 'src/app/core/api/surveys.service';
import { ISurvey, IQuestion, IAnswerOptions } from '../../../core/interfaces/survey.interface';
import { TuiContextWithImplicit, TuiStringHandler, tuiPure } from '@taiga-ui/cdk';

interface IInterface {
  readonly index: number;
  readonly type: string;
}

@Component({
  selector: 'app-create-surveys',
  templateUrl: './create-surveys.component.html',
  styleUrls: ['./create-surveys.component.css'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class CreateSurveysComponent implements OnInit{
  tupesQuestions: IInterface[] = [
    {index: 0, type: 'Вписать ответ'},
    {index: 1, type: 'Один ответ'},
    {index: 2, type: 'Множественный ответ'},
    {index: 3, type: 'Выбор в диапазоне'},
  ];
  protected editMode: boolean = false;
  readonly items$ = of(this.tupesQuestions);
 
  constructor(private fb: FormBuilder, private surveysService: SurveysService, 
    private router: Router, private activateRoute: ActivatedRoute) { }

  ngOnInit(): void { }
  
  @tuiPure
  stringify(
      items: IInterface[]): TuiStringHandler<TuiContextWithImplicit<number>> {
      const map = new Map(items.map(({index, type}) => [index, type] as [number, string]));

      return ({$implicit}: TuiContextWithImplicit<number>) => map.get($implicit) || '';
  }

  get optionGroup() : FormGroup {
    return this.fb.group({
      answer: [''],
    });
  }

  get questionGroup(): FormGroup {
    return this.fb.group({
      title: ['', [Validators.required, Validators.minLength(1)]],
      type: [1, Validators.required],
      number: [0, Validators.required],
      isRequired: [false],
      answerOptions: this.fb.array(
        [ this.optionGroup ]
      ),
    });
  }

  surveyForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(1)]],
    description: ['', Validators.maxLength(1000)],
    questions: this.fb.array([this.questionGroup]),
  });

  get questions() {
    return this.surveyForm.get('questions') as FormArray;
  }

  get options() {
    return this.questions.get('answerOptions') as FormArray;
  }

  getYourOptions(index: number): FormArray {
    return this.questions.at(index).get('answerOptions') as FormArray;
  }

  typeYourQuestion(index: number): number {
    return this.questions.at(index).get("type")?.value as number;
  }

  addQuestion() {
    this.questions.push(this.questionGroup);
  }

  public removeQuestion(index: number): void {
    if(this.questions.length > 1)
      this.questions.removeAt(index);
  }

  consoleLogQuestion() {
    console.log(this.questions.value);
  }

  addOption(index: number) {
    let options: any = this.questions.at(index).get('answerOptions') as FormArray;
    options.push(this.optionGroup);
    // this.changeDetection.detectChanges();
    console.log(options, index);
  }

  public removeOption(indexQuestion: number, indexOption: number): void {
    this.getYourOptions(indexQuestion).removeAt(indexOption);
  }

  consoleLog() {
    const reqSurvey: any = { 
      name: this.surveyForm.get('name')!.value!,
      description: this.surveyForm.get('description')!.value!,
      questions: this.questions.getRawValue(),
    }
    if(this.surveyForm.valid){
      if(confirm('Создать опрос?'))
        this.postSurvey(reqSurvey);
    }
    else
      alert('Заполните все обязательные поля формы')
  }

  postSurvey(data: any) {
    this.surveysService.postSurvey(data).subscribe(
      (data: any) => {
        console.log(data);
        this.router.navigate(['/main/surveys']);
      },
      (err: any) => {
        console.log(err);
      }
    )
  }
}
