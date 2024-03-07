declare enum ChatMessageRequestType {
    /** get last messages by contacts' ids */
    getLastChatMessages = "getLastChatMessages",
    getHistoryChatMessages = "getHistoryChatMessages",
    /** send chat message */
    sendChatMessage = "sendMessage",
    updateHistory = "updateHistory"
}
declare enum ChatMessageFormat {
    text = "text"
}
declare const ChatMessageFormatList: ChatMessageFormat[];
type ChatMessage = {
    content: string;
    createTime: string;
    deleted: boolean;
    type: ChatMessageFormat;
    id: string;
    from: {
        id: string;
        username: string;
        avatar: string;
    };
    to: string;
};
/** Messages with an user or an group */
type ChatMessagesRecord = {
    messages: ChatMessage[];
    unread: number;
};
type LastMessagesRequestBody = {
    contactKeys: string[];
};
type HistoryChatMessagesRequestBody = {
    contactKey: string;
    offset: number;
};
type HistoryChatMessagesResponse = ChatMessage[];
type SendChatMessageBody = {
    content: string;
    type: ChatMessageFormat;
    to: string;
};
type UpdateHistoryRequestBody = {
    contactKey: string;
    messageId: string;
};
type UpdateHistoryResponse = {
    success: boolean;
};
/** Key is connection of two user ids or a group id */
type LastMessagesResponse = Record<string, ChatMessagesRecord>;

export { ChatMessage, ChatMessageFormat, ChatMessageFormatList, ChatMessageRequestType, ChatMessagesRecord, HistoryChatMessagesRequestBody, HistoryChatMessagesResponse, LastMessagesRequestBody, LastMessagesResponse, SendChatMessageBody, UpdateHistoryRequestBody, UpdateHistoryResponse };
