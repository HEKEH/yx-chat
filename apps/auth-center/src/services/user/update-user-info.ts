import { UserModel } from '@yx-chat/database';
import { logger } from '@yx-chat/shared/logger';
import type { UpdateUserInfoRequestBody } from '@yx-chat/shared/types';
import { BusinessError } from '~/utils/error';
import hashPassword from '~/biz-utils/hash-password';
import { authToken } from '../auth';

export const updateUserInfo = async (
  data: UpdateUserInfoRequestBody,
): Promise<void> => {
  logger.info('[updateUserInfo]', data);
  const { userInfo } = await authToken(data.token);
  if (
    data &&
    (['username', 'avatar', 'password'] as const).some(key => data[key])
  ) {
    let password;
    if (data.password) {
      password = await hashPassword(data.password);
    }
    await UserModel.updateOne(
      { _id: userInfo.id },
      {
        username: data.username || undefined, // remove if empty string
        avatar: data.avatar || undefined,
        password,
      },
    );
  } else {
    throw new BusinessError('Invalid user info request');
  }
};
