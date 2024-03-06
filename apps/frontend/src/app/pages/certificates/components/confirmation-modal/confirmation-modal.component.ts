import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'wagademy-confirmation-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './confirmation-modal.component.html',
  styleUrl: './confirmation-modal.component.css',
})
export class ConfirmationModalComponent {
  isModalOpen = false;

  @Input() courseImage: string = '';
  @Input() courseName: string = '';
  @Input() courseDescription: string = '';
  @Input() courseStatus: string = '';
  @Input() courseProgress: number = 0;

  @Output() claimEvent = new EventEmitter();

  claimCourse() {
    this.claimEvent.emit();
  }
}
