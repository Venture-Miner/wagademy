import { Component, Input } from '@angular/core';

@Component({
  selector: 'wagademy-certificate',
  standalone: true,
  imports: [],
  templateUrl: './certificate.component.html',
  styleUrl: './certificate.component.css',
})
export class CertificateComponent {
  @Input() courseName: string = '';
  name = 'Pedro Silva';
  completionDate = '09/05/2023';
}
