import assert from 'assert';
import { logger } from '@yx-chat/shared/logger';
import type { RegisterRequestBody, UserBasicInfo } from '@yx-chat/shared/types';
import { BusinessError } from '~/biz-utils/business-error';
import { UserDocument, UserModel } from '@yx-chat/database';
import { createNewUser } from '~/biz-utils/create-new-user';

import { generateToken } from '../utils';

export const register = async (
  data: RegisterRequestBody,
): Promise<UserBasicInfo & { token: string }> => {
  const { username, password, environment } = data;
  logger.trace(`register ${username}`);
  assert(username, "Username can't be empty");
  assert(password, "Password can't be empty");
  const user = await UserModel.findOne({ username });
  if (user) {
    throw new BusinessError('Username is already registered');
  }
  let newUser: UserDocument | undefined;
  try {
    newUser = await createNewUser({
      username,
      password,
    });
  } catch (err) {
    if ((err as Error).name === 'ValidationError') {
      throw new BusinessError(
        'Username contains unsupported characters or exceeds the length limit',
      );
    }
    throw err;
  }
  const userId = newUser.id;
  const token = generateToken(userId, environment);
  return {
    id: newUser.id,
    avatar: newUser.avatar,
    username: newUser.username,
    tag: newUser.tag,
    isAdmin: newUser.isAdmin,
    token,
  };
};
