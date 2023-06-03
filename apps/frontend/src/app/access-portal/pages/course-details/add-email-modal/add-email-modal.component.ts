import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'wagademy-add-email-modal',
  templateUrl: './add-email-modal.component.html',
  styleUrls: ['./add-email-modal.component.css'],
})
export class AddEmailModalComponent {
  showEmailConfirmModal = false;
  congratulationsMessage = '';
  @Output() cancel = new EventEmitter<void>();
}
