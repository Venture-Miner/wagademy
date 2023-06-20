export const getFeed = `query ExploreFeed($request: ExplorePublicationRequest!, $reactionRequest: ReactionFieldResolverRequest, $profileId: ProfileId) {
  explorePublications(request: $request) {
    items {
      ... on Post {
        ...PostFields
        __typename
      }
      ... on Comment {
        ...CommentFields
        __typename
      }
      ... on Mirror {
        ...MirrorFields
        __typename
      }
      __typename
    }
    pageInfo {
      next
      __typename
    }
    __typename
  }
}
`;

export const postFieldsFeed = `fragment PostFields on Post {
  id
  profile {
    ...ProfileFields
    __typename
  }
  reaction(request: $reactionRequest)
  mirrors(by: $profileId)
  hasCollectedByMe
  onChainContentURI
  isGated
  isDataAvailability
  dataAvailabilityProofs
  canComment(profileId: $profileId) {
    result
    __typename
  }
  canMirror(profileId: $profileId) {
    result
    __typename
  }
  canDecrypt(profileId: $profileId) {
    result
    reasons
    __typename
  }
  collectModule {
    ...CollectModuleFields
    __typename
  }
  stats {
    ...StatsFields
    __typename
  }
  metadata {
    ...MetadataFields
    __typename
  }
  hidden
  createdAt
  appId
  __typename
}`;

export const profileFields = `fragment ProfileFields on Profile {
  id
  name
  handle
  bio
  ownedBy
  isFollowedByMe
  stats {
    totalFollowers
    totalFollowing
    totalPosts
    totalComments
    totalMirrors
    __typename
  }
  attributes {
    traitType
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
      tokenId
      contractAddress
      chainId
      __typename
    }
    __typename
  }
  coverPicture {
    ... on MediaSet {
      original {
        url
        __typename
      }
      __typename
    }
    __typename
  }
  followModule {
    __typename
  }
  __typename
}`;

export const collectModule = `fragment CollectModuleFields on CollectModule {
  ... on FreeCollectModuleSettings {
    type
    contractAddress
    followerOnly
    __typename
  }
  ... on FeeCollectModuleSettings {
    type
    referralFee
    contractAddress
    followerOnly
    amount {
      ...ModuleFeeAmountFields
      __typename
    }
    __typename
  }
  ... on LimitedFeeCollectModuleSettings {
    type
    collectLimit
    referralFee
    contractAddress
    followerOnly
    amount {
      ...ModuleFeeAmountFields
      __typename
    }
    __typename
  }
  ... on LimitedTimedFeeCollectModuleSettings {
    type
    collectLimit
    endTimestamp
    referralFee
    contractAddress
    followerOnly
    amount {
      ...ModuleFeeAmountFields
      __typename
    }
    __typename
  }
  ... on TimedFeeCollectModuleSettings {
    type
    endTimestamp
    referralFee
    contractAddress
    followerOnly
    amount {
      ...ModuleFeeAmountFields
      __typename
    }
    __typename
  }
  ... on MultirecipientFeeCollectModuleSettings {
    type
    optionalCollectLimit: collectLimit
    optionalEndTimestamp: endTimestamp
    referralFee
    followerOnly
    contractAddress
    amount {
      ...ModuleFeeAmountFields
      __typename
    }
    recipients {
      recipient
      split
      __typename
    }
    __typename
  }
  ... on SimpleCollectModuleSettings {
    type
    optionalCollectLimit: collectLimit
    optionalEndTimestamp: endTimestamp
    contractAddress
    followerOnly
    fee {
      amount {
        ...ModuleFeeAmountFields
        __typename
      }
      recipient
      referralFee
      __typename
    }
    __typename
  }
  __typename
}
`;

export const moduleFee = `fragment ModuleFeeAmountFields on ModuleFeeAmount {
  asset {
    symbol
    decimals
    address
    __typename
  }
  value
  __typename
}`;

export const statsFields = `fragment StatsFields on PublicationStats {
  totalUpvotes
  totalAmountOfMirrors
  totalAmountOfCollects
  totalAmountOfComments
  __typename
}`;

