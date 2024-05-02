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
import { UserService } from '../../../services/user/user.service';
import { CreateCompanyProfile } from '@wagademy/types';
import { Router } from '@angular/router';

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
    name: ['', Validators.required],
    areaOfExpertise: ['', Validators.required],
    about: ['', Validators.required],
    whatIsTheCompanyLookingFor: [
      this.fb.array<string>(
        [],
        [Validators.maxLength(10), Validators.minLength(1)]
      ),
    ],
    profilePhoto: [''],
  });
  step: 1 | 2 | 3 = 1;
  whatIsTheCompanyLookingFor: string[] = [];
  newWord = '';
  name = '';
  about = '';
  areaOfExpertise = '';
  editProfileSectionOne = false;
  editProfileSectionTwo = false;
  private stepIsValid = false;
  private isMax = false;
  private isCreating = false;

  constructor(
    private readonly fb: FormBuilder,
    private readonly toastService: ToastService,
    private readonly userService: UserService,
    private readonly router: Router
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
    this.form.patchValue({ profilePhoto: fileUrl });
  }

  validateFirstStep() {
    if (
      this.form.controls.areaOfExpertise.valid &&
      this.form.controls.about.valid &&
      this.form.controls.name.valid
    ) {
      this.stepIsValid = true;
    } else this.stepIsValid = false;
  }

  get stepIsValidValue() {
    return this.stepIsValid;
  }

  get isMaxValue() {
    return this.isMax;
  }

  get isCreatingValue() {
    return this.isCreating;
  }

  set changeStepIsValidValue(valid: boolean) {
    this.stepIsValid = valid;
  }

  removeWhatIsTheCompanyLookingFor(index: number) {
    this.whatIsTheCompanyLookingFor.splice(index, 1);
    if (this.whatIsTheCompanyLookingFor.length < 10) this.isMax = false;
    this.form.controls.whatIsTheCompanyLookingFor.setValue(
      this.whatIsTheCompanyLookingFor
    );
  }

  addWhatIsTheCompanyLookingFor() {
    if (this.newWord.trim() !== '') {
      this.whatIsTheCompanyLookingFor.push(this.newWord.trim());
      if (this.whatIsTheCompanyLookingFor.length === 10) this.isMax = true;
      this.form.controls.whatIsTheCompanyLookingFor.setValue(
        this.whatIsTheCompanyLookingFor
      );
      this.newWord = '';
    }
  }

  toggleEditProfileSectionOne() {
    this.editProfileSectionOne = !this.editProfileSectionOne;
  }

  toggleEditProfileSectionTwo() {
    this.editProfileSectionTwo = !this.editProfileSectionTwo;
  }

  saveAndConfirm() {
    this.isCreating = true;
    const createProfileDto = this.getDto();
    this.userService.createCompanyProfile(createProfileDto).subscribe({
      next: () => {
        this.toastService.showToast({
          message: 'Success! Profile successfully completed.',
          type: 'success',
        });
        this.isCreating = false;
        this.router.navigate(['/pages/hiring']);
      },
      error: () => {
        this.toastService.showToast({
          message: 'Error while creating your profile.',
          type: 'error',
        });
        this.isCreating = false;
      },
    });
  }

  private getDto() {
    const { profilePhoto, ...data } = this.form.value;
    const createProfile: CreateCompanyProfile = {
      ...(data as Omit<CreateCompanyProfile, 'companyPhoto'>),
    };
    if (profilePhoto) createProfile.companyPhoto = this.profilePhotoFile;
    return createProfile;
  }
}
