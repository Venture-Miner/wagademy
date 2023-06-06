import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import {
  IpfsService,
  LensService,
  PostService,
  TokenService,
} from '../../../services';
import { v4 as uuidv4 } from 'uuid';
import { Router } from '@angular/router';

@Component({
  selector: 'wagademy-create-company-profile',
  templateUrl: './create-company-profile.component.html',
  styleUrls: ['./create-company-profile.component.css'],
})
export class CreateCompanyProfileComponent {
  currentStep = 1;
  form = this.fb.group({
    name: [''],
    areaOfExpertise: [''],
    description: [''],
    interests: [[]],
  });
  mode: 'CREATE' | 'EDIT' | 'VIEW' | 'CREATED' = 'CREATE';
  steps = ['Profile', 'What are you looking for?'];
  congratulationsMessage = 'Profile Created Successfully!';

  constructor(
    private fb: FormBuilder,
    private ipfsService: IpfsService,
    private tokenService: TokenService,
    private lensService: LensService,
    private postService: PostService,
    private router: Router
  ) {}

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

  async createProfile() {
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
    this.ipfsService
      .createPost({
        version: '2.0.0',
        mainContentFocus: 'TEXT_ONLY',
        description: 'Wagademy Company Profile',
        metadata_id: uuidv4(),
        locale: 'en-US',
        content: JSON.stringify(this.form.value),
        name: `@${handle} Company Profile`,
        attributes: [],
        tags: [this.tokenService.getAccountType()],
        appId: 'Wagademy',
      })
      .subscribe({
        next: async ({ cid }) => {
          const tx = await this.postService.createPost(id, cid, false);
          tx.wait().then(() => {
            this.mode = 'CREATED';
            this.redirect();
          });
        },
      });
  }

  redirect() {
    setTimeout(() => {
      this.router.navigate(['/home-company']);
    }, 3000);
  }
}
