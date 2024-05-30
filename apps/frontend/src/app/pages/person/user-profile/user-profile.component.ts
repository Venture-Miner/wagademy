import { Component } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FormFieldComponent } from '../../../shared/components/form-field/form-field.component';
import { InputComponent } from '../../../shared/components/input/input.component';
import {
  SelectComponent,
  SelectItem,
} from '../../../shared/components/select/select.component';
import { TextAreaComponent } from '../../../shared/components/text-area/text-area.component';
import { EducationComponent } from './components/education/education.component';
import {
  UserData,
  UserDataComponent,
} from './components/user-data/user-data.component';
import { ExpertiseComponent } from './components/expertise/expertise.component';
import { ProfessionalExperienceComponent } from './components/professional-experience/professional-experience.component';
import { SkillsComponent } from './components/skills/skills.component';
import { PhotoUploadComponent } from './components/photo-upload/photo-upload.component';
import { dateValidator } from '../../../shared/utils/date-comparison-validator';
import { User, UserProfile } from '@wagademy/types';
import { AuthService } from '../../../services/auth/auth.service';
import { UserProfileDisplayComponent } from '../../../shared/components/user-profile-display/user-profile-display.component';
import { ToastService } from '../../../services/toast/toast.service';
import { HttpClient } from '@angular/common/http';

export interface Country {
  iso2: string;
  name: string;
}

export interface State {
  country_code: string;
  state_code: string;
  name: string;
}

@Component({
  selector: 'wagademy-complete-profile',
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
    UserProfileDisplayComponent,
  ],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css',
})
export class UserProfileComponent {
  countries: SelectItem<string>[] = [];
  states: SelectItem<string>[] = [];
  selectedCountry: string | null = '';
  profilePhotoUrl!: string | undefined;
  profilePhotoFile!: File;
  isUpdateMode = false;
  step = 1;
  userData = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    dateOfBirth: ['', Validators.required],
    contactNumber: [
      '',
      [
        Validators.required,
        Validators.pattern(/^(00|\+|\*|#|[0-9])([0-9]+ ?)*[0-9]+$/),
      ],
    ],
    country: ['', Validators.required],
    state: ['', Validators.required],
    about: ['', Validators.required],
  }) as FormGroup<UserData>;
  educationForm!: FormGroup;
  professionalExperienceForm!: FormGroup;
  expertiseForm!: FormGroup;
  skillsForm!: FormGroup;
  expertises: string[] = [];
  skills: string[] = [];

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private http: HttpClient,
    private toastService: ToastService
  ) {
    this.educationForm = this.fb.group({
      items: this.fb.array([this.createEducationItem()]),
    });

    this.professionalExperienceForm = this.fb.group({
      items: this.fb.array([this.createProfessionalExperienceItem()]),
    });

    this.expertiseForm = this.fb.group({
      areasOfExpertise: [
        '',
        [Validators.maxLength(30), Validators.minLength(2)],
      ],
    });

    this.skillsForm = this.fb.group({
      skillsAndCompetencies: [
        '',
        [Validators.maxLength(30), Validators.minLength(2)],
      ],
    });

    this.getCountries();
  }

  ngOnInit() {
    const user = this.authService.user.value;
    if (user) {
      this.initializeUserData(user);
    }
  }

  initializeUserData(user: User): void {
    if (user?.userProfile) {
      const userProfile = user.userProfile as UserProfile;
      this.step = 6;
      this.isUpdateMode = true;
      this.userData.patchValue({
        name: userProfile.name,
        email: userProfile.email,
        dateOfBirth: userProfile.dateOfBirth,
        country: userProfile.country as unknown as SelectItem<string>,
        state: userProfile.state as unknown as SelectItem<string>,
        about: userProfile.about,
        contactNumber: userProfile.contactNumber,
      });
      (this.educationForm.get('items') as FormArray).clear();
      userProfile.education.forEach((educationItem) => {
        (this.educationForm.get('items') as FormArray).push(
          this.fb.group(educationItem)
        );
      });
      (this.professionalExperienceForm.get('items') as FormArray).clear();
      userProfile.professionalExperience.forEach(
        (professionalExperienceItem) => {
          (this.professionalExperienceForm.get('items') as FormArray).push(
            this.fb.group(professionalExperienceItem)
          );
        }
      );
      this.expertises = userProfile.areasOfExpertise;
      this.skills = userProfile.skillsAndCompetencies;
      this.profilePhotoUrl = userProfile.profilePhoto?.url;
    }
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
}
