import assert from 'assert';
import type {
  ErrorResponse,
  RegisterRequestBody,
  UserBasicInfo,
} from '@yx-chat/shared/types';
import { errorResponse } from '@yx-chat/shared/utils';
import { createNewUser } from '../biz-utils/create-new-user';
import UserModel, { UserDocument } from '../database/mongoDB/model/user';
import logger from '../utils/logger';
import { generateToken } from './utils';

const register = async (
  data: RegisterRequestBody,
): Promise<(UserBasicInfo & { token: string }) | ErrorResponse> => {
  const { username, password, environment } = data;
  logger.trace(`register ${username}`);
  assert(username, "Username can't be empty");
  assert(password, "Password can't be empty");
  const user = await UserModel.findOne({ username });
  if (user) {
    return errorResponse('Username is already registered');
  }
  let newUser: UserDocument | undefined;
  try {
    newUser = await createNewUser({
      username,
      password,
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
  return {
    id: newUser.id,
    avatar: newUser.avatar,
    username: newUser.username,
    tag: newUser.tag,
    isAdmin: newUser.isAdmin,
    token,
  };
};

export default register;
