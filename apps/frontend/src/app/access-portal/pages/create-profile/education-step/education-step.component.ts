import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'lens-academy-education-step',
  templateUrl: './education-step.component.html',
  styleUrls: ['./education-step.component.css'],
})
export class EducationStepComponent {
  @Input() form!: FormGroup;
  @Input() mode!: 'CREATE' | 'EDIT' | 'VIEW' | 'CREATED';
  @Output() nextStep = new EventEmitter<void>();
  @Output() previousStep = new EventEmitter<void>();
  @Output() saveEdit = new EventEmitter<void>();
  @Output() edit = new EventEmitter<void>();

  constructor(private fb: FormBuilder) {}

  get academicEducation() {
    return this.form.get('academicEducation') as FormArray<FormGroup>;
  }

  addEducation() {
    const educationForm = this.fb.group({
      education: [''],
      course: [''],
      description: [''],
    });
    this.academicEducation.push(educationForm);
  }

  removeEducation(educationIndex: number) {
    this.academicEducation.removeAt(educationIndex);
  }
}
