import assert from 'assert';
import {
  ServerMessageType,
  type ChatMessage,
  type ErrorResponse,
  type SendChatMessageBody,
} from '@yx-chat/shared/types';
import xss from 'xss';
import { errorResponse } from '@yx-chat/shared/utils';
import UserModel from '../../database/mongoDB/model/user';
import ChatMessageModel from '../../database/mongoDB/model/chat-message';
import { createOrUpdateHistory } from '../../database/mongoDB/model/history';
import GroupModel from '../../database/mongoDB/model/group';
import { shouldLogin } from './fn-decorators';
import { EventHandler, EventHandlerContext } from './types';
import { isIdValid } from './utils';

let sendChatMessage: EventHandler = async (
  context: EventHandlerContext,
  data: SendChatMessageBody,
): Promise<ChatMessage | ErrorResponse> => {
  let { content } = data;
  assert(content.length <= 2048, 'Message content is too long');
  content = xss(content);

  const { type, to } = data;
  const userId = context.userId!;
  const user = context.userInfo!;
  const isGroup = isIdValid(to); // If to is valid id，then the target is group, else is friend; TODO nasty design
  const targetUserId = isGroup ? to : to.replace(userId, ''); // group id or friend id
  if (isGroup) {
    const toGroup = await GroupModel.findOne({ _id: targetUserId });
    assert(toGroup, "Group doesn't exist");
  } else {
    const toUser = await UserModel.findOne({ _id: targetUserId });
    assert(toUser, "Friend doesn't exist");
  }
  const messageData = await ChatMessageModel.create({
    from: userId,
    to,
    type,
    content,
  });
  const chatMessage: ChatMessage = {
    id: messageData.id!,
    content,
    createTime: messageData.createTime.toString(),
    deleted: false,
    type,
    from: {
      id: userId,
      username: user.username,
      avatar: user.avatar,
    },
    to,
  };
  createOrUpdateHistory({
    user: userId,
    linkman: to,
    message: chatMessage.id,
  });
  const message = {
    type: ServerMessageType.chat as const,
    data: chatMessage,
  };
  if (isGroup) {
    await context.sendGroupMessage(targetUserId, message);
  } else {
    await context.sendFriendMessage(targetUserId, message, true);
  }
  return chatMessage;
};

sendChatMessage = shouldLogin(sendChatMessage);

export default sendChatMessage;
