import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'lens-academy-email-confirm-modal',
  templateUrl: './email-confirm-modal.component.html',
  styleUrls: ['./email-confirm-modal.component.css'],
})
export class EmailConfirmModalComponent {
  form!: FormGroup;
  emailForm = this.fb.group({
    email: ['', Validators.required],
  });
  congratulationsMessage = '';
  showAddEmailModal = false;
  @Output() cancel = new EventEmitter<void>();

  constructor(private fb: FormBuilder) {}

  addEmail() {
    //
  }

  confirmEmail() {
    this.congratulationsMessage = 'A reminder was sent to your email';
    setTimeout(() => {
      this.congratulationsMessage = '';
    }, 2000);
  }
}
