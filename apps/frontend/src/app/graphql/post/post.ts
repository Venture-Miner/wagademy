export const createPostTypedData = `
mutation CreatePostTypedData($options: TypedDataOptions, $request: CreatePublicPostRequest!) {
  createPostTypedData(options: $options, request: $request) {
    id
    expiresAt
    typedData {
      types {
        PostWithSig {
          name
          type
          __typename
        }
        __typename
      }
      domain {
        name
        chainId
        version
        verifyingContract
        __typename
      }
      value {
        nonce
        deadline
        profileId
        contentURI
        collectModule
        collectModuleInitData
        referenceModule
        referenceModuleInitData
        __typename
      }
      __typename
    }
    __typename
  }
}`;
