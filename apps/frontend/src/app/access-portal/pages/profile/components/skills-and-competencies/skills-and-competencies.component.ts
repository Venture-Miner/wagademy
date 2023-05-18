import { Component, Input } from '@angular/core';

@Component({
  selector: 'lens-academy-skills-and-competencies',
  templateUrl: './skills-and-competencies.component.html',
  styleUrls: ['./skills-and-competencies.component.css'],
})
export class SkillsAndCompetenciesComponent {
  @Input() skillsAndCompetencies: string[] = [];
}
