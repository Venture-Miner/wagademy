export const publications = `query Publications($request: PublicationsQueryRequest!) {
  publications(request: $request) {
    items {
      ... on Post {
        metadata {
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
        profile {
          id
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
`;
