import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import {
  LensService,
  TokenService,
  IpfsService,
  PostService,
} from '../../../services';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'lens-academy-create-profile',
  templateUrl: './create-profile.component.html',
  styleUrls: ['./create-profile.component.css'],
})
export class CreateProfileComponent implements OnInit {
  currentStep = 1;
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
    expertise: [[]],
    experience: this.fb.array([
      this.fb.group({
        company: [''],
        job: [''],
        description: [''],
      }),
    ]),
    interest: [[]],
    skillsAndCompetencies: [[]],
  });
  mode: 'CREATE' | 'EDIT' | 'VIEW' | 'CREATED' = 'CREATE';
  steps = [
    'Profile',
    'Education',
    'Area of expertise',
    'Professional experience',
    'Areas of interest',
    'Skills and competencies',
  ];
  lensId = '';
  handle = '';

  constructor(
    private fb: FormBuilder,
    private tokenService: TokenService,
    private lensService: LensService,
    private ipfsService: IpfsService,
    private postService: PostService
  ) {}

  async ngOnInit() {
    const ethereumAddress = this.tokenService.getWalletAddress();
    const {
      data: {
        defaultProfile: { id, handle },
      },
    } = await this.lensService.client.query({
      query: this.lensService.defaultProfileId,
      variables: {
        request: { ethereumAddress },
      },
    });
    this.lensId = id;
    this.handle = handle;
  }

  nextStep() {
    this.currentStep += 1;
    if (this.currentStep > this.steps.length) {
      this.showSummary();
    }
  }

  previousStep() {
    this.currentStep -= 1;
  }

  edit(stepToEdit: number) {
    this.form.enable();
    this.mode = 'EDIT';
    this.currentStep = stepToEdit;
  }

  showSummary() {
    this.form.disable();
    this.mode = 'VIEW';
  }

  back() {
    this.form.enable();
    this.mode = 'CREATE';
    this.currentStep = this.steps.length;
  }

  createCurriculum() {
    this.ipfsService
      .createPost({
        version: '2.0.0',
        mainContentFocus: 'TEXT_ONLY',
        description: 'Academy Curriculum',
        metadata_id: uuidv4(),
        locale: 'en-US',
        content: JSON.stringify(this.form.value),
        name: `@${this.handle} Curriculum`,
        attributes: [],
        tags: [this.tokenService.getAccountType()],
        appId: 'Academy',
      })
      .subscribe({
        next: async ({ cid }) => {
          const tx = await this.postService.createPost(this.lensId, cid, false);
          tx.wait().then(() => {
            this.mode = 'CREATED';
          });
        },
      });
  }
}
