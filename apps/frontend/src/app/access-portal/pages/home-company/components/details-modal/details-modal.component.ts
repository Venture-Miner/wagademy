import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import {
  CertificateService,
  LensService,
  TokenService,
} from '../../../../../services';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'wagademy-details-modal',
  templateUrl: './details-modal.component.html',
  styleUrls: ['./details-modal.component.css'],
})
export class DetailsModalComponent implements OnInit {
  @Output() cancel = new EventEmitter<void>();
  showDetailsModal = false;
  form = this.fb.group({
    student: ['', [Validators.required]],
    institution: ['', [Validators.required]],
    course: ['', [Validators.required]],
  });
  search = this.fb.group({
    handle: ['', [Validators.required]],
  });
  handleMessage = '';
  lensId = '';
  certificateMessage = '';
  handleExists = false;
  isLoading = false;
  profileImageURL =
    'https://lens.infura-ipfs.io/ipfs/QmY9dUwYu67puaWBMxRKW98LPbXCznPwHUbhX5NeWnCJbX';

  constructor(
    private fb: FormBuilder,
    private lensService: LensService,
    private tokenService: TokenService,
    private certificateService: CertificateService
  ) {}

  async ngOnInit() {
    const ethereumAddress = this.tokenService.getWalletAddress();
    const {
      data: {
        defaultProfile: { id },
      },
    } = await this.lensService.client.query({
      query: this.lensService.defaultProfileId,
      variables: {
        request: { ethereumAddress },
      },
    });
    this.lensId = id;
    this.form.valueChanges.subscribe(
      async ({ course, institution, student }) => {
        const date = new Date();
        const dd = String(date.getDate()).padStart(2, '0');
        const mm = String(date.getMonth() + 1).padStart(2, '0');
        const yyyy = date.getFullYear();
        const dateOfConclusion = mm + '/' + dd + '/' + yyyy;
        this.certificateMessage = `This certifies that ${student} has successfully completed the ${course} course conducted by ${institution} on ${dateOfConclusion}. This achievement is a testament to their dedication, commitment, and passion for personal and professional growth.`;
      }
    );
    this.search.valueChanges
      .pipe(debounceTime(600))
      .subscribe(async ({ handle }) => {
        const profile = await this.lensService.client.query({
          query: this.lensService.checkProfileExistence,
          variables: { request: { handle } },
        });
        this.getProfileImage(profile.data.profile?.picture?.original?.url);
        if (profile.data.profile?.id) {
          this.handleExists = true;
          this.handleMessage = 'User exists ✔️';
        } else {
          this.handleExists = false;
          this.handleMessage = 'User not found ❌';
        }
      });
  }

  getProfileImage(url: string | null) {
    url = url || '';
    if (url.includes('http')) {
      this.profileImageURL = url;
    } else if (url.includes('ipfs://')) {
      this.profileImageURL = `https://ipfs.io/ipfs/${url.split('ipfs://')[1]}`;
    } else if (url.includes('ar://')) {
      this.profileImageURL = `https://arweave.net/${url.split('ar://')[1]}`;
    } else {
      this.profileImageURL =
        'https://lens.infura-ipfs.io/ipfs/QmY9dUwYu67puaWBMxRKW98LPbXCznPwHUbhX5NeWnCJbX';
    }
  }

  async generateCertificate() {
    this.isLoading = true;
    (
      await this.certificateService.postCertificate(
        this.form.controls.student.value!,
        this.form.controls.course.value!,
        this.form.controls.institution.value!,
        this.search.controls.handle.value!,
        this.lensId
      )
    ).subscribe({
      next: async (tx) => {
        tx.wait().then(() => {
          this.isLoading = false;
          this.cancel.emit();
        });
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }
}
