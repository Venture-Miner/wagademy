import { Component, Input } from '@angular/core';

@Component({
  selector: 'lens-academy-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.css'],
})
export class PersonalInfoComponent {
  @Input() data: any;
}
