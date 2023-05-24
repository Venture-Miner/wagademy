import { Component, Input } from '@angular/core';

@Component({
  selector: 'lens-academy-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent {
  @Input() avatarURL = '';
  @Input() about = '';
  @Input() name = '';
}
