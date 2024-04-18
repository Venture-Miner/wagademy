import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgFor } from '@angular/common';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormFieldComponent } from 'apps/frontend/src/app/shared/components/form-field/form-field.component';
import { InputComponent } from 'apps/frontend/src/app/shared/components/input/input.component';

@Component({
  selector: 'wagademy-skills',
  standalone: true,
  imports: [FormFieldComponent, InputComponent, ReactiveFormsModule, NgFor],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.css',
})
export class SkillsComponent {
  @Input() skillsForm!: FormGroup<any>;
  @Input() skills!: Array<string>;
  @Output() nextStep = new EventEmitter<void>();
  @Output() previousStep = new EventEmitter<void>();

  addSkill(): void {
    if (this.skills.length < 10 && this.skillsForm.valid) {
      const newSkill = this.skillsForm.get('newSkill')?.value;
      if (newSkill && newSkill.trim() !== '') {
        this.skills.push(newSkill.trim());
        this.skillsForm.reset();
      }
    }
  }

  removeSkill(index: number): void {
    if (index >= 0 && index < this.skills.length) {
      this.skills.splice(index, 1);
    }
  }
}
