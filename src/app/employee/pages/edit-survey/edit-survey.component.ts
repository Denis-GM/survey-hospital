import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormArray, Validators, FormBuilder, FormControl, FormGroup } from '@angular/forms'
import { Observable, of } from 'rxjs';
import { ActivatedRoute, Router, RouterLink, RouterModule } from '@angular/router';
import { SurveysService } from 'src/app/core/api/surveys.service';
import { ISurvey, IQuestion, IAnswerOptions, IQuestionGet } from '../../../core/interfaces/ISurvey';
import { TuiContextWithImplicit, TuiStringHandler, tuiPure } from '@taiga-ui/cdk';
import { QuestionBase } from 'src/app/core/interfaces/question-base';
import { QuestionControlService } from 'src/app/core/services/question-control.service';

interface IInterface {
  readonly index: number;
  readonly type: string;
}

@Component({
  selector: 'app-edit-survey',
  templateUrl: './edit-survey.component.html',
  styleUrls: ['./edit-survey.component.css']
})
export class EditSurveyComponent {
  tupesQuestions: IInterface[] = [
    {index: 0, type: 'Вписать ответ'},
    {index: 1, type: 'Один ответ'},
    {index: 2, type: 'Множественный ответ'},
    {index: 3, type: 'Выбор в диапазоне'},
  ];
  protected editMode: boolean = false;
  readonly items$ = of(this.tupesQuestions);
  protected surveyForm!: FormGroup;
  protected survey!: any;
 
  constructor(private fb: FormBuilder, private surveysService: SurveysService, 
    private router: Router, private activateRoute: ActivatedRoute,
    private qcs: QuestionControlService,) { }

  ngOnInit(): void {
    const idSurvey = this.activateRoute.snapshot.params["id"] || false;
    this.getSurvey(idSurvey);
  }

  get questionsFroms(): FormArray {
    return <FormArray> this.surveyForm.get('questions') as FormArray;
  }
  
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
      if(confirm('Изменить опрос?'))
        this.editSurvey(reqSurvey);
    }
    else
      alert('Заполните все обязательные поля формы')
  }

  getSurvey(id: string) {
    this.surveysService.getSurvey(id).subscribe(
      (data: any) => {
        this.survey = data;
        const nameSurvey = data.name;
        this.surveyForm = this.fb.group({
          name: [nameSurvey, [Validators.required, Validators.minLength(1)]],
          description: [data.description, Validators.maxLength(1000)],
          questions: this.qcs.toFormArrayEditSurvey(data.questions as IQuestionGet[]) 
        });
      },
      (err: any) => {
        console.log(err);
      }
    )
  }

  editSurvey(data: any) {
    this.surveysService.editSurvey(this.survey.id, data).subscribe(
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
