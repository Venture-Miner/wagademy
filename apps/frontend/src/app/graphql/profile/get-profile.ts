export const getProfile = `query ProfileSettings($request: SingleProfileQueryRequest!) {
  profile(request: $request) {
      id
      name
      bio
      isFollowedByMe
      attributes {
        traitType
        key
        value
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
    __typename
  }
}`;
