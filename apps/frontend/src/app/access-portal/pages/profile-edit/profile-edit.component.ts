import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

type StepToEdit =
  | 'PROFILE'
  | 'EDUCATION'
  | 'EXPERIENCE'
  | 'EXPERTISE'
  | 'INTEREST'
  | 'SKILL';

@Component({
  selector: 'wagademy-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.css'],
})
export class ProfileEditComponent implements OnInit {
  form = this.fb.group({
    name: [''],
    email: [''],
    dateOfBirth: [''],
    cellphone: [''],
    country: [''],
    state: [''],
    about: [''],
    academicEducation: this.fb.array([
      this.fb.group({
        education: [''],
        course: [''],
        description: [''],
      }),
    ]),
    experience: this.fb.array([
      this.fb.group({
        company: [''],
        job: [''],
        description: [''],
      }),
    ]),
    expertise: [[]],
    interest: [[]],
    skillsAndCompetencies: [[]],
  });
  stepToEdit: StepToEdit = 'PROFILE';

  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.activatedRoute.queryParamMap.subscribe((params) => {
      const stepToEdit = params.get('stepToEdit');
      if (stepToEdit) {
        this.stepToEdit = stepToEdit as StepToEdit;
      } else {
        this.router.navigate(['/home/profile']);
      }
    });
  }
}
