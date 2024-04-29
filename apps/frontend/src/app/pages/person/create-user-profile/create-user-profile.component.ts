import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
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
import { ProfileComponent } from '../../../shared/components/profile/profile.component';

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
    ProfileComponent,
  ],
  templateUrl: './create-user-profile.component.html',
  styleUrl: './create-user-profile.component.css',
})
export class CreateUserProfileComponent {
  countries: SelectItem<string>[] = [];
  profilePhoto: string | undefined;
  step = 1;

  userData = this.fb.group({
    name: ['Jacob Jones', Validators.required],
    email: ['jones.jacob@email.com', [Validators.required, Validators.email]],
    birth: ['2024-04-03', Validators.required],
    cellphone: [
      '+55 11 912345-6789',
      [
        Validators.required,
        Validators.pattern(/^(00|\+|\*|#|[0-9])([0-9]+ ?)*[0-9]+$/),
      ],
    ],
    country: ['', Validators.required],
    state: ['', Validators.required],
    about: [
      'I’m Jacob, a professional with a degree in Software Engineering and a specialization in Project Management',
      Validators.required,
    ],
  }) as FormGroup<UserData>;

  educationForm!: FormGroup;

  professionalExperienceForm!: FormGroup;

  expertiseForm!: FormGroup;

  skillsForm!: FormGroup;

  expertises: string[] = ['Word example', 'Word example'];

  skills: string[] = ['Word example', 'Word example'];

  constructor(
    private fb: FormBuilder,
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
      newExpertise: [''],
    });

    this.skillsForm = this.fb.group({
      newSkill: [''],
    });

    this.getCountries();
  }

  onImageUploaded(imageUrl: string) {
    this.profilePhoto = imageUrl;
  }

  get educationItems(): FormArray {
    return this.educationForm.get('items') as FormArray;
  }

  removeEducationItem(index: number): void {
    this.educationItems.removeAt(index);
  }

  addEducationItem(): void {
    this.educationItems.push(this.createEducationItem());
  }

  createEducationItem(): FormGroup {
    return this.fb.group(
      {
        degree: ['BACHELOR', Validators.required],
        institution: [
          'Federal University of Minas Gerais (UFMG) - Belo Horizonte, Minas Gerais',
          Validators.required,
        ],
        course: ['Course name'],
        startDate: ['2024-04-03', Validators.required],
        endDate: ['2024-04-03', Validators.required],
        description: [
          'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. ',
        ],
      },
      { validators: dateValidator() }
    );
  }

  createProfessionalExperienceItem(): FormGroup {
    return this.fb.group(
      {
        company: ['Company', Validators.required],
        jobTitle: ['Job title', Validators.required],
        startDate: ['2024-04-03', Validators.required],
        endDate: ['02024-04-03', Validators.required],
        description: [
          'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. ',
        ],
      },
      { validators: dateValidator() }
    );
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
}
