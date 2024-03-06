import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Toast } from '../../shared/types/toast';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  showToast$ = new Subject<Toast | null>();

  showToast(toast: Toast) {
    this.showToast$.next(toast);
  }

  close() {
    this.showToast$.next(null);
  }
}
