import { NgClass, NgOptimizedImage } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { JobStatusEnum } from '@wagademy/types';

@Component({
  selector: 'wagademy-card',
  standalone: true,
  imports: [NgClass, NgOptimizedImage],
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent {
  @Input() name: string | undefined;
  @Input() img: string | undefined;
  @Input() description: string | undefined;
  @Input() selectId: string | undefined;
  @Input() button: string | undefined;
  @Input() applications: number | undefined;
  @Input() menu: 'courses' | 'jobs' | '' = '';
  @Output() updateJobStatus: EventEmitter<void> = new EventEmitter<void>();
  @Output() updateJob: EventEmitter<void> = new EventEmitter<void>();
  @Output() removeJob: EventEmitter<void> = new EventEmitter<void>();
  @Output() interviewGPTJob: EventEmitter<void> = new EventEmitter<void>();
  @Output() copyLinkJob: EventEmitter<void> = new EventEmitter<void>();
  @Output() updateCourse: EventEmitter<void> = new EventEmitter<void>();
  @Output() removeCourse: EventEmitter<void> = new EventEmitter<void>();
  @Output() certificatesCourse: EventEmitter<void> = new EventEmitter<void>();
  @Input() isOpen = false;
  @Input() isOpenCourses = false;
  @Input() details: 'more' | 'main' = 'main';
  @Input() route = '';
  @Input() queryParam = '';
  @Input() disableButton = false;
  @Input() jobStatus: JobStatusEnum = JobStatusEnum.PUBLISHED;

  constructor(private router: Router) {}

  onViewMoreClick() {
    this.router.navigate(
      [`/pages/${this.route}`],
      this.queryParam.length
        ? {
            queryParams: {
              [this.queryParam]: this.selectId,
            },
          }
        : {}
    );
  }
}
