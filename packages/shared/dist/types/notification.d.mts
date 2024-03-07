declare enum NotificationType {
    FriendAddNotification = "FriendAddNotification"
}
interface FriendAddNotification {
    type: NotificationType.FriendAddNotification;
    id: string;
    from: {
        id: string;
        username: string;
        avatar: string;
    };
    createTime: string;
    message: string;
}
type Notification = FriendAddNotification;

export { FriendAddNotification, Notification, NotificationType };
