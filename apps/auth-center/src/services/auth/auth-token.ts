import assert from 'assert';
import type { AuthTokenSuccessResponse } from '@yx-chat/shared/types';
import { BusinessError } from '~/utils/error';
import { UserModel } from '@yx-chat/database';
import { parseToken } from '../utils';

export const authToken = async (
  token: string | undefined,
): Promise<AuthTokenSuccessResponse> => {
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
      _id: 1,
      username: 1,
    },
  );
  if (!user) {
    throw new BusinessError("User does't exist");
  }
  return {
    id: userId,
    username: user.username,
  };
};
