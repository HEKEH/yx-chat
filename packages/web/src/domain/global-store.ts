import {
  LastMessagesResponse,
  LoginSuccessResponse,
  ErrorResponse,
} from '@yx-chat/shared/types';
import { isErrorResponse } from '@yx-chat/shared/utils';
import { SocketIO } from '~/infra/socket-io';
import { LoginRequest } from '~/infra/socket-io/request/login-request';
import { BusinessError } from '~/common/error';
import { LocalStorageStore } from '~/infra/local-storage-store';
import { LoginByTokenRequest } from '~/infra/socket-io/request/login-by-token-request';
import { RegisterRequest } from '~/infra/socket-io/request/register-request';
import { GetChatMessagesRequest } from '~/infra/socket-io/request/get-chat-messages-request';
import Self from './models/self';
import { MainMenu } from './types';
import { ThemeManager } from './models/theme';
import { ContactManager } from './models/contact';
import { ChatMessageCollection } from './models/chat/chat-message-collection';
import { IUser } from './models/typing';
import { ChatMessageManager } from './models/chat/chat-message-manager';

export default class GlobalStore {
  /** the user logged in */
  private _self: Self = Self.createEmpty();

  private _contactManager: ContactManager = new ContactManager();

  private _themeManager: ThemeManager = new ThemeManager();

  private _selectedMenu: MainMenu = MainMenu.message;

  private _chatMessageManager: ChatMessageManager = new ChatMessageManager();

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

  get currentChatMessageCollection(): ChatMessageCollection | undefined {
    if (this._selectedMenu === MainMenu.contact) {
      return this._contactManager.currentContact?.chatMessageCollection;
    }
    if (this._selectedMenu === MainMenu.message) {
      return this._chatMessageManager.selectedItem;
    }
  }

  get chatMessageManager() {
    return this._chatMessageManager;
  }

  selectMenu(menu: MainMenu) {
    if (this._selectedMenu !== menu) {
      this._selectedMenu = menu;
    }
  }

  async login(userInfo: { username: string; password: string }): Promise<void> {
    const resp = await SocketIO.instance.fetch<
      LoginSuccessResponse | ErrorResponse
    >(new LoginRequest(userInfo));
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
    const resp = await SocketIO.instance.fetch<
      LoginSuccessResponse | ErrorResponse
    >(new LoginByTokenRequest(token));
    this._handleLoginResponse(resp);
    await this._initChatMessages();
  }

  async register(userInfo: {
    username: string;
    password: string;
  }): Promise<void> {
    const resp = await SocketIO.instance.fetch<
      LoginSuccessResponse | ErrorResponse
    >(new RegisterRequest(userInfo));
    this._handleLoginResponse(resp);
    await this._initChatMessages();
  }

  logout() {
    LocalStorageStore.instance.removeItem('token');
    this._clear();
  }

  private _clear() {
    this.self.clear();
    this._contactManager.clear();
    this._chatMessageManager.clear();
    this._selectedMenu = MainMenu.message;
  }

  private _handleLoginResponse(resp: LoginSuccessResponse | ErrorResponse) {
    // 和后端约定，返回string时，则为错误信息
    if (isErrorResponse(resp)) {
      throw new BusinessError(resp.message);
    }
    const { token, friends, groups, ...userInfo } = resp;
    if (token) {
      LocalStorageStore.instance.setItem('token', token);
    }
    this._self.setUserInfo(userInfo);
    this._contactManager.init({
      friends,
      groups,
      selfId: this._self.id,
    });
  }

  private async _initChatMessages() {
    const contacts = [
      ...this._contactManager.friendCollection.list,
      ...this._contactManager.groupCollection.list,
    ];
    const chatMessagesResponse =
      await SocketIO.instance.fetch<LastMessagesResponse>(
        new GetChatMessagesRequest({
          selfId: this._self.id,
          contacts,
        }),
      );
    console.log(chatMessagesResponse, 'chatMessagesResponse');
    const userMap: Record<string, IUser> = [...contacts, this._self].reduce(
      (prev, cur) => {
        prev[cur.id] = cur;
        return prev;
      },
      {} as Record<string, IUser>,
    );
    const chatMessageCollectionList = Object.entries(chatMessagesResponse).map(
      ([key, messagesRecord]) => {
        return ChatMessageCollection.createByRawData({
          id: key,
          context: this,
          messagesRecord,
          userMap,
        });
      },
    );
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
