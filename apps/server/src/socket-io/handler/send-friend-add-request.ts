import { FriendAddRequestModel, UserModel } from '@yx-chat/database';
import {
  NotificationType,
  ServerMessageType,
  type SendFriendAddRequestBody,
  type SendFriendAddRequestResponse,
} from '@yx-chat/shared/types';
import { BusinessError } from '~/biz-utils/business-error';
import { shouldLogin } from './fn-decorators';
import { EventHandler, EventHandlerContext } from './types';
import { findFriendIdsByUserId, isIdValid } from './utils';

let sendFriendAddRequest: EventHandler = async (
  context: EventHandlerContext,
  data: SendFriendAddRequestBody,
): Promise<SendFriendAddRequestResponse> => {
  const { targetUserId } = data;
  if (!isIdValid(targetUserId)) {
    throw new BusinessError('Invalid target user id');
  }
  const userId = context.userId!;
  if (userId === targetUserId) {
    return {
      success: false,
      message: "Can't add yourself as friend",
    };
  }
  const [target, friendIds, prevRequest] = await Promise.all([
    UserModel.findOne({
      _id: targetUserId,
    }),
    findFriendIdsByUserId(userId),
    FriendAddRequestModel.findOne({
      from: userId,
      to: targetUserId,
      deleted: false,
    }),
  ]);
  if (!target) {
    return {
      success: false,
      message: 'Target user not found',
    };
  }
  if (friendIds.includes(targetUserId)) {
    return {
      success: false,
      message: 'You are already friends',
    };
  }
  if (prevRequest) {
    return {
      success: false,
      message: 'Already requested before',
    };
  }
  const request = await FriendAddRequestModel.create({
    from: userId,
    to: targetUserId,
  });
  const user = context.userInfo!;
  context.sendFriendMessage(targetUserId, {
    type: ServerMessageType.notification,
    data: {
      type: NotificationType.FriendAddNotification,
      id: request.id,
      from: {
        id: userId,
        username: user.username,
        avatar: user.avatar,
      },
      createTime: new Date().toString(),
      message: 'Send a friend request',
    },
  });
  return { success: true };
};

sendFriendAddRequest = shouldLogin(sendFriendAddRequest);

export default sendFriendAddRequest;
