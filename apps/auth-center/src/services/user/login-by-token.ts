import assert from 'assert';
import type {
  LoginByTokenRequestBody,
  UserBasicInfo,
} from '@yx-chat/shared/types';
import { authToken } from '../auth';

export const loginByToken = async (
  data: LoginByTokenRequestBody,
): Promise<UserBasicInfo> => {
  const { userInfo, payload } = await authToken(data.token);
  assert.equal(data.environment, payload.environment, 'Illegal login');
  return userInfo;
};
