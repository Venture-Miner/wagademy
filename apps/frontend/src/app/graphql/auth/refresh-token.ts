export const refreshToken = `mutation Refresh($request: RefreshRequest!) {
  refresh(request: $request) {
    accessToken
    refreshToken
  }
}`;
