import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'wagademy-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent {
  @Input() squad: any;
  @Input() mode: 'JOIN' | 'MANAGE' = 'MANAGE';
  @Output() join = new EventEmitter<string>();
  @Output() showParticipants = new EventEmitter<void>();
  @Output() quit = new EventEmitter<string>();
}
