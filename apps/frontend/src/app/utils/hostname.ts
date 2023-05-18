export const getHostname = () => {
  const hostname = window && window.location && window.location.hostname;
  if (/^.*localhost.*/.test(hostname)) {
    return 'local';
  } else if (/.*dev.*/.test(hostname)) {
    return 'stage';
  } else {
    return 'prod';
  }
};
