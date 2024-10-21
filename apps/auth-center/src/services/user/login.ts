import assert from 'assert';
import type { LoginRequestBody, UserBasicInfo } from '@yx-chat/shared/types';
import bcrypt from 'bcryptjs';
import { BusinessError } from '~/utils/error';
import { logger } from '@yx-chat/shared/logger';
import { UserModel } from '@yx-chat/database';
import { generateToken } from '../utils';

export const login = async (
  data: LoginRequestBody,
): Promise<UserBasicInfo & { token: string }> => {
  const { username, password, environment } = data;
  logger.info('[login]', username);
  assert(username, "Username can't be empty");
  assert(password, "Password can't be empty");
  const user = await UserModel.findOne(
    { username },
    {
      _id: 1,
      avatar: 1,
      username: 1,
      tag: 1,
      createTime: 1,
      password: 1,
    },
  );
  if (!user) {
    throw new BusinessError("User doesn't exist");
  }
  const isPasswordCorrect = bcrypt.compareSync(password, user.password);
  assert(isPasswordCorrect, 'Incorrect Password');
  const userId = user.id;
  const token = generateToken(userId, environment);
  return {
    id: user.id,
    avatar: user.avatar,
    username: user.username,
    tag: user.tag,
    isAdmin: user.isAdmin,
    token,
  };
};
