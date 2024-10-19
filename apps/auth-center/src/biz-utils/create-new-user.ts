import { getRandomAvatarPath } from '@yx-chat/shared/utils';
import { UserModel } from '@yx-chat/database';
import bcrypt from 'bcryptjs';

export async function createNewUser(userInfo: {
  username: string;
  password: string;
  isAdmin?: boolean;
}) {
  const { password, ...rest } = userInfo;
  const salt = await bcrypt.genSalt();
  const hash = await bcrypt.hash(password, salt);
  const user = await UserModel.create({
    ...rest,
    password: hash,
    avatar: getRandomAvatarPath(),
  });
  return user;
}
