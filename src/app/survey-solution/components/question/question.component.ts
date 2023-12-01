import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { QuestionBase } from 'src/app/core/interfaces/question-base';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit{
  @Input() question!: QuestionBase<string>;
  @Input() questionForm!: FormGroup;
  @Input() index!: number;
  
  protected formControl = new FormControl();
  protected radioForm: FormGroup; 
  public options: any = [];

  constructor(private fb: FormBuilder) { 
    this.radioForm = this.fb.group({
      "rangeValue": [0],
    });
  }

  ngOnInit(): void {
    this.options = this.question.options;
    this.questionForm.get('id')?.setValue(this.question.id);
    // console.log(this.question)
    // console.log(this.options)
    console.log(this.questionForm);
    // this.radioControlListiner();
  }

  protected questionTypes: any  = {
    0 : 'radio',
    1 : 'checkbox',
    2 : 'radio',
    3 : 'text'
  };

  
  get isValid(): boolean {
    return this.questionForm.controls[this.question.id].valid;
  }

  radioControlListiner() {
    this.radioForm.get("rangeValue")!.valueChanges.subscribe(selectedValue => {
      // console.log(selectedValue);
      this.questionForm.get('rangeValue')?.setValue(selectedValue);
      console.log(this.questionForm.get('rangeValue')?.value);
    })
  }
}
