import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'wagademy-details-modal',
  templateUrl: './details-modal.component.html',
  styleUrls: ['./details-modal.component.css'],
})
export class DetailsModalComponent {
  @Output() modalClosed = new EventEmitter<void>();
  @Input() type: 'SQUAD' | 'RESUME' | 'TEACHER' = 'RESUME';
  @Input() data: any;
}
