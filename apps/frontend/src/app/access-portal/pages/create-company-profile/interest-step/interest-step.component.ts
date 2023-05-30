import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'wagademy-interest-step',
  templateUrl: './interest-step.component.html',
  styleUrls: ['./interest-step.component.css'],
})
export class InterestStepComponent {
  @Input() form!: FormGroup;
  @Input() mode!: 'CREATE' | 'EDIT' | 'VIEW';
  @Input() interestForm = this.fb.group({
    interest: ['', Validators.required],
  });
  @Output() nextStep = new EventEmitter<void>();
  @Output() previousStep = new EventEmitter<void>();
  @Output() saveEdit = new EventEmitter<void>();
  @Output() edit = new EventEmitter<void>();

  constructor(private fb: FormBuilder) {}

  get interests() {
    return this.interestsControl.value;
  }

  get interestsControl() {
    return this.form.get('interests')!;
  }

  get interest() {
    return this.interestControl.value;
  }

  get interestControl() {
    return this.interestForm.get('interest')!;
  }

  addInterest() {
    if (!this.interest || this.interest.length < 1) return;
    this.interestsControl.setValue([...this.interests, this.interest]);
    this.interestControl.reset();
    if (this.interests.length >= 10) this.interestControl.disable();
  }

  removeInterest(interestIndex: number) {
    const filteredInterests = this.interests.filter(
      (_: string, index: number) => index !== interestIndex
    );
    this.interestsControl.setValue(filteredInterests);
    this.interestControl.enable();
  }
}
