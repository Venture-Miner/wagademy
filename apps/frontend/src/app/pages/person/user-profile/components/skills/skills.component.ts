import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormFieldComponent } from '../../../../../shared/components/form-field/form-field.component';
import { InputComponent } from '../../../../../shared/components/input/input.component';

@Component({
  selector: 'wagademy-skills',
  standalone: true,
  imports: [FormFieldComponent, InputComponent, ReactiveFormsModule],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.css',
})
export class SkillsComponent {
  @Input() skillsForm!: FormGroup<any>;
  @Input() skills!: Array<string>;
  @Output() nextStep = new EventEmitter<void>();
  @Output() previousStep = new EventEmitter<void>();
  private isMax = false;

  constructor(private cdr: ChangeDetectorRef) {}

  addSkill(): void {
    if (this.skills.length < 10 && this.skillsForm.valid) {
      const newSkill = this.skillsForm.get('newSkill')?.value;
      if (newSkill && newSkill.trim() !== '') {
        this.skills.push(newSkill.trim());
        this.skillsForm.reset();
        if (this.skills.length === 10) {
          this.isMax = true;
          this.cdr.detectChanges();
        }
      }
    }
  }

  removeSkill(index: number): void {
    if (index >= 0 && index < this.skills.length) {
      this.skills.splice(index, 1);
      if (this.skills.length < 10) {
        this.isMax = false;
        this.cdr.detectChanges();
      }
    }
  }

  get isMaxValue() {
    return this.isMax;
  }
}
