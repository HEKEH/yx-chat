import {
  ServerMessageType,
  type ErrorResponse,
  type SendFriendAddRequestBody,
  type SendFriendAddRequestResponse,
  NotificationType,
} from '@yx-chat/shared/types';
import { errorResponse } from '@yx-chat/shared/utils';
import FriendAddRequestModel from '../../database/mongoDB/model/friend-add-request';
import UserModel from '../../database/mongoDB/model/user';
import { shouldLogin } from './fn-decorators';
import { EventHandler, EventHandlerContext } from './types';
import { findFriendIdsByUserId, isIdValid } from './utils';

let sendFriendAddRequest: EventHandler = async (
  context: EventHandlerContext,
  data: SendFriendAddRequestBody,
): Promise<SendFriendAddRequestResponse | ErrorResponse> => {
  const { targetUserId } = data;
  if (!isIdValid(targetUserId)) {
    return errorResponse('Invalid target user id');
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
      message: 'Already friend',
    };
  }
  if (prevRequest) {
    return {
      success: false,
      message: 'Already requested before',
    };
  }
  const [request, user] = await Promise.all([
    FriendAddRequestModel.create({
      from: userId,
      to: targetUserId,
    }),
    UserModel.findOne({
      _id: userId,
    }),
  ]);
  context.sendFriendMessage(targetUserId, {
    type: ServerMessageType.notification,
    data: {
      type: NotificationType.FriendAddNotification,
      id: request.id,
      from: {
        id: userId,
        username: user!.username,
        avatar: user!.avatar,
      },
      createTime: new Date().toISOString(),
      message: 'Send a friend request',
    },
  });
  return { success: true };
};

sendFriendAddRequest = shouldLogin(sendFriendAddRequest);

export default sendFriendAddRequest;
