import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-dynamic-stat',
  templateUrl: './dynamic-stat.component.html',
  styleUrls: ['./dynamic-stat.component.css']
})
export class DynamicStatComponent {
  @Input() questionsFirst!: any;
  @Input() questionsSecond!: any;
  protected newQuestionsFirst: any;
  protected newQuestionsecond: any;
  protected statsFirst!: any[];
  protected statsSecond!: any[];
  
  protected isMessage: boolean = false;
  protected message: string = '';
  
  ngOnInit(): void {
    let statsFirst = new Array();
    let statsSecond = new Array();
    let newQuestionsFirst = new Array()
    let newQuestionsSecond = new Array()

    if(this.questionsFirst) {
      this.questionsFirst.forEach((element: any) => {
        switch(element.question.type) {
          case 0:
            statsFirst.push(element.textAnswersStats);
            break;
          case 1:
            statsFirst.push(element.optionStats);
            newQuestionsFirst.push(element);
            break;
          case 2:
            statsFirst.push(element.optionStats);
            newQuestionsFirst.push(element);
            break;
          case 3:
            statsFirst.push(element.averageRange);
            newQuestionsFirst.push(element);
            break;
        }
      });
    }
    else {
      this.isMessage = true;
    }

    if(this.questionsSecond) {
      this.questionsSecond.forEach((element: any) => {
        switch(element.question.type) {
          case 0:
            statsSecond.push(element.textAnswersStats);
            break;
          case 1:
            statsSecond.push(element.optionStats);
            newQuestionsSecond.push(element);
            break;
          case 2:
            statsSecond.push(element.optionStats);
            newQuestionsSecond.push(element);
            break;
          case 3:
            statsSecond.push(element.averageRange);
            newQuestionsSecond.push(element);
            break;
        }
      });
    }
    else {
      this.isMessage = true;
    }

    this.statsFirst = statsFirst;
    this.statsSecond = statsSecond;
    this.newQuestionsFirst = newQuestionsFirst;
    this.newQuestionsecond = newQuestionsSecond;
  }
}
