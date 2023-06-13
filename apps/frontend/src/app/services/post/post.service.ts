import { Injectable } from '@angular/core';
import { LensService } from '../lens';
import { EthersService } from '../ethers';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(
    private lensService: LensService,
    private ethersService: EthersService
  ) {}

  async createPost(lensId: string, cid: string, collectible: boolean) {
    const post = await this.lensService.client.mutate({
      mutation: this.lensService.post,
      variables: {
        request: {
          profileId: lensId,
          contentURI: `ipfs://${cid}`,
          collectModule: collectible
            ? {
                freeCollectModule: {
                  followerOnly: true,
                },
              }
            : {
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
    const { v, r, s } = this.ethersService.splitSignature(signedResult!);
    return this.lensService.lensHub['postWithSig']({
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
  }
}
