import assert from 'assert';
import type {
  SendFriendAddRequestBody,
  ServerMessageType,
  ChatMessage,
  ErrorResponse,
  SendFriendAddRequestResponse,
} from '@yx-chat/shared/types';
import { errorResponse } from '@yx-chat/shared/utils';
import xss from 'xss';
import ChatMessageModel from '../../database/mongoDB/model/chat-message';
import GroupModel from '../../database/mongoDB/model/group';
import { createOrUpdateHistory } from '../../database/mongoDB/model/history';
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
  const friendIds = await findFriendIdsByUserId(userId);
  if (friendIds.includes(targetUserId)) {
    return {
      success: false,
      message: 'Already friend',
    };
  }
  // TODO
  return { success: true };
};

sendFriendAddRequest = shouldLogin(sendFriendAddRequest);

export default sendFriendAddRequest;
