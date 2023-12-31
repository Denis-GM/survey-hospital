import { Component, EventEmitter, Input, Output, OnInit} from '@angular/core';
import { FormArray, Validators, FormBuilder, FormControl, FormGroup } from '@angular/forms'

@Component({
  selector: 'app-option',
  templateUrl: './option.component.html',
  styleUrls: ['./option.component.css'],
})
export class OptionComponent implements OnInit {
  @Input() inputTypeQuestion!: string;
  @Input() optionControl!: FormControl;
  @Input() idx!: number;
  @Input() disableRemove?: boolean;
  @Output() idxToRemove: EventEmitter<number> = new EventEmitter<number>();

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    
  }

  
}
