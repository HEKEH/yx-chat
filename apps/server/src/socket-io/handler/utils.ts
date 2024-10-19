import {
  ChatMessage,
  Friend,
  FriendAddNotification,
  Group,
  Notification,
  NotificationType,
} from '@yx-chat/shared/types';
import {
  ChatMessageModel,
  GroupModel,
  FriendModel,
  FriendDocument,
  FriendAddRequestModel,
  UserDocument,
} from '@yx-chat/database';
import { Types } from 'mongoose';
function formatFriend(friend: FriendDocument): Friend {
  const { to } = friend;
  if (typeof to === 'string') {
    throw new Error('Param is wrong');
  }
  return {
    id: friend.id,
    createTime: friend.createTime.toString(),
    userInfo: {
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
  return friends.map(friend => formatFriend(friend));
}

export async function findFriendIdsByUserId(userId: string): Promise<string[]> {
  const friends = await FriendModel.find({ from: userId }, { to: 1 });
  return friends.map(friend => friend.to as string);
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

/**
 * @returns is valid mongodb id
 */
export function isIdValid(id: string) {
  return Types.ObjectId.isValid(id);
}

export async function findFriendAddNotificationsByUserId(
  userId: string,
): Promise<FriendAddNotification[]> {
  const list = await FriendAddRequestModel.find({
    to: userId,
    deleted: false,
  }).populate('from', { username: 1, avatar: 1, _id: 1 });
  return list.map(item => {
    const from = item.from as UserDocument;
    return {
      type: NotificationType.FriendAddNotification,
      id: item.id,
      from: {
        id: from._id, // user id
        username: from.username,
        avatar: from.avatar,
      },
      createTime: item.createTime.toString(),
      message: item.message,
    };
  });
}

export async function findNotificationsByUserId(
  userId: string,
): Promise<Notification[]> {
  const [friendAddNotifications] = await Promise.all([
    findFriendAddNotificationsByUserId(userId),
  ]);
  return [...friendAddNotifications];
}
