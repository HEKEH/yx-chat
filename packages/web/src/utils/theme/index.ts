import setCssVariable from './css-variable';

type Theme = {
  primaryColor: string;
  primaryTextColor: string;
};

const Themes: Record<string, Theme> = {
  default: {
    primaryColor: '74, 144, 226',
    primaryTextColor: '247, 247, 247',
  },
  cool: {
    primaryColor: '5, 159, 149',
    primaryTextColor: '255, 255, 255',
  },
};

export function setTheme(theme: 'default' | 'cool') {
  const { primaryColor, primaryTextColor } = Themes[theme];
  setCssVariable(primaryColor, primaryTextColor);
}
