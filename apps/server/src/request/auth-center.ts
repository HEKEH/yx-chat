import {
  LoginByTokenRequestBody,
  LoginRequestBody,
  RegisterRequestBody,
  UserBasicInfo,
} from '@yx-chat/shared/types';
import config from '../config';
import commonRequest from './utils/common-request';

export const login = async (params: LoginRequestBody) => {
  return commonRequest<UserBasicInfo & { token: string }>(
    config.authCenterUrl,
    'get',
    '/user/login',
    params,
  );
};

export const loginByToken = async (params: LoginByTokenRequestBody) => {
  return commonRequest<UserBasicInfo>(
    config.authCenterUrl,
    'get',
    '/user/loginByToken',
    params,
  );
};

export const register = async (params: RegisterRequestBody) => {
  return commonRequest<UserBasicInfo & { token: string }>(
    config.authCenterUrl,
    'post',
    '/user/register',
    params,
  );
};
