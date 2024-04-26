import { Component } from '@angular/core';
import { CommonModule, DatePipe, Location } from '@angular/common';
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
import { HttpClient } from '@angular/common/http';
import { ToastService } from '../../../services/toast/toast.service';
import { UserService } from '../../../services/user/user.service';
import { CreateProfile } from '@wagademy/types';
import { Router } from '@angular/router';

interface Country {
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
  ],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css',
})
export class UserProfileComponent {
  countries: SelectItem<string>[] = [];
  states: SelectItem<string>[] = [];
  selectedCountry: string | null = '';
  profilePhoto: string | undefined;
  editMode = false;
  isCreating = false;
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
    private http: HttpClient,
    private toastService: ToastService,
    private readonly userService: UserService,
    private location: Location,
    private router: Router
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
      }
    }
  }

  removeExpertise(index: number): void {
    if (index >= 0 && index < this.expertises.length) {
      this.expertises.splice(index, 1);
    }
  }

  addSkill(): void {
    if (this.skills.length < 10 && this.skillsForm.valid) {
      const newSkill = this.skillsForm.get('skillsAndCompetencies')?.value;
      if (newSkill && newSkill.trim() !== '') {
        this.skills.push(newSkill.trim());
        this.skillsForm.reset();
      }
    }
  }

  removeSkill(index: number): void {
    if (index >= 0 && index < this.skills.length) {
      this.skills.splice(index, 1);
    }
  }

  onImageUploaded(imageUrl: string) {
    this.profilePhoto = imageUrl;
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

  createUserData() {
    return {
      ...this.userData.value,
      education: this.educationForm.value.items,
      professionalExperience: this.professionalExperienceForm.value.items,
      areasOfExpertise: [...this.expertises],
      skillsAndCompetencies: [...this.skills],
    } as unknown as CreateProfile;
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
