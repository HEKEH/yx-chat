import assert from 'assert';
import type {
  RegisterRequestBody,
  LoginSuccessResponse,
  ErrorResponse,
} from '@yx-chat/shared/types';
import { errorResponse } from '@yx-chat/shared/utils';
import bcrypt from 'bcryptjs';
import logger from '../../utils/logger';
import User, { UserDocument } from '../../database/mongoDB/model/user';
import { getRandomAvatarPath } from '../../utils/get-avatar-path';
import { EventHandler, EventHandlerContext } from './types';
import { generateToken } from './utils';

const register: EventHandler = async (
  context: EventHandlerContext,
  data: RegisterRequestBody,
): Promise<LoginSuccessResponse | ErrorResponse> => {
  const { username, password, os, browser, environment } = data;
  logger.trace(`register ${username}`);
  assert(username, "Username can't be empty");
  assert(password, "Password can't be empty");
  const user = await User.findOne({ username });
  if (user) {
    return errorResponse('Username is already registered');
  }
  const salt = await bcrypt.genSalt();
  const hash = await bcrypt.hash(password, salt);
  let newUser: UserDocument | undefined;
  try {
    newUser = await User.create({
      username,
      password: hash,
      avatar: getRandomAvatarPath(),
    });
  } catch (err) {
    if ((err as Error).name === 'ValidationError') {
      return errorResponse(
        'Username contains unsupported characters or exceeds the length limit',
      );
    }
    throw err;
  }
  const userId = newUser.id;
  const token = generateToken(userId, environment);
  context.setUserId(userId);
  return {
    _id: userId,
    token,
    avatar: newUser.avatar,
    username: newUser.username,
    tag: newUser.tag,
    isAdmin: context.isAdmin,
    groups: [], // TODO
    friends: [], // TODO
    notificationTokens: [], // TODO
  };
};

export default register;
