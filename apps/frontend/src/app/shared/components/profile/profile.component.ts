import { Component } from '@angular/core';
import { PhotoUploadComponent } from '../../../pages/person/user-profile/components/photo-upload/photo-upload.component';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FormFieldComponent } from '../form-field/form-field.component';
import { InputComponent } from '../input/input.component';
import { SelectComponent, SelectItem } from '../select/select.component';
import { NgClass } from '@angular/common';
import { UserData } from '../../../pages/person/user-profile/components/user-data/user-data.component';
import { State } from '../../../pages/person/user-profile/user-profile.component';
import { HttpClient } from '@angular/common/http';
import { ToastService } from '../../../services/toast/toast.service';
import { dateValidator } from '../../utils/date-comparison-validator';
import { Router } from '@angular/router';
import { BackButtonComponent } from '../back-button/back-button.component';

@Component({
  standalone: true,
  imports: [
    PhotoUploadComponent,
    FormFieldComponent,
    InputComponent,
    ReactiveFormsModule,
    SelectComponent,
    NgClass,
    BackButtonComponent,
  ],
  selector: 'wagademy-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent {
  countries: SelectItem<string>[] = [];
  states: SelectItem<string>[] = [];
  selectedCountry: string | null = '';
  profilePhoto: string | undefined;
  editMode = false;

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
    private toastService: ToastService,
    public router: Router
  ) {}

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

  addEducationItem(): void {
    this.educationItems.push(this.createEducationItem());
  }

  get educationItems(): FormArray {
    return this.educationForm.get('items') as FormArray;
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
      const newExpertise = this.expertiseForm.get('newExpertise')?.value;
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

  removeSkill(index: number): void {
    if (index >= 0 && index < this.skills.length) {
      this.skills.splice(index, 1);
    }
  }

  addSkill(): void {
    if (this.skills.length < 10 && this.skillsForm.valid) {
      const newSkill = this.skillsForm.get('newSkill')?.value;
      if (newSkill && newSkill.trim() !== '') {
        this.skills.push(newSkill.trim());
        this.skillsForm.reset();
      }
    }
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
}
