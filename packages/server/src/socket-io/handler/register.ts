import assert from 'assert';
import type {
  RegisterRequestBody,
  LoginSuccessResponse,
  ErrorResponse,
} from '@yx-chat/shared/types';
import { errorResponse } from '@yx-chat/shared/utils';
import bcrypt from 'bcryptjs';
import logger from '../../utils/logger';
import UserModel, { UserDocument } from '../../database/mongoDB/model/user';
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
  const user = await UserModel.findOne({ username });
  if (user) {
    return errorResponse('Username is already registered');
  }
  const salt = await bcrypt.genSalt();
  const hash = await bcrypt.hash(password, salt);
  let newUser: UserDocument | undefined;
  try {
    newUser = await UserModel.create({
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
  const userInfo = {
    id: newUser.id,
    avatar: newUser.avatar,
    username: newUser.username,
    tag: newUser.tag,
    isAdmin: context.isAdmin,
  };
  await context.setUserInfo({ ...userInfo, os, browser, environment });
  return {
    ...userInfo,
    token,
    groups: [],
    friends: [],
    notifications: [],
  };
};

export default register;
