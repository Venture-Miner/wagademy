import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  private fileInDialog$ = new BehaviorSubject<File | null>(null);

  get dialogFileStatus(): Observable<File | null> {
    return this.fileInDialog$.asObservable();
  }

  openFileDialog() {
    window.filesUpload['showModal']();
  }

  closeFileDialogWithResult(file: File | null) {
    this.fileInDialog$.next(file);
  }
}
