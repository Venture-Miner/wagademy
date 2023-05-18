export const getPosts = `query publications($request: PublicationsQueryRequest!) {
  publications(request: $request) {
    items {
      __typename
      ... on Post {
        ...PostFields
      }
    }
  }
}`;

export const postFields = `fragment PostFields on Post {
  id
  metadata {
    ...MetadataOutputFields
  }
  createdAt
  appId
  hidden
  reaction(request: null)
  mirrors(by: null)
  hasCollectedByMe
}`;

export const metadataOutput = `fragment MetadataOutputFields on MetadataOutput {
  name
  description
  content
  attributes {
    displayType
    traitType
    value
  }
}`;
