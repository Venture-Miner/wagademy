import { Component, Input } from '@angular/core';

@Component({
  selector: 'wagademy-success-modal',
  templateUrl: './success-modal.component.html',
  styleUrls: ['./success-modal.component.css'],
})
export class SuccessModalComponent {
  @Input() message = '';
}
