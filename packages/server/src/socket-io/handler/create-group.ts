import assert from 'assert';
import {
  CreateGroupRequestBody,
  CreateGroupSuccessResponse,
  type ErrorResponse,
} from '@yx-chat/shared/types';
import { errorResponse } from '@yx-chat/shared/utils';
import GroupModel, { GroupDocument } from '../../database/mongoDB/model/group';
import { getRandomAvatarPath } from '../../utils/get-avatar-path';
import { shouldLogin } from './fn-decorators';
import { EventHandler, EventHandlerContext } from './types';

let createGroup: EventHandler = async (
  context: EventHandlerContext,
  data: CreateGroupRequestBody,
): Promise<CreateGroupSuccessResponse | ErrorResponse> => {
  const { name } = data;
  assert(name, "GroupName can't be empty");

  const group = await GroupModel.findOne({ name });
  assert(!group, 'Group already exists');

  let newGroup: GroupDocument;
  try {
    newGroup = await GroupModel.create({
      name,
      avatar: getRandomAvatarPath(),
      creator: context.userId,
      members: [context.userId],
    });
  } catch (err) {
    if ((err as Error).name === 'ValidationError') {
      return errorResponse(
        'Group name contains unsupported characters or exceeds the length limit',
      );
    }
    throw err;
  }
  context.joinToGroups([newGroup._id]);
  return {
    id: newGroup._id,
    createTime: newGroup.createTime.toString(),
    name: newGroup.name,
    creator: newGroup.creator,
    avatar: newGroup.avatar,
  };
};

createGroup = shouldLogin(createGroup);

export default createGroup;
