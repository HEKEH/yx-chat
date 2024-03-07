import { ChatMessagesRecord } from './chat.mjs';

type CommonResponse = {
    success: true;
} | {
    success: false;
    message: string;
};
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
type SendFriendAddRequestResponse = CommonResponse;
interface AcceptFriendAddRequestBody {
    requestId: string;
}
type AcceptFriendAddRequestResponse = Friend;
type CreateGroupSuccessResponse = Group;
interface JoinGroupSuccessResponse extends Group {
    messagesRecord: ChatMessagesRecord;
}

export { AcceptFriendAddRequestBody, AcceptFriendAddRequestResponse, CommonResponse, ContactRequestType, CreateGroupRequestBody, CreateGroupSuccessResponse, Friend, Group, JoinGroupRequestBody, JoinGroupSuccessResponse, RejectFriendAddRequestBody, SendFriendAddRequestBody, SendFriendAddRequestResponse };
