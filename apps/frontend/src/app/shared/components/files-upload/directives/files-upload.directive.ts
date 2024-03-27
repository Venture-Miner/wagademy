import {
  Directive,
  HostListener,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { DialogService } from '../services/dialog/dialog.service';

@Directive({
  standalone: true,
  selector: '[appFilesUpload]',
})
export class FilesUploadDirective {
  @Output() changed = new EventEmitter<File | null>();
  @Input() shouldPreventDialogOpening = false;

  constructor(private readonly dialogService: DialogService) {}

  ngOnInit() {
    this.dialogService.dialogFileStatus.subscribe((data) => {
      this.changed.emit(data);
    });
  }

  @HostListener('click', ['$event']) onClick() {
    if (!this.shouldPreventDialogOpening) this.openDialog();
  }

  private openDialog() {
    this.dialogService.openFileDialog();
  }
}
