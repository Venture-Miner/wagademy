export const profile = `fragment ProfileFields on Profile {
  id
  name
  handle
  bio
  ownedBy
  isFollowedByMe
  stats {
    totalFollowers
    totalFollowing
    __typename
  }
  attributes {
    key
    value
    __typename
  }
  picture {
    ... on MediaSet {
      original {
        url
        __typename
      }
      __typename
    }
    ... on NftImage {
      uri
      __typename
    }
    __typename
  }
  followModule {
    __typename
  }
  __typename
}`;

export const userProfiles = `query UserProfiles($ownedBy: [EthereumAddress!]) {
  profiles(request: {ownedBy: $ownedBy}) {
    items {
      ...ProfileFields
      interests
      isDefault
      dispatcher {
        address
        canUseRelay
        sponsor
        __typename
      }
      __typename
    }
    __typename
  }
  userSigNonces {
    lensHubOnChainSigNonce
    __typename
  }
}`;
