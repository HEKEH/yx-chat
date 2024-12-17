const YX_CHAT_STORE = 'YXChatStore';

/** 对localStorage进行封装 */
class LocalStorageStore {
  private static _instance: LocalStorageStore | undefined;

  /** LocalStorageStore的单例 */
  static get instance(): LocalStorageStore {
    if (!this._instance) {
      this._instance = new LocalStorageStore();
    }
    return this._instance;
  }

  private _version: string;

  private _appKey: string;

  private get prefix() {
    return `${YX_CHAT_STORE}${this._appKey}`;
  }

  private get versionKey() {
    return `${this.prefix}.version`;
  }

  private constructor(
    props = {
      version: '1',
      appKey: '',
    },
  ) {
    this._version = props.version;
    this._appKey = props.appKey;
    this._init();
  }

  private _init() {
    const storedVersion = window.localStorage.getItem(this.versionKey);
    // 如果版本已经过期，则清除之前的记录
    if (storedVersion && storedVersion !== this._version) {
      this.reset();
    }
    window.localStorage.setItem(this.versionKey, this._version);
  }

  private _tryParse(value: string): any {
    try {
      return JSON.parse(value);
    } catch (e) {
      console.error(e);
      return value;
    }
  }

  private _getKeyWithPrefix(key: string): string {
    return `${this.prefix}.${key}`;
  }

  getItem<T = any>(key: string, defaultValue?: T): T {
    const valueFromStorage = window.localStorage.getItem(
      this._getKeyWithPrefix(key),
    );

    return valueFromStorage == null
      ? defaultValue
      : this._tryParse(valueFromStorage);
  }

  setItem<T = any>(key: string, value: T): void {
    if (value === undefined) {
      window.localStorage.removeItem(this._getKeyWithPrefix(key));
    } else {
      window.localStorage.setItem(
        this._getKeyWithPrefix(key),
        JSON.stringify(value),
      );
    }
  }

  removeItem(key: string): void {
    window.localStorage.removeItem(this._getKeyWithPrefix(key));
  }

  reset(): void {
    const storage = window.localStorage;
    Object.keys(storage).forEach(key => {
      if (key.startsWith(this.prefix)) {
        storage.removeItem(key);
      }
    });
  }
}

export { LocalStorageStore };
