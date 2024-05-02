import { NgClass } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { FormFieldComponent } from '../components/form-field/form-field.component';
import { InputComponent } from '../components/input/input.component';

@Component({
  standalone: true,
  imports: [NgClass, InputComponent, ReactiveFormsModule, FormFieldComponent],
  selector: 'wagademy-modal',
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
})
export class ModalComponent {
  @Input() actionButtonLabel = '';
  @Input() title = '';
  @Input() message = '';
  @Input() isLoading = false;
  @Input() typeModal: 'success' | 'cancel' = 'success';
  @Input() externalForm: FormControl | undefined;
  @Input() inputLabel = '';

  @Output() actionButtonClick = new EventEmitter<void>();
}
