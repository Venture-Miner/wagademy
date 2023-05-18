import { Component, Input } from '@angular/core';

@Component({
  selector: 'lens-academy-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.css'],
})
export class EducationComponent {
  @Input() data: any;
}
