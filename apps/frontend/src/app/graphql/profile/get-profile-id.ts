export const defaultProfileId = `query DefaultProfile($request: DefaultProfileRequest!) {
  defaultProfile(request: $request ){
    id
    handle
  }
}`;
