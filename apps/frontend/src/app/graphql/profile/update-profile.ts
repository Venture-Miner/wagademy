export const createProfile = `
mutation CreateSetProfileMetadataTypedData($options: TypedDataOptions, $request: CreatePublicSetProfileMetadataURIRequest!)
{
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

export const broadcast = `{
  "operationName": "Broadcast",
  "variables": {
      "request": {
          "id": "abc97507-4c0c-4c4e-8d8b-ae958ecc63b0",
          "signature": "0x8f2b583d1e573c602bb97a70ebb2668c1882dae51e74aaf5d1499239e254e9c840001e24c3b8a608108300fa5765465cf15055c48eecaaaa0849201d32687a241b"
      }
  },
  "query": "mutation Broadcast($request: BroadcastRequest!) {
    broadcast(request: $request) {
      ... on RelayerResult {
        txHash
        txId
        __typename
      }
      ... on RelayError {
        reason
        __typename
      }
      __typename  }
    }"
}`;
