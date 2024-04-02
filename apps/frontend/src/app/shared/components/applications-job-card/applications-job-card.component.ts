import { NgClass, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'wagademy-applications-job-card',
  standalone: true,
  imports: [NgIf, NgClass],
  templateUrl: './applications-job-card.component.html',
  styleUrls: ['./applications-job-card.component.scss'],
})
export class ApplicationsJobCardComponent {
  @Input() name: string | undefined;
  @Input() img: string | undefined;
  @Input() description: string | undefined;
  @Input() status: string | undefined;
}
