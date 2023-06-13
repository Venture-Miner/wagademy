import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { EthersService, LensService, TokenService } from '../../../services';
import {
  Curriculum,
  About,
  AcademicEducation,
  Experience,
  FollowRequest,
} from '../../../interfaces';
import { debounceTime } from 'rxjs';
import { ethers } from 'ethers';
import LENS_FOLLOW_NFT_ABI from '../../../../assets/abis/lens-follow-nft-contract-abi.json';

@Component({
  selector: 'wagademy-my-contacts',
  templateUrl: './my-contacts.component.html',
  styleUrls: ['./my-contacts.component.css'],
})
export class MyContactsComponent implements OnInit {
  followModal = false;
  addRecommendationModal = false;
  form = this.fb.group({
    description: [''],
  });
  following = [];
  profilePicture: string[] = [];
  curriculum!: Curriculum;
  about!: About;
  expertise: string[] = [];
  interest: string[] = [];
  academicEducation: AcademicEducation[] = [];
  experience: Experience[] = [];
  skillsAndCompetencies: string[] = [];
  curriculums: (undefined | Curriculum)[] = [];
  profile: any = null;
  isLoading = false;
  followForm = this.fb.group({
    search: [''],
  });
  profileImageURL = '';

  constructor(
    private fb: FormBuilder,
    private tokenService: TokenService,
    private lensService: LensService,
    private ethersService: EthersService
  ) {}

  async ngOnInit() {
    this.followForm.valueChanges
      .pipe(debounceTime(600))
      .subscribe(({ search }) => {
        this.getProfile(search);
      });
    try {
      const ethereumAddress = this.tokenService.getWalletAddress();
      const following = await this.lensService.client.query({
        query: this.lensService.following,
        variables: {
          request: {
            address: ethereumAddress,
            limit: 50,
          },
        },
      });
      this.following = following.data.following.items;
      this.getProfileImages(this.following);
      const curriculums = this.following.map(({ profile: { id } }) =>
        this.getProfileCurriculum(id)
      );
      this.curriculums = await Promise.all(curriculums);
    } catch (err) {
      return;
    }
  }

  async getProfile(handle: string | null | undefined) {
    const profile = await this.lensService.client.query({
      query: this.lensService.getProfile,
      variables: { request: { handle } },
    });
    this.profile = profile.data.profile;
    this.getProfileImage(this.profile?.picture?.original?.url);
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

  getProfileImages(following: any[]) {
    for (const profile of following) {
      if (!profile.picture)
        this.profilePicture.push(
          'https://lens.infura-ipfs.io/ipfs/QmY9dUwYu67puaWBMxRKW98LPbXCznPwHUbhX5NeWnCJbX'
        );
      else {
        const url = profile.picture.original.url;
        if (url.includes('http')) this.profilePicture.push(url);
        if (url.includes('ipfs://'))
          this.profilePicture.push(
            `https://ipfs.io/ipfs/${url.split('ipfs://')[1]}`
          );
        if (url.includes('ar://'))
          this.profilePicture.push(
            `https://arweave.net/${url.split('ar://')[1]}`
          );
      }
    }
  }

  getControl(field: string) {
    return this.form.get(field) as FormControl;
  }

  async getProfileCurriculum(profileId: string) {
    const posts = await this.lensService.client.query({
      query: this.lensService.getPosts,
      variables: {
        request: {
          profileId: profileId,
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
    if (!wagademyPosts[0]) {
      return;
    }
    return JSON.parse(wagademyPosts[0].metadata.content);
  }

  getAge(dateString: any) {
    if (dateString === null) return;
    const today = new Date();
    const birthDate = new Date(dateString);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }

  send() {
    //
  }

  createUnfollowTypedData = async (request: any) => {
    const result = await this.lensService.client.mutate({
      mutation: this.lensService.unfollow,
      variables: { request },
    });
    return result.data!.createUnfollowTypedData;
  };

  async unfollow(profileId: string) {
    this.isLoading = true;
    try {
      const result = await this.createUnfollowTypedData({
        profile: profileId,
      });
      const { domain, types, value } = result.typedData;
      const signature = await this.ethersService.signedTypeData(
        domain,
        types,
        value
      );
      const { v, r, s } = this.ethersService.splitSignature(signature!);
      const followNftContract = new ethers.Contract(
        domain.verifyingContract,
        LENS_FOLLOW_NFT_ABI,
        this.ethersService.ethersProvider?.getSigner()
      );
      const sig = {
        v,
        r,
        s,
        deadline: value.deadline,
      };
      const tx = await followNftContract['burnWithSig'](value.tokenId, sig);
      tx.wait().then(() => {
        this.isLoading = false;
      });
    } catch (_) {
      this.isLoading = false;
    }
  }

  async createFollowTypedData(request: FollowRequest) {
    const result = await this.lensService.client.mutate({
      mutation: this.lensService.follow,
      variables: { request },
    });
    return result.data!.createFollowTypedData;
  }

  async follow(profileId: string) {
    this.isLoading = true;
    try {
      const result = await this.createFollowTypedData({
        follow: [{ profile: profileId }],
      });
      const { domain, types, value } = result.typedData;
      const signature = await this.ethersService.signedTypeData(
        domain,
        types,
        value
      );
      const { v, r, s } = this.ethersService.splitSignature(signature!);
      const tx = await this.lensService.lensHub['followWithSig']({
        follower: this.tokenService.getWalletAddress(),
        profileIds: value.profileIds,
        datas: value.datas,
        sig: {
          v,
          r,
          s,
          deadline: value.deadline,
        },
      });
      tx.wait().then(() => {
        this.isLoading = false;
      });
    } catch (_) {
      this.isLoading = false;
    }
  }
}
