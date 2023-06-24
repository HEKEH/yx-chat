import { defineComponent } from 'vue';
import { UserInfo } from '../typing';
import { LoginForm } from './LoginForm';
import { getServices } from '~/utils/vue';

export const Login = defineComponent({
  emits: {
    success: () => true,
  },
  setup(_, { emit }) {
    const services = getServices();

    const onLogin = async (userInfo: UserInfo) => {
      await services.account.login(userInfo);
      emit('success');
    };
    return () => <LoginForm onSubmit={onLogin} />;
  },
});
