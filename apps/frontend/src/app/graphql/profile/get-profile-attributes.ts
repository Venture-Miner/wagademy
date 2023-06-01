export const getProfileAttributes = `query ProfileSettings($request: SingleProfileQueryRequest!) {
  profile(request: $request) {
      attributes {
        traitType
        key
        value
        __typename
    }
  }
}`;
