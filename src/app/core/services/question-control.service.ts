import { Injectable } from '@angular/core';
import { QuestionBase } from '../interfaces/question-base';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

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

  toFormArray(questions: QuestionBase<string>[] ): FormArray {
    let array: any = new FormArray([]);

    questions.forEach(question => {
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
    // array.sort((a: any, b: any) => a.number - b.number);
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
