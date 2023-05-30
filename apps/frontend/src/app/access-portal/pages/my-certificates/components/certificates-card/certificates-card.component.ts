import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CertificateService } from '../../../../../services';

@Component({
  selector: 'lens-academy-certificates-card',
  templateUrl: './certificates-card.component.html',
  styleUrls: ['./certificates-card.component.css'],
})
export class CertificatesCardComponent {
  @Input() listType = '';
  @Output() claim = new EventEmitter<void>();
  @Input() set certificate(c: any) {
    this.attributes = JSON.parse(c.attributes[0].value);
  }
  attributes: any;

  constructor(private certificateService: CertificateService) {}

  downloadPDFCertificate(
    participant: string,
    courseName: string,
    conductor: string
  ) {
    this.certificateService.generatePDFCertificate(
      participant,
      courseName,
      conductor
    );
  }
}
