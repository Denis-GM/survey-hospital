import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-stat-block-text',
  templateUrl: './stat-block-text.component.html',
  styleUrls: ['./stat-block-text.component.css']
})
export class StatBlockTextComponent {
  @Input() question!: any;
  @Input() index!: number;
  @Input() stats!: any;
}
