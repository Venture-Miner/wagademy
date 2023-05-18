import { Component, Input } from '@angular/core';

@Component({
  selector: 'lens-academy-success-modal',
  templateUrl: './success-modal.component.html',
  styleUrls: ['./success-modal.component.css'],
})
export class SuccessModalComponent {
  @Input() message = '';
}
