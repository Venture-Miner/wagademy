import { Component, Input } from '@angular/core';

@Component({
  selector: 'lens-academy-button-primary',
  templateUrl: './button-primary.component.html',
  styleUrls: ['./button-primary.component.css'],
})
export class ButtonPrimaryComponent {
  @Input() disabled = false;
}
