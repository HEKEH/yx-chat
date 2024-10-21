import assert from 'assert';
import { UserModel } from '@yx-chat/database';
import { BusinessError } from '~/utils/error';
import { parseToken } from '../utils';

export const authToken = async (token: string | undefined) => {
  assert(token, "Token can't be empty");
  let payload: ReturnType<typeof parseToken> | undefined;
  try {
    payload = parseToken(token);
  } catch (e) {
    throw new BusinessError('Illegal token');
  }
  assert(Date.now() < payload.expires, 'Token expires');
  const { userId } = payload;
  const user = await UserModel.findOne(
    { _id: userId },
    {
      avatar: 1,
      username: 1,
      tag: 1,
      createTime: 1,
    },
  );
  if (!user) {
    throw new BusinessError("User does't exist");
  }
  return {
    payload,
    userInfo: {
      id: userId,
      avatar: user.avatar,
      username: user.username,
      tag: user.tag,
      isAdmin: user.isAdmin,
    },
  };
};
