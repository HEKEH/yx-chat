import assert from 'assert';
import type {
  JoinGroupRequestBody,
  JoinGroupSuccessResponse,
  ErrorResponse,
} from '@yx-chat/shared/types';
import GroupModel from '../../database/mongoDB/model/group';
import { DEFAULT_MESSAGES_FETCH_NUMBER } from '../../const';
import { shouldLogin } from './fn-decorators';
import { EventHandler, EventHandlerContext } from './types';
import { getMessagesByContactKey } from './utils';

let joinGroup: EventHandler = async (
  context: EventHandlerContext,
  data: JoinGroupRequestBody,
): Promise<JoinGroupSuccessResponse | ErrorResponse> => {
  const { groupId } = data;
  assert(groupId, "Group id can't be empty");

  const group = await GroupModel.findOne({ _id: groupId });
  assert(group, 'Group not exists');
  group.members.push(context.userId!);
  group.save();
  context.joinToGroups([groupId]);
  const messages = await getMessagesByContactKey(
    groupId,
    DEFAULT_MESSAGES_FETCH_NUMBER,
  );

  return {
    id: group._id,
    createTime: group.createTime.toString(),
    name: group.name,
    creator: group.creator,
    avatar: group.avatar,
    messagesRecord: {
      messages,
      unread: 0,
    },
  };
};

joinGroup = shouldLogin(joinGroup);

export default joinGroup;
