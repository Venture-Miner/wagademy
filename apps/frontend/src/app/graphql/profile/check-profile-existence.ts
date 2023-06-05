export const checkProfileExistence = `query ProfileExistence($request: SingleProfileQueryRequest!) {
    profile(request: $request) {
      id
      name
      picture {
          ... on MediaSet {
            original {
              url
          }
        }
      }
    }
  }`;
