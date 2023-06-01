import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CertificateService } from '../../../../../services';

@Component({
  selector: 'wagademy-certificates-card',
  templateUrl: './certificates-card.component.html',
  styleUrls: ['./certificates-card.component.css'],
})
export class CertificatesCardComponent {
  @Input() listType = '';
  @Output() claim = new EventEmitter<{
    courseName: string;
    publicationId: string;
  }>();
  @Input() set certificate(c: any) {
    this.attributes = JSON.parse(c.metadata.attributes[0].value);
    this.publicationId = c.id;
    this.hasCollectedByMe = c.hasCollectedByMe;
  }
  attributes: any;
  publicationId = '';
  hasCollectedByMe = false;

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
