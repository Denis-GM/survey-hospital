import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { FormArray, Validators, FormBuilder, FormControl } from '@angular/forms'

@Component({
  selector: 'app-option',
  templateUrl: './option.component.html',
  styleUrls: ['./option.component.css']
})
export class OptionComponent implements OnInit {
  @Input() inputTypeQuestion: string = 'Один ответ';

  @Input() option!: any;
  @Output() optionChange = new EventEmitter<any>();

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    
  }
}
