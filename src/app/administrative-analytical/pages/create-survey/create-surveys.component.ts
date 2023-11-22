import { Component, OnChanges } from '@angular/core';
import { FormArray, 
  Validators, 
  FormBuilder, 
  FormControl,
} from '@angular/forms'
import { ISurvey, IQuestion, TypesQuestion } from 'src/app/core/interfaces/surveyInterfaces';
import {TuiContextWithImplicit, tuiPure, TuiStringHandler} from '@taiga-ui/cdk';

interface Questions {
  readonly text: string;
  readonly value: TypesQuestion;
}

@Component({
  selector: 'app-create-surveys',
  templateUrl: './create-surveys.component.html',
  styleUrls: ['./create-surveys.component.css']
})
export class CreateSurveysComponent {
  protected value: string = '';

  protected tupesQuestions: string[] = [
    'Один ответ',
    'Множественный ответ',
    'Выбор в диапазоне',
    'Вписать ответ',
  ];

  protected inputTypeQuestion: string = this.tupesQuestions[0];

  constructor(private fb: FormBuilder) { }

  itemControl = new FormControl();

  option = this.fb.control('');

  questionGroup = this.fb.group({
    type: ['', Validators.required],
    questionText: ['', Validators.required],
    options: this.fb.array([this.option]),
    isRequired: [false]
  });

  surveyForm = this.fb.group({
    title: ['', Validators.required],
    description: [''],
    questions: this.fb.array([this.questionGroup]),
  });

  get questions() {
    return this.surveyForm.get('questions') as FormArray;
  }

  get options() {
    return this.surveyForm.get('questions') as FormArray;
    // .get('questions')?.get('option') as FormArray;
  }

  addQuestion() {
    this.questions.push(this.questionGroup);
    console.log('addQuestion');
  }

  addOption() {
    this.options.push(this.questionGroup);
    console.log('addOption');
  }

  consoleLogQuestion() {
    console.log(this.questions.value);
    console.log('consoleLogQuestion');
  }

  consoleLogOptions() {
    console.log(this.options.value);
    console.log('consoleLogOptions');
  }
}
