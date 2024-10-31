import {
  LANGUAGE_HEADER_KEY,
  TOKEN_HEADER_KEY,
} from '@yx-chat/shared/constants';
import config from '~/config';
import i18n from '~/infra/i18n';
import getToken from '~/infra/local-storage-store/get-token';

export function getFileUrl(filename: string, downloadName?: string) {
  let url = `${config.fileCenterUrl}/file/${filename}`;
  // add token to URL
  const token = getToken();
  url = `${url}?${TOKEN_HEADER_KEY}=${token}&${LANGUAGE_HEADER_KEY}=${i18n.global.locale.value}`;
  if (downloadName) {
    url = `${url}&download-name=${encodeURIComponent(downloadName)}`;
  }
  return url;
}
