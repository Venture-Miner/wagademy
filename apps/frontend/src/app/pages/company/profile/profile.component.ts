import { NgFor, NgIf, NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { InputComponent } from '../../../shared/components/input/input.component';

@Component({
  selector: 'wagademy-profile',
  standalone: true,
  imports: [
    RouterModule,
    NgIf,
    FormsModule,
    InputComponent,
    NgFor,
    NgOptimizedImage,
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent {
  background!: string;
  backgroundFile!: File;
  profilePhotoFile!: File;
  profilePhoto!: string;
  companyName = 'Pandas LTDA.';
  description =
    'Pandas LTDA. is a leader in customized technological solutions. Specializing in software development, data analysis, and IT consulting, our technology-driven team is committed to simplifying complex processes. We prioritize excellence, offering tailor-made solutions that drive the growth and success of our clients businesses. Join us and embark on this journey towards the future of technology.';
  areaOfExpertise = 'Area of expertise';
  editProfile = false;
  areaOfInterest = [
    'word example',
    'word example',
    'word example',
    'word example',
    'word example',
    'word example',
    'word example',
    'word example',
  ];
  newWord = '';

  onFileChange(event: Event, isBackground: boolean) {
    const target = event.target as HTMLInputElement;
    const files = target.files;
    if (files) this.handleFile(files[0], isBackground);
  }

  handleFile(file: File, isBackground: boolean) {
    const fileUrl = URL.createObjectURL(file);
    if (isBackground) {
      this.backgroundFile = file;
      this.background = fileUrl;
    } else {
      this.profilePhotoFile = file;
      this.profilePhoto = fileUrl;
    }
    this.validateForm();
  }

  validateForm() {
    //
  }

  toggleEditProfile() {
    this.editProfile = !this.editProfile;
  }

  removeAreaOfInterest(index: number) {
    this.areaOfInterest.splice(index, 1);
  }

  addAreaOfInterest() {
    if (this.newWord.trim() !== '') {
      this.areaOfInterest.push(this.newWord.trim());
      this.newWord = '';
    }
  }
}
