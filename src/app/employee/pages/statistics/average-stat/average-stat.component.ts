import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-average-stat',
  templateUrl: './average-stat.component.html',
  styleUrls: ['./average-stat.component.css']
})
export class AverageStatComponent implements OnInit{
  @Input() questions!: any;
  protected newQuestions: any;
  protected stats!: any[];
  
  ngOnInit(): void {
    let stats = new Array();
    let newQuestions = new Array()
    this.questions.forEach((element: any) => {
      console.log(element)
      switch(element.question.type) {
        case 0:
          stats.push(element.textAnswersStats);
          break;
        case 1:
          stats.push(element.optionStats);
          newQuestions.push(element);
          break;
        case 2:
          stats.push(element.optionStats);
          newQuestions.push(element);
          break;
        case 3:
          stats.push(element.averageRange);
          newQuestions.push(element);
          break;
      }
    });
    this.stats = stats;
    this.newQuestions = newQuestions;
    console.log('stat', this.stats)
  }
}
