import { defineComponent } from 'vue';
import { UserInfo } from '../typing';
import { LoginForm } from './LoginForm';
import { getGlobalStore } from '~/utils/vue';

export const Login = defineComponent({
  name: 'LoginEntry',
  emits: {
    success: () => true,
  },
  setup(_, { emit }) {
    const globalStore = getGlobalStore();

    const onLogin = async (userInfo: UserInfo) => {
      await globalStore.login(userInfo);
      emit('success');
    };
    return () => <LoginForm onSubmit={onLogin} />;
  },
});
