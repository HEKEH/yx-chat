import {
  AcceptFriendAddRequestBody,
  AcceptFriendAddRequestResponse,
  ErrorResponse,
  ServerMessageType,
} from '@yx-chat/shared/types';
import { errorResponse } from '@yx-chat/shared/utils';
import FriendModel from '../../database/mongoDB/model/friend';
import FriendAddRequestModel from '../../database/mongoDB/model/friend-add-request';
import UserModel from '../../database/mongoDB/model/user';
import { shouldLogin } from './fn-decorators';
import { EventHandler, EventHandlerContext } from './types';
import { isIdValid } from './utils';

let acceptFriendAddRequest: EventHandler = async (
  context: EventHandlerContext,
  data: AcceptFriendAddRequestBody,
): Promise<AcceptFriendAddRequestResponse | ErrorResponse> => {
  const { requestId } = data;
  if (!isIdValid(requestId)) {
    return errorResponse('Invalid request id');
  }
  const request = await FriendAddRequestModel.findOne({
    _id: requestId,
  });
  if (!request) {
    return errorResponse("Request doesn't exists");
  }
  const to = request.to.toString();
  if (to !== context.userId) {
    return errorResponse('Not your request');
  }
  const from = request.from.toString();
  const fromUser = await UserModel.findOne({
    _id: from,
  });
  if (!fromUser) {
    return errorResponse("Friend doesn't exists");
  }
  const friendItem = await FriendModel.findOne({
    from,
    to,
  });
  if (friendItem) {
    return errorResponse('You are already friends');
  }
  // double write
  const [friend, friendBack] = await FriendModel.create([
    {
      from,
      to,
    },
    {
      from: to,
      to: from,
    },
  ]);

  request.deleted = true;
  request.accepted = true;
  await request.save();
  const userInfo = context.userInfo!;
  context.sendFriendMessage(from, {
    type: ServerMessageType.friendAccepted,
    data: {
      id: friendBack.id,
      userInfo: {
        id: userInfo.id,
        username: userInfo.username,
        avatar: userInfo.avatar,
      },
      createTime: friendBack.createTime.toString(),
    },
  });
  return {
    id: friend.id,
    userInfo: {
      id: fromUser.id,
      username: fromUser.username,
      avatar: fromUser.avatar,
    },
    createTime: friend.createTime.toString(),
  };
};

acceptFriendAddRequest = shouldLogin(acceptFriendAddRequest);

export default acceptFriendAddRequest;
