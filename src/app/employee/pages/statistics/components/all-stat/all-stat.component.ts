import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-all-stat',
  templateUrl: './all-stat.component.html',
  styleUrls: ['./all-stat.component.css']
})
export class AllStat implements OnInit{
	@Input() question!: any;
  @Input() index!: number;
  @Input() typeStatisticsDisplay!: string;
  protected typeQuestion!: number;
  protected stats: any;

  protected items: string[] = [
    'Cтолбчатая диаграмма',
    'Круговая диаграмма'
  ]

  protected types: string[] = [
    'Средний балл', 
    'Динамика', 
    'Ответы участников'
  ];

  typeStatDisplay = new FormControl(this.items[0]);
  
  ngOnInit(): void {
    // console.log('question', this.question)
    this.typeQuestion = this.question.question.type;
    if(this.typeStatisticsDisplay !== 'Ответы участников') {
      switch(this.typeQuestion) {
        case 0:
          this.stats = this.question.textAnswersStats;
          break;
        case 1:
          this.stats = this.question.optionStats;
          break;
        case 2:
          this.stats = this.question.optionStats;
          break;
        case 3:
          this.stats = this.question.averageRange;
          break;
      }
    }
    else {
      switch(this.typeQuestion) {
        case 0:
          this.stats = this.question.textAnswersStats;
          break;
        case 1:
          this.stats = this.question.answerStats;
          break;
        case 2:
          this.stats = this.question.answerStats;
          break;
        case 3:
          this.stats = this.question.rangeStats;
          break;
      }
    }
    // console.log('stat', this.stats)
    // console.log(this.typeStatisticsDisplay)
  }
}
