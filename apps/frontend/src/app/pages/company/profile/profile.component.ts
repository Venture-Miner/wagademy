import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { InputComponent } from '../../../shared/components/input/input.component';
import { UserService } from '../../../services/user/user.service';
import { ToastService } from '../../../services/toast/toast.service';
import { FormFieldComponent } from '../../../shared/components/form-field/form-field.component';
import { CompanyProfile, UpdateCompanyProfile } from '@wagademy/types';
import { BackButtonComponent } from '../../../shared/components/back-button/back-button.component';

@Component({
  selector: 'wagademy-profile',
  standalone: true,
  imports: [
    RouterModule,
    FormsModule,
    InputComponent,
    FormFieldComponent,
    ReactiveFormsModule,
    BackButtonComponent,
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent implements OnInit {
  background!: string;
  backgroundPhotoToCompare = '';
  backgroundFile!: File;
  profilePhotoFile!: File;
  profilePhoto!: string;
  profilePhotoToCompare = '';
  companyName = '';
  about = '';
  areaOfExpertise = '';
  editProfile = false;
  isUpdating = false;
  validForm = false;
  whatIsTheCompanyLookingFor: string[] = [];
  originalWhatIsTheCompanyLookingFor: string[] = [];
  newWord = '';
  companyProfileId = '';
  form = this.fb.group({
    companyName: ['', [Validators.required]],
    about: ['', [Validators.required]],
    areaOfExpertise: ['', [Validators.required]],
    whatIsTheCompanyLookingFor: [
      this.fb.array<string>(
        [],
        [Validators.maxLength(10), Validators.minLength(1)]
      ),
    ],
    profilePhoto: ['', [Validators.required]],
    backgroundPhoto: ['', [Validators.required]],
  });

  constructor(
    private readonly userService: UserService,
    private router: Router,
    private readonly toastService: ToastService,
    private readonly fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getUserData();
  }

  getUserData() {
    this.userService.self().subscribe({
      next: (user) => {
        if (!user?.companyProfile?.id)
          this.router.navigate(['/pages/home-company']);
        else this.companyProfileId = user.companyProfile?.id;
        this.getCompanyProfile();
      },
      error: () => {
        this.toastService.showToast({
          message: 'Error while getting user data',
          type: 'error',
        });
      },
    });
  }

  getCompanyProfile() {
    this.userService.findCompanyProfile(this.companyProfileId).subscribe({
      next: (profile) => {
        this.setInitialValues(profile);
      },
      error: () => {
        this.toastService.showToast({
          message: 'Error while retrieving profile',
          type: 'error',
        });
      },
    });
  }

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
      this.form.patchValue({ backgroundPhoto: fileUrl });
    } else {
      this.profilePhotoFile = file;
      this.form.patchValue({ profilePhoto: fileUrl });
      this.profilePhoto = fileUrl;
    }
    this.validateForm();
  }

  areEqual(array1: string[] = [], array2: string[] = []) {
    return (
      array1.length === array2.length &&
      array1.every((item) => array2.includes(item))
    );
  }

  validateForm() {
    if (
      this.form.value.whatIsTheCompanyLookingFor?.length &&
      (this.companyName !== this.form.value.companyName ||
        this.about !== this.form.value.about ||
        this.areaOfExpertise !== this.form.value.areaOfExpertise ||
        this.profilePhotoToCompare !== this.form.value.profilePhoto ||
        this.backgroundPhotoToCompare !== this.form.value.backgroundPhoto ||
        !this.areEqual(
          this.originalWhatIsTheCompanyLookingFor,
          this.form.value.whatIsTheCompanyLookingFor as Array<string>
        ))
    )
      this.validForm = true;
    else this.validForm = false;
  }

  setInitialValues(profile: CompanyProfile | null) {
    this.form.setValue({
      about: profile?.about ?? '',
      areaOfExpertise: profile?.areaOfExpertise ?? '',
      companyName: profile?.name ?? '',
      profilePhoto: profile?.companyPhoto?.url ?? '',
      whatIsTheCompanyLookingFor: profile?.whatIsTheCompanyLookingFor ?? [],
      backgroundPhoto: profile?.backgroundPhoto?.url ?? '',
    });

    this.about = profile?.about ?? '';
    this.areaOfExpertise = profile?.areaOfExpertise ?? '';
    this.whatIsTheCompanyLookingFor = profile?.whatIsTheCompanyLookingFor ?? [];
    this.companyName = profile?.name ?? '';
    this.profilePhoto = profile?.companyPhoto?.url ?? '';
    this.profilePhotoToCompare = this.profilePhoto;
    this.background = profile?.backgroundPhoto?.url ?? '';
    this.backgroundPhotoToCompare = this.background;
    this.originalWhatIsTheCompanyLookingFor =
      profile?.whatIsTheCompanyLookingFor
        ? [...profile.whatIsTheCompanyLookingFor]
        : [];
  }

  getDto() {
    const updateDto: UpdateCompanyProfile = {};
    if (this.profilePhotoToCompare !== this.form.value.profilePhoto)
      updateDto.companyPhoto = this.profilePhotoFile;
    if (this.backgroundPhotoToCompare !== this.form.value.backgroundPhoto)
      updateDto.backgroundPhoto = this.backgroundFile;

    if (this.about !== this.form.value.about)
      updateDto.about = this.form.value.about as string;
    if (this.areaOfExpertise !== this.form.value.areaOfExpertise)
      updateDto.areaOfExpertise = this.form.value.areaOfExpertise as string;

    if (
      !this.areEqual(
        this.originalWhatIsTheCompanyLookingFor,
        this.form.value.whatIsTheCompanyLookingFor as Array<string>
      )
    )
      updateDto.whatIsTheCompanyLookingFor = this.form.value
        .whatIsTheCompanyLookingFor as Array<string>;
    if (this.companyName !== this.form.value.companyName)
      updateDto.name = this.form.value.companyName as string;
    return updateDto;
  }

  updateProfile() {
    this.isUpdating = true;
    const updateDto = this.getDto();
    this.userService.updateCompanyProfile(updateDto).subscribe({
      next: (profile) => {
        this.isUpdating = false;
        this.editProfile = false;
        this.setInitialValues(profile);
        this.toastService.showToast({
          message: 'Profile successfully updated',
          type: 'success',
        });
      },
      error: () => {
        this.isUpdating = false;
        this.toastService.showToast({
          message: 'Error while updating profile',
          type: 'error',
        });
      },
    });
  }

  toggleEditProfile() {
    this.editProfile = !this.editProfile;
  }

  removeWhatIsTheCompanyLookingFor(index: number) {
    this.whatIsTheCompanyLookingFor.splice(index, 1);
    this.form.controls.whatIsTheCompanyLookingFor.setValue(
      this.whatIsTheCompanyLookingFor
    );
    this.validateForm();
  }

  addWhatIsTheCompanyLookingFor() {
    if (this.newWord.trim() !== '') {
      this.whatIsTheCompanyLookingFor.push(this.newWord.trim());
      this.form.controls.whatIsTheCompanyLookingFor.setValue(
        this.whatIsTheCompanyLookingFor
      );
      this.newWord = '';
    }
    this.validateForm();
  }
}
