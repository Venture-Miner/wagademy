import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'wagademy-photo-upload',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './photo-upload.component.html',
  styleUrl: './photo-upload.component.css',
})
export class PhotoUploadComponent {
  @Input() profilePhoto: File | undefined;
  @Input() size: 'small' | 'big' = 'small';
  @Output() imageUploaded = new EventEmitter<File>();

  handleFileInput(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.profilePhoto = e.target.result;
      };
      reader.readAsDataURL(file);
      this.imageUploaded.emit(file);
    }
  }
}
