import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit{
  @Input() question!: any;
  @Input() index!: number;
  public options: any = [];

  ngOnInit(): void {
    this.options = this.question.options;
    console.log(this.question);
  }
}
