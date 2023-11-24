import { Component } from '@angular/core';
import { FormArray, Validators, FormBuilder, FormControl } from '@angular/forms'
import { ISurvey, IQuestion, TypesQuestion } from 'src/app/core/interfaces/surveyInterfaces';

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
  protected tupesQuestions: string[] = [ 'Один ответ', 'Множественный ответ','Выбор в диапазоне','Вписать ответ' ];
  protected inputTypeQuestion: string = this.tupesQuestions[0];
  arr: any = [];

  constructor(private fb: FormBuilder) { }

  optionControl = this.fb.control('');

  questionGroup = this.fb.group({
    type: ['', Validators.required],
    questionText: ['', Validators.required],
    options: this.fb.array([this.optionControl]),
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

  addQuestion() {
    this.questions.push(this.fb.group({
      type: ['', Validators.required],
      questionText: ['', Validators.required],
      options: this.fb.array([this.optionControl]),
      isRequired: [false]
    }));
    console.log('addQuestion');
  }

  public removeQuestion(index: number): void {
    this.questions.removeAt(index);
  }

  consoleLogQuestion() {
    // console.log(this.questions.value);
    console.log(this.arr);
  }
}
