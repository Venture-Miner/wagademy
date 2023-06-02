export const createUnfollowTypedData = `mutation createUnfollowTypedData($request: UnfollowRequest!) {
  createUnfollowTypedData(request: $request) {
    id
    expiresAt
    typedData {
      types {
        BurnWithSig {
          name
          type
        }
      }
      domain {
        version
        chainId
        name
        verifyingContract
      }
      value {
        nonce
        deadline
        tokenId
      }
    }
  }
}`;
