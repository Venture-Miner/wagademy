import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'lens-academy-certificates-card',
  templateUrl: './certificates-card.component.html',
  styleUrls: ['./certificates-card.component.css'],
})
export class CertificatesCardComponent {
  @Input() listType = '';
  @Output() claim = new EventEmitter<void>();
}
