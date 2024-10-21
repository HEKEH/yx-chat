import { LANGUAGE_HEADER_KEY } from '@yx-chat/shared/constants';
import {
  LoginByTokenRequestBody,
  LoginRequestBody,
  RegisterRequestBody,
  UpdateAvatarRequestBody,
  UserBasicInfo,
} from '@yx-chat/shared/types';
import { WithLng } from '~/types';
import config from '../config';
import commonRequest from './utils/common-request';

export const login = async ({ lng, ...params }: WithLng<LoginRequestBody>) => {
  return commonRequest<UserBasicInfo & { token: string }>({
    baseURL: config.authCenterUrl,
    method: 'get',
    path: '/user/login',
    params,
    headers: {
      [LANGUAGE_HEADER_KEY]: lng,
    },
  });
};

export const loginByToken = async ({
  lng,
  ...params
}: WithLng<LoginByTokenRequestBody>) => {
  return commonRequest<UserBasicInfo>({
    baseURL: config.authCenterUrl,
    method: 'get',
    path: '/user/login-by-token',
    params,
    headers: {
      [LANGUAGE_HEADER_KEY]: lng,
    },
  });
};

export const register = async ({
  lng,
  ...params
}: WithLng<RegisterRequestBody>) => {
  return commonRequest<UserBasicInfo & { token: string }>({
    baseURL: config.authCenterUrl,
    method: 'post',
    path: '/user/register',
    params,
    headers: {
      [LANGUAGE_HEADER_KEY]: lng,
    },
  });
};

export const updateAvatar = async ({
  lng,
  ...params
}: WithLng<UpdateAvatarRequestBody>) => {
  return commonRequest<void>({
    baseURL: config.authCenterUrl,
    method: 'post',
    path: '/user/update-avatar',
    params,
    headers: {
      [LANGUAGE_HEADER_KEY]: lng,
    },
  });
};
