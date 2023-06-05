import { Component, Input } from '@angular/core';

@Component({
  selector: 'wagademy-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.css'],
})
export class TeacherEducationComponent {
  @Input() education = '';
  @Input() degree = '';
  @Input() description = '';
}
