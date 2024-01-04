import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent implements OnInit, AfterViewInit {
  @ViewChild('barCanvas') barCanvas: ElementRef | undefined;
  barChart: any;
  @Input() dataStat!: any;
  @Input() typeQuestion!: number;
  private labels!: string[];
  private data!: number[];
  private countAnswer: number = 0;

  constructor() {}

  ngOnInit(): void {
    this.calculateStatistics();
  }

  ngAfterViewInit(): void {
    this.barChartMethod();
  }

  calculateStatistics(): any {
    const len = this.dataStat.length;
    let labels: string[] = new Array();
    let data: number[] = new Array();
    let maxCount: number = 0;
    
    if(this.typeQuestion == 1) {
      for(let i = 0; i < len; i++){
        labels[i] = this.dataStat[i].answer.answer;
        data[i] = this.dataStat[i].percent;
        maxCount += this.dataStat[i].count
      }
    }
    else if(this.typeQuestion == 2) {
      for(let i = 0; i < len; i++){
        labels[i] = this.dataStat[i].answer.answer;
        data[i] = this.dataStat[i].percent;
        maxCount = Math.max(this.dataStat[i].count, maxCount);
      }
    }
    else if(this.typeQuestion == 3) {
      this.dataStat.rangeList.forEach((element: any, index: number) => {
        // if(element.count > 0) {
        labels.push(element.rangeValue);
        data.push(element.percent);
        maxCount += element.count;
        // }
      });;
    }
    this.labels = labels;
    this.data = data;
    this.countAnswer = maxCount;
    // console.log(labels, data, maxCount)
  }

  barChartMethod() {
    this.barChart = new Chart(this.barCanvas?.nativeElement, {
      type: 'bar',
      data: {
        labels: this.labels,
        datasets: [
          {
            label: `Общее число ответов: ${this.countAnswer}`,
            data: this.data,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
              'rgba(255,99,132,1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }
}
