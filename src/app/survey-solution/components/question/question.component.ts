import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit{
  @Input() question!: any;
  @Input() index!: number;
  @Input() answers!: FormGroup;
  public options: any = [];

  ngOnInit(): void {
    this.options = this.question.options;
    console.log(this.question);
  }
}
