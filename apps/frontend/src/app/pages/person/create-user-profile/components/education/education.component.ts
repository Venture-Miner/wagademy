import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { NgClass } from '@angular/common';
import { FormFieldComponent } from '../../../../../shared/components/form-field/form-field.component';
import { InputComponent } from '../../../../../shared/components/input/input.component';
import { SelectComponent } from '../../../../../shared/components/select/select.component';
import { TextAreaComponent } from '../../../../../shared/components/text-area/text-area.component';
import { dateValidator } from 'apps/frontend/src/app/shared/utils/date-comparison-validator';

@Component({
  selector: 'wagademy-education',
  standalone: true,
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.css'],
  imports: [
    NgClass,
    FormFieldComponent,
    InputComponent,
    ReactiveFormsModule,
    SelectComponent,
    TextAreaComponent,
  ],
})
export class EducationComponent {
  @Input() educationForm!: FormGroup<any>;
  @Output() nextStep = new EventEmitter<void>();
  @Output() previousStep = new EventEmitter<void>();

  constructor(private fb: FormBuilder) {}

  addEducationItem(): void {
    this.educationItems.push(this.createEducationItem());
  }

  createEducationItem(): FormGroup {
    return this.fb.group(
      {
        degree: ['BACHELOR', Validators.required],
        institution: [
          'Federal University of Minas Gerais (UFMG) - Belo Horizonte, Minas Gerais',
          Validators.required,
        ],
        course: ['Course name'],
        startDate: ['2024-04-03', Validators.required],
        endDate: ['2024-04-03', Validators.required],
        description: [
          'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. ',
        ],
      },
      { validators: dateValidator() }
    );
  }

  get educationItems(): FormArray {
    return this.educationForm.get('items') as FormArray;
  }

  removeEducationItem(index: number): void {
    this.educationItems.removeAt(index);
  }
}
