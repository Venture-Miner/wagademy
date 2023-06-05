import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'wagademy-professional-experience-step',
  templateUrl: './professional-experience-step.component.html',
  styleUrls: ['./professional-experience-step.component.css'],
})
export class ProfessionalExperienceEditStepComponent {
  @Input() form!: FormGroup;
  @Output() saveEdit = new EventEmitter<void>();

  constructor(private fb: FormBuilder) {}

  get experience() {
    return this.form.get('experience') as FormArray<FormGroup>;
  }

  addExperience() {
    const experienceForm = this.fb.group({
      company: [''],
      job: [''],
      description: [''],
    });
    this.experience.push(experienceForm);
  }

  removeExperience(experienceIndex: number) {
    this.experience.removeAt(experienceIndex);
  }
}
