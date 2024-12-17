import type { UserAccountInfo } from '../typing';
import { defineComponent } from 'vue';
import { getGlobalStore } from '~/utils/vue';
import { LoginForm } from './LoginForm';

export const Login = defineComponent({
  name: 'LoginEntry',
  emits: {
    success: () => true,
  },
  setup(_, { emit }) {
    const globalStore = getGlobalStore();

    const onLogin = async (userInfo: UserAccountInfo) => {
      await globalStore.login(userInfo);
      emit('success');
    };
    return () => <LoginForm onSubmit={onLogin} />;
  },
});
