export const updateProfile = `mutation CreateSetProfileMetadataTypedData($options: TypedDataOptions, $request: CreatePublicSetProfileMetadataURIRequest!) {
  createSetProfileMetadataTypedData(options: $options, request: $request) {
    id
    expiresAt
    typedData {
      types {
        SetProfileMetadataURIWithSig {
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
        metadata
        __typename
      }
      __typename
    }
    __typename
  }
}`;
