export const publications = `query Publications($request: PublicationsQueryRequest!) {
  publications(request: $request) {
    items {
      ... on Post {
        ...PostFields
      }
    }
    pageInfo {
      prev
      next
      totalCount
    }
  }
}

fragment MediaFields on Media {
  url
  mimeType
}

fragment MetadataOutputFields on MetadataOutput {
  name
  description
  content
  media {
    original {
      ...MediaFields
    }
  }
  attributes {
    displayType
    traitType
    value
  }
}

fragment PostFields on Post {
  metadata {
    ...MetadataOutputFields
  }
  profile {
    ...ProfileFields
  }
}

fragment ProfileFields on Profile {
  name
  handle
  picture {
    ... on MediaSet {
      original {
        ...MediaFields
      }
    }
  }
}
`;
