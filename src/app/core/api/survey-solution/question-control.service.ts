import { Injectable } from '@angular/core';
import { QuestionBase } from '../../interfaces/question-base';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class QuestionControlService {
  constructor(private _fb: FormBuilder) { }

  get questionGroup() {
    return this._fb.group({
      id: ['', Validators.required],
      textAnswer: [''],
      rangeValue: [0],
      selectedOptions: [ 
        this._fb.array([]) 
      ]
    });
  }

  toFormArray(questions: QuestionBase<string>[] ): FormArray {
    let array: any = new FormArray([]);

    questions.forEach(question => {
      array.push(this.questionGroup); //.controls['id'].setValue(question.id);
    });
    return array as FormArray;
  }

  toFormGroup(questions: QuestionBase<string>[] ) {
    const group: any = {};

    questions.forEach(question => {
      group[question.id] = this.questionGroup; //.controls['id'].setValue(question.id);
    });
    return new FormGroup(group);
  }
}
