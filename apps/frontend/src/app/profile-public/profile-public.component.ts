import { Component, OnInit } from '@angular/core';
import { EthersService, LensService, TokenService } from '../services';
import { ActivatedRoute, Router } from '@angular/router';
import { FollowRequest } from '../interfaces/types';
import LENS_FOLLOW_NFT_ABI from '../../assets/abis/lens-follow-nft-contract-abi.json';
import { ethers } from 'ethers';

@Component({
  selector: 'wagademy-profile-public',
  templateUrl: './profile-public.component.html',
  styleUrls: ['./profile-public.component.css'],
})
export class ProfilePublicComponent implements OnInit {
  publications: any[] = [];
  display = 3;
  id = '';
  isLoading = false;
  routerNavbar = this.router.url.includes('/home/profile-public');
  profileId: string | null = null;
  reactionRequest: { profileId: string } | null = null;
  followModal = false;

  constructor(
    private lensService: LensService,
    private activatedRoute: ActivatedRoute,
    public router: Router,
    private ethersService: EthersService,
    private tokenService: TokenService
  ) {}

  ngOnInit() {
    this.activatedRoute.queryParamMap.subscribe((params) => {
      const id = params.get('id');
      if (id) this.id = id;
    });
    this.getProfilePublications();
  }

  async getProfilePublications() {
    try {
      const publications = await this.lensService.client.query({
        query: this.lensService.getProfileFeed,
        variables: {
          request: {
            publicationTypes: ['POST'],
            sources: ['Wagademy'],
            limit: this.display,
            profileId: this.id,
          },
          profileId: this.profileId,
          reactionRequest: this.reactionRequest,
        },
      });
      const items = publications.data.publications.items as [
        {
          profile: {
            id: string;
            name: string;
            handle: string;
            stats: { totalFollowers: number; totalFollowing: number };
            picture: {
              original: {
                url: string;
              };
            };
            coverPicture: {
              original: {
                url: string;
              };
            };
          };
          metadata: { description: string; content: string };
          createdAt: string;
        }
      ];
      this.publications = items.filter(
        (value) => value.metadata.description === 'Wagademy Certificate'
      );
    } catch (err) {
      return;
    }
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
      this.accept();
    });
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

  createUnfollowTypedData = async (request: any) => {
    const result = await this.lensService.client.mutate({
      mutation: this.lensService.unfollow,
      variables: { request },
    });
    return result.data!.createUnfollowTypedData;
  };
}
