import { NgClass, NgOptimizedImage } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { JobStatusEnum } from '@wagademy/types';

@Component({
  selector: 'wagademy-card-job',
  standalone: true,
  imports: [NgClass, NgOptimizedImage],
  templateUrl: './card-job.component.html',
  styleUrls: ['./card-job.component.scss'],
})
export class CardJobComponent {
  @Input() name: string | undefined;
  @Input() img: string | undefined;
  @Input() description: string | undefined;
  @Input() jobId: string | undefined;
  @Input() applications: number | undefined;
  @Input() view: number | undefined;
  @Input() jobStatus: JobStatusEnum = JobStatusEnum.PUBLISHED;
  @Output() updateJobStatus: EventEmitter<void> = new EventEmitter<void>();
  @Output() updateJob: EventEmitter<void> = new EventEmitter<void>();
  @Output() removeJob: EventEmitter<void> = new EventEmitter<void>();
  @Output() interviewGPTJob: EventEmitter<void> = new EventEmitter<void>();
  @Output() copyLinkJob: EventEmitter<void> = new EventEmitter<void>();
  @Input() isOpen = false;

  constructor(private router: Router) {}

  onViewMoreClick() {
    this.router.navigate(['pages/job-applications'], {
      queryParams: {
        jobId: this.jobId,
      },
    });
  }
}
