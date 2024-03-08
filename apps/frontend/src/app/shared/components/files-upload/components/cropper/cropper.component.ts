import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ImageCroppedEvent, ImageCropperModule } from 'ngx-image-cropper';

@Component({
  selector: 'wagademy-cropper',
  templateUrl: './cropper.component.html',
  styleUrl: './cropper.component.scss',
  standalone: true,
  imports: [ImageCropperModule],
})
export class CropperComponent {
  @Input() imageFile: File | null = null;

  @Output() changed = new EventEmitter<File>();

  croppedImage: File | null = null;

  imageCropped(event: ImageCroppedEvent) {
    const blob = event.blob;
    if (blob) {
      this.croppedImage = new File([blob], 'profilePicture');
    }
  }

  onCrop() {
    if (this.croppedImage) {
      this.changed.emit(this.croppedImage);
    }
  }
}
