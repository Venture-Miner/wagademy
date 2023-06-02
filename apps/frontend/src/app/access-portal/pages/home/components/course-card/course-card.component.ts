import { Component, Input } from '@angular/core';

@Component({
  selector: 'wagademy-course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.css'],
})
export class CourseCardComponent {
  @Input() image = '';
}
