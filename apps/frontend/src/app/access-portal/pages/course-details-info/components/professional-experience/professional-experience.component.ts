import { Component, Input } from '@angular/core';

@Component({
  selector: 'wagademy-professional-experience',
  templateUrl: './professional-experience.component.html',
  styleUrls: ['./professional-experience.component.css'],
})
export class TeacherProfessionalExperienceComponent {
  @Input() company = '';
  @Input() job = '';
  @Input() descriptionJob = '';
}
