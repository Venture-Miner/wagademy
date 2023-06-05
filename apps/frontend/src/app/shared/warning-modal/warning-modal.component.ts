import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'wagademy-warning-modal',
  templateUrl: './warning-modal.component.html',
  styleUrls: ['./warning-modal.component.css'],
})
export class WarningModalComponent {
  @Input() title = '';
  @Input() text = '';
  @Input() error = false;
  @Output() yes = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();
}
