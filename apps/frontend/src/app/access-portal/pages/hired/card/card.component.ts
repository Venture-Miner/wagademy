import { Component, Input } from '@angular/core';

@Component({
  selector: 'wagademy-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent {
  @Input() data: any;
}
