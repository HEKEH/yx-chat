import assert from 'assert';
import type {
  LoginByTokenRequestBody,
  UserBasicInfo,
} from '@yx-chat/shared/types';
import { BusinessError } from '~/biz-utils/business-error';
import i18next from '~/i18n';
import UserModel from '../../database/mongoDB/model/user';
import { parseToken } from '../utils';

export const loginByToken = async (
  data: LoginByTokenRequestBody,
): Promise<UserBasicInfo> => {
  const lng = 'zh-cn';
  const { token, environment } = data;
  assert(token, i18next.t("Token can't be empty", { lng }));
  let payload: ReturnType<typeof parseToken> | undefined;
  try {
    payload = parseToken(token);
  } catch (e) {
    throw new BusinessError(i18next.t('Illegal token', { lng }));
  }
  assert(Date.now() < payload.expires, i18next.t('Token expires', { lng }));
  assert.equal(
    environment,
    payload.environment,
    i18next.t('Illegal login', { lng }),
  );
  const { userId } = payload;
  const user = await UserModel.findOne(
    { _id: userId },
    {
      _id: 1,
      avatar: 1,
      username: 1,
      tag: 1,
      createTime: 1,
    },
  );
  if (!user) {
    throw new BusinessError(i18next.t('User does not exist', { lng }));
  }
  const userInfo = {
    id: user.id,
    avatar: user.avatar,
    username: user.username,
    tag: user.tag,
    isAdmin: user.isAdmin,
  };
  return userInfo;
};
