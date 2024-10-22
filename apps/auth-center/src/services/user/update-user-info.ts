import { UserModel } from '@yx-chat/database';
import { logger } from '@yx-chat/shared/logger';
import type { UpdateUserInfoRequestBody } from '@yx-chat/shared/types';
import { BusinessError } from '~/utils/error';
import { authToken } from '../auth';

export const updateUserInfo = async (
  data: UpdateUserInfoRequestBody,
): Promise<void> => {
  logger.info('[updateUserInfo]', data);
  const { userInfo } = await authToken(data.token);
  if (data && (['username', 'avatar'] as const).some(key => data[key])) {
    await UserModel.updateOne(
      { _id: userInfo.id },
      {
        username: data.username || undefined, // remove if empty string
        avatar: data.avatar || undefined,
      },
    );
  } else {
    throw new BusinessError('Invalid user info request');
  }
};
