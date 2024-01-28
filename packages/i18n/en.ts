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
    create: 'Create',
    search: 'Search',
    add: 'Add',
    searchPlaceholder2: 'Search users/groups',
    toFindNewFriends: 'To find new friends!',
    confirmToAdd: 'Confirm to add',
    sendFriendRequestSuccess: 'Successfully send friend request',
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
    notifications: 'Notifications',
    users: 'Users',
    friends: 'Friends',
    groups: 'Groups',
    createGroup: 'Create group',
    addFriendOrGroup: 'Add friend/group',
    inputGroupName: 'Input group name',
  },
  time: {
    today: 'Today',
    yesterday: 'Yesterday',
  },
  validate: {
    required: 'This field is required',
    maxLength: 'The length of this field cannot exceed {len}',
    minLength: 'Length of this field cannot be less than {len}',
    noWhitespace: 'This field cannot contain whitespace',
    notSameWithPassword: "It's not same with the password",
  },
};
export default en;
