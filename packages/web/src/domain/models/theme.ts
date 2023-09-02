import setCssVariable from '~/utils/css-variable';
import { LocalStorageStore } from '~/infra/local-store/local-storage-store';

type ThemeSetting = {
  primaryColor: string;
  primaryTextColor: string;
};

export type ThemeName = 'default' | 'cool';

const Themes: Record<ThemeName, ThemeSetting> = {
  default: {
    primaryColor: '74, 144, 226',
    primaryTextColor: '247, 247, 247',
  },
  cool: {
    primaryColor: '5, 159, 149',
    primaryTextColor: '255, 255, 255',
  },
};

export class ThemeManager {
  private _globalTheme!: ThemeName;

  get theme() {
    return this._globalTheme;
  }

  setTheme(theme: ThemeName) {
    this._globalTheme = theme;
    LocalStorageStore.instance.setItem('theme', theme);
    const { primaryColor, primaryTextColor } = Themes[theme];
    setCssVariable(primaryColor, primaryTextColor);
  }

  getThemeColor(alpha = 1) {
    const color = Themes[this._globalTheme].primaryColor;
    return `rgba(${color}, ${alpha})`;
  }

  constructor() {
    this._initTheme();
  }

  private _initTheme() {
    this.setTheme(LocalStorageStore.instance.getItem('theme') || 'cool');
  }
}
