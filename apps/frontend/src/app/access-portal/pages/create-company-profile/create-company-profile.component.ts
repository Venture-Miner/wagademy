import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'wagademy-create-company-profile',
  templateUrl: './create-company-profile.component.html',
  styleUrls: ['./create-company-profile.component.css'],
})
export class CreateCompanyProfileComponent {
  currentStep = 1;
  form = this.fb.group({
    name: [''],
    areaOfExpertise: [''],
    description: [''],
    interests: [[]],
  });
  mode: 'CREATE' | 'EDIT' | 'VIEW' = 'CREATE';
  steps = ['Profile', 'What are you looking for?'];

  constructor(private fb: FormBuilder) {}

  nextStep() {
    this.currentStep += 1;
    if (this.currentStep > this.steps.length) {
      this.showSummary();
    }
  }

  previousStep() {
    this.currentStep -= 1;
  }

  edit(stepToEdit: number) {
    this.form.enable();
    this.mode = 'EDIT';
    this.currentStep = stepToEdit;
  }

  showSummary() {
    this.form.disable();
    this.mode = 'VIEW';
  }

  back() {
    this.form.enable();
    this.mode = 'CREATE';
    this.currentStep = this.steps.length;
  }

  createProfile() {}
}
