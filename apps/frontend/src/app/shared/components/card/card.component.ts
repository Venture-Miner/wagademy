import { NgClass, NgOptimizedImage } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

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
  @Output() unpublishJob: EventEmitter<void> = new EventEmitter<void>();
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

  constructor(private router: Router) {}

  onViewMoreClick() {
    const route = this.menu === 'jobs' ? 'hiring' : '';
    this.router.navigate([`/pages/${route}`], {
      queryParams: {
        selectId: this.selectId,
      },
    });
  }
}
