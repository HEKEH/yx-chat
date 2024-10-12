import bcrypt from 'bcryptjs';
import UserModel from '../database/mongoDB/model/user';
import { getRandomAvatarPath } from './get-avatar-path';

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
