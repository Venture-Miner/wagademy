import { AcademicEducation } from '../../../../../interfaces/types';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'lens-academy-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.css'],
})
export class EducationComponent {
  academicEducation: AcademicEducation[] = [];
  @Input() set education(academicEducation: AcademicEducation[]) {
    if (!academicEducation[0]) return;
    const values = Object.values(academicEducation[0]).filter((value) => value);
    this.completed = +((values.length / 3) * 100).toFixed(2);
    this.academicEducation = academicEducation;
  }
  completed = 0;
}
