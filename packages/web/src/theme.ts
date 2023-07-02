import { ref } from 'vue';
import setCssVariable from './utils/css-variable';
import { LocalStorageStore } from '~/infrastructure/local-store/local-storage-store';

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

const GlobalTheme = ref<ThemeName>('cool');

export function setTheme(theme: ThemeName) {
  GlobalTheme.value = theme;
  LocalStorageStore.instance.setItem('theme', theme);
  const { primaryColor, primaryTextColor } = Themes[theme];
  setCssVariable(primaryColor, primaryTextColor);
}

/** Set initial theme according to theme saved in local storage */
export function initTheme() {
  setTheme(LocalStorageStore.instance.getItem('theme') || 'cool');
}

export function getTheme() {
  return GlobalTheme.value;
}
