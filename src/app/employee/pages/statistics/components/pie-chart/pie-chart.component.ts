import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import Chart from 'chart.js/auto'

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css'],
})
export class PieChartComponent implements OnInit, AfterViewInit {
  canvas: any; ctx: any;
  @ViewChild('pieCanvas') pieCanvas!: { nativeElement: any };

  pieChart: any;
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
    this.pieChartBrowser();
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
        if(element.count > 0) {
          labels.push(element.rangeValue);
          data.push(element.percent);
          maxCount += element.count;
        }
      });;
    }
    this.labels = labels;
    this.data = data;
    this.countAnswer = maxCount;
    console.log(labels, data, maxCount)
  }

  pieChartBrowser(): void {
    this.canvas = this.pieCanvas.nativeElement;
    this.ctx = this.canvas.getContext('2d');

    this.pieChart = new Chart(this.ctx, {
      type: 'pie',
      data: {
        labels: this.labels,
        datasets: [
          {
            backgroundColor: [
              'rgba(255, 99, 132, 0.5)',
              'rgba(54, 162, 235, 0.5)',
              'rgba(255, 206, 86, 0.5)',
              'rgba(75, 192, 192, 0.5)',
              'rgba(153, 102, 255, 0.5)',
              'rgba(255, 159, 64, 0.5)',
              'rgba(252, 61, 100, 0.5)',
              'rgba(169, 61, 100, 0.5)',
              'rgba(108, 61, 100, 0.5)',
              'rgba(43, 61, 100, 0.5)',
            ],
            data: this.data,
          },
        ],
      },
    });
  }
}