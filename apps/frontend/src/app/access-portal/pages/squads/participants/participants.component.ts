import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'wagademy-participants',
  templateUrl: './participants.component.html',
  styleUrls: ['./participants.component.css'],
})
export class ParticipantsComponent {
  @Output() modalClosed = new EventEmitter<void>();
}
