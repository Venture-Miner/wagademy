import { Component } from '@angular/core';
import { InputComponent } from '../../../shared/components/input/input.component';
import { FormFieldComponent } from '../../../shared/components/form-field/form-field.component';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgClass } from '@angular/common';
import { BackButtonComponent } from '../../../shared/components/back-button/back-button.component';
import { ToastService } from '../../../services/toast/toast.service';

@Component({
  selector: 'wagademy-create-profile',
  standalone: true,
  imports: [
    InputComponent,
    FormFieldComponent,
    ReactiveFormsModule,
    NgClass,
    FormsModule,
    BackButtonComponent,
  ],
  templateUrl: './create-profile.component.html',
  styleUrl: './create-profile.component.scss',
})
export class CreateProfileComponent {
  profilePhotoFile!: File;
  profilePhoto!: string;
  form = this.fb.group({
    companyName: ['', Validators.required],
    areaOfExpertise: ['', Validators.required],
    description: ['', Validators.required],
    newWord: [''],
  });
  step: 1 | 2 | 3 = 1;
  areaOfInterest: string[] = [];
  newWord = '';
  companyName = 'Pandas LTDA.';
  description =
    'Pandas LTDA. is a leader in customized technological solutions. Specializing in software development, data analysis, and IT consulting, our technology-driven team is committed to simplifying complex processes. We prioritize excellence, offering tailor-made solutions that drive the growth and success of our clients businesses. Join us and embark on this journey towards the future of technology.';
  areaOfExpertise = 'Area of expertise';
  editProfileSectionOne = false;
  editProfileSectionTwo = false;
  createJobForm = this.fb.group({
    jobName: ['', Validators.required],
    description: ['', Validators.required],
    contract: ['', Validators.required],
    allocation: ['', Validators.required],
  });

  constructor(
    private readonly fb: FormBuilder,
    private readonly toastService: ToastService
  ) {}

  onFileChange(event: Event) {
    const target = event.target as HTMLInputElement;
    const files = target.files;
    if (files) this.handleFile(files[0]);
  }

  handleFile(file: File) {
    const fileUrl = URL.createObjectURL(file);
    this.profilePhotoFile = file;
    this.profilePhoto = fileUrl;
    this.validateForm();
  }

  validateForm() {
    //
  }

  removeAreaOfInterest(index: number) {
    this.areaOfInterest.splice(index, 1);
  }

  addAreaOfInterest() {
    const newWord = this.form.value.newWord?.trim() ?? '';
    if (newWord !== '') {
      this.areaOfInterest.push(newWord);
      this.form.get('newWord')?.setValue('');
    }
  }

  toggleEditProfileSectionOne() {
    this.editProfileSectionOne = !this.editProfileSectionOne;
  }

  toggleEditProfileSectionTwo() {
    this.editProfileSectionTwo = !this.editProfileSectionTwo;
  }

  saveAndConfirm() {
    this.toastService.showToast({
      message: 'Success! Profile successfully completed.',
      type: 'success',
    });
  }
}
