import { Injectable } from '@angular/core';
import { QuestionBase } from '../interfaces/question-base.interface';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { IQuestion, IQuestionGet } from '../interfaces/survey.interface';

@Injectable({
  providedIn: 'root'
})
export class QuestionControlService {
  constructor(private _fb: FormBuilder) { }

  get optinGroup() {
    return this._fb.group({
      id: ['']
    });
  }

  get questionGroup() {
    return this._fb.group({
      id: ['', Validators.required],
      textAnswer: [''],
      rangeValue: [0],
      selectedOptions: this._fb.array([]),
    });
  }

  get optinGroupEditSurvey() {
    return this._fb.group({
      answer: [''],
    });
  }

  get questionGroupEditSurvey() {
    return this._fb.group({
      title: ['', [Validators.required, Validators.minLength(1)]],
      type: [1, Validators.required],
      number: [0, Validators.required],
      isRequired: [false],
      answerOptions: this._fb.array([]),
    });
  }

  toFormArray(questions: QuestionBase<string>[]): FormArray {
    let array: any = new FormArray([]);

    questions.forEach((question: QuestionBase<string>) => {
      let questionGroup = this.questionGroup
      if(question.isRequired){
        switch(question.type){
          case 1:
            questionGroup.get('selectedOptions')!.setValidators(Validators.required);
            break
          case 2:
            questionGroup.get('selectedOptions')!.setValidators(Validators.required);
            break
          case 3:
            questionGroup.get('rangeValue')!.setValidators(Validators.required);
            break
          case 0:
            questionGroup.get('textAnswer')!.setValidators(Validators.required);
            break
        }
      }
      array.push(questionGroup);
    });
    return array as FormArray;
  }

  toFormArrayEditSurvey(questions: IQuestionGet[]): FormArray {
    let array: any = new FormArray([]);

    questions.forEach(question => {
      let optinsArr: any = new FormArray([])
      const answerOptions = question.options;

      answerOptions.forEach(answerOption => {
        let optinGroupEditSurvey = this._fb.group({answer: [answerOption.answer]});
        optinsArr.push(optinGroupEditSurvey);
      })

      let questionGroup = this._fb.group({
        title: [question.title, [Validators.required, Validators.minLength(1)]],
        type: [question.type, Validators.required],
        number: [question.number, Validators.required],
        isRequired: [question.isRequired],
        answerOptions: optinsArr,
      });
      
      array.push(questionGroup);
    })
    return array as FormArray;
  }

  toFormGroup(questions: QuestionBase<string>[] ) {
    const group: any = {};

    questions.forEach(question => {
      group[question.id] = this.questionGroup; 
    });
    // group.sort((a: any, b: any) => a.number - b.number)
    return new FormGroup(group);
  }
}
