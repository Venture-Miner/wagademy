import { Component, OnInit } from '@angular/core';
import { ToastService } from '../../../services/toast/toast.service';
import { NgClass, NgIf } from '@angular/common';
import { Toast } from '../../types/toast';

@Component({
  standalone: true,
  imports: [NgClass, NgIf],
  selector: 'wagademy-toast',
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.scss',
})
export class ToastComponent implements OnInit {
  toast: Toast | null = null;
  toastTimeout: NodeJS.Timeout | null = null;

  constructor(private readonly toastService: ToastService) {}

  ngOnInit() {
    this.toastService.showToast$.subscribe((toast) => {
      if (this.toastTimeout) {
        clearTimeout(this.toastTimeout);
      }

      this.toast = toast;

      this.toastTimeout = setTimeout(() => {
        this.toast = null;
      }, toast?.duration || 5000);
    });
  }
}
