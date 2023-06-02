import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'wagademy-education-step',
  templateUrl: './education-step.component.html',
  styleUrls: ['./education-step.component.css'],
})
export class EducationEditStepComponent {
  @Input() form!: FormGroup;
  @Output() saveEdit = new EventEmitter<void>();

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
