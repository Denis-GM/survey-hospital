import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit{
  @Input() question!: any;
  @Input() questionGroup!: FormGroup;
  // @Input() form!: FormGroup
  @Input() index!: number;
  
  protected radioForm: FormGroup; 
  public options: any = [];

  constructor(private fb: FormBuilder) { 
    this.radioForm = this.fb.group({
      "rangeValue": [0],
    });

  }

  ngOnInit(): void {
    this.options = this.question.options;
    this.questionGroup.get('id')?.setValue(this.question.id);
    // console.log(this.question)
    // console.log(this.questionGroup.value);

    this.radioControlListiner();
  }

  get isValid(): boolean {
    return this.questionGroup.controls[this.question.key].valid;
  }

  radioControlListiner() {
    this.radioForm.get("rangeValue")!.valueChanges.subscribe(selectedValue => {
      // console.log(selectedValue);
      this.questionGroup.get('rangeValue')?.setValue(selectedValue);
      console.log(this.questionGroup.get('rangeValue')?.value);
    })
  }
}
