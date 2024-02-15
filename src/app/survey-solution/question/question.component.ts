import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { QuestionBase } from 'src/app/core/interfaces/question-base.interface';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit{
  @Input() question!: QuestionBase<string>;
  @Input() questionForm!: any;
  @Input() index!: number;
  
  protected formControl = new FormControl();
  protected radioForm!: FormGroup; 
  public options: any = [];

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.options = this.question.options;
    this.questionForm.get('id')?.setValue(this.question.id);
    // console.log(this.questionForm);
    this.radioForm = this.fb.group({
      proxyRadioControl: [ ],
    });
    this.radioControlListiner();
  }

  protected questionTypes: any  = {
    0 : 'text',
    1 : 'radio',
    2 : 'checkbox',
    3 : 'radio',
  };

  get selectedCountries() {
    return this.questionForm.controls['selectedOptions'] as FormArray;
  }

  onCheckboxChange(event: any) {
    if (event.target.checked) {
      this.selectedCountries.push(new FormGroup({
        "id": new FormControl(event.target.value)
      }));
    } 
    else {
      const index = this.selectedCountries.controls
        .findIndex(x => x.value === event.target.value);
      this.selectedCountries.removeAt(index);
    }
  }

  radioControlListiner() {
    this.radioForm.get("proxyRadioControl")!.valueChanges.subscribe(selectedValue  => {
      this.selectedCountries.clear();
      this.selectedCountries.push(new FormGroup({
        "id": new FormControl(selectedValue)
      }));
    })
  }
  
  get isValid(): boolean {
    return this.questionForm.controls[this.question.id].valid;
  }
}
