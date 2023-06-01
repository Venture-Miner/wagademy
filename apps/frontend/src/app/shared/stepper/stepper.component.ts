import { Component, Input } from '@angular/core';

@Component({
  selector: 'wagademy-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.css'],
})
export class StepperComponent {
  @Input() currentStep = 1;
  @Input() steps: string[] = [];
}
