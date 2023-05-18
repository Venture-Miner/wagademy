import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'lens-academy-warning-modal',
  templateUrl: './warning-modal.component.html',
  styleUrls: ['./warning-modal.component.css'],
})
export class WarningModalComponent {
  @Input() title = '';
  @Input() text = '';
  @Output() yes = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();
}
