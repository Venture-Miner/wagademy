import { NgClass, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

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
  @Input() selectId: string | undefined;
  @Input() status: 'Interviewed' | 'Invited' | '' = '';

  constructor(private router: Router) {}

  onViewMoreClick() {
    this.router.navigate(['/'], {
      queryParams: {
        selectId: this.selectId,
      },
    });
  }
}
