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
  @Input() profilePhoto: string | undefined;
  @Input() size: 'small' | 'big' = 'small';
  @Output() onImageUploaded = new EventEmitter<string>();

  handleFileInput(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const fileUrl = URL.createObjectURL(file);
        this.profilePhoto = fileUrl;
        this.onImageUploaded.emit(fileUrl);
      };
      reader.readAsDataURL(file);
    }
  }
}
