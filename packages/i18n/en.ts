import { I18nMessage } from './types';

const en: I18nMessage = {
  account: {
    login: 'Log In',
    logout: 'Log Out',
    register: 'Sign Up',
    username: 'Username',
    password: 'Password',
    confirmPassword: 'Confirm Password',
    logoutConfirm: 'Are you sure to log out?',
    loginSuccess: 'Login successful',
    registerSuccess: 'Register successful',
  },
  server: {
    connectError: 'Server connect error',
    disconnect: 'Server disconnect',
  },
  common: {
    sourceCode: 'Source code',
    language: 'Language',
    setting: 'Setting',
    loading: 'Loading',
    searchPlaceholder: 'Search friends/groups',
    searchNoResult: 'No friend/group found',
  },
  setting: {
    general: 'General',
    theme: 'Theme',
  },
  style: {
    theme: {
      default: 'Default',
      cool: 'Cool',
    },
  },
  main: {
    chats: 'Chats',
    contacts: 'Contacts',
    friends: 'Friends',
    groups: 'Groups',
    createGroup: 'Create group',
    addFriendOrGroup: 'Add friend/group',
  },
  time: {
    today: 'Today',
    yesterday: 'Yesterday',
  },
};
export default en;
