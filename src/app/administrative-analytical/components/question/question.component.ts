import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit{
  
  // @Input() questionGroup!: FormGroup;
  // @Input() surveyForm!: FormGroup;
  @Input() idx!: number;
  @Input() disableRemove?: boolean;
  @Output() idxToRemove: EventEmitter<number> = new EventEmitter<number>();

  protected tupesQuestions: string[] = [ 
    'Один ответ',
    'Множественный ответ',
    'Выбор в диапазоне', 
    'Вписать ответ' 
  ];

  optionControl = this.fb.control('');

  questionGroup = this.fb.group({
    type: ['', Validators.required],
    questionText: ['', Validators.required],
    options: this.fb.array([this.optionControl]),
    isRequired: [false]
  });

  protected inputTypeQuestion: string = this.tupesQuestions[0];

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {

  }

  get options() {
    return this.questionGroup.get('options') as FormArray;
  }

  addOption() {
    this.options.push(this.fb.control(''));
    console.log('addOption');
  }

  consoleLog() {
    console.log(this.questionGroup.value);
  }
}
