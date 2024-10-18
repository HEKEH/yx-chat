import {
  LANGUAGE,
  LANGUAGE_HEADER_KEY,
  LOG_ID_HEADER_KEY,
  TOKEN_HEADER_KEY,
} from '@yx-chat/shared/constants';
import { AuthTokenSuccessResponse } from '@yx-chat/shared/types';
import config from '../config';
import commonRequest from './utils/common-request';

export interface AuthTokenRequestHeaders {
  [LANGUAGE_HEADER_KEY]?: LANGUAGE;
  [TOKEN_HEADER_KEY]: string;
  [LOG_ID_HEADER_KEY]?: string;
}

const authToken = async (headers: AuthTokenRequestHeaders) => {
  return commonRequest<AuthTokenSuccessResponse>({
    baseURL: config.authCenterUrl,
    method: 'get',
    path: '/auth/token',
    headers: {
      [LANGUAGE_HEADER_KEY]: headers[LANGUAGE_HEADER_KEY],
      [TOKEN_HEADER_KEY]: headers[TOKEN_HEADER_KEY],
      [LOG_ID_HEADER_KEY]: headers[TOKEN_HEADER_KEY],
    },
  });
};
export default authToken;
