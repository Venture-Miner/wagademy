import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'wagademy-add-email-modal',
  templateUrl: './add-email-modal.component.html',
  styleUrls: ['./add-email-modal.component.css'],
})
export class AddEmailModalComponent {
  showEmailConfirmModal = false;
  congratulationsMessage = '';
  showAddEmailModal = false;

  constructor(private router: Router) {}
  emailConfirm() {
    this.congratulationsMessage = 'You are subscribed';
    setTimeout(() => {
      this.congratulationsMessage = '';
    }, 2000);
  }
}
