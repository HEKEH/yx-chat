import {
  ErrorResponse,
  UserAndGroupSearchRequestBody,
  UserAndGroupSearchResult,
} from '@yx-chat/shared/types';
import { regexEscape } from '@yx-chat/shared/utils';
import GroupModel from '../../database/mongoDB/model/group';
import UserModel from '../../database/mongoDB/model/user';
import { EventHandler, EventHandlerContext } from './types';
import { shouldLogin } from './fn-decorators';

let searchUsersAndGroups: EventHandler = async (
  _: EventHandlerContext,
  data: UserAndGroupSearchRequestBody,
): Promise<UserAndGroupSearchResult> => {
  const { searchText } = data;
  if (searchText === '') {
    return {
      users: [],
      groups: [],
    };
  }

  const escapedKeywords = regexEscape(searchText);
  const users = await UserModel.find(
    { username: { $regex: escapedKeywords } },
    { avatar: 1, username: 1 },
  );
  const groups = await GroupModel.find(
    { name: { $regex: escapedKeywords } },
    { avatar: 1, name: 1 },
  );

  return {
    users: users.map(user => ({
      id: user.id,
      avatar: user.avatar,
      name: user.username,
    })),
    groups: groups.map(group => ({
      id: group.id,
      avatar: group.avatar,
      name: group.name,
    })),
  };
};

searchUsersAndGroups = shouldLogin(searchUsersAndGroups);

export default searchUsersAndGroups;
