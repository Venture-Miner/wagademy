import { Component, ElementRef, ViewChild } from '@angular/core';
import { CropperComponent } from './components/cropper/cropper.component';
import { DialogService } from './services/dialog/dialog.service';
import { DropZoneDirective } from './directives/drop-zone.directive';
import { NgClass } from '@angular/common';
import { FileSizePipe } from './pipes/file-size.pipe';

@Component({
  selector: 'wagademy-files-upload',
  templateUrl: './files-upload.component.html',
  styleUrls: ['./files-upload.component.scss'],
  standalone: true,
  imports: [CropperComponent, DropZoneDirective, NgClass, FileSizePipe],
})
export class FilesUploadComponent {
  isHovering: boolean = false;
  error = '';

  imageToCrop: File | null = null;
  file: File | null = null;
  objectURL: string = '';

  @ViewChild('fileInput') fileInput!: ElementRef;

  constructor(private readonly dialogService: DialogService) {}

  toggleHover(isHovering: boolean) {
    this.isHovering = isHovering;
  }

  onFileInputChange(event: Event) {
    const files = (event.target as HTMLInputElement).files;
    const file = files?.item(0);
    if (file) {
      this.prepareImageForCropping(file);
    }
  }

  prepareImageForCropping(file: File) {
    if (file?.type.split('/')[0] !== 'image') {
      this.error = 'Please upload an image file';
      return;
    } else {
      this.error = '';
    }
    this.imageToCrop = file;
  }

  onCrop(file: File) {
    this.imageToCrop = null;
    this.file = file;
    this.objectURL = URL.createObjectURL(file);
    this.fileInput.nativeElement.value = '';
  }

  onSave() {
    this.dialogService.closeFileDialogWithResult(this.file);
  }
}
