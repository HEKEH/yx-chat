import {
  LoginByTokenRequestBody,
  LoginRequestBody,
  RegisterRequestBody,
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
    lng,
  });
};

export const loginByToken = async ({
  lng,
  ...params
}: WithLng<LoginByTokenRequestBody>) => {
  return commonRequest<UserBasicInfo>({
    baseURL: config.authCenterUrl,
    method: 'get',
    path: '/user/loginByToken',
    params,
    lng,
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
    lng,
  });
};
