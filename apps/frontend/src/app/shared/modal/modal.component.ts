import { NgClass } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  standalone: true,
  imports: [NgClass],
  selector: 'wagademy-modal',
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
})
export class ModalComponent {
  @Input() actionButtonLabel = '';
  @Input() title = '';
  @Input() message = '';
  @Input() isLoading = false;
  @Input() typeModal: 'success' | 'cancel' = 'success';

  @Output() actionButtonClick = new EventEmitter<void>();
}
