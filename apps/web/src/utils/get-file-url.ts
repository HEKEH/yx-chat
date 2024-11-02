import config from '~/config';

export function getFileUrl(filename: string, downloadName?: string) {
  let url = `${config.fileCenterUrl}/file/${filename}`;
  // // add token to URL
  // const token = getToken();
  // url = `${url}?${TOKEN_HEADER_KEY}=${token}&${LANGUAGE_HEADER_KEY}=${i18n.global.locale.value}`;
  if (downloadName) {
    url = `${url}?download-name=${encodeURIComponent(downloadName)}`;
  }
  return url;
}
