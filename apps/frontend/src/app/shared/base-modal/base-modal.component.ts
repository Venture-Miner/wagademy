import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'lens-academy-base-modal',
  templateUrl: './base-modal.component.html',
  styleUrls: ['./base-modal.component.css'],
})
export class BaseModalComponent {
  @Output() modalClosed = new EventEmitter<void>();
  @Input() title = '';
}
