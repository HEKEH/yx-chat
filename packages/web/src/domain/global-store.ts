import {
  LastMessagesResponse,
  LoginSuccessResponse,
} from '@yx-chat/shared/types';
import Self from './models/self';
import { MainMenu } from './types';
import { ThemeManager } from './models/theme';
import { ContactManager } from './models/contact';
import { SocketIO } from '~/infrastructure/socket-io';
import { LoginRequest } from '~/infrastructure/socket-io/message/request/login-request';
import { BusinessError } from '~/common/error';
import { LocalStorageStore } from '~/infrastructure/local-store/local-storage-store';
import { LoginByTokenRequest } from '~/infrastructure/socket-io/message/request/login-by-token-request';
import { RegisterRequest } from '~/infrastructure/socket-io/message/request/register-request';
import { ChatMessagesRequest } from '~/infrastructure/socket-io/message/request/chat-messages-request';

export default class GlobalStore {
  /** the user logged in */
  private _self: Self = Self.createEmpty();

  private _contactManager: ContactManager = new ContactManager();

  private _themeManager: ThemeManager = new ThemeManager();

  private _selectedMenu: MainMenu = MainMenu.message;

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

  selectMenu(menu: MainMenu) {
    if (this._selectedMenu !== menu) {
      this._selectedMenu = menu;
      // TODO
    }
  }

  async login(userInfo: { username: string; password: string }): Promise<void> {
    const resp = await SocketIO.instance.fetch<LoginSuccessResponse | string>(
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
    const resp = await SocketIO.instance.fetch<LoginSuccessResponse | string>(
      new LoginByTokenRequest(token),
    );
    this._handleLoginResponse(resp);
    await this._initChatMessages();
  }

  async register(userInfo: {
    username: string;
    password: string;
  }): Promise<void> {
    const resp = await SocketIO.instance.fetch<LoginSuccessResponse | string>(
      new RegisterRequest(userInfo),
    );
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
    this._selectedMenu = MainMenu.message;
  }

  private _handleLoginResponse(resp: LoginSuccessResponse | string) {
    // 和后端约定，返回string时，则为错误信息
    if (typeof resp === 'string') {
      throw new BusinessError(resp);
    }
    const { token, friends, groups, ...userInfo } = resp;
    if (token) {
      LocalStorageStore.instance.setItem('token', token);
    }
    this._self.setUserInfo(userInfo);
    this._contactManager.init({
      friends,
      groups,
    });
  }

  private async _initChatMessages() {
    const chatMessagesResponse =
      await SocketIO.instance.fetch<LastMessagesResponse>(
        new ChatMessagesRequest({
          selfId: this._self.id,
          friends: this._contactManager.friendCollection.list,
          groups: this._contactManager.groupCollection.list,
        }),
      );
    console.log(chatMessagesResponse, 'chatMessagesResponse');
    // TODO
  }
}
