import { Component, EventEmitter, Output } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'lens-academy-details-modal',
  templateUrl: './details-modal.component.html',
  styleUrls: ['./details-modal.component.css'],
})
export class DetailsModalComponent {
  @Output() cancel = new EventEmitter<void>();
  showDetailsModal = false;
  form = this.fb.group({
    course: ['', [Validators.required]],
    institution: ['', [Validators.required]],
    hours: ['', [Validators.required]],
  });

  constructor(private fb: FormBuilder) {}
}
