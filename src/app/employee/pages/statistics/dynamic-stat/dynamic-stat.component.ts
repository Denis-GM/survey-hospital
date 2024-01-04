import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-dynamic-stat',
  templateUrl: './dynamic-stat.component.html',
  styleUrls: ['./dynamic-stat.component.css']
})
export class DynamicStatComponent {
  @Input() index!: number;
  @Input() questionFirst!: any;
  @Input() questionSecond!: any;
  protected newQuestionFirst: any;
  protected newQuestionSecond: any;
  protected statFirst!: any;
  protected statSecond!: any;
  
  protected isMessage: boolean = false;
  protected message: string = '';
  
  ngOnInit(): void {
    if(this.questionFirst) {
      switch(this.questionFirst.question.type) {
        case 0:
          this.statFirst = this.questionFirst.textAnswersStats;
          break;
        case 1:
          this.statFirst = this.questionFirst.optionStats;
          this.newQuestionFirst = this.questionFirst.question;
          break;
        case 2:
          this.statFirst = this.questionFirst.optionStats;
          this.newQuestionFirst = this.questionFirst.question;
          break;
        case 3:
          this.statFirst = this.questionFirst.averageRange;
          this.newQuestionFirst = this.questionFirst.question;
          break;
      };
    }
    else {
      this.isMessage = true;
    }

    if(this.questionSecond) {
      switch(this.questionSecond.question.type) {
        case 0:
          this.statSecond = this.questionSecond.textAnswersStats;
          break;
        case 1:
          this.statSecond = this.questionSecond.optionStats;
          this.newQuestionSecond = this.questionSecond.question;
          break;
        case 2:
          this.statSecond = this.questionSecond.optionStats;
          this.newQuestionSecond = this.questionSecond.question;
          break;
        case 3:
          this.statSecond = this.questionSecond.averageRange;
          this.newQuestionSecond = this.questionSecond.question;
          break;
      };
    }
    else {
      this.isMessage = true;
    }
  }
}
