import { Injectable } from '@angular/core';
import {
  ApolloClient,
  InMemoryCache,
  gql,
  NormalizedCacheObject,
  HttpLink,
  ApolloLink,
  concat,
} from '@apollo/client/core';
import {
  createFollowTypedData,
  authenticate,
  challenge,
  profile,
  userProfiles,
  defaultProfileId,
  createPostTypedData,
  getPosts,
  metadataOutput,
  postFields,
  createProfile,
  setDefaultProfile,
  recommendedProfiles,
  refreshToken,
  verify,
  getProfile,
  updateProfile,
  getProfileAttributes,
  createFollowingTypedData,
  createCollectTypedData,
  checkProfileExistence,
} from '../../graphql';
import { ethers } from 'ethers';
import { environment } from '../../../environments/environment';
import { EthersService } from '../ethers';
import LENS_HUB_ABI from '../../../assets/abis/lens-hub-contract-abi.json';
import LENS_PERIPHERY_ABI from '../../../assets/abis/lens-periphery-data-provider.json';
import fetch from 'cross-fetch';

@Injectable({
  providedIn: 'root',
})
export class LensService {
  client: ApolloClient<NormalizedCacheObject>;
  lensHub = new ethers.Contract(
    environment.LENS_HUB_CONTRACT,
    LENS_HUB_ABI,
    this.ethersService.ethersProvider.getSigner()
  );
  ensPeriphery = new ethers.Contract(
    environment.LENS_PERIPHERY_CONTRACT,
    LENS_PERIPHERY_ABI,
    this.ethersService.ethersProvider.getSigner()
  );

  constructor(private ethersService: EthersService) {
    const authMiddleware = new ApolloLink((operation, forward) => {
      const token = localStorage.getItem('token');
      operation.setContext({
        headers: {
          authorization: token ? `Bearer ${token}` : '',
        },
      });
      return forward(operation);
    });
    const API_URL = 'https://api-mumbai.lens.dev';
    const API_LINK = new HttpLink({ uri: API_URL, fetch });
    this.client = new ApolloClient({
      link: concat(authMiddleware, API_LINK),
      cache: new InMemoryCache(),
    });
  }

  challenge = gql(challenge);

  authenticate = gql(authenticate);

  follow = gql(createFollowTypedData);

  createProfile = gql(createProfile);

  profileFields = {
    profile: gql`
      ${profile}
    `,
  };

  userProfiles = gql`
    ${userProfiles}
    ${this.profileFields.profile}
  `;

  defaultProfileId = gql(defaultProfileId);

  post = gql(createPostTypedData);

  metadataOutput = {
    metadata: gql`
      ${metadataOutput}
    `,
  };

  postFields = {
    posts: gql`
      ${postFields}
      ${this.metadataOutput.metadata}
    `,
  };

  getPosts = gql`
    ${getPosts}
    ${this.postFields.posts}
  `;

  setDefaultProfile = gql(setDefaultProfile);

  recommendedProfiles = gql(recommendedProfiles);

  refreshToken = gql(refreshToken);

  verifyToken = gql(verify);

  getProfile = gql(getProfile);

  updateProfile = gql(updateProfile);

  getProfileAttributes = gql(getProfileAttributes);

  following = gql(createFollowingTypedData);

  collect = gql(createCollectTypedData);

  checkProfileExistence = gql(checkProfileExistence);
}
