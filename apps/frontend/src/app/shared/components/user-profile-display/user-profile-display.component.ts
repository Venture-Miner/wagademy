import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { CommonModule, DatePipe, Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import {
  ReactiveFormsModule,
  Validators,
  FormGroup,
  FormBuilder,
  FormArray,
} from '@angular/forms';
import { Router } from '@angular/router';
import { CreateProfile, UpdateProfile } from '@wagademy/types';
import { EducationComponent } from '../../../pages/person/user-profile/components/education/education.component';
import { ExpertiseComponent } from '../../../pages/person/user-profile/components/expertise/expertise.component';
import { PhotoUploadComponent } from '../../../pages/person/user-profile/components/photo-upload/photo-upload.component';
import { ProfessionalExperienceComponent } from '../../../pages/person/user-profile/components/professional-experience/professional-experience.component';
import { SkillsComponent } from '../../../pages/person/user-profile/components/skills/skills.component';
import {
  UserData,
  UserDataComponent,
} from '../../../pages/person/user-profile/components/user-data/user-data.component';
import {
  Country,
  State,
} from '../../../pages/person/user-profile/user-profile.component';
import { AuthService } from '../../../services/auth/auth.service';
import { ToastService } from '../../../services/toast/toast.service';
import { UserService } from '../../../services/user/user.service';
import { dateValidator } from '../../utils/date-comparison-validator';
import { FormFieldComponent } from '../form-field/form-field.component';
import { InputComponent } from '../input/input.component';
import { SelectComponent, SelectItem } from '../select/select.component';
import { TextAreaComponent } from '../text-area/text-area.component';

@Component({
  selector: 'wagademy-user-profile-display',
  standalone: true,
  imports: [
    CommonModule,
    FormFieldComponent,
    InputComponent,
    ReactiveFormsModule,
    SelectComponent,
    TextAreaComponent,
    EducationComponent,
    UserDataComponent,
    ExpertiseComponent,
    ProfessionalExperienceComponent,
    SkillsComponent,
    PhotoUploadComponent,
    DatePipe,
  ],
  templateUrl: './user-profile-display.component.html',
  styleUrl: './user-profile-display.component.css',
})
export class UserProfileDisplayComponent {
  @Input() userData!: FormGroup<UserData>;
  @Input() isMax!: boolean;
  @Input() isMaxExpertises!: boolean;
  @Input() profilePhotoUrl!: string | undefined;
  @Input() profilePhotoFile: File | undefined;
  @Input() educationForm!: FormGroup;
  @Input() professionalExperienceForm!: FormGroup;
  @Input() expertiseForm!: FormGroup;
  @Input() skillsForm!: FormGroup;
  @Input() expertises!: string[];
  @Input() skills!: string[];
  @Input() step!: number;
  @Input() isUpdateMode!: boolean;

  countries: SelectItem<string>[] = [];
  states: SelectItem<string>[] = [];
  selectedCountry = '';
  isCreating = false;
  isUpdating = false;
  editMode = false;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private toastService: ToastService,
    private readonly userService: UserService,
    private location: Location,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.getCountries();
  }

  createEducationItem(): FormGroup {
    return this.fb.group(
      {
        degree: ['', Validators.required],
        institution: ['', Validators.required],
        course: ['', Validators.required],
        stillStudying: [false],
        startDate: ['', Validators.required],
        endDate: [''],
        description: [''],
      },
      { validators: dateValidator() }
    );
  }

  createProfessionalExperienceItem(): FormGroup {
    return this.fb.group(
      {
        company: ['', Validators.required],
        jobTitle: ['', Validators.required],
        currentlyWorkingHere: [false],
        startDate: ['', Validators.required],
        endDate: [''],
        description: [''],
      },
      { validators: dateValidator() }
    );
  }

  addEducationItem(): void {
    this.educationItems.push(this.createEducationItem());
  }

  get educationItems(): FormArray {
    return this.educationForm.get('items') as FormArray;
  }

  removeEducationItem(index: number): void {
    this.educationItems.removeAt(index);
  }

  get professionalExperienceItems(): FormArray {
    return this.professionalExperienceForm.get('items') as FormArray;
  }

  addProfessionalExperienceItem(): void {
    this.professionalExperienceItems.push(
      this.createProfessionalExperienceItem()
    );
  }

  removeProfessionalExperienceItem(index: number): void {
    this.professionalExperienceItems.removeAt(index);
  }

  addExpertise(): void {
    if (this.expertises.length < 10 && this.expertiseForm.valid) {
      const newExpertise = this.expertiseForm.get('areasOfExpertise')?.value;
      if (newExpertise && newExpertise.trim() !== '') {
        this.expertises.push(newExpertise.trim());
        this.expertiseForm.reset();
        if (this.expertises.length === 10) {
          this.isMaxExpertises = true;
          this.cdr.detectChanges();
        }
      }
    }
  }

  removeExpertise(index: number): void {
    if (index >= 0 && index < this.expertises.length) {
      this.expertises.splice(index, 1);
      if (this.expertises.length < 10) {
        this.isMaxExpertises = false;
        this.cdr.detectChanges();
      }
    }
  }

  get isMaxValueOfExpertises() {
    return this.isMaxExpertises;
  }

  addSkill(): void {
    if (this.skills.length < 10 && this.skillsForm.valid) {
      const newSkill = this.skillsForm.get('skillsAndCompetencies')?.value;
      if (newSkill && newSkill.trim() !== '') {
        this.skills.push(newSkill.trim());
        this.skillsForm.reset();
        if (this.skills.length === 10) {
          this.isMax = true;
          this.cdr.detectChanges();
        }
      }
    }
  }

  removeSkill(index: number): void {
    if (index >= 0 && index < this.skills.length) {
      this.skills.splice(index, 1);
      if (this.skills.length < 10) {
        this.isMax = false;
        this.cdr.detectChanges();
      }
    }
  }

  get isMaxValue() {
    return this.isMax;
  }

  onImageUploaded(imageData: { url: string; file: File }) {
    this.profilePhotoUrl = imageData.url;
    this.profilePhotoFile = imageData.file;
  }

  getCountries() {
    this.http.get<Country[]>('./assets/countries/countries.json').subscribe({
      next: (data: Country[]) => {
        this.countries = data.map((country) => ({
          value: country.iso2,
          label: country.name,
        }));
      },
      error: () => {
        this.toastService.showToast({
          message: 'Failed fetching countries.',
          type: 'error',
        });
      },
    });
  }

  onCountrySelect(event: string) {
    this.selectedCountry = event;
    this.states = [];
    if (this.selectedCountry) {
      this.getStates(this.selectedCountry);
    }
  }

  getStates(countryIso2: string) {
    this.http.get<State[]>('./assets/countries/states.json').subscribe({
      next: (data: State[]) => {
        const filteredStates = data.filter(
          (state) => state.country_code === countryIso2
        );
        this.states = filteredStates.map((state) => ({
          value: state.name,
          label: state.name,
        }));
      },
      error: () => {
        this.toastService.showToast({
          message: 'Failed fetching states.',
          type: 'error',
        });
      },
    });
  }

  onCheckboxChange(
    event: Event,
    index: number,
    controlName: 'educationItems' | 'professionalExperienceItems',
    fieldName: 'stillStudying' | 'currentlyWorkingHere'
  ) {
    this[controlName].controls[index]
      .get(fieldName)
      ?.setValue((event.target as HTMLInputElement).checked);
  }

  get areAllFormsValid() {
    return (
      this.userData.invalid ||
      this.educationForm.invalid ||
      this.professionalExperienceForm.invalid ||
      this.expertiseForm.invalid ||
      this.skillsForm.invalid
    );
  }

  createUserData() {
    return {
      ...this.userData.value,
      education: this.educationForm.value.items,
      professionalExperience: this.professionalExperienceForm.value.items,
      areasOfExpertise: [...this.expertises],
      skillsAndCompetencies: [...this.skills],
      profilePhoto: this.profilePhotoFile,
    } as unknown as CreateProfile;
  }

  updateUserProfile() {
    this.isUpdating = true;
    const updateUserProfileDto: UpdateProfile = this.createUserData();
    this.userService.updateUserProfile(updateUserProfileDto).subscribe({
      next: () => {
        this.toastService.showToast({
          message: 'Profile successfully updated.',
          type: 'success',
        });
        this.isUpdating = false;
        this.authService.loadUserData();
        if (this.location.getState() !== null) {
          this.location.back();
        } else {
          this.router.navigate(['/pages/home']);
        }
      },
      error: () => {
        this.isUpdating = false;
        this.toastService.showToast({
          message: 'Error while updating profile.',
          type: 'error',
        });
      },
    });
  }

  createUserProfile() {
    this.isCreating = true;
    const createUserProfileDto: CreateProfile = this.createUserData();
    this.userService.createUserProfile(createUserProfileDto).subscribe({
      next: () => {
        this.toastService.showToast({
          message: 'Profile successfully created.',
          type: 'success',
        });
        this.isCreating = false;
        this.authService.loadUserData();
        if (this.location.getState() !== null) {
          this.location.back();
        } else {
          this.router.navigate(['/pages/home']);
        }
      },
      error: () => {
        this.isCreating = false;
        this.toastService.showToast({
          message: 'Error while creating profile.',
          type: 'error',
        });
      },
    });
  }
}
