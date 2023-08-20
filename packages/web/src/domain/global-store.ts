import { LoginSuccessResponse } from '@yx-chat/shared/types';
import Self from './models/self';
import { MainMenu } from './types';
import { ThemeManager } from './models/theme';
import { ContactManager } from './models/contact';
import { SocketIO } from '~/infrastructure/socket-io';
import { LoginMessage } from '~/infrastructure/socket-io/message/send/login-message';
import { BusinessError } from '~/common/error';
import { LocalStorageStore } from '~/infrastructure/local-store/local-storage-store';
import { LoginByTokenMessage } from '~/infrastructure/socket-io/message/send/login-by-token-message';
import { RegisterMessage } from '~/infrastructure/socket-io/message/send/register-message';

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
      new LoginMessage(userInfo),
    );
    this._handleLoginResponse(resp);
  }

  async loginByToken() {
    const token = LocalStorageStore.instance.getItem<string | undefined>(
      'token',
    );
    if (!token) {
      return;
    }
    const resp = await SocketIO.instance.fetch<LoginSuccessResponse | string>(
      new LoginByTokenMessage(token),
    );
    this._handleLoginResponse(resp);
  }

  async register(userInfo: {
    username: string;
    password: string;
  }): Promise<void> {
    const resp = await SocketIO.instance.fetch<LoginSuccessResponse | string>(
      new RegisterMessage(userInfo),
    );
    this._handleLoginResponse(resp);
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
}
