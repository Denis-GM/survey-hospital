import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-stat-block',
  templateUrl: './stat-block.component.html',
  styleUrls: ['./stat-block.component.css']
})
export class StatBlockComponent implements OnInit{
  @Input() question!: any;
  @Input() index!: number;

  protected items: string[] = [
    'Cтолбчатая диаграмма',
    'Круговая диаграмма'
  ]

  typeStat = new FormControl(this.items[0]);

  
  ngOnInit(): void {
    console.log('question', this.question)
  }
}
