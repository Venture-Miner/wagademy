import { NgOptimizedImage } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'wagademy-certificate',
  standalone: true,
  imports: [NgOptimizedImage],
  templateUrl: './certificate.component.html',
  styleUrl: './certificate.component.css',
})
export class CertificateComponent {
  @Input() courseName = '';
  name = 'Pedro Silva';
  completionDate = '09/05/2023';
}
