import { UserModel } from '@yx-chat/database';
import { logger } from '@yx-chat/shared/logger';
import type { UpdateAvatarRequestBody } from '@yx-chat/shared/types';
import { BusinessError } from '~/utils/error';
import { authToken } from '../auth';

export const updateAvatar = async (
  data: UpdateAvatarRequestBody,
): Promise<void> => {
  logger.info('[updateAvatar]', data);
  const { avatar } = data;
  if (!avatar || typeof avatar !== 'string') {
    throw new BusinessError('Avatar is invalid');
  }
  const { userInfo } = await authToken(data.token);
  await UserModel.updateOne({ _id: userInfo.id }, { avatar });
};
