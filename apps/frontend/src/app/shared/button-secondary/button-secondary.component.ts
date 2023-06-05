import { Component, Input } from '@angular/core';

@Component({
  selector: 'wagademy-button-secondary',
  templateUrl: './button-secondary.component.html',
  styleUrls: ['./button-secondary.component.css'],
})
export class ButtonSecondaryComponent {
  @Input() disabled = false;
}
