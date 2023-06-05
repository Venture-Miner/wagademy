import { Component, Input } from '@angular/core';

@Component({
  selector: 'wagademy-professional-experience',
  templateUrl: './professional-experience.component.html',
  styleUrls: ['./professional-experience.component.css'],
})
export class ProfessionalExperienceComponent {
  @Input() data: any;
}
