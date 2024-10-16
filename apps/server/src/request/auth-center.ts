import {
  LoginByTokenRequestBody,
  LoginRequestBody,
  RegisterRequestBody,
  UserBasicInfo,
} from '@yx-chat/shared/types';
import config from '../config';
import commonRequest from './utils/common-request';

export const login = async (params: LoginRequestBody) => {
  return commonRequest<UserBasicInfo & { token: string }>({
    baseURL: config.authCenterUrl,
    method: 'get',
    path: '/user/login',
    params,
  });
};

export const loginByToken = async (params: LoginByTokenRequestBody) => {
  return commonRequest<UserBasicInfo>({
    baseURL: config.authCenterUrl,
    method: 'get',
    path: '/user/loginByToken',
    params,
  });
};

export const register = async (params: RegisterRequestBody) => {
  return commonRequest<UserBasicInfo & { token: string }>({
    baseURL: config.authCenterUrl,
    method: 'post',
    path: '/user/register',
    params,
  });
};
