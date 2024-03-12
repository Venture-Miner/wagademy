import { NgClass, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'wagademy-cards',
  standalone: true,
  imports: [NgIf, NgClass],
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss'],
})
export class CardsComponent {
  @Input() name: string | undefined;
  @Input() img: string | undefined;
  @Input() description: string | undefined;
  @Input() selectId: string | undefined;
  @Input() button: string | undefined;
  @Input() applications: number | undefined;
  @Input() courses = false;
  @Input() jobs = false;
  showMenu = false;
  showMenuCourse = false;
  @Output() unpublishJob: EventEmitter<void> = new EventEmitter<void>();
  @Output() updateJob: EventEmitter<void> = new EventEmitter<void>();
  @Output() removeJob: EventEmitter<void> = new EventEmitter<void>();
  @Output() interviewGPTJob: EventEmitter<void> = new EventEmitter<void>();
  @Output() copyLinkJob: EventEmitter<void> = new EventEmitter<void>();
  @Output() updateCourse: EventEmitter<void> = new EventEmitter<void>();
  @Output() removeCourse: EventEmitter<void> = new EventEmitter<void>();
  @Output() certificatesCourse: EventEmitter<void> = new EventEmitter<void>();

  constructor(private router: Router) {}

  onViewMoreClick() {
    this.router.navigate(['/'], {
      queryParams: {
        selectId: this.selectId,
      },
    });
  }
}
