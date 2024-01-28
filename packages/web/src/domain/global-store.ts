import {
  SendFriendAddRequestResponse,
  ChatMessagesRecord,
  CreateGroupSuccessResponse,
  Group,
  JoinGroupSuccessResponse,
  LastMessagesResponse,
  LoginSuccessResponse,
  UserAndGroupSearchResult,
} from '@yx-chat/shared/types';
import { isErrorResponse } from '@yx-chat/shared/utils';
import { LocalStorageStore } from '~/infra/local-storage-store';
import { SocketIO } from '~/infra/socket-io';
import { CreateGroupRequest } from '~/infra/socket-io/request/create-group-request';
import { GetChatMessagesRequest } from '~/infra/socket-io/request/get-chat-messages-request';
import { JoinGroupRequest } from '~/infra/socket-io/request/join-group-request';
import { LoginByTokenRequest } from '~/infra/socket-io/request/login-by-token-request';
import { LoginRequest } from '~/infra/socket-io/request/login-request';
import { RegisterRequest } from '~/infra/socket-io/request/register-request';
import { SearchUsersAndGroupsRequest } from '~/infra/socket-io/request/search-users-and-groups-request';
import { SendFriendAddRequest } from '~/infra/socket-io/request/send-friend-add-request';
import {
  ChatMessageCollection,
  ChatMessageCollectionContext,
} from './models/chat/chat-message-collection';
import { ChatMessageManager } from './models/chat/chat-message-manager';
import { ContactManager } from './models/contact';
import { FriendModel } from './models/contact/friend';
import { GroupModel } from './models/contact/group';
import Self from './models/self';
import { ThemeManager } from './models/theme';
import { IUser } from './models/typing';
import { MainMenu } from './types';
import { NotificationManager } from './models/notification/notification-manager';

export default class GlobalStore implements ChatMessageCollectionContext {
  /** the user logged in */
  private _self: Self = Self.createEmpty();

  private _contactManager: ContactManager = new ContactManager();

  private _themeManager: ThemeManager = new ThemeManager();

  private _selectedMenu: MainMenu = MainMenu.message;

  private _chatMessageManager: ChatMessageManager = new ChatMessageManager();
  private _notificationManager: NotificationManager = new NotificationManager();

  get self() {
    return this._self;
  }

  get contactManager() {
    return this._contactManager;
  }

  get themeManager() {
    return this._themeManager;
  }

  /** 菜单：联系人 / 消息 */
  get selectedMenu() {
    return this._selectedMenu;
  }

  get chatMessageManager() {
    return this._chatMessageManager;
  }

  get notificationManager() {
    return this._notificationManager;
  }

  selectMenu(menu: MainMenu) {
    if (this._selectedMenu !== menu) {
      this._selectedMenu = menu;
    }
  }

  selectContactInCurrentMenu(contact: FriendModel | GroupModel) {
    if (this._selectedMenu === MainMenu.contact) {
      this.contactManager.selectContact(contact);
    } else if (this._selectedMenu === MainMenu.message) {
      this.chatMessageManager.selectById(contact.chatMessageCollection.id);
    }
  }

  async login(userInfo: { username: string; password: string }): Promise<void> {
    const resp = await SocketIO.instance.fetch<LoginSuccessResponse>(
      new LoginRequest(userInfo),
    );
    this._handleLoginResponse(resp);
    await this._initChatMessages();
  }

  async loginByToken() {
    const token = LocalStorageStore.instance.getItem<string | undefined>(
      'token',
    );
    if (!token) {
      return;
    }
    const resp = await SocketIO.instance.fetch<LoginSuccessResponse>(
      new LoginByTokenRequest(token),
    );
    this._handleLoginResponse(resp);
    await this._initChatMessages();
  }

  async register(userInfo: {
    username: string;
    password: string;
  }): Promise<void> {
    const resp = await SocketIO.instance.fetch<LoginSuccessResponse>(
      new RegisterRequest(userInfo),
    );
    this._handleLoginResponse(resp);
    await this._initChatMessages();
  }

