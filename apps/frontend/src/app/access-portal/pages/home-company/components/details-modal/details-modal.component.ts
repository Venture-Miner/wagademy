import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'lens-academy-details-modal',
  templateUrl: './details-modal.component.html',
  styleUrls: ['./details-modal.component.css'],
})
export class DetailsModalComponent {
  @Output() cancel = new EventEmitter<void>();
  showDetailsModal = false;
}
