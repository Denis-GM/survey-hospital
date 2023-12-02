import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css'],
})
export class QuestionComponent implements OnInit{
  
  @Input() questionGroup!: FormGroup;
  @Output() questionGroupChange = new EventEmitter<FormGroup>();

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

  // questionGroup = this.fb.group({
  //   type: ['', Validators.required],
  //   questionText: ['', Validators.required],
  //   options: this.fb.array([this.fb.control('')]),
  //   isRequired: [false]
  // });

  protected inputTypeQuestion: string = this.tupesQuestions[0];

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    console.log(this.questionGroup.value)
  }

  get options() {
    return this.questionGroup.get('options') as FormArray;
  }

  // get optionControl(): FormControl {
  //   return this.fb.control('');
  // }

  addOption() {
    this.options.push(this.fb.control(''));
    this.questionGroupChange.emit(this.questionGroup)
    console.log('addOption');
  }

  public removeOption(index: number): void {
    this.options.removeAt(index);
  }

  consoleLog() {
    console.log(this.questionGroup.value);
  }
}
