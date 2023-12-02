import assert from 'assert';
import type {
  LoginRequestBody,
  LoginSuccessResponse,
  ErrorResponse,
} from '@yx-chat/shared/types';
import { errorResponse } from '@yx-chat/shared/utils';
import bcrypt from 'bcryptjs';
import logger from '../../utils/logger';
import User from '../../database/mongoDB/model/user';
import { EventHandler, EventHandlerContext } from './types';
import { generateToken } from './utils';

const login: EventHandler = async (
  context: EventHandlerContext,
  data: LoginRequestBody,
): Promise<LoginSuccessResponse | ErrorResponse> => {
  const { username, password, os, browser, environment } = data;
  logger.trace(`login ${username}`);
  assert(username, "Username can't be empty");
  assert(password, "Password can't be empty");
  const user = await User.findOne(
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
    return errorResponse("User doesn't exist");
  }
  const isPasswordCorrect = bcrypt.compareSync(password, user.password);
  assert(isPasswordCorrect, 'Password is incorrect');
  const userId = user.id;
  context.setUserId(userId);
  const token = generateToken(userId, environment);
  return {
    _id: user.id,
    token,
    avatar: user.avatar,
    username: user.username,
    tag: user.tag,
    isAdmin: context.isAdmin,
    groups: [], // TODO
    friends: [], // TODO
    notificationTokens: [], // TODO
  };
};

export default login;
