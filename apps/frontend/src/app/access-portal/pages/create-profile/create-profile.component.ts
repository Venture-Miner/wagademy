import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import {
  LensService,
  TokenService,
  EthersService,
  IpfsService,
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
    private lensService: LensService,
    private tokenService: TokenService,
    private ethersService: EthersService,
    private ipfsService: IpfsService
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

  async createCurriculum() {
    this.ipfsService
      .uploadIpfs({
        version: '2.0.0',
        mainContentFocus: 'TEXT_ONLY',
        description: 'Academy Curriculum',
        metadata_id: uuidv4(),
        locale: 'en-US',
        content: JSON.stringify(this.form.value),
        external_url: null,
        image: null,
        imageMimeType: null,
        name: `@${this.handle} Curriculum`,
        attributes: [],
        tags: [],
        appId: 'Academy',
      })
      .subscribe({
        next: (ipfsResult) => {
          this.createPost(ipfsResult.path);
        },
      });
  }

  async createPost(path: string) {
    const post = await this.lensService.client.mutate({
      mutation: this.lensService.post,
      variables: {
        request: {
          profileId: this.lensId,
          contentURI: `ipfs://${path}`,
          collectModule: {
            revertCollectModule: true,
          },
          referenceModule: {
            followerOnlyReferenceModule: false,
          },
        },
      },
    });
    const { domain, types, value } = post.data!.createPostTypedData.typedData;
    const signedResult = await this.ethersService.signedTypeData(
      domain,
      types,
      value
    );
    const { v, r, s } = this.ethersService.splitSignature(signedResult);
    const tx = await this.lensService.lensHub['postWithSig']({
      profileId: value.profileId,
      contentURI: value.contentURI,
      collectModule: value.collectModule,
      collectModuleInitData: value.collectModuleInitData,
      referenceModule: value.referenceModule,
      referenceModuleInitData: value.referenceModuleInitData,
      sig: {
        v,
        r,
        s,
        deadline: value.deadline,
      },
    });
    tx.wait().then(() => {
      this.mode = 'CREATED';
    });
  }
}
