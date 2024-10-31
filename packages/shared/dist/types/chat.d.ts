declare enum ChatMessageRequestType {
    /** get last messages by contacts' ids */
    getLastChatMessages = "getLastChatMessages",
    getHistoryChatMessages = "getHistoryChatMessages",
    /** send chat message */
    sendChatMessage = "sendMessage",
    updateHistory = "updateHistory"
}
declare enum ChatMessageFormat {
    text = "text",
    image = "image",
    video = "video",
    file = "file"
}
declare const ChatMessageFormatList: ChatMessageFormat[];
type ChatMessage = {
    items: ChatMessageItem[];
    createTime: string;
    deleted: boolean;
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
type FileChatMessageItem = {
    type: ChatMessageFormat.file;
    data: string;
    name: string;
};
type VideoChatMessageItem = {
    type: ChatMessageFormat.video;
    data: string;
};
type ImageChatMessageItem = {
    type: ChatMessageFormat.image;
    data: string;
};
type TextChatMessageItem = {
    type: ChatMessageFormat.text;
    data: string;
};
type ChatMessageItem = VideoChatMessageItem | FileChatMessageItem | TextChatMessageItem | ImageChatMessageItem;
type SendChatMessageBody = {
    to: string;
    items: ChatMessageItem[];
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

export { ChatMessage, ChatMessageFormat, ChatMessageFormatList, ChatMessageItem, ChatMessageRequestType, ChatMessagesRecord, FileChatMessageItem, HistoryChatMessagesRequestBody, HistoryChatMessagesResponse, ImageChatMessageItem, LastMessagesRequestBody, LastMessagesResponse, SendChatMessageBody, TextChatMessageItem, UpdateHistoryRequestBody, UpdateHistoryResponse, VideoChatMessageItem };
