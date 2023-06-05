import { Component, Input } from '@angular/core';

@Component({
  selector: 'wagademy-job-card-details',
  templateUrl: './job-card-details.component.html',
  styleUrls: ['./job-card-details.component.css'],
})
export class JobCardDetailsComponent {
  @Input() post = '';
  @Input() company = '';
}
