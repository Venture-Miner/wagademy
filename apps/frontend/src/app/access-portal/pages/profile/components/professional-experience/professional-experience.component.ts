import { Experience } from '../../../../../interfaces';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'lens-academy-professional-experience',
  templateUrl: './professional-experience.component.html',
  styleUrls: ['./professional-experience.component.css'],
})
export class ProfessionalExperienceComponent {
  _experience: Experience[] = [];
  @Input() set experience(experience: Experience[]) {
    if (!experience[0]) return;
    const values = Object.values(experience[0]).filter((value) => value);
    this.completed = +((values.length / 3) * 100).toFixed(2);
    this._experience = experience;
  }
  completed = 0;
}
