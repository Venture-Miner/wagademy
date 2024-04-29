import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormFieldComponent } from '../../../../../shared/components/form-field/form-field.component';
import { InputComponent } from '../../../../../shared/components/input/input.component';

@Component({
  selector: 'wagademy-expertise',
  standalone: true,
  imports: [FormFieldComponent, InputComponent, ReactiveFormsModule],
  templateUrl: './expertise.component.html',
  styleUrl: './expertise.component.css',
})
export class ExpertiseComponent {
  @Input() expertiseForm!: FormGroup<any>;
  @Input() expertises!: Array<string>;
  @Output() nextStep = new EventEmitter<void>();
  @Output() previousStep = new EventEmitter<void>();

  addExpertise(): void {
    if (this.expertises.length < 10 && this.expertiseForm.valid) {
      const newExpertise = this.expertiseForm.get('newExpertise')?.value;
      if (newExpertise && newExpertise.trim() !== '') {
        this.expertises.push(newExpertise.trim());
        this.expertiseForm.reset();
      }
    }
  }

  removeExpertise(index: number): void {
    if (index >= 0 && index < this.expertises.length) {
      this.expertises.splice(index, 1);
    }
  }
}
