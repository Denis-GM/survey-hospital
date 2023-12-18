import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-stat-block',
  templateUrl: './stat-block.component.html',
  styleUrls: ['./stat-block.component.css']
})
export class StatBlockComponent {
  @Input() question!: any;
  @Input() index!: number;

  protected items: string[] = [
    'Cтолбчатая диаграмма',
    'Круговая диаграмма'
  ]

  typeStat = new FormControl(this.items[0]);
}
