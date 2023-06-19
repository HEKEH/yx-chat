import { defineComponent } from 'vue';
import { LoginForm } from './LoginForm';
import { UserInfo } from '../typing';
import { getServices } from '~/utils/vue';

export const Login = defineComponent({
  emits: {
    success: () => true,
  },
  setup(_, { emit }) {
    const services = getServices();

    const onLogin = async (userInfo: UserInfo) => {
      console.log(userInfo);
    };
    return () => <LoginForm onSubmit={onLogin} />;
  },
});
