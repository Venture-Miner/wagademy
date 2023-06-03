import { Component } from '@angular/core';
import { ethers } from 'ethers';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { LensService } from '../../../services/lens/lens.service';
import { TokenService } from '../../../services/token/token.service';
import { EthersService, IpfsService } from '../../../services';
import { v4 as uuidv4 } from 'uuid';
import {
  ProfileMetadata,
  MetadataVersions,
  ACCOUNT_TYPE,
  AttributeData,
} from '../../../interfaces';
import { BroadcastDocument } from '../../../interfaces/generated';

@Component({
  selector: 'wagademy-account-type',
  templateUrl: './account-type.component.html',
  styleUrls: ['./account-type.component.css'],
})
export class AccountTypeComponent {
  showConnectWalletModal = false;
  accountType: ACCOUNT_TYPE | undefined;
  ACCOUNT_TYPE = ACCOUNT_TYPE;
  address = '';
  doesNotHaveAccount = false;
  register = false;
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
    private fb: FormBuilder,
    private ipfsService: IpfsService,
    private ethersService: EthersService
  ) {
    this.token$ = this.tokenService.getToken();
  }

  async connectWithMetamask() {
    const account = await window.ethereum.send('eth_requestAccounts');
    if (account.result.length) {
      this.address = account.result[0];
      await this.login();
      this.hasProfile();
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

  async handleRegister() {
    const account = await window.ethereum.send('eth_requestAccounts');
    if (account.result.length) {
      this.address = account.result[0];
      await this.login();
      await this.createProfileRequest();
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
    const wagademyPosts = items.filter(
      (items) =>
        items.appId === 'wagademy' &&
        items.metadata.description === 'Wagademy Curriculum'
    );
    await this.verifyAttribute(profileId, wagademyPosts);
  }

  async verifyAttribute(profileId: string, wagademyPosts: unknown[]) {
    const {
      data: { profile },
    }: { data: { profile: ProfileMetadata } } =
      await this.lensService.client.query({
        query: this.lensService.getProfileAttributes,
        variables: { request: { profileId } },
      });
    const attributes: AttributeData[] = profile.attributes.filter(
      ({ key }) => key === 'ACCOUNT_TYPE'
    );
    if (!attributes.length)
      await this.setAccountTypeAttribute(profile, profileId, wagademyPosts);
    else {
      this.tokenService.setAccountType(attributes[0].value);
      if (attributes[0].value === ACCOUNT_TYPE.physicalPerson) {
        if (!wagademyPosts[0]) await this.router.navigate(['/create-profile']);
        else await this.router.navigate(['/home']);
      } else {
        if (!wagademyPosts[0])
          await this.router.navigate(['/create-company-profile']);
        else await this.router.navigate(['/company-home']);
      }
    }
  }

  async setAccountTypeAttribute(
    profile: ProfileMetadata,
    profileId: string,
    wagademyPosts: unknown[]
  ) {
    const attributes: { key: string; value: string }[] = [];
    profile.attributes.forEach(({ key, value }) => {
      attributes.push({ key, value });
    });
    const accountType = this.accountType as string;
    this.tokenService.setAccountType(accountType);
    const profileMetadata: ProfileMetadata = {
      name: profile.name,
      metadata_id: uuidv4(),
      bio: profile.bio,
      cover_picture: profile.cover_picture ? profile.cover_picture : null,
      attributes: [
        {
          key: 'ACCOUNT_TYPE',
          value: accountType,
        },
        ...attributes,
      ],
      version: MetadataVersions.one,
    };
    this.ipfsService.createPost(profileMetadata).subscribe({
      next: ({ cid }) => {
        this.updateProfileAttribute(`ipfs://${cid}`, profileId, wagademyPosts)
          .then()
          .catch((err) => console.error(err));
      },
    });
  }

  async updateProfileAttribute(
    metadata: string,
    profileId: string,
    wagademyPosts: unknown[]
  ) {
    const { data } = await this.lensService.client.mutate({
      mutation: this.lensService.updateProfile,
      variables: { request: { profileId, metadata } },
    });
    const { domain, types, value } =
      data.createSetProfileMetadataTypedData.typedData;
    const signature = await this.ethersService.signedTypeData(
      domain,
      types,
      value
    );
    await this.lensService.client.mutate({
      mutation: BroadcastDocument,
      variables: {
        request: {
          id: data.createSetProfileMetadataTypedData.id,
          signature,
        },
      },
    });
    if (this.accountType === ACCOUNT_TYPE.physicalPerson) {
      if (!wagademyPosts[0]) await this.router.navigate(['/create-profile']);
      else await this.router.navigate(['/home']);
    } else {
      if (!wagademyPosts[0])
        await this.router.navigate(['/create-company-profile']);
      else await this.router.navigate(['/company-home']);
    }
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
    const profile = await this.lensService.client
      .query({
        query: this.lensService.userProfiles,
        variables: { ownedBy: this.address },
        fetchPolicy: 'no-cache',
      })
      .catch(() => {
        this.isLoading = false;
      });
    if (!profile) return;
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
