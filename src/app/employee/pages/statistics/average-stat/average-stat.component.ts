import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-average-stat',
  templateUrl: './average-stat.component.html',
  styleUrls: ['./average-stat.component.css']
})
export class AverageStatComponent implements OnInit{
  @Input() index!: number;
  @Input() question!: any;
  protected newQuestion: any;
  protected stat!: any;
  
  ngOnInit(): void {
    switch(this.question.question.type) {
      case 0:
        this.stat = this.question.textAnswersStats;
        break;
      case 1:
        this.stat = this.question.optionStats;
        break;
      case 2:
        this.stat = this.question.optionStats;
        break;
      case 3:
        this.stat = this.question.averageRange;
        break;
    }
    this.newQuestion = this.question.question;
    console.log('stat', this.stat, this.newQuestion)
  }
}
