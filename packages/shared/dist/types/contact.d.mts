import { ChatMessagesRecord } from './chat.mjs';
import { CommonResult } from './common.mjs';

interface Friend {
    id: string;
    createTime: string;
    userInfo: {
        id: string;
        username: string;
        avatar: string;
    };
}
interface Group {
    id: string;
    createTime: string;
    name: string;
    creator: string;
    avatar: string;
}
declare enum ContactRequestType {
    createGroup = "createGroup",
    joinGroup = "addGroup",
    sendAddFriendRequest = "sendFriendAddRequest",
    rejectAddFriendRequest = "rejectAddFriendRequest",
    acceptAddFriendRequest = "acceptAddFriendRequest"
}
interface CreateGroupRequestBody {
    name: string;
}
interface JoinGroupRequestBody {
    groupId: string;
}
interface SendFriendAddRequestBody {
    targetUserId: string;
}
interface RejectFriendAddRequestBody {
    requestId: string;
}
type SendFriendAddRequestResponse = CommonResult;
interface AcceptFriendAddRequestBody {
    requestId: string;
}
type AcceptFriendAddRequestResponse = Friend;
type CreateGroupSuccessResponse = Group;
interface JoinGroupSuccessResponse extends Group {
    messagesRecord: ChatMessagesRecord;
}

export { AcceptFriendAddRequestBody, AcceptFriendAddRequestResponse, ContactRequestType, CreateGroupRequestBody, CreateGroupSuccessResponse, Friend, Group, JoinGroupRequestBody, JoinGroupSuccessResponse, RejectFriendAddRequestBody, SendFriendAddRequestBody, SendFriendAddRequestResponse };
