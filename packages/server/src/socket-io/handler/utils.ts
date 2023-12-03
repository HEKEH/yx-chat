import { encode, decode } from 'jwt-simple';
import { ChatMessage, Friend, Group } from '@yx-chat/shared/types';
import config from '../../config';
import FriendModel, {
  FriendDocument,
} from '../../database/mongoDB/model/friend';
import GroupModel from '../../database/mongoDB/model/group';
import { UserDocument } from '../../database/mongoDB/model/user';
import ChatMessageModel from '../../database/mongoDB/model/chat-message';

export function generateToken(userId: string, environment: string) {
  return encode(
    {
      userId,
      environment,
      expires: Date.now() + config.jwtTokenExpiresTime,
    },
    config.jwtSecret,
    config.jwtAlgorithm,
  );
}

export function parseToken(token: string): {
  userId: string;
  environment: string;
  expires: number;
} {
  return decode(token, config.jwtSecret, false, config.jwtAlgorithm);
}

function formatFriend(friend: FriendDocument & { to: UserDocument }): Friend {
  const { to } = friend;
  return {
    id: friend.id,
    createTime: friend.createTime.toString(),
    to: {
      id: to.id,
      username: to.username,
      avatar: to.avatar,
    },
  };
}

export async function findFriendsByUserId(userId: string): Promise<Friend[]> {
  const friends = await FriendModel.find(
    { from: userId },
    { createTime: 1, to: 1 },
  ).populate('to', {
    avatar: 1,
    username: 1,
  });
  // const [toFriends, fromFriends] = await Promise.all([
  //   FriendModel.find({ from: userId }).populate('to', {
  //     avatar: 1,
  //     username: 1,
  //   }),
  //   FriendModel.find({ to: userId }).populate('from', {
  //     avatar: 1,
  //     username: 1,
  //   }),
  // ]);
  return friends.map(friend =>
    formatFriend(friend as FriendDocument & { to: UserDocument }),
  );
}

export async function findGroupsByUserId(userId: string): Promise<Group[]> {
  const groups = await GroupModel.find(
    { members: userId },
    {
      _id: 1,
      name: 1,
      avatar: 1,
      creator: 1,
      createTime: 1,
    },
  );
  return groups.map(group => ({
    id: group.id,
    createTime: group.createTime.toString(),
    name: group.name,
    creator: group.creator,
    avatar: group.avatar,
  }));
}

export async function findFriendsAndGroupsByUserId(
  userId: string,
): Promise<{ groups: Group[]; friends: Friend[] }> {
  const [friends, groups] = await Promise.all([
    findFriendsByUserId(userId),
    findGroupsByUserId(userId),
  ]);
  return { groups, friends };
}

export async function getMessagesByContactKey(
  contactKey: string,
  limit: number,
  offset?: number,
): Promise<ChatMessage[]> {
  const messageList = await ChatMessageModel.find(
    { to: contactKey },
    {
      type: 1,
      content: 1,
      from: 1,
      createTime: 1,
      deleted: 1,
    },
    {
      sort: { createTime: -1 },
      limit,
      skip: offset,
    },
  ).populate('from', { username: 1, avatar: 1 });
  return messageList
    .map(item => {
      const from = item.from as unknown as UserDocument;
      return {
        content: item.content,
        createTime: item.createTime.toString(),
        deleted: item.deleted,
        type: item.type,
        id: item.id,
        from: {
          id: from.id,
          username: from.username,
          avatar: from.avatar,
        },
        to: contactKey,
      };
    })
    .reverse();
}
