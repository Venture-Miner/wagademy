import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'lens-academy-profile-step',
  templateUrl: './profile-step.component.html',
  styleUrls: ['./profile-step.component.css'],
})
export class ProfileEditStepComponent {
  @Input() form!: FormGroup;
  @Output() saveEdit = new EventEmitter<void>();

  getControl(field: string) {
    return this.form.get(field) as FormControl;
  }
}
