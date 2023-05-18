import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'lens-academy-company-profile-step',
  templateUrl: './company-profile-step.component.html',
  styleUrls: ['./company-profile-step.component.css'],
})
export class CompanyProfileStepComponent {
  @Input() form!: FormGroup;
  @Input() mode!: 'CREATE' | 'EDIT' | 'VIEW';
  @Output() nextStep = new EventEmitter<void>();
  @Output() saveEdit = new EventEmitter<void>();
  @Output() edit = new EventEmitter<void>();

  getControl(field: string) {
    return this.form.get(field) as FormControl;
  }
}