  async createGroup(groupName: string) {
    const resp = await SocketIO.instance.fetch<CreateGroupSuccessResponse>(
      new CreateGroupRequest(groupName),
    );
    this._handleJoinGroupResponse(resp);
  }

  async joinGroup(groupId: string) {
    const resp = await SocketIO.instance.fetch<JoinGroupSuccessResponse>(
      new JoinGroupRequest(groupId),
    );
    this._handleJoinGroupResponse(resp);
  }

  async sendFriendAddRequest(groupId: string) {
    return await SocketIO.instance.fetch<SendFriendAddRequestResponse>(
      new SendFriendAddRequest(groupId),
    );
  }

  async searchUsersAndGroups(
    searchText: string,
  ): Promise<UserAndGroupSearchResult> {
    let resp = await SocketIO.instance.fetch<UserAndGroupSearchResult>(
      new SearchUsersAndGroupsRequest(searchText),
    );
    if (isErrorResponse(resp)) {
      throw new Error(resp.message);
    }
    resp = {
      groups: resp.groups.filter(
        item => !this._contactManager.groupCollection.includes(item.id),
      ),
      users: resp.users.filter(
        item =>
          this._self.id !== item.id &&
          !this._contactManager.friendCollection.includes(item.id),
      ),
    };
    return resp;
  }

  private _handleJoinGroupResponse(
    resp: Group & { messagesRecord?: ChatMessagesRecord },
  ) {
    const groupModel = new GroupModel(resp);
    groupModel.setChatMessageCollection(
      ChatMessageCollection.createByRawData({
        id: groupModel.messageOwnerKey,
        context: this,
        messagesRecord: resp.messagesRecord,
      }),
    );
    this._contactManager.groupCollection.addItem(groupModel);
    this._chatMessageManager.addItem(groupModel.chatMessageCollection);
    this.selectContactInCurrentMenu(groupModel);
  }

  logout() {
    LocalStorageStore.instance.removeItem('token');
    this._clear();
  }

  private _clear() {
    this.self.clear();
    this._contactManager.clear();
    this._chatMessageManager.clear();
    this._notificationManager.clear();
    this._selectedMenu = MainMenu.message;
  }

  private _handleLoginResponse(resp: LoginSuccessResponse) {
    const { token, friends, groups, notifications, ...userInfo } = resp;
    if (token) {
      LocalStorageStore.instance.setItem('token', token);
    }
    this._self.setUserInfo(userInfo);
    this._contactManager.init({
      friends,
      groups,
      selfId: this._self.id,
    });
    this._notificationManager.init(notifications);
  }

  get userMap() {
    return [...this._contactManager.friendCollection.list, this._self].reduce(
      (prev, cur) => {
        prev[cur.id] = cur;
        return prev;
      },
      {} as Record<string, IUser>,
    );
  }

  private async _initChatMessages() {
    const { contacts } = this._contactManager;
    const chatMessagesResponse =
      await SocketIO.instance.fetch<LastMessagesResponse>(
        new GetChatMessagesRequest({
          selfId: this._self.id,
          contacts,
        }),
      );
    const chatMessageCollectionList = contacts.map(contact => {
      const key = contact.messageOwnerKey;
      const messagesRecord = chatMessagesResponse[key];
      return ChatMessageCollection.createByRawData({
        id: key,
        context: this,
        messagesRecord,
      });
    });
    const chatMessageCollectionMap = chatMessageCollectionList.reduce(
      (prev, cur) => {
        prev[cur.id] = cur;
        return prev;
      },
      {} as Record<string, ChatMessageCollection>,
    );
    contacts.forEach(contact => {
      const key = contact.messageOwnerKey;
      const messageCollection = chatMessageCollectionMap[key];
      contact.setChatMessageCollection(messageCollection);
    });
    this._chatMessageManager.init(chatMessageCollectionList);
  }
}
