import { Component, Input } from '@angular/core';

@Component({
  selector: 'wagademy-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.css'],
})
export class EducationComponent {
  @Input() data: any;
}
