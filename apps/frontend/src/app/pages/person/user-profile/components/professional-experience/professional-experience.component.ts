import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgClass, NgFor } from '@angular/common';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FormFieldComponent } from 'apps/frontend/src/app/shared/components/form-field/form-field.component';
import { InputComponent } from 'apps/frontend/src/app/shared/components/input/input.component';
import { SelectComponent } from 'apps/frontend/src/app/shared/components/select/select.component';
import { TextAreaComponent } from 'apps/frontend/src/app/shared/components/text-area/text-area.component';

@Component({
  selector: 'wagademy-professional-experience',
  standalone: true,
  imports: [
    FormFieldComponent,
    InputComponent,
    ReactiveFormsModule,
    SelectComponent,
    TextAreaComponent,
    NgClass,
    NgFor,
  ],
  templateUrl: './professional-experience.component.html',
  styleUrl: './professional-experience.component.css',
})
export class ProfessionalExperienceComponent {
  @Input() professionalExperienceForm!: FormGroup<any>;
  @Output() nextStep = new EventEmitter<void>();
  @Output() previousStep = new EventEmitter<void>();

  constructor(private fb: FormBuilder) {}

  createProfessionalExperienceItem(): FormGroup {
    return this.fb.group({
      company: ['Company', Validators.required],
      jobTitle: ['Job title', Validators.required],
      startDate: ['2024-04-03', Validators.required],
      endDate: ['02024-04-03', Validators.required],
      description: [
        'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. ',
      ],
    });
  }

  get professionalExperienceItems(): FormArray {
    return this.professionalExperienceForm.get('items') as FormArray;
  }

  addProfessionalExperienceItem(): void {
    this.professionalExperienceItems.push(
      this.createProfessionalExperienceItem()
    );
  }

  removeProfessionalExperienceItem(index: number): void {
    this.professionalExperienceItems.removeAt(index);
  }
}
