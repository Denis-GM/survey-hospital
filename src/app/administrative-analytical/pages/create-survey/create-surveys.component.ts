import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { FormArray, Validators, FormBuilder, FormControl, FormGroup } from '@angular/forms'
import { Observable } from 'rxjs';
import { ISurvey, IQuestion, TypesQuestion } from 'src/app/core/interfaces/survey-interfaces';

interface Questions {
  readonly text: string;
  readonly value: TypesQuestion;
}

@Component({
  selector: 'app-create-surveys',
  templateUrl: './create-surveys.component.html',
  styleUrls: ['./create-surveys.component.css'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class CreateSurveysComponent {
  protected tupesQuestions: string[] = [ 'Один ответ', 'Множественный ответ','Выбор в диапазоне','Вписать ответ' ];
  protected inputTypeQuestion: string = this.tupesQuestions[0];

  constructor(private fb: FormBuilder,
    // private changeDetection: ChangeDetectorRef
  ) { }

  get questionGroup(): FormGroup {
    return this.fb.group({
      type: [this.tupesQuestions[0], Validators.required],
      questionText: ['', Validators.required],
      options: this.fb.array([this.fb.control('')]),
      isRequired: [false]
    });
  }

  surveyForm = this.fb.group({
    title: ['', Validators.required],
    description: [''],
    questions: this.fb.array([this.questionGroup]),
  });

  get questions() {
    return this.surveyForm.get('questions') as FormArray;
  }

  getYourOptions(index: number): FormArray {
    return this.questions.at(index).get('options') as FormArray;
  }

  typeYourQuestion(index: number): string {
    return this.questions.at(index).get("type")?.value as string;
  }

  addQuestion() {
    this.questions.push(this.questionGroup);
    // this.changeDetection.detectChanges();
    console.log('add question');
  }

  public removeQuestion(index: number): void {
    if(this.questions.length > 1)
      this.questions.removeAt(index);
  }

  consoleLogQuestion() {
    console.log(this.questions.value);
  }

  addOption(index: number) {
    let options: any = this.questions.at(index).get('options') as FormArray;
    options.push(this.fb.control(''));
    // this.changeDetection.detectChanges();
    console.log(options, index);
  }

  public removeOption(indexQuestion: number, indexOption: number): void {
    this.getYourOptions(indexQuestion).removeAt(indexOption);
  }

  consoleLog() {
    console.log(this.questionGroup.value);
    this.typeYourQuestion(0);
  }
}
