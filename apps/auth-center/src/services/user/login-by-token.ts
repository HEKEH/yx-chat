import assert from 'assert';
import type {
  LoginByTokenRequestBody,
  UserBasicInfo,
} from '@yx-chat/shared/types';
import { BusinessError } from '~/utils/error';
import { UserModel } from '@yx-chat/database';
import { parseToken } from '../utils';

export const loginByToken = async (
  data: LoginByTokenRequestBody,
): Promise<UserBasicInfo> => {
  const { token, environment } = data;
  assert(token, "Token can't be empty");
  let payload: ReturnType<typeof parseToken> | undefined;
  try {
    payload = parseToken(token);
  } catch (e) {
    throw new BusinessError('Illegal token');
  }
  assert(Date.now() < payload.expires, 'Token expires');
  assert.equal(environment, payload.environment, 'Illegal login');
  const { userId } = payload;
  const user = await UserModel.findOne(
    { _id: userId },
    {
      _id: 1,
      avatar: 1,
      username: 1,
      tag: 1,
      createTime: 1,
    },
  );
  if (!user) {
    throw new BusinessError("User does't exist");
  }
  const userInfo = {
    id: user.id,
    avatar: user.avatar,
    username: user.username,
    tag: user.tag,
    isAdmin: user.isAdmin,
  };
  return userInfo;
};
