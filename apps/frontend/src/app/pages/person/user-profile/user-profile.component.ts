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
  ],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css',
})
export class UserProfileComponent {
  mockCountries: SelectItem<string>[] = [
    { value: 'BR', label: 'Brazil' },
    { value: 'EUA', label: 'United States' },
  ];

  mockStates: SelectItem<string>[] = [
    { value: 'MG', label: 'Minas Gerais' },
    { value: 'TX', label: 'Texas' },
  ];

  profilePhoto: string | undefined;

  editMode = false;

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
    country: ['BR', Validators.required],
    state: ['MG', Validators.required],
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

  constructor(private fb: FormBuilder) {
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
  }

  createEducationItem(): FormGroup {
    return this.fb.group({
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
    });
  }

  createProfessionalExperienceItem(): FormGroup {
    return this.fb.group({
      company: ['Company', Validators.required],
      jobTitle: ['Job title', Validators.required],
      startDate: ['2024-04-03', Validators.required],
      endDate: ['02024-04-03', Validators.required],
      description: [
        'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. ',
      ],
    });
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

  addSkill(): void {
    if (this.skills.length < 10 && this.skillsForm.valid) {
      const newSkill = this.skillsForm.get('newSkill')?.value;
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
}
