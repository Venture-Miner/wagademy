import { Component, OnInit } from '@angular/core';
import { EthersService, LensService, TokenService } from '../../../services';
import { RecommendedProfileData, FollowRequest } from '../../../interfaces';

@Component({
  selector: 'lens-academy-recommendations-page',
  templateUrl: './recommendations-page.component.html',
  styleUrls: ['./recommendations-page.component.css'],
})
export class RecommendationsPageComponent implements OnInit {
  followModal = false;
  recommendations: RecommendedProfileData[] = [];
  profilePicture: string[] = [];

  constructor(
    private lensService: LensService,
    private ethersService: EthersService,
    private tokenService: TokenService
  ) {}

  async ngOnInit() {
    const recommended = await this.lensService.client.query({
      query: this.lensService.recommendedProfiles,
    });
    this.recommendations = recommended.data.recommendedProfiles;
    this.getProfileImage(this.recommendations);
  }

  getProfileImage(recommendation: RecommendedProfileData[]) {
    for (const rec of recommendation) {
      if (!rec.picture)
        this.profilePicture.push(
          'https://lens.infura-ipfs.io/ipfs/QmY9dUwYu67puaWBMxRKW98LPbXCznPwHUbhX5NeWnCJbX'
        );
      else {
        const url = rec.picture.original.url;
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

  accept() {
    this.followModal = true;
    this.resetModal();
  }

  resetModal() {
    setTimeout(() => {
      this.followModal = false;
    }, 2000);
  }

  async createFollowTypedData(request: FollowRequest) {
    const result = await this.lensService.client.mutate({
      mutation: this.lensService.follow,
      variables: { request },
    });
    return result.data!.createFollowTypedData;
  }

  async follow(profileId: string) {
    const result = await this.createFollowTypedData({
      follow: [{ profile: profileId }],
    });
    const { domain, types, value } = result.typedData;
    const signature = await this.ethersService.signedTypeData(
      domain,
      types,
      value
    );
    const { v, r, s } = this.ethersService.splitSignature(signature);
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
      this.accept();
    });
  }
}
