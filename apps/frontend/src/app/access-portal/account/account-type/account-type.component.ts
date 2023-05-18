import { Component } from '@angular/core';
import { LensService, TokenService } from '@/services';
import { ethers } from 'ethers';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';

enum ACCOUNT_TYPE {
  physicalPerson = 'physicalPerson',
  company = 'company',
}

@Component({
  selector: 'lens-academy-account-type',
  templateUrl: './account-type.component.html',
  styleUrls: ['./account-type.component.css'],
})
export class AccountTypeComponent {
  showConnectWalletModal = false;
  accountType: ACCOUNT_TYPE | undefined;
  ACCOUNT_TYPE = ACCOUNT_TYPE;
  address = '';
  doesNotHaveAccount = false;
  handleTaken = false;
  isLoading = false;
  token$;
  form = this.fb.group({
    handle: [
      '',
      [Validators.required, Validators.minLength(5), Validators.maxLength(31)],
    ],
  });

  constructor(
    private lensService: LensService,
    private tokenService: TokenService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.token$ = this.tokenService.getToken();
  }

  async connectWithMetamask() {
    const account = await window.ethereum.send('eth_requestAccounts');
    if (account.result.length) {
      this.address = account.result[0];
      this.login();
    }
  }

  async login() {
    try {
      const challengeInfo = await this.lensService.client.query({
        query: this.lensService.challenge,
        variables: { address: this.address },
      });
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = await provider.getSigner();
      const signature = await signer.signMessage(
        challengeInfo.data.challenge.text
      );
      const authData = await this.lensService.client.mutate({
        mutation: this.lensService.authenticate,
        variables: {
          address: this.address,
          signature,
        },
      });
      const {
        data: {
          authenticate: { accessToken, refreshToken },
        },
      } = authData;
      this.tokenService.setToken(accessToken);
      this.tokenService.setRefreshToken(refreshToken);
      this.hasProfile();
    } catch (err) {
      console.log('Error signing in: ', err);
    }
  }

  async hasProfile() {
    const profile = await this.lensService.client.query({
      query: this.lensService.userProfiles,
      variables: { ownedBy: this.address },
    });
    const {
      data: {
        profiles: { items },
      },
    } = profile;
    if (items.length) {
      await this.hasDefaultProfile(items[0].id);
    } else {
      this.doesNotHaveAccount = true;
    }
  }

  async hasDefaultProfile(profileId: string) {
    const {
      data: { defaultProfile },
    } = await this.lensService.client.query({
      query: this.lensService.defaultProfileId,
      variables: {
        request: { ethereumAddress: this.address },
      },
    });
    if (defaultProfile) return this.hasPosts(defaultProfile.id);
    await this.setDefaultProfile(profileId);
  }

  async setDefaultProfile(profileId: string) {
    await this.lensService.client.mutate({
      mutation: this.lensService.setDefaultProfile,
      variables: { request: { profileId } },
    });
    await this.hasPosts(profileId);
  }

  async hasPosts(profileId: string) {
    const posts = await this.lensService.client.query({
      query: this.lensService.getPosts,
      variables: {
        request: {
          profileId,
          publicationTypes: ['POST'],
          metadata: { mainContentFocus: ['TEXT_ONLY'] },
        },
      },
    });
    const items = posts.data.publications.items as [
      { appId: string; metadata: { description: string; content: string } }
    ];
    const academyPosts = items.filter(
      (items) =>
        items.appId === 'academy' &&
        items.metadata.description === 'Academy Curriculum'
    );
    if (!academyPosts[0]) this.router.navigate(['/create-profile']);
    else this.router.navigate(['/home']);
  }

  async createProfileRequest() {
    this.isLoading = true;
    const result = await this.lensService.client.mutate({
      mutation: this.lensService.createProfile,
      variables: {
        request: {
          handle: this.form.controls['handle'].value!,
          profilePictureUri: null,
          followNFTURI: null,
          followModule: null,
        },
      },
    });
    if (result.data.createProfile.reason === 'HANDLE_TAKEN') {
      this.isLoading = false;
      this.handleTaken = true;
    } else {
      await this.pollProfile();
    }
  }

  async pollProfile() {
    const profile = await this.lensService.client.query({
      query: this.lensService.userProfiles,
      variables: { ownedBy: this.address },
      fetchPolicy: 'no-cache',
    });
    const {
      data: {
        profiles: { items },
      },
    } = profile;
    if (!items.length) {
      setTimeout(() => {
        this.pollProfile();
      }, 2500);
    } else {
      await this.setDefaultProfile(items[0].id);
      this.isLoading = false;
    }
  }
}
