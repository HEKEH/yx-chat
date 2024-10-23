import { UserModel } from '@yx-chat/database';
import { getRandomAvatarPath } from '@yx-chat/shared/utils';
import hashPassword from './hash-password';

export async function createNewUser(userInfo: {
  username: string;
  password: string;
  isAdmin?: boolean;
}) {
  const { password, ...rest } = userInfo;
  const hashedPassword = await hashPassword(password);
  const user = await UserModel.create({
    ...rest,
    password: hashedPassword,
    avatar: getRandomAvatarPath(),
  });
  return user;
}