export const metadataFields = `fragment MetadataFields on MetadataOutput {
  name
  content
  image
  tags
  attributes {
    traitType
    value
    __typename
  }
  cover {
    original {
      url
      __typename
    }
    __typename
  }
  media {
    original {
      url
      mimeType
      __typename
    }
    __typename
  }
  encryptionParams {
    accessCondition {
      or {
        criteria {
          ...SimpleConditionFields
          and {
            criteria {
              ...SimpleConditionFields
              __typename
            }
            __typename
          }
          or {
            criteria {
              ...SimpleConditionFields
              __typename
            }
            __typename
          }
          __typename
        }
        __typename
      }
      __typename
    }
    __typename
  }
  __typename
}`;

export const simpleCondition = `fragment SimpleConditionFields on AccessConditionOutput {
  nft {
    contractAddress
    chainID
    contractType
    tokenIds
    __typename
  }
  eoa {
    address
    __typename
  }
  token {
    contractAddress
    amount
    chainID
    condition
    decimals
    __typename
  }
  follow {
    profileId
    __typename
  }
  collect {
    publicationId
    thisPublication
    __typename
  }
  __typename
}
`;

export const commentFields = `fragment CommentFields on Comment {
  id
  profile {
    ...ProfileFields
    __typename
  }
  reaction(request: $reactionRequest)
  mirrors(by: $profileId)
  hasCollectedByMe
  onChainContentURI
  isGated
  isDataAvailability
  dataAvailabilityProofs
  canComment(profileId: $profileId) {
    result
    __typename
  }
  canMirror(profileId: $profileId) {
    result
    __typename
  }
  canDecrypt(profileId: $profileId) {
    result
    reasons
    __typename
  }
  collectModule {
    ...CollectModuleFields
    __typename
  }
  stats {
    ...StatsFields
    __typename
  }
  metadata {
    ...MetadataFields
    __typename
  }
  hidden
  createdAt
  appId
  commentOn {
    ... on Post {
      ...PostFields
      __typename
    }
    ... on Comment {
      id
      profile {
        ...ProfileFields
        __typename
      }
      reaction(request: $reactionRequest)
      mirrors(by: $profileId)
      hasCollectedByMe
      onChainContentURI
      isGated
      isDataAvailability
      dataAvailabilityProofs
      canComment(profileId: $profileId) {
        result
        __typename
      }
      canMirror(profileId: $profileId) {
        result
        __typename
      }
      canDecrypt(profileId: $profileId) {
        result
        reasons
        __typename
      }
      collectModule {
        ...CollectModuleFields
        __typename
      }
      metadata {
        ...MetadataFields
        __typename
      }
      stats {
        ...StatsFields
        __typename
      }
      mainPost {
        ... on Post {
          ...PostFields
          __typename
        }
        ... on Mirror {
          ...MirrorFields
          __typename
        }
        __typename
      }
      hidden
      createdAt
      __typename
    }
    ... on Mirror {
      ...MirrorFields
      __typename
    }
    __typename
  }
  __typename
}
`;

export const mirrorFields = `fragment MirrorFields on Mirror {
  id
  profile {
    ...ProfileFields
    __typename
  }
  reaction(request: $reactionRequest)
  hasCollectedByMe
  isGated
  isDataAvailability
  dataAvailabilityProofs
  canComment(profileId: $profileId) {
    result
    __typename
  }
  canMirror(profileId: $profileId) {
    result
    __typename
  }
  canDecrypt(profileId: $profileId) {
    result
    reasons
    __typename
  }
  collectModule {
    ...CollectModuleFields
    __typename
  }
  stats {
    ...StatsFields
    __typename
  }
  metadata {
    ...MetadataFields
    __typename
  }
  hidden
  mirrorOf {
    ... on Post {
      ...PostFields
      __typename
    }
    ... on Comment {
      id
      profile {
        ...ProfileFields
        __typename
      }
      collectNftAddress
      reaction(request: $reactionRequest)
      mirrors(by: $profileId)
      onChainContentURI
      isGated
      isDataAvailability
      dataAvailabilityProofs
      canComment(profileId: $profileId) {
        result
        __typename
      }
      canMirror(profileId: $profileId) {
        result
        __typename
      }
      canDecrypt(profileId: $profileId) {
        result
        reasons
        __typename
      }
      stats {
        ...StatsFields
        __typename
      }
      createdAt
      __typename
    }
    __typename
  }
  createdAt
  appId
  __typename
}`;
