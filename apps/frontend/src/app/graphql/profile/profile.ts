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
